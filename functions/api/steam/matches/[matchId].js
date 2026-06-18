import { getSteamMatchDetail, json, requireAdmin } from "../../../_lib/dota.js";

export async function onRequestGet({ request, params, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  const matchId = String(params.matchId || "").trim();
  if (!/^\d+$/.test(matchId)) return json({ error: "Match ID 无效" }, { status: 400 });

  try {
    const result = await getSteamMatchDetail(env, matchId);
    if (!result.ok) {
      return json(
        {
          ok: false,
          status: result.status,
          error: result.error,
        },
        { status: result.status && result.status >= 400 ? result.status : 502 },
      );
    }

    const detail = result.detail;
    return json({
      ok: true,
      source: "steam",
      status: result.status,
      summary: {
        matchId: detail.match_id,
        leagueId: detail.leagueid || 0,
        lobbyType: detail.lobby_type,
        gameMode: detail.game_mode,
        startTime: detail.start_time,
        duration: detail.duration,
        radiantWin: detail.radiant_win,
        players: detail.players?.length || 0,
      },
      detail,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Steam API 诊断失败" }, { status: 500 });
  }
}
