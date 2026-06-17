import { ensureDatabase, getMatches, getPlayers, getSettings, json } from "../_lib/dota.js";

export async function onRequestGet({ env }) {
  try {
    await ensureDatabase(env);
    const [players, matches, settings] = await Promise.all([getPlayers(env), getMatches(env), getSettings(env)]);
    return json({
      players,
      matches,
      settings,
      meta: {
        backend: "cloudflare-d1",
        loadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "D1 初始化失败" }, { status: 500 });
  }
}
