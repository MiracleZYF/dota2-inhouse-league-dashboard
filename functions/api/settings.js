import { ensureDatabase, getLeagueSlugFromRequest, getSettings, json, readJson, requireAdmin, saveSettings, withLeague } from "../_lib/dota.js";

export async function onRequestGet({ request, env }) {
  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    return json({ settings: await getSettings(scopedEnv) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "读取设置失败" }, { status: 500 });
  }
}

export async function onRequestPut({ request, env }) {
  const authError = await requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const scopedEnv = withLeague(env, getLeagueSlugFromRequest(request));
    const body = await readJson(request);
    const settings = await saveSettings(scopedEnv, body.settings || body);
    return json({ settings });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "保存设置失败" }, { status: 500 });
  }
}
