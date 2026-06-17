import { ensureDatabase, getMatches, json, readJson, requireAdmin, upsertMatch } from "../../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    const matchId = String(body.matchId || "").trim();
    if (!matchId) return json({ error: "Match ID 不能为空" }, { status: 400 });

    const existingIds = new Set((await getMatches(env)).map((match) => String(match.id)));
    if (!existingIds.has(matchId)) {
      await upsertMatch(
        env,
        {
          id: Number(matchId) || matchId,
          time: "刚刚",
          registered: 0,
          total: 10,
          sides: "-",
          status: "待确认",
          score: "待拉取",
          notes: "管理员手动添加；打开查看后会按 OpenDota 详情和本地玩家库重算命中人数。",
          registeredPlayers: [],
        },
        { preserveStatus: false },
      );
    }

    return json({
      matches: await getMatches(env),
      duplicated: existingIds.has(matchId),
      message: existingIds.has(matchId) ? `Match ID ${matchId} 已在识别队列中，已跳过去重。` : `Match ID ${matchId} 已加入候选队列。`,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "手动加入比赛失败" }, { status: 500 });
  }
}
