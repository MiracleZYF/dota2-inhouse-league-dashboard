import { DEFAULT_LEAGUE_SLUG, ensureDatabase, getAuditLogs, getLeagueSlugFromRequest, getLeagueSpace, getMatches, getPlayers, getPlayoffState, getRuntimeCapabilities, getSettings, getSyncRuns, json, listLeagueSpaces, withLeague, withPlayoffSeason } from "../_lib/dota.js";

export async function onRequestGet({ request, env }) {
  try {
    await ensureDatabase(env);
    const url = new URL(request.url);
    const origin = url.origin;
    const leagueSlug = getLeagueSlugFromRequest(request);
    const scopedEnv = withLeague(env, leagueSlug);
    const leagueSpace = await getLeagueSpace(env, leagueSlug, { origin });
    const leagues = await listLeagueSpaces(env, { origin });

    const [players, matches, settings, syncRuns, auditLogs] = await Promise.all([getPlayers(scopedEnv), getMatches(scopedEnv), getSettings(scopedEnv), getSyncRuns(scopedEnv), getAuditLogs(scopedEnv)]);
    const seasons = Array.isArray(settings?.seasons) ? settings.seasons : [];
    const playoffs = Object.fromEntries(await Promise.all(seasons.map(async (season) => [season.id, await getPlayoffState(withPlayoffSeason(scopedEnv, season.id))])));
    const playoff = playoffs[settings?.currentSeasonId] || await getPlayoffState(withPlayoffSeason(scopedEnv, settings?.currentSeasonId));
    return json({
      players,
      matches,
      settings,
      syncRuns,
      auditLogs,
      playoff,
      playoffs,
      leagueSpace: leagueSpace || null,
      leagues,
      meta: {
        backend: "cloudflare-d1",
        loadedAt: new Date().toISOString(),
        leagueSlug,
        dataMode: leagueSlug === DEFAULT_LEAGUE_SLUG ? "default-space" : "isolated-space",
        capabilities: getRuntimeCapabilities(env),
      },
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "D1 初始化失败" }, { status: 500 });
  }
}
