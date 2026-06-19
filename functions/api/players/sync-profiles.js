import { ensureDatabase, getLeagueSlugFromRequest, json, readJson, requireAdmin, syncPlayerProfiles, withLeague } from "../../_lib/dota.js";

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(number, min), max);
}

export async function onRequestPost({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const leagueSlug = getLeagueSlugFromRequest(request);
    const scopedEnv = withLeague(env, leagueSlug);
    const body = await readJson(request);
    const limit = clampNumber(body.limit, 45, 1, 80);
    const throttleMs = clampNumber(body.throttleMs, 850, 250, 3000);
    const result = await syncPlayerProfiles(scopedEnv, { limit, throttleMs, retryAttempts: 2 });

    return json(result);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "同步玩家资料失败" }, { status: 500 });
  }
}
