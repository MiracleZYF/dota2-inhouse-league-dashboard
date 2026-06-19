import { createLeagueSpace, ensureDatabase, json, listLeagueSpaces, readJson } from "../_lib/dota.js";

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
