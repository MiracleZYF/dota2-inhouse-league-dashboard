import {
  ensureDatabase,
  getAuditLogs,
  getMatches,
  getSyncRuns,
  json,
  logAuditAction,
  recordSyncRun,
  readJson,
  requireAdmin,
  syncRecentMatches,
} from "../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const startedAt = new Date().toISOString();
    const body = await readJson(request);
    const result = await syncRecentMatches(env, {
      dateRange: body.dateRange || {},
      settingsOverride: body.settings || {},
    });
    const status = result.leagueScan?.failed || result.failedCount ? "warning" : "success";
    const syncRun = await recordSyncRun(env, {
      kind: "manual",
      status,
      summary: result.message,
      startedAt,
      details: {
        newCount: result.newCandidates.length,
        duplicatedCount: result.duplicatedCount,
        failedCount: result.failedCount,
        leagueScan: result.leagueScan,
      },
    });
    await logAuditAction(env, {
      action: "manual_sync",
      actor: "管理员",
      summary: `手动同步完成：新增 ${result.newCandidates.length} 场，重复 ${result.duplicatedCount} 场`,
      details: { syncRunId: syncRun?.id, failedCount: result.failedCount },
    });

    return json({
      ...result,
      matches: await getMatches(env),
      syncRuns: await getSyncRuns(env),
      auditLogs: await getAuditLogs(env),
    });
  } catch (error) {
    try {
      await recordSyncRun(env, {
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
