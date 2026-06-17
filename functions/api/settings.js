import { ensureDatabase, getSettings, json, readJson, requireAdmin, saveSettings } from "../_lib/dota.js";

export async function onRequestGet({ env }) {
  try {
    await ensureDatabase(env);
    return json({ settings: await getSettings(env) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "读取设置失败" }, { status: 500 });
  }
}

export async function onRequestPut({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const body = await readJson(request);
    const settings = await saveSettings(env, body.settings || body);
    return json({ settings });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "保存设置失败" }, { status: 500 });
  }
}
