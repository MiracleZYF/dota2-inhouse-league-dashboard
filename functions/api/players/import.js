import { ensureDatabase, getLeagueSlugFromRequest, getPlayers, json, readJson, replacePlayers, requireAdmin, upsertPlayers, withLeague } from "../../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    const body = await readJson(request);
    const importedPlayers = Array.isArray(body.players) ? body.players : [];
    if (!importedPlayers.length) return json({ error: "没有可导入的玩家" }, { status: 400 });
    const players = body.replace ? await replacePlayers(scopedEnv, importedPlayers) : await upsertPlayers(scopedEnv, importedPlayers);
    return json({ players, message: body.replace ? `已用 ${importedPlayers.length} 名玩家替换当前玩家库。` : `已导入 ${importedPlayers.length} 名玩家。` });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "导入玩家失败" }, { status: 500 });
  }
}

export async function onRequestGet({ request, env }) {
  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    return json({ players: await getPlayers(scopedEnv) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "读取玩家失败" }, { status: 500 });
  }
}
