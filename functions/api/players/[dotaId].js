import { ensureDatabase, getPlayers, json, readJson, requireAdmin, updatePlayer } from "../../_lib/dota.js";

export async function onRequestPatch({ request, params, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const dotaId = String(params.dotaId || "").trim();
    if (!/^\d+$/.test(dotaId)) return json({ error: "DOTA2 ID 无效" }, { status: 400 });

    const body = await readJson(request);
    const player = await updatePlayer(env, dotaId, {
      ...body,
      status: body.status || "资料已手动修正",
      profileError: "",
    });
    if (!player) return json({ error: "玩家不存在" }, { status: 404 });

    return json({
      player,
      players: await getPlayers(env),
      message: `${player.name} 的玩家资料已保存。`,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "更新玩家失败" }, { status: 500 });
  }
}
