import {
  buildCandidatesFromLeagueMatches,
  buildCandidatesFromRecentMatches,
  ensureDatabase,
  getMatches,
  getPlayers,
  getSettings,
  getSteamLeagueMatches,
  json,
  mergeMatchCandidates,
  openDotaFetch,
  readJson,
  requireAdmin,
  upsertMatch,
} from "../_lib/dota.js";

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    const players = await getPlayers(env);
    const settings = { ...(await getSettings(env)), ...(body.settings || {}) };
    const dateRange = body.dateRange || {};
    const leagueId = String(body.leagueId || settings.leagueId || "").trim();
    let leagueCandidates = [];
    let leagueScan = {
      enabled: Boolean(settings.useLeagueScan && leagueId),
      leagueId,
      fetched: 0,
      candidateCount: 0,
      failed: false,
      error: "",
    };

    if (leagueScan.enabled) {
      const leagueResult = await getSteamLeagueMatches(env, leagueId);
      if (leagueResult.ok) {
        leagueScan = {
          ...leagueScan,
          fetched: leagueResult.matches.length,
          totalResults: leagueResult.totalResults,
          resultsRemaining: leagueResult.resultsRemaining,
        };
        leagueCandidates = buildCandidatesFromLeagueMatches(players, leagueResult.matches, dateRange, settings, leagueId);
        leagueScan.candidateCount = leagueCandidates.length;
      } else {
        leagueScan = {
          ...leagueScan,
          failed: true,
          error: leagueResult.error || "Steam 联赛房扫描失败",
        };
      }
    }

    const results = await Promise.allSettled(
      players.map(async (player) => {
        const response = await openDotaFetch(env, `/players/${player.dotaId}/recentMatches`);
        if (!response.ok) throw new Error(`${player.name} 拉取失败 ${response.status}`);
        const recentMatches = await response.json();
        return recentMatches.map((match) => ({ player, match }));
      }),
    );

    const recentRows = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
    const failedCount = results.filter((result) => result.status === "rejected").length;
    const recentCandidates = buildCandidatesFromRecentMatches(players, recentRows, dateRange, settings);
    const candidates = mergeMatchCandidates([...leagueCandidates, ...recentCandidates]);
    const existingIds = new Set((await getMatches(env)).map((match) => String(match.id)));
    const newCandidates = candidates.filter((match) => !existingIds.has(String(match.id)));

    for (const match of newCandidates) {
      await upsertMatch(env, match, { preserveStatus: false });
    }

    const duplicatedCount = candidates.length - newCandidates.length;
    const sourceDuplicateCount = leagueCandidates.length + recentCandidates.length - candidates.length;
    const leagueMessage = leagueScan.enabled
      ? `联赛房 ${leagueId} 扫到 ${leagueScan.fetched} 场，命中 ${leagueScan.candidateCount} 场`
      : "未启用联赛房扫描";
    return json({
      matches: await getMatches(env),
      newCandidates,
      failedCount,
      duplicatedCount,
      sourceDuplicateCount,
      leagueScan,
      leagueId,
      leagueCandidateCount: leagueCandidates.length,
      recentCandidateCount: recentCandidates.length,
      message: `${newCandidates.length} 新增，${duplicatedCount} 重复已跳过；${leagueMessage}${leagueScan.failed ? `（${leagueScan.error}）` : ""}`,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "同步比赛失败" }, { status: 500 });
  }
}
