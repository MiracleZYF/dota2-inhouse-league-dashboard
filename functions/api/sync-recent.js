import {
  ensureDatabase,
  getMatches,
  json,
  readJson,
  requireAdmin,
  syncRecentMatches,
} from "../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    const result = await syncRecentMatches(env, {
      dateRange: body.dateRange || {},
      settingsOverride: body.settings || {},
    });

    return json({
      ...result,
      matches: await getMatches(env),
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "同步比赛失败" }, { status: 500 });
  }
}
