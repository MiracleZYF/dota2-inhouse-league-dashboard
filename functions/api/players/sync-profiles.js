import { ensureDatabase, getPlayers, isPlaceholderPlayerName, json, openDotaFetch, requireAdmin } from "../../_lib/dota.js";

function formatProfileSyncTime(date = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(/\//g, "-");
}

export async function onRequestPost({ request, env }) {
  const authError = requireAdmin(request, env);
  if (authError) return authError;

  try {
    await ensureDatabase(env);
    const roster = await getPlayers(env);
    const results = [];

    for (const player of roster) {
      const dotaId = String(player.dotaId || "").trim();
      if (!/^\d+$/.test(dotaId)) {
        results.push({ id: player.id, ok: false, error: "DOTA2 ID 无效" });
        continue;
      }

      try {
        const response = await openDotaFetch(env, `/players/${dotaId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const profile = data?.profile || {};
        const gameName = String(profile.personaname || "").trim();
        if (!gameName) throw new Error("未返回游戏昵称");
        results.push({
          id: player.id,
          ok: true,
          name: isPlaceholderPlayerName(player.name) ? gameName : player.name,
          gameName,
          avatarUrl: profile.avatarfull || profile.avatarmedium || profile.avatar || "",
          profileUrl: profile.profileurl || "",
        });
      } catch (error) {
        results.push({ id: player.id, ok: false, error: error instanceof Error ? error.message : "请求失败" });
      }
    }

    const syncedAt = formatProfileSyncTime();
    const statements = results.map((result) => {
      if (!result.ok) {
        return env.DB.prepare(`UPDATE players
          SET profile_error = ?, status = CASE WHEN public_data = 1 THEN '资料保留，重试失败' ELSE '资料同步失败' END, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`)
          .bind(result.error, result.id);
      }

      return env.DB.prepare(`UPDATE players
        SET name = ?, game_name = ?, avatar_url = ?, profile_url = ?, profile_synced_at = ?, profile_error = '', public_data = 1, status = '资料已同步', updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`)
        .bind(result.name, result.gameName, result.avatarUrl, result.profileUrl, syncedAt, result.id);
    });
    if (statements.length) await env.DB.batch(statements);

    const successCount = results.filter((result) => result.ok).length;
    const failedCount = results.length - successCount;
    return json({
      players: await getPlayers(env),
      successCount,
      failedCount,
      message: `同步完成：${successCount} 个成功，${failedCount} 个失败。已有群昵称已保留，占位昵称已用游戏昵称补齐。`,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "同步玩家资料失败" }, { status: 500 });
  }
}
