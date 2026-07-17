import {
  ensureDatabase,
  getAuditLogs,
  getLeagueSlugFromRequest,
  getMatches,
  getSyncRuns,
  json,
  logAuditAction,
  recordSyncRun,
  readJson,
  requireAdmin,
  retryUnresolvedMatches,
  syncRecentMatches,
  withLeague,
} from "../_lib/dota.js";

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(number, min), max);
}

export async function onRequestPost({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
  try {
    await ensureDatabase(env);
    const startedAt = new Date().toISOString();
    const body = await readJson(request);
    const seasonSettings = body.settings || {};
    const retryLimit = clampNumber(body.retryLimit, 12, 0, 30);
    const result = await syncRecentMatches(scopedEnv, {
      dateRange: body.dateRange || {},
      settingsOverride: seasonSettings,
    });
    const retryResult = retryLimit > 0 ? await retryUnresolvedMatches(scopedEnv, { retryLimit }) : { attempted: 0, succeeded: 0, results: [] };
    retryResult.autoStoredCount = Number(retryResult.autoStoredCount || 0);
    retryResult.enrichedStoredCount = Number(retryResult.enrichedStoredCount || 0);
    retryResult.manualInterventionCount = Number(retryResult.manualInterventionCount || 0);
    const autoStoredTotal = Number(result.autoStoredCount || 0) + retryResult.autoStoredCount;
    const manualInterventionTotal = Number(result.manualInterventionCount || 0) + retryResult.manualInterventionCount;
    const status = result.leagueScan?.failed || result.leagueScan?.partial || result.failedCount || retryResult.results.some((item) => !item.ok) ? "warning" : "success";
    const syncRun = await recordSyncRun(scopedEnv, {
      kind: "manual",
      status,
      summary: `${result.message}；重试 ${retryResult.attempted} 场，成功 ${retryResult.succeeded} 场`,
      startedAt,
      details: {
        seasonId: seasonSettings.currentSeasonId || "",
        seasonName: seasonSettings.seasonName || "",
        seasonStart: seasonSettings.seasonStart || "",
        seasonEnd: seasonSettings.seasonEnd || "",
        dateRange: body.dateRange || {},
        newCount: result.newCandidates.length,
        autoStoredCount: result.autoStoredCount,
        manualInterventionCount: result.manualInterventionCount,
        autoStoredTotal,
        enrichedStoredCount: retryResult.enrichedStoredCount,
        manualInterventionTotal,
        duplicatedCount: result.duplicatedCount,
        failedCount: result.failedCount,
        leagueScan: result.leagueScan,
        recentMatches: result.recentMatches,
        retryLimit,
        retry: retryResult,
      },
    });
    await logAuditAction(scopedEnv, {
      action: "manual_sync",
      actor: "管理员",
      summary: `手动同步完成：新增 ${result.newCandidates.length} 场，自动入库 ${autoStoredTotal} 场，人工介入 ${manualInterventionTotal} 场，重试 ${retryResult.attempted} 场`,
      details: {
        seasonId: seasonSettings.currentSeasonId || "",
        seasonName: seasonSettings.seasonName || "",
        seasonStart: seasonSettings.seasonStart || "",
        seasonEnd: seasonSettings.seasonEnd || "",
        dateRange: body.dateRange || {},
        syncRunId: syncRun?.id,
        autoStoredCount: result.autoStoredCount,
        manualInterventionCount: result.manualInterventionCount,
        autoStoredTotal,
        enrichedStoredCount: retryResult.enrichedStoredCount,
        manualInterventionTotal,
        failedCount: result.failedCount,
        retry: retryResult,
      },
    });

    return json({
      ...result,
      retry: retryResult,
      autoStoredTotal,
      manualInterventionTotal,
      message: `${result.message}；重试 ${retryResult.attempted} 场，成功 ${retryResult.succeeded} 场`,
      matches: await getMatches(scopedEnv),
      syncRuns: await getSyncRuns(scopedEnv),
      auditLogs: await getAuditLogs(scopedEnv),
    });
  } catch (error) {
    try {
      await recordSyncRun(scopedEnv, {
        kind: "manual",
        status: "failed",
        summary: error instanceof Error ? error.message : "同步比赛失败",
        details: {},
      });
    } catch {
      // 写入同步失败记录本身不应掩盖原始错误。
    }
    return json({ error: error instanceof Error ? error.message : "同步比赛失败" }, { status: 500 });
  }
}
