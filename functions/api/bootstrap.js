import { DEFAULT_LEAGUE_SLUG, ensureDatabase, getAuditLogs, getLeagueSpace, getMatches, getPlayers, getPlayoffState, getSettings, getSyncRuns, json, listLeagueSpaces, normalizeLeagueSlug } from "../_lib/dota.js";

export async function onRequestGet({ request, env }) {
  try {
    await ensureDatabase(env);
    const url = new URL(request.url);
    const origin = url.origin;
    const leagueSlug = normalizeLeagueSlug(url.searchParams.get("league"), DEFAULT_LEAGUE_SLUG);
    const leagueSpace = await getLeagueSpace(env, leagueSlug, { origin });
    const leagues = await listLeagueSpaces(env, { origin });

    if (leagueSpace && !leagueSpace.dataReady) {
      return json({
        players: [],
        matches: [],
        settings: leagueSpace.settings,
        syncRuns: [],
        auditLogs: [],
        playoff: { version: 1, status: "drafting", teams: [], games: [], championTeamId: "", runnerUpTeamId: "", updatedAt: "" },
        leagueSpace,
        leagues,
        meta: {
          backend: "cloudflare-d1",
          loadedAt: new Date().toISOString(),
          leagueSlug,
          dataMode: "space-setup",
        },
      });
    }

    const [players, matches, settings, syncRuns, auditLogs, playoff] = await Promise.all([getPlayers(env), getMatches(env), getSettings(env), getSyncRuns(env), getAuditLogs(env), getPlayoffState(env)]);
    return json({
      players,
      matches,
      settings,
      syncRuns,
      auditLogs,
      playoff,
      leagueSpace: leagueSpace || leagues.find((league) => league.slug === DEFAULT_LEAGUE_SLUG) || null,
      leagues,
      meta: {
        backend: "cloudflare-d1",
        loadedAt: new Date().toISOString(),
        leagueSlug,
        dataMode: "default-shared",
      },
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "D1 初始化失败" }, { status: 500 });
  }
}
