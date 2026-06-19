import { DEFAULT_LEAGUE_SLUG, ensureDatabase, getAuditLogs, getLeagueSlugFromRequest, getLeagueSpace, getMatches, getPlayers, getPlayoffState, getSettings, getSyncRuns, json, listLeagueSpaces, withLeague } from "../_lib/dota.js";

export async function onRequestGet({ request, env }) {
  try {
    await ensureDatabase(env);
    const url = new URL(request.url);
    const origin = url.origin;
    const leagueSlug = getLeagueSlugFromRequest(request);
    const scopedEnv = withLeague(env, leagueSlug);
    const leagueSpace = await getLeagueSpace(env, leagueSlug, { origin });
    const leagues = await listLeagueSpaces(env, { origin });

    const [players, matches, settings, syncRuns, auditLogs, playoff] = await Promise.all([getPlayers(scopedEnv), getMatches(scopedEnv), getSettings(scopedEnv), getSyncRuns(scopedEnv), getAuditLogs(scopedEnv), getPlayoffState(scopedEnv)]);
    return json({
      players,
      matches,
      settings,
      syncRuns,
      auditLogs,
      playoff,
      leagueSpace: leagueSpace || null,
      leagues,
      meta: {
        backend: "cloudflare-d1",
        loadedAt: new Date().toISOString(),
        leagueSlug,
        dataMode: leagueSlug === DEFAULT_LEAGUE_SLUG ? "default-space" : "isolated-space",
      },
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "D1 初始化失败" }, { status: 500 });
  }
}
