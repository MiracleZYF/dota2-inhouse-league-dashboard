import {
  ensureDatabase,
  getAuditLogs,
  getLeagueSpace,
  getLeagueSlugFromRequest,
  getMatchDetail,
  getMatches,
  getSettings,
  getSyncRuns,
  json,
  logAuditAction,
  makeRecentDateRange,
  recordSyncRun,
  readJson,
  refreshStoredMatch,
  syncPlayerProfiles,
  syncRecentMatches,
  withLeague,
} from "../../_lib/dota.js";

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(number, min), max);
}

function readBearerToken(request) {
  const auth = request.headers.get("authorization") || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7).trim();
  return request.headers.get("x-cron-token") || request.headers.get("x-admin-token") || "";
}

function requireCronAuth(request, env) {
  const expected = env.CRON_SECRET || env.ADMIN_TOKEN;
  if (!expected) return json({ error: "CRON_SECRET 或 ADMIN_TOKEN 未配置" }, { status: 500 });
  const token = readBearerToken(request);
  if (token !== expected) return json({ error: "自动同步密钥不正确" }, { status: 401 });
  return null;
}

function hasRetryHint(match, detail) {
  if (match.status === "已入库" || match.isRankedLadder) return false;
  if (!detail) {
    return match.time === "待解析" || /待解析|已请求解析|暂未返回|OpenDota HTTP|Steam API/i.test(`${match.score || ""} ${match.notes || ""}`);
  }
  if (detail.data_source === "steam-history" || detail.data_source === "cached") return true;
  if (typeof detail.radiant_win !== "boolean") return (match.registeredPlayers || []).some((player) => typeof player.result !== "boolean");
  return false;
}

async function retryUnresolvedMatches(env, retryLimit) {
  const matches = await getMatches(env);
  const candidates = [];

  for (const match of matches) {
    if (candidates.length >= retryLimit) break;
    const detail = await getMatchDetail(env, match.id);
    if (hasRetryHint(match, detail)) candidates.push(match);
  }

  const results = [];
  for (const match of candidates) {
    try {
      const result = await refreshStoredMatch(env, match.id, {
        resetReviewStatus: false,
        requestOpenDotaParse: true,
        useSteam: true,
      });
      results.push({
        id: match.id,
        ok: result.ok,
        source: result.source,
        message: result.message,
        openDotaStatus: result.openDotaStatus,
        steamStatus: result.steamStatus,
      });
    } catch (error) {
      results.push({
        id: match.id,
        ok: false,
        error: error instanceof Error ? error.message : "重试失败",
      });
    }
  }

  return {
    attempted: results.length,
    succeeded: results.filter((item) => item.ok).length,
    results,
  };
}

export async function onRequest({ request, env }) {
  const authError = requireCronAuth(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const leagueSlug = getLeagueSlugFromRequest(request);
    const scopedEnv = withLeague(env, leagueSlug);
    const startedAt = new Date().toISOString();
    const url = new URL(request.url);
    const body = request.method === "GET" ? {} : await readJson(request);
    const settings = await getSettings(scopedEnv);
    const force = url.searchParams.get("force") === "1" || body.force === true;
    const leagueSpace = await getLeagueSpace(env, leagueSlug);

    if (leagueSpace && leagueSpace.status !== "active" && !force) {
      return json({
        skipped: true,
        message: `当前空间状态为「${leagueSpace.status === "paused" ? "暂停同步" : "已归档"}」，自动同步已跳过`,
        leagueSpace,
        matches: await getMatches(scopedEnv),
      });
    }

    if (settings.autoSync === false && !force) {
      return json({
        skipped: true,
        message: "自动同步已在系统设置中关闭",
        matches: await getMatches(scopedEnv),
      });
    }

    const hours = clampNumber(url.searchParams.get("hours") || body.hours, 72, 6, 168);
    const retryLimit = clampNumber(url.searchParams.get("retryLimit") || body.retryLimit, 12, 0, 30);
    const syncProfiles = url.searchParams.get("syncProfiles") === "1" || body.syncProfiles === true;
    const profileLimit = clampNumber(url.searchParams.get("profileLimit") || body.profileLimit, 45, 1, 80);
    const syncResult = await syncRecentMatches(scopedEnv, {
      dateRange: makeRecentDateRange(hours),
    });
    const retryResult = retryLimit > 0 ? await retryUnresolvedMatches(scopedEnv, retryLimit) : { attempted: 0, succeeded: 0, results: [] };
    const profileResult = syncProfiles
      ? await syncPlayerProfiles(scopedEnv, {
          limit: profileLimit,
          throttleMs: 850,
          retryAttempts: 2,
        })
      : null;
    const matches = await getMatches(scopedEnv);
    const status =
      syncResult.leagueScan?.failed ||
      syncResult.leagueScan?.partial ||
      syncResult.failedCount ||
      retryResult.results.some((item) => !item.ok) ||
      profileResult?.rateLimited
        ? "warning"
        : "success";
    const syncRun = await recordSyncRun(scopedEnv, {
      kind: "auto",
      status,
      summary: `自动同步完成：新增 ${syncResult.newCandidates.length} 场，重试 ${retryResult.attempted} 场${profileResult ? `，资料 ${profileResult.successCount}/${profileResult.processedCount}` : ""}`,
      startedAt,
      details: {
        windowHours: hours,
        retryLimit,
        syncProfiles,
        profileLimit,
        newCount: syncResult.newCandidates.length,
        duplicatedCount: syncResult.duplicatedCount,
        failedCount: syncResult.failedCount,
        leagueScan: syncResult.leagueScan,
        recentMatches: syncResult.recentMatches,
        retry: retryResult,
        profileSync: profileResult
          ? {
              successCount: profileResult.successCount,
              failedCount: profileResult.failedCount,
              skippedCount: profileResult.skippedCount,
              processedCount: profileResult.processedCount,
              rateLimited: profileResult.rateLimited,
            }
          : null,
      },
    });
    await logAuditAction(scopedEnv, {
      action: "auto_sync",
      actor: "GitHub Actions",
      summary: `自动同步完成：新增 ${syncResult.newCandidates.length} 场，重试 ${retryResult.attempted} 场${profileResult ? `，资料 ${profileResult.successCount}/${profileResult.processedCount}` : ""}`,
      details: { syncRunId: syncRun?.id, status },
    });

    return json({
      ok: true,
      triggeredAt: new Date().toISOString(),
      windowHours: hours,
      retryLimit,
      sync: {
        message: syncResult.message,
        newCount: syncResult.newCandidates.length,
        duplicatedCount: syncResult.duplicatedCount,
        failedCount: syncResult.failedCount,
        leagueScan: syncResult.leagueScan,
        recentMatches: syncResult.recentMatches,
      },
      retry: retryResult,
      profileSync: profileResult,
      syncRun,
      syncRuns: await getSyncRuns(scopedEnv),
      auditLogs: await getAuditLogs(scopedEnv),
      matchCount: matches.length,
      matches,
      message: `自动同步完成：新增 ${syncResult.newCandidates.length} 场，重试 ${retryResult.attempted} 场`,
    });
  } catch (error) {
    try {
      const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
      await recordSyncRun(scopedEnv, {
        kind: "auto",
        status: "failed",
        summary: error instanceof Error ? error.message : "自动同步失败",
        details: {},
      });
    } catch {
      // 写入失败记录本身不应掩盖原始错误。
    }
    return json({ error: error instanceof Error ? error.message : "自动同步失败" }, { status: 500 });
  }
}
