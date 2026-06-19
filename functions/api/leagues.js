import { createLeagueSpace, ensureDatabase, getLeagueSlugFromRequest, json, listLeagueSpaces, logAuditAction, readJson, requireAdmin, updateLeagueSpace, withLeague } from "../_lib/dota.js";

export async function onRequestGet({ request, env }) {
  try {
    await ensureDatabase(env);
    const url = new URL(request.url);
    return json({ leagues: await listLeagueSpaces(env, { origin: url.origin }) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "读取联赛空间失败" }, { status: 500 });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    await ensureDatabase(env);
    const url = new URL(request.url);
    const body = await readJson(request);
    const league = await createLeagueSpace(env, body, { origin: url.origin });
    return json({
      league,
      message: "联赛空间已创建",
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "创建联赛空间失败" }, { status: 400 });
  }
}

export async function onRequestPut({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const url = new URL(request.url);
    const leagueSlug = getLeagueSlugFromRequest(request);
    const body = await readJson(request);
    const league = await updateLeagueSpace(env, leagueSlug, body, { origin: url.origin });
    const scopedEnv = withLeague(env, leagueSlug);
    await logAuditAction(scopedEnv, {
      action: "league_settings_update",
      summary: body.resetAdminKey ? "更新联赛空间资料并重置管理密码" : "更新联赛空间资料",
      details: {
        name: league.name,
        ownerName: league.ownerName,
        contact: league.contact,
        status: league.status,
        leagueId: league.settings?.leagueId || "",
        resetAdminKey: Boolean(body.resetAdminKey),
      },
    });
    return json({
      league,
      leagues: await listLeagueSpaces(env, { origin: url.origin }),
      message: body.resetAdminKey ? "联赛空间已保存，新管理密码只显示这一次" : "联赛空间已保存",
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "保存联赛空间失败" }, { status: 400 });
  }
}
