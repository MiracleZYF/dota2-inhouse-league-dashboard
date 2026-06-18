import {
  buildMatchFromDetail,
  createPendingMatch,
  ensureDatabase,
  getMatch,
  getMatches,
  getPlayers,
  getSettings,
  json,
  fetchMatchDetailWithFallback,
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
    let parseRequested = false;
    let parsed = false;
    let message = existing ? `Match ID ${matchId} 已在识别队列中，已尝试重新识别。` : `Match ID ${matchId} 已加入候选队列。`;

    const lookup = await fetchMatchDetailWithFallback(env, matchId, { requestOpenDotaParse: true, useSteam: true });
    if (lookup.ok) {
      detail = lookup.detail;
      const players = await getPlayers(env);
      const settings = await getSettings(env);
      const analyzed = buildMatchFromDetail(match, detail, players, settings);
      match = await upsertMatch(env, analyzed, { preserveStatus: false });
      parsed = true;
      const sourceName = lookup.source === "steam" ? "Steam Web API" : "OpenDota";
      const leagueText = detail.leagueid ? `，League ID ${detail.leagueid}` : "";
      message = `${message} 已通过 ${sourceName} 识别：${analyzed.score}，${analyzed.sides}${leagueText}。`;
    } else {
      parseRequested = lookup.parseRequested;
      const score = parseRequested ? "已请求解析" : "待解析";
      const notes = `${lookup.error || "数据源暂未返回这场比赛详情"}；稍后点击查看可重新识别。`;
      match = await upsertMatch(env, { ...match, score, notes }, { preserveStatus: false });
      message = `${message} ${notes}`;
    }

    return json({
      match,
      detail,
      matches: await getMatches(env),
      duplicated: Boolean(existing),
      parsed,
      parseRequested,
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
