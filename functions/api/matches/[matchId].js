import {
  ensureDatabase,
  getAuditLogs,
  getMatch,
  getMatchDetail,
  getMatches,
  json,
  logAuditAction,
  refreshStoredMatch,
  readJson,
  requireAdmin,
  updateMatchManualRoster,
  updateMatchStatus,
  updateMatchWinner,
} from "../../_lib/dota.js";

export async function onRequestGet({ params, env }) {
  const matchId = String(params.matchId || "").trim();
  try {
    await ensureDatabase(env);
    const existingMatch = await getMatch(env, matchId);
    const result = await refreshStoredMatch(env, matchId, {
      resetReviewStatus: false,
      requestOpenDotaParse: Boolean(existingMatch),
      useSteam: Boolean(existingMatch),
    });
    return json({
      ...result,
      matches: await getMatches(env),
      leagueId: result.detail?.leagueid || 0,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "读取比赛详情失败" }, { status: 500 });
  }
}

export async function onRequestPost({ request, params, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    if (body.action && body.action !== "refresh") return json({ error: "操作无效" }, { status: 400 });
    const result = await refreshStoredMatch(env, params.matchId, {
      resetReviewStatus: true,
      requestOpenDotaParse: true,
      useSteam: true,
    });
    await logAuditAction(env, {
      action: "refresh_match",
      matchId: params.matchId,
      actor: "管理员",
      summary: `重新识别 Match ID ${params.matchId}：${result.message}`,
      details: { source: result.source, openDotaStatus: result.openDotaStatus, steamStatus: result.steamStatus },
    });
    return json({
      ...result,
      matches: await getMatches(env),
      auditLogs: await getAuditLogs(env),
      leagueId: result.detail?.leagueid || 0,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "刷新比赛状态失败" }, { status: 500 });
  }
}

export async function onRequestPatch({ request, params, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    if (Array.isArray(body.manualRoster)) {
      const before = await getMatch(env, params.matchId);
      const match = await updateMatchManualRoster(env, params.matchId, body.manualRoster);
      if (!match) return json({ error: "比赛不存在" }, { status: 404 });
      await logAuditAction(env, {
        action: "manual_roster",
        matchId: params.matchId,
        actor: "管理员",
        summary: `手动补全阵容：玩家库命中 ${match.registered}/${match.total}`,
        details: { previousStatus: before?.status, rows: body.manualRoster.length, registered: match.registered, total: match.total },
      });
      return json({ match, matches: await getMatches(env), auditLogs: await getAuditLogs(env), detail: await getMatchDetail(env, params.matchId), message: "已保存手动补全阵容" });
    }
    if (body.winnerSide) {
      const before = await getMatch(env, params.matchId);
      const match = await updateMatchWinner(env, params.matchId, body.winnerSide);
      if (!match) return json({ error: "比赛不存在" }, { status: 404 });
      await logAuditAction(env, {
        action: "set_winner",
        matchId: params.matchId,
        actor: "管理员",
        summary: `手动指定 ${body.winnerSide} 胜`,
        details: { previousStatus: before?.status, winnerSide: body.winnerSide },
      });
      return json({ match, matches: await getMatches(env), auditLogs: await getAuditLogs(env), message: `已手动指定${body.winnerSide}胜` });
    }
    const status = body.status;
    if (!["待确认", "已确认", "已入库", "已驳回"].includes(status)) return json({ error: "比赛状态无效" }, { status: 400 });
    if (status === "已入库") {
      const currentMatch = await getMatch(env, params.matchId);
      const players = currentMatch?.registeredPlayers || [];
      const hasUnknownResult = players.some((player) => typeof player.result !== "boolean");
      if (!players.length || hasUnknownResult) {
        return json({ error: "这场比赛还没有明确胜负，暂不能入库计分。请等待 OpenDota/Steam 返回完整详情，或后续添加手动胜负修正。" }, { status: 400 });
      }
    }
    const before = await getMatch(env, params.matchId);
    const match = await updateMatchStatus(env, params.matchId, status);
    const actionByStatus = {
      待确认: "restore_match",
      已确认: before?.status === "已入库" ? "rollback_match" : "confirm_match",
      已入库: "store_match",
      已驳回: "reject_match",
    };
    await logAuditAction(env, {
      action: actionByStatus[status] || "update_match_status",
      matchId: params.matchId,
      actor: "管理员",
      summary: `${before?.status || "未知"} -> ${status}`,
      details: { previousStatus: before?.status, nextStatus: status },
    });
    return json({ match, matches: await getMatches(env), auditLogs: await getAuditLogs(env) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "更新比赛状态失败" }, { status: 500 });
  }
}
