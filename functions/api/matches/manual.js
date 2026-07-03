import {
  createPendingMatch,
  ensureDatabase,
  getAuditLogs,
  getLeagueSlugFromRequest,
  getMatch,
  getMatches,
  json,
  logAuditAction,
  refreshStoredMatch,
  readJson,
  requireAdmin,
  upsertMatch,
  withLeague,
} from "../../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    const body = await readJson(request);
    const matchId = String(body.matchId || "").trim();
    if (!matchId) return json({ error: "Match ID 不能为空" }, { status: 400 });
    if (!/^\d+$/.test(matchId)) return json({ error: "Match ID 只能填写数字" }, { status: 400 });

    const existing = await getMatch(scopedEnv, matchId);
    let match = existing
      ? {
          ...existing,
          status: "待确认",
          hidden: false,
          isRankedLadder: false,
          notes: "管理员手动重新识别；正在尝试读取 OpenDota/Steam/STRATZ 详情。",
        }
      : createPendingMatch(matchId, "管理员手动添加；已加入识别队列，正在尝试读取 OpenDota/Steam/STRATZ 详情。");
    let detail = null;
    let message = existing ? `Match ID ${matchId} 已在识别队列中，已尝试重新识别。` : `Match ID ${matchId} 已加入候选队列。`;

    await upsertMatch(scopedEnv, match, { preserveStatus: false });
    const lookup = await refreshStoredMatch(scopedEnv, matchId, { resetReviewStatus: true, requestOpenDotaParse: true, useSteam: true, useStratz: true });
    match = lookup.match;
    detail = lookup.detail;
    message = `${message} ${lookup.message}${lookup.warning ? `；${lookup.warning}` : ""}`;
    await logAuditAction(scopedEnv, {
      action: existing ? "manual_reidentify_match" : "manual_add_match",
      matchId,
      actor: "管理员",
      summary: message,
      details: { source: lookup.source, openDotaStatus: lookup.openDotaStatus, steamStatus: lookup.steamStatus, stratzStatus: lookup.stratzStatus, attempts: lookup.attempts || [] },
    });

    return json({
      match,
      detail,
      matches: await getMatches(scopedEnv),
      auditLogs: await getAuditLogs(scopedEnv),
      duplicated: Boolean(existing),
      parsed: Boolean(lookup.ok),
      parseRequested: Boolean(lookup.parseRequested),
      source: lookup.source,
      openDotaStatus: lookup.openDotaStatus,
      steamStatus: lookup.steamStatus,
      stratzStatus: lookup.stratzStatus,
      attempts: lookup.attempts || [],
      leagueId: detail?.leagueid || 0,
      message,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "手动加入比赛失败" }, { status: 500 });
  }
}
