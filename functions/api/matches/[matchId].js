import {
  buildMatchFromDetail,
  buildSteamHistoryDetail,
  createPendingMatch,
  ensureDatabase,
  getMatch,
  getMatchDetail,
  getMatches,
  getPlayers,
  json,
  fetchMatchDetailWithFallback,
  readJson,
  requireAdmin,
  getSettings,
  getSteamLeagueMatches,
  updateMatchStatus,
  updateMatchWinner,
  upsertMatch,
} from "../../_lib/dota.js";

async function getLeagueHistoryFallback(env, matchId, settings) {
  const leagueId = String(settings?.leagueId || "").trim();
  if (!leagueId || !settings?.useLeagueScan) return { detail: null, error: "" };
  const leagueResult = await getSteamLeagueMatches(env, leagueId);
  if (!leagueResult.ok) return { detail: null, error: leagueResult.error || "Steam 联赛列表暂不可用" };
  const leagueMatch = (leagueResult.matches || []).find((match) => String(match.match_id) === String(matchId));
  if (!leagueMatch) return { detail: null, error: `Steam 联赛 ${leagueId} 最近记录中未找到该 Match ID` };
  return { detail: buildSteamHistoryDetail(leagueMatch, leagueId), error: "" };
}

async function refreshMatch(env, matchId, { resetReviewStatus = false } = {}) {
  const existingMatch = await getMatch(env, matchId);
  const currentMatch = existingMatch || createPendingMatch(matchId);
  const players = await getPlayers(env);
  const settings = await getSettings(env);
  const lookup = await fetchMatchDetailWithFallback(env, matchId, {
    requestOpenDotaParse: resetReviewStatus || Boolean(existingMatch),
    useSteam: resetReviewStatus || Boolean(existingMatch),
  });

  if (lookup.ok) {
    const baseMatch = resetReviewStatus && currentMatch.status !== "已入库" ? { ...currentMatch, status: "待确认", hidden: false, isRankedLadder: false } : currentMatch;
    const updatedMatch = buildMatchFromDetail(baseMatch, lookup.detail, players, settings);
    const match = existingMatch ? await upsertMatch(env, updatedMatch, { preserveStatus: false }) : updatedMatch;
    return {
      match,
      detail: lookup.detail,
      source: lookup.source,
      openDotaStatus: lookup.openDotaStatus,
      steamStatus: lookup.steamStatus,
      parseRequested: lookup.parseRequested,
      message: `已通过 ${lookup.source === "steam" ? "Steam Web API" : "OpenDota"} 刷新比赛详情`,
    };
  }

  const leagueFallback = await getLeagueHistoryFallback(env, matchId, settings);
  const cachedDetail = await getMatchDetail(env, matchId);
  const fallbackDetail = leagueFallback.detail || cachedDetail;
  if (fallbackDetail?.players?.length) {
    const baseMatch = resetReviewStatus && currentMatch.status !== "已入库" ? { ...currentMatch, status: "待确认", hidden: false, isRankedLadder: false } : currentMatch;
    const updatedMatch = buildMatchFromDetail(baseMatch, fallbackDetail, players, settings);
    const match = existingMatch ? await upsertMatch(env, updatedMatch, { preserveStatus: false }) : updatedMatch;
    const source = leagueFallback.detail ? "steam-history" : fallbackDetail.data_source || "cached";
    return {
      match,
      detail: fallbackDetail,
      source,
      openDotaStatus: lookup.openDotaStatus,
      steamStatus: lookup.steamStatus,
      parseRequested: lookup.parseRequested,
      warning: lookup.error,
      message: source === "steam-history" ? "单场详情暂未返回，已用 Steam 联赛列表刷新 10 人阵容" : "单场详情暂未返回，已保留当前缓存阵容",
    };
  }

  let match = currentMatch;
  if (existingMatch) {
    match = await upsertMatch(
      env,
      {
        ...currentMatch,
        score: lookup.parseRequested ? "已请求解析" : "待解析",
        notes: `${lookup.error || "数据源暂未返回这场比赛详情"}；${leagueFallback.error || "稍后重新识别即可重试。"}`,
      },
      { preserveStatus: false },
    );
  }

  return {
    match,
    detail: null,
    source: null,
    openDotaStatus: lookup.openDotaStatus,
    steamStatus: lookup.steamStatus,
    parseRequested: lookup.parseRequested,
    error: lookup.error || leagueFallback.error || `OpenDota HTTP ${lookup.openDotaStatus}`,
    message: "已重新请求解析，但数据源仍未返回完整详情",
  };
}

export async function onRequestGet({ params, env }) {
  const matchId = String(params.matchId || "").trim();
  try {
    await ensureDatabase(env);
    const result = await refreshMatch(env, matchId, { resetReviewStatus: false });
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
    const result = await refreshMatch(env, params.matchId, { resetReviewStatus: true });
    return json({
      ...result,
      matches: await getMatches(env),
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
