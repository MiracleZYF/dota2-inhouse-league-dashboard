import {
  buildMatchFromDetail,
  createPendingMatch,
  ensureDatabase,
  getMatch,
  getMatches,
  getPlayers,
  getSettings,
  json,
  openDotaFetch,
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
    let match = existing || createPendingMatch(matchId, "管理员手动添加；已加入识别队列，正在尝试读取 OpenDota 详情。");
    let detail = null;
    let parseRequested = false;
    let parsed = false;
    let message = existing ? `Match ID ${matchId} 已在识别队列中，已尝试重新识别。` : `Match ID ${matchId} 已加入候选队列。`;

    const response = await openDotaFetch(env, `/matches/${matchId}`);
    if (response.ok) {
      detail = await response.json();
      const players = await getPlayers(env);
      const settings = await getSettings(env);
      const analyzed = buildMatchFromDetail(match, detail, players, settings);
      match = await upsertMatch(env, analyzed, { preserveStatus: false });
      parsed = true;
      message = `${message} 已识别：${analyzed.score}，${analyzed.sides}。`;
    } else {
      if (response.status === 404) {
        await openDotaFetch(env, `/request/${matchId}`, { method: "POST" });
        parseRequested = true;
        match = await upsertMatch(
          env,
          {
            ...match,
            score: "已请求解析",
            notes: "OpenDota 暂未返回这场比赛详情，已提交解析请求；稍后点击查看可重新识别。",
          },
          { preserveStatus: false },
        );
        message = `${message} OpenDota 暂未收录，已提交解析请求。`;
      } else {
        match = await upsertMatch(
          env,
          {
            ...match,
            score: "待解析",
            notes: `OpenDota 暂时无法读取这场比赛详情（HTTP ${response.status}），稍后可点击查看重试。`,
          },
          { preserveStatus: false },
        );
        message = `${message} OpenDota 返回 HTTP ${response.status}，稍后可重试。`;
      }
    }

    return json({
      match,
      detail,
      matches: await getMatches(env),
      duplicated: Boolean(existing),
      parsed,
      parseRequested,
      message,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "手动加入比赛失败" }, { status: 500 });
  }
}
