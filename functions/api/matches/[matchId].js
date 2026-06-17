import {
  ensureDatabase,
  getMatch,
  getMatches,
  getPlayers,
  isRankedLadderMatch,
  json,
  openDotaFetch,
  readJson,
  registeredSideSummary,
  requireAdmin,
  resolveMatchPlayers,
  formatMatchTime,
  updateMatchStatus,
  upsertMatch,
} from "../../_lib/dota.js";

export async function onRequestGet({ params, env }) {
  const matchId = String(params.matchId || "").trim();
  try {
    await ensureDatabase(env);
    const currentMatch = (await getMatch(env, matchId)) || {
      id: Number(matchId) || matchId,
      time: "待拉取",
      status: "待确认",
      registeredPlayers: [],
      total: 10,
      registered: 0,
      sides: "-",
      score: "待拉取",
      notes: "管理员手动添加；打开查看后会按 OpenDota 详情和本地玩家库重算命中人数。",
    };

    const response = await openDotaFetch(env, `/matches/${matchId}`);
    if (!response.ok) {
      if (response.status === 404) await openDotaFetch(env, `/request/${matchId}`, { method: "POST" });
      return json({ match: currentMatch, detail: null, matches: await getMatches(env), error: `OpenDota HTTP ${response.status}` }, { status: response.status });
    }

    const detail = await response.json();
    const players = await getPlayers(env);
    const resolvedPlayers = resolveMatchPlayers(currentMatch, detail, players);
    const recognition = registeredSideSummary(resolvedPlayers);
    const rankedLadder = isRankedLadderMatch(detail);
    const updatedMatch = {
      ...currentMatch,
      hidden: rankedLadder,
      isRankedLadder: rankedLadder,
      status: rankedLadder ? "已驳回" : currentMatch.status,
      time: detail.start_time ? formatMatchTime(detail.start_time) : currentMatch.time,
      startTime: detail.start_time || currentMatch.startTime,
      lobbyType: detail.lobby_type,
      gameMode: detail.game_mode,
      registered: recognition.registered,
      total: detail.players?.length || currentMatch.total || 10,
      sides: recognition.sides,
      registeredPlayers: resolvedPlayers
        .filter((player) => player.isRegistered)
        .map((player) => ({
          accountId: player.accountId,
          name: player.name,
          side: player.side,
          playerSlot: player.playerSlot,
          heroId: player.heroId,
          kills: player.kills,
          deaths: player.deaths,
          assists: player.assists,
          result: player.result,
        })),
      score: recognition.registered >= 10 ? "玩家库命中 10" : `玩家库命中 ${recognition.registered}`,
      notes: rankedLadder
        ? "OpenDota 识别为天梯/单排类型，已从内战识别队列隐藏，不计入积分。"
        : recognition.registered >= 10
          ? "OpenDota 详情与本地玩家库匹配到 10 人，可按完整内战复核。"
          : `OpenDota 详情与本地玩家库匹配到 ${recognition.registered} 人；若实际群友更多，需要补充对应 DOTA2 ID 后重算。`,
      detail,
    };
    const match = await upsertMatch(env, updatedMatch, { preserveStatus: false });
    return json({ match, detail, matches: await getMatches(env) });
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
    const status = body.status;
    if (!["待确认", "已确认", "已入库", "已驳回"].includes(status)) return json({ error: "比赛状态无效" }, { status: 400 });
    const match = await updateMatchStatus(env, params.matchId, status);
    return json({ match, matches: await getMatches(env) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "更新比赛状态失败" }, { status: 500 });
  }
}
