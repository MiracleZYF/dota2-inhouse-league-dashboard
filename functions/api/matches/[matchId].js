import {
  buildMatchFromDetail,
  createPendingMatch,
  ensureDatabase,
  getMatch,
  getMatches,
  getPlayers,
  json,
  fetchMatchDetailWithFallback,
  readJson,
  requireAdmin,
  getSettings,
  updateMatchStatus,
  updateMatchWinner,
  upsertMatch,
} from "../../_lib/dota.js";

export async function onRequestGet({ params, env }) {
  const matchId = String(params.matchId || "").trim();
  try {
    await ensureDatabase(env);
    const existingMatch = await getMatch(env, matchId);
    const currentMatch = existingMatch || createPendingMatch(matchId);
    const lookup = await fetchMatchDetailWithFallback(env, matchId, {
      requestOpenDotaParse: Boolean(existingMatch),
      useSteam: Boolean(existingMatch),
    });

    if (!lookup.ok) {
      let match = currentMatch;
      if (existingMatch) {
        match = await upsertMatch(
          env,
          {
            ...currentMatch,
            score: lookup.parseRequested ? "已请求解析" : "待解析",
            notes: `${lookup.error || "数据源暂未返回这场比赛详情"}；稍后重新查看即可重试。`,
          },
          { preserveStatus: false },
        );
      }
      return json({
        match,
        detail: null,
        matches: await getMatches(env),
        parseRequested: lookup.parseRequested,
        openDotaStatus: lookup.openDotaStatus,
        steamStatus: lookup.steamStatus,
        error: lookup.error || `OpenDota HTTP ${lookup.openDotaStatus}`,
      });
    }

    const detail = lookup.detail;
    const players = await getPlayers(env);
    const settings = await getSettings(env);
    const updatedMatch = buildMatchFromDetail(currentMatch, detail, players, settings);
    const match = existingMatch ? await upsertMatch(env, updatedMatch, { preserveStatus: false }) : updatedMatch;
    return json({
      match,
      detail,
      analysis: updatedMatch.recognition,
      matches: await getMatches(env),
      source: lookup.source,
      openDotaStatus: lookup.openDotaStatus,
      steamStatus: lookup.steamStatus,
      parseRequested: lookup.parseRequested,
      leagueId: detail?.leagueid || 0,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "读取比赛详情失败" }, { status: 500 });
  }
}

export async function onRequestPatch({ request, params, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    if (body.winnerSide) {
      const match = await updateMatchWinner(env, params.matchId, body.winnerSide);
      if (!match) return json({ error: "比赛不存在" }, { status: 404 });
      return json({ match, matches: await getMatches(env), message: `已手动指定${body.winnerSide}胜` });
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
    const match = await updateMatchStatus(env, params.matchId, status);
    return json({ match, matches: await getMatches(env) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "更新比赛状态失败" }, { status: 500 });
  }
}
