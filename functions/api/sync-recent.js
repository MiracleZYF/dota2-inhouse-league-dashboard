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
  syncRecentMatches,
  withLeague,
} from "../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
  try {
    await ensureDatabase(env);
    const startedAt = new Date().toISOString();
    const body = await readJson(request);
    const seasonSettings = body.settings || {};
    const result = await syncRecentMatches(scopedEnv, {
      dateRange: body.dateRange || {},
      settingsOverride: seasonSettings,
    });
    const status = result.leagueScan?.failed || result.leagueScan?.partial || result.failedCount ? "warning" : "success";
    const syncRun = await recordSyncRun(scopedEnv, {
      kind: "manual",
      status,
      summary: result.message,
      startedAt,
      details: {
        seasonId: seasonSettings.currentSeasonId || "",
        seasonName: seasonSettings.seasonName || "",
        seasonStart: seasonSettings.seasonStart || "",
        seasonEnd: seasonSettings.seasonEnd || "",
        dateRange: body.dateRange || {},
        newCount: result.newCandidates.length,
        duplicatedCount: result.duplicatedCount,
        failedCount: result.failedCount,
        leagueScan: result.leagueScan,
      },
    });
    await logAuditAction(scopedEnv, {
      action: "manual_sync",
      actor: "管理员",
      summary: `手动同步完成：新增 ${result.newCandidates.length} 场，重复 ${result.duplicatedCount} 场`,
      details: {
        seasonId: seasonSettings.currentSeasonId || "",
        seasonName: seasonSettings.seasonName || "",
        seasonStart: seasonSettings.seasonStart || "",
        seasonEnd: seasonSettings.seasonEnd || "",
        dateRange: body.dateRange || {},
        syncRunId: syncRun?.id,
        failedCount: result.failedCount,
      },
    });

    return json({
      ...result,
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
