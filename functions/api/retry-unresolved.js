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

  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    const startedAt = new Date().toISOString();
    const body = await readJson(request);
    const retryLimit = clampNumber(body.retryLimit, 20, 0, 50);
    const result = await retryUnresolvedMatches(scopedEnv, { retryLimit });
    const failedCount = result.results.filter((item) => item && !item.ok).length;
    const status = failedCount ? "warning" : "success";
    const summary = `重试等待解析完成：尝试 ${result.attempted} 场，成功 ${result.succeeded} 场，自动入库 ${result.autoStoredCount || 0} 场，仍需人工 ${result.manualInterventionCount || 0} 场`;

    const syncRun = await recordSyncRun(scopedEnv, {
      kind: "manual",
      status,
      summary,
      startedAt,
      details: {
        retryLimit,
        retry: result,
      },
    });
    await logAuditAction(scopedEnv, {
      action: "retry_unresolved",
      actor: "管理员",
      summary,
      details: {
        syncRunId: syncRun?.id,
        retryLimit,
        retry: result,
      },
    });

    return json({
      ok: true,
      retry: result,
      syncRun,
      matches: await getMatches(scopedEnv),
      syncRuns: await getSyncRuns(scopedEnv),
      auditLogs: await getAuditLogs(scopedEnv),
      message: summary,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "重试等待解析失败" }, { status: 500 });
  }
}
