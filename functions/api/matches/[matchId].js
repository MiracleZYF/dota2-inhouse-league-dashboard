import {
  buildMatchFromDetail,
  createPendingMatch,
  ensureDatabase,
  getMatch,
  getMatches,
  getPlayers,
  json,
  openDotaFetch,
  readJson,
  requireAdmin,
  getSettings,
  updateMatchStatus,
  upsertMatch,
} from "../../_lib/dota.js";

export async function onRequestGet({ params, env }) {
  const matchId = String(params.matchId || "").trim();
  try {
    await ensureDatabase(env);
    const existingMatch = await getMatch(env, matchId);
    const currentMatch = existingMatch || createPendingMatch(matchId);

    const response = await openDotaFetch(env, `/matches/${matchId}`);
    if (!response.ok) {
      let match = currentMatch;
      let parseRequested = false;
      if (response.status === 404 && existingMatch) {
        await openDotaFetch(env, `/request/${matchId}`, { method: "POST" });
        parseRequested = true;
        match = await upsertMatch(
          env,
          {
            ...currentMatch,
            score: "已请求解析",
            notes: "OpenDota 暂未返回这场比赛详情，已提交解析请求；稍后重新查看即可重试。",
          },
          { preserveStatus: false },
        );
      }
      return json({
        match,
        detail: null,
        matches: await getMatches(env),
        parseRequested,
        error: `OpenDota HTTP ${response.status}`,
      });
    }

    const detail = await response.json();
    const players = await getPlayers(env);
    const settings = await getSettings(env);
    const updatedMatch = buildMatchFromDetail(currentMatch, detail, players, settings);
    const match = existingMatch ? await upsertMatch(env, updatedMatch, { preserveStatus: false }) : updatedMatch;
    return json({ match, detail, analysis: updatedMatch.recognition, matches: await getMatches(env) });
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
