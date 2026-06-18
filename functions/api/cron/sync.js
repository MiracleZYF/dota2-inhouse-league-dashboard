import {
  ensureDatabase,
  getMatchDetail,
  getMatches,
  getSettings,
  json,
  makeRecentDateRange,
  readJson,
  refreshStoredMatch,
  syncRecentMatches,
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
    const url = new URL(request.url);
    const body = request.method === "GET" ? {} : await readJson(request);
    const settings = await getSettings(env);
    const force = url.searchParams.get("force") === "1" || body.force === true;

    if (settings.autoSync === false && !force) {
      return json({
        skipped: true,
        message: "自动同步已在系统设置中关闭",
        matches: await getMatches(env),
      });
    }

    const hours = clampNumber(url.searchParams.get("hours") || body.hours, 72, 6, 168);
    const retryLimit = clampNumber(url.searchParams.get("retryLimit") || body.retryLimit, 12, 0, 30);
    const syncResult = await syncRecentMatches(env, {
      dateRange: makeRecentDateRange(hours),
    });
    const retryResult = retryLimit > 0 ? await retryUnresolvedMatches(env, retryLimit) : { attempted: 0, succeeded: 0, results: [] };
    const matches = await getMatches(env);

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
      },
      retry: retryResult,
      matchCount: matches.length,
      matches,
      message: `自动同步完成：新增 ${syncResult.newCandidates.length} 场，重试 ${retryResult.attempted} 场`,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "自动同步失败" }, { status: 500 });
  }
}
