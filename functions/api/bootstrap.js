import { ensureDatabase, getAuditLogs, getMatches, getPlayers, getSettings, getSyncRuns, json } from "../_lib/dota.js";

export async function onRequestGet({ env }) {
  try {
    await ensureDatabase(env);
    const [players, matches, settings, syncRuns, auditLogs] = await Promise.all([getPlayers(env), getMatches(env), getSettings(env), getSyncRuns(env), getAuditLogs(env)]);
    return json({
      players,
      matches,
      settings,
      syncRuns,
      auditLogs,
      meta: {
        backend: "cloudflare-d1",
        loadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "D1 初始化失败" }, { status: 500 });
  }
}
