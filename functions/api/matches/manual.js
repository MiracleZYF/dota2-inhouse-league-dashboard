import {
  createPendingMatch,
  ensureDatabase,
  getAuditLogs,
  getMatch,
  getMatches,
  json,
  logAuditAction,
  refreshStoredMatch,
  readJson,
  requireAdmin,
  upsertMatch,
} from "../../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    const matchId = String(body.matchId || "").trim();
    if (!matchId) return json({ error: "Match ID 不能为空" }, { status: 400 });
    if (!/^\d+$/.test(matchId)) return json({ error: "Match ID 只能填写数字" }, { status: 400 });

    const existing = await getMatch(env, matchId);
    let match = existing
      ? {
          ...existing,
          status: "待确认",
          hidden: false,
          isRankedLadder: false,
          notes: "管理员手动重新识别；正在尝试读取 OpenDota/Steam 详情。",
        }
      : createPendingMatch(matchId, "管理员手动添加；已加入识别队列，正在尝试读取 OpenDota/Steam 详情。");
    let detail = null;
    let message = existing ? `Match ID ${matchId} 已在识别队列中，已尝试重新识别。` : `Match ID ${matchId} 已加入候选队列。`;

    await upsertMatch(env, match, { preserveStatus: false });
    const lookup = await refreshStoredMatch(env, matchId, { resetReviewStatus: true, requestOpenDotaParse: true, useSteam: true });
    match = lookup.match;
    detail = lookup.detail;
    message = `${message} ${lookup.message}${lookup.warning ? `；${lookup.warning}` : ""}`;
    await logAuditAction(env, {
      action: existing ? "manual_reidentify_match" : "manual_add_match",
      matchId,
      actor: "管理员",
      summary: message,
      details: { source: lookup.source, openDotaStatus: lookup.openDotaStatus, steamStatus: lookup.steamStatus },
    });

    return json({
      match,
      detail,
      matches: await getMatches(env),
      auditLogs: await getAuditLogs(env),
      duplicated: Boolean(existing),
      parsed: Boolean(lookup.ok),
      parseRequested: Boolean(lookup.parseRequested),
      source: lookup.source,
      openDotaStatus: lookup.openDotaStatus,
      steamStatus: lookup.steamStatus,
      leagueId: detail?.leagueid || 0,
      message,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "手动加入比赛失败" }, { status: 500 });
  }
}
