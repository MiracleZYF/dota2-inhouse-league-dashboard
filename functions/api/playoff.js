import {
  bindPlayoffMatch,
  clearPlayoffGame,
  ensureDatabase,
  getAuditLogs,
  getLeagueSlugFromRequest,
  getPlayoffState,
  json,
  logAuditAction,
  readJson,
  requireAdmin,
  resetPlayoffState,
  updatePlayoffTeams,
  withLeague,
} from "../_lib/dota.js";

export async function onRequestGet({ request, env }) {
  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    return json({ playoff: await getPlayoffState(scopedEnv) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "读取淘汰赛状态失败" }, { status: 500 });
  }
}

export async function onRequestPut({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    const body = await readJson(request);
    const action = String(body.action || "").trim();
    let playoff;
    let auditAction = "update_playoff";
    let summary = "更新淘汰赛状态";
    let matchId = "";
    let details = {};

    if (action === "save_teams") {
      playoff = await updatePlayoffTeams(scopedEnv, body.teams || []);
      auditAction = "save_playoff_teams";
      summary = `保存淘汰赛分队：${playoff.teams.length} 支队伍`;
      details = { teams: playoff.teams.map((team) => ({ id: team.id, seed: team.seed, name: team.name, size: team.players.length })) };
    } else if (action === "bind_match") {
      playoff = await bindPlayoffMatch(scopedEnv, body);
      auditAction = "bind_playoff_match";
      summary = `收录 Match ID ${body.matchId} 到淘汰赛 ${body.seriesKey} G${body.gameNumber}`;
      matchId = body.matchId;
      details = {
        seriesKey: body.seriesKey,
        gameNumber: body.gameNumber,
        radiantTeamId: body.radiantTeamId,
        direTeamId: body.direTeamId,
      };
    } else if (action === "clear_game") {
      playoff = await clearPlayoffGame(scopedEnv, body);
      auditAction = "clear_playoff_game";
      summary = `清除淘汰赛 ${body.seriesKey} G${body.gameNumber}`;
      details = { seriesKey: body.seriesKey, gameNumber: body.gameNumber };
    } else if (action === "reset") {
      playoff = await resetPlayoffState(scopedEnv);
      auditAction = "reset_playoff";
      summary = "重置淘汰赛状态";
    } else {
      return json({ error: "淘汰赛操作无效" }, { status: 400 });
    }

    await logAuditAction(scopedEnv, {
      action: auditAction,
      matchId,
      actor: "管理员",
      summary,
      details,
    });

    return json({
      playoff,
      auditLogs: await getAuditLogs(scopedEnv),
      message: summary,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "保存淘汰赛状态失败" }, { status: 500 });
  }
}
