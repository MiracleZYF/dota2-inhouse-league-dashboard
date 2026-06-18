const OPENDOTA_BASE_URL = "https://api.opendota.com/api";
const STEAM_DOTA_MATCH_BASE_URL = "https://api.steampowered.com/IDOTA2Match_570";

export const DEFAULT_SETTINGS = {
  seasonName: "S1 积分周期",
  minRegisteredPlayers: 8,
  minCaptainGames: 6,
  winPoints: 10,
  lossPoints: 3,
  autoSync: true,
  allowPartialMatches: true,
  useLeagueScan: true,
  leagueId: "19220",
};

const INITIAL_PLAYERS = [
  { id: 1, name: "果粒橙", dotaId: "155292084", role: "1 / 2", gameName: "我要玩旮旯给木", profileUrl: "https://steamcommunity.com/profiles/76561198115557812/", avatarUrl: "https://avatars.steamstatic.com/43b37b323147bfd12f7ef41a8a9f40cfa384f57e_full.jpg" },
  { id: 2, name: "吴", dotaId: "1255889937", role: "2 / 4", gameName: "pluviophile", profileUrl: "https://steamcommunity.com/profiles/76561199216155665/", avatarUrl: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" },
  { id: 3, name: "为人低调", dotaId: "139203171", role: "3 / 5", gameName: "全自动立功", profileUrl: "https://steamcommunity.com/profiles/76561198099468899/", avatarUrl: "https://avatars.steamstatic.com/9561d6d2da2e4805bc0bc74f88d7856950412c47_full.jpg" },
  { id: 4, name: "鱼人永不败", dotaId: "399825811", role: "1 / 3", gameName: "1ndulge", profileUrl: "https://steamcommunity.com/profiles/76561198360091539/", avatarUrl: "https://avatars.steamstatic.com/182257a09582c4814f37652e387861dd2ac67cc9_full.jpg" },
  { id: 5, name: "Chaibot", dotaId: "79759941", role: "4 / 5", gameName: "ChaiBot★", profileUrl: "https://steamcommunity.com/id/stormchai/", avatarUrl: "https://avatars.steamstatic.com/8f67304c9e5e8d5d63d3ae468abe4966c3225479_full.jpg" },
  { id: 6, name: "QcccE", dotaId: "1041606597", role: "2 / 3", gameName: "GHzQcE", profileUrl: "https://steamcommunity.com/profiles/76561199001872325/", avatarUrl: "https://avatars.steamstatic.com/c0aa7c6eca1b76156941959e3d8ff50efb0cf191_full.jpg" },
  { id: 7, name: "正高", dotaId: "409431719", role: "1 / 2", gameName: "正高", profileUrl: "https://steamcommunity.com/profiles/76561198369697447/", avatarUrl: "https://avatars.steamstatic.com/9369852486ef1143d9453f0164c8ef35a7103a48_full.jpg" },
  { id: 8, name: "吉米", dotaId: "155361267", role: "3 / 4", gameName: "卷毛&吉米.Bilibili", profileUrl: "https://steamcommunity.com/profiles/76561198115626995/", avatarUrl: "https://avatars.steamstatic.com/b118287d839980d742303cee50f726d6d39b1917_full.jpg" },
  { id: 9, name: "茶酒", dotaId: "161822486", role: "1 / 2", gameName: "茶酒", profileUrl: "https://steamcommunity.com/profiles/76561198122088214/", avatarUrl: "https://avatars.steamstatic.com/4b0a7d7b987e9878d82900f8c150ab1b9b7a849f_full.jpg" },
  { id: 10, name: "天下伍酒", dotaId: "253121211", role: "1 / 3", gameName: "天下伍酒（red card）", profileUrl: "https://steamcommunity.com/profiles/76561198213386939/", avatarUrl: "https://avatars.steamstatic.com/8734c268db82dab0d602b9be87c985ba15a03610_full.jpg" },
  { id: 11, name: "别问", dotaId: "139135702", role: "全能", gameName: "别问！学就行", profileUrl: "https://steamcommunity.com/profiles/76561198099401430/", avatarUrl: "https://avatars.steamstatic.com/355575d8bb0d2ec52ee18a112212a6fcc929d833_full.jpg" },
  { id: 12, name: "0v0", dotaId: "948306561", role: "待补", gameName: "0v0", profileUrl: "https://steamcommunity.com/profiles/76561198908572289/", avatarUrl: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" },
  { id: 13, name: "inmost", dotaId: "456880925", role: "2 / 4", gameName: "Inmost", profileUrl: "https://steamcommunity.com/profiles/76561198417146653/", avatarUrl: "https://avatars.steamstatic.com/5fea668694c95ff82c2d9cc2b2afdb06a9d2bbb4_full.jpg" },
  { id: 14, name: "Pupa", dotaId: "237169385", role: "3 / 5", gameName: "Pupa", profileUrl: "https://steamcommunity.com/profiles/76561198197435113/", avatarUrl: "https://avatars.steamstatic.com/be65902c43f582d8c064c0fed73dceaf885b6455_full.jpg" },
  { id: 15, name: "阿均", dotaId: "880277674", role: "4 / 5", gameName: 'American "Free Speech"', profileUrl: "https://steamcommunity.com/profiles/76561198840543402/", avatarUrl: "https://avatars.steamstatic.com/cf514dcf1a4e826e61988ab052f820c3abf3c4e3_full.jpg" },
  { id: 16, name: "焖焖", dotaId: "201599278", role: "2 / 3", gameName: "牢焖", profileUrl: "https://steamcommunity.com/profiles/76561198161865006/", avatarUrl: "https://avatars.steamstatic.com/44aa729ce88eed142dc9877b2a10bcf561b1e785_full.jpg" },
  { id: 17, name: "奶龙抚琴", dotaId: "1512446117", role: "1 / 2", gameName: "Af Am", profileUrl: "https://steamcommunity.com/profiles/76561199472711845/", avatarUrl: "https://avatars.steamstatic.com/c0b7310b0c3568616a989161b86de33d940f37ad_full.jpg" },
  { id: 18, name: "Artol", dotaId: "1742683220", role: "待补", gameName: "Artol", profileUrl: "https://steamcommunity.com/profiles/76561199702948948/", avatarUrl: "https://avatars.steamstatic.com/48b8d8cd5cd35b94299f7951a118f6fff33f891b_full.jpg" },
  { id: 19, name: "Tips", dotaId: "1045578592", role: "3 / 4", gameName: "酒蒙子黄毛体育生卡提", profileUrl: "https://steamcommunity.com/id/tipsong/", avatarUrl: "https://avatars.steamstatic.com/088d1a708489f77ae2a59d4e2c5335d5f45cffae_full.jpg" },
  { id: 20, name: "雨", dotaId: "1241554543", role: "4 / 5", gameName: "雨", profileUrl: "https://steamcommunity.com/profiles/76561199201820271/", avatarUrl: "https://avatars.steamstatic.com/58bd67cf047436f84c8a308c31be95e1e23a809b_full.jpg" },
  { id: 21, name: "哈基马", dotaId: "339743252", role: "1 / 3", gameName: "等我上个马", profileUrl: "https://steamcommunity.com/profiles/76561198300008980/", avatarUrl: "https://avatars.steamstatic.com/752eb38c3b0bc6f74708ec2c3d44d00bda41edde_full.jpg" },
  { id: 22, name: "哈基暴", dotaId: "338957505", role: "3 / 5", gameName: "暴鲤龙的大爷爷", profileUrl: "https://steamcommunity.com/profiles/76561198299223233/", avatarUrl: "https://avatars.steamstatic.com/764f5bf486117c83ed29e5f29e33cd69e583dc29_full.jpg" },
  { id: 23, name: "Zsso_zao", dotaId: "175928804", role: "4 / 5", gameName: "Zsso_zao", profileUrl: "https://steamcommunity.com/profiles/76561198136194532/", avatarUrl: "https://avatars.steamstatic.com/e1edeeccc8320a26774cfabd63467ab9f0a5a6d8_full.jpg" },
  { id: 24, name: "KAMI", dotaId: "133666698", role: "全能", gameName: "能帮我弄干净吗", profileUrl: "https://steamcommunity.com/profiles/76561198093932426/", avatarUrl: "https://avatars.steamstatic.com/198cc4ad9a2c31ad45c4d83d54498df854aedcf4_full.jpg" },
  { id: 25, name: "李斯", dotaId: "403665770", role: "待补", gameName: "李斯", profileUrl: "https://steamcommunity.com/id/798780530/", avatarUrl: "https://avatars.steamstatic.com/af339fcac970b1098c7f3c3bd0107af2645fad59_full.jpg" },
  { id: 26, name: "cheaterbush", dotaId: "448417036", role: "待补", gameName: "cheaterbush", profileUrl: "https://steamcommunity.com/profiles/76561198408682764/", avatarUrl: "https://avatars.steamstatic.com/f9e7e02b28bf8f1f18c07a5e95cb714b795195fd_full.jpg" },
  { id: 27, name: "钢琴家睿达", dotaId: "139291120", role: "待补", gameName: "钢琴家睿达", profileUrl: "https://steamcommunity.com/id/GunyumL/", avatarUrl: "https://avatars.steamstatic.com/bc55afd6180a0aebd83a33fc36da2d534370498e_full.jpg" },
  { id: 28, name: "Kano", dotaId: "139595295", role: "待补", gameName: "Kano", profileUrl: "https://steamcommunity.com/profiles/76561198099861023/", avatarUrl: "https://avatars.steamstatic.com/80f218cad570a586adf3990d20ca8ab664b2e88f_full.jpg" },
  { id: 29, name: "Cherry", dotaId: "1765455118", role: "待补", gameName: "Cherry", profileUrl: "https://steamcommunity.com/profiles/76561199725720846/", avatarUrl: "https://avatars.steamstatic.com/774151f6a68b1a9c34b5248a92b7e842a3fcf3b4_full.jpg" },
  { id: 30, name: "ico", dotaId: "1206359917", role: "待补", gameName: "ico", profileUrl: "https://steamcommunity.com/id/qiubo666/", avatarUrl: "https://avatars.steamstatic.com/b5984ec17651d765dce7eaf215ae6ec9cec268d2_full.jpg" },
];

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function requireAdmin(request, env) {
  const expected = env.ADMIN_TOKEN;
  if (!expected) return json({ error: "ADMIN_TOKEN 未配置" }, { status: 500 });
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : request.headers.get("x-admin-token");
  if (token !== expected) return json({ error: "管理员密码不正确" }, { status: 401 });
  return null;
}

export async function ensureDatabase(env) {
  if (!env.DB) throw new Error("D1 binding DB 未配置");

  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      dota_id TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT '全能',
      game_name TEXT NOT NULL DEFAULT '',
      avatar_url TEXT NOT NULL DEFAULT '',
      profile_url TEXT NOT NULL DEFAULT '',
      profile_synced_at TEXT NOT NULL DEFAULT '',
      profile_error TEXT NOT NULL DEFAULT '',
      public_data INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT '待内战统计',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS matches (
      id TEXT PRIMARY KEY,
      time TEXT NOT NULL DEFAULT '',
      start_time INTEGER,
      lobby_type INTEGER,
      game_mode INTEGER,
      total INTEGER NOT NULL DEFAULT 10,
      status TEXT NOT NULL DEFAULT '待确认',
      score TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      registered INTEGER NOT NULL DEFAULT 0,
      sides TEXT NOT NULL DEFAULT '-',
      hidden INTEGER NOT NULL DEFAULT 0,
      is_ranked_ladder INTEGER NOT NULL DEFAULT 0,
      registered_players_json TEXT NOT NULL DEFAULT '[]',
      detail_json TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_matches_start_time ON matches(start_time)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status)"),
  ]);

  const playerCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM players").first();
  if (!playerCount?.count) {
    const now = new Date().toISOString();
    const statements = INITIAL_PLAYERS.map((player) =>
      env.DB.prepare(`INSERT INTO players
        (id, name, dota_id, role, game_name, avatar_url, profile_url, profile_synced_at, profile_error, public_data, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, '', '', ?, ?, ?, ?)`)
        .bind(
          player.id,
          player.name,
          player.dotaId,
          player.role,
          player.gameName || "",
          player.avatarUrl || "",
          player.profileUrl || "",
          player.gameName ? 1 : 0,
          player.gameName ? "资料已同步" : "待内战统计",
          now,
          now,
        ),
    );
    await env.DB.batch(statements);
  }

  const settingsRow = await env.DB.prepare("SELECT value FROM settings WHERE key = 'league'").first();
  if (!settingsRow) await saveSettings(env, DEFAULT_SETTINGS);
}

export async function getSettings(env) {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = 'league'").first();
  if (!row?.value) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(row.value) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(env, settings) {
  const merged = { ...DEFAULT_SETTINGS, ...(settings || {}) };
  await env.DB.prepare(`INSERT INTO settings (key, value, updated_at)
    VALUES ('league', ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`)
    .bind(JSON.stringify(merged))
    .run();
  return merged;
}

function rowToPlayer(row) {
  return {
    id: row.id,
    name: row.name,
    dotaId: row.dota_id,
    role: row.role,
    gameName: row.game_name || "",
    avatarUrl: row.avatar_url || "",
    profileUrl: row.profile_url || "",
    profileSyncedAt: row.profile_synced_at || "",
    profileError: row.profile_error || "",
    played: 0,
    wins: 0,
    points: 0,
    captain: false,
    publicData: Boolean(row.public_data),
    form: ["-", "-", "-", "-", "-"],
    status: row.status || "待内战统计",
  };
}

export async function getPlayers(env) {
  const result = await env.DB.prepare("SELECT * FROM players ORDER BY id ASC").all();
  return (result.results || []).map(rowToPlayer);
}

export async function upsertPlayers(env, players) {
  const now = new Date().toISOString();
  const currentMax = await env.DB.prepare("SELECT COALESCE(MAX(id), 0) AS max_id FROM players").first();
  const statements = players.map((player, index) => {
    const id = Number(player.id) || Number(currentMax?.max_id || 0) + index + 1;
    const publicData = player.publicData || player.gameName ? 1 : 0;
    return env.DB.prepare(`INSERT INTO players
      (id, name, dota_id, role, game_name, avatar_url, profile_url, profile_synced_at, profile_error, public_data, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(dota_id) DO UPDATE SET
        name = excluded.name,
        role = excluded.role,
        game_name = COALESCE(NULLIF(excluded.game_name, ''), players.game_name),
        avatar_url = COALESCE(NULLIF(excluded.avatar_url, ''), players.avatar_url),
        profile_url = COALESCE(NULLIF(excluded.profile_url, ''), players.profile_url),
        profile_synced_at = COALESCE(NULLIF(excluded.profile_synced_at, ''), players.profile_synced_at),
        profile_error = excluded.profile_error,
        public_data = CASE WHEN excluded.public_data = 1 THEN 1 ELSE players.public_data END,
        status = excluded.status,
        updated_at = excluded.updated_at`)
      .bind(
        id,
        player.name || `新玩家 ${index + 1}`,
        String(player.dotaId || player.dota_id || "").trim(),
        player.role || "全能",
        player.gameName || player.game_name || "",
        player.avatarUrl || player.avatar_url || "",
        player.profileUrl || player.profile_url || "",
        player.profileSyncedAt || player.profile_synced_at || "",
        player.profileError || player.profile_error || "",
        publicData,
        player.status || "待内战统计",
        now,
        now,
      );
  });
  if (statements.length) await env.DB.batch(statements);
  return getPlayers(env);
}

export async function updatePlayer(env, dotaId, patch = {}) {
  const current = await env.DB.prepare("SELECT * FROM players WHERE dota_id = ?").bind(String(dotaId)).first();
  if (!current) return null;

  const name = String(patch.name ?? current.name).trim() || current.name;
  const role = String(patch.role ?? current.role).trim() || current.role;
  const gameName = String(patch.gameName ?? patch.game_name ?? current.game_name ?? "").trim();
  const avatarUrl = String(patch.avatarUrl ?? patch.avatar_url ?? current.avatar_url ?? "").trim();
  const profileUrl = String(patch.profileUrl ?? patch.profile_url ?? current.profile_url ?? "").trim();
  const status = String(patch.status ?? current.status ?? "资料已手动修正").trim() || "资料已手动修正";
  const publicData = gameName || avatarUrl || profileUrl || current.public_data ? 1 : 0;
  const profileSyncedAt = patch.profileSyncedAt ?? patch.profile_synced_at ?? current.profile_synced_at ?? "";
  const profileError = patch.profileError ?? patch.profile_error ?? "";

  await env.DB.prepare(`UPDATE players SET
    name = ?,
    role = ?,
    game_name = ?,
    avatar_url = ?,
    profile_url = ?,
    profile_synced_at = ?,
    profile_error = ?,
    public_data = ?,
    status = ?,
    updated_at = CURRENT_TIMESTAMP
    WHERE dota_id = ?`)
    .bind(name, role, gameName, avatarUrl, profileUrl, profileSyncedAt, profileError, publicData, status, String(dotaId))
    .run();

  const updated = await env.DB.prepare("SELECT * FROM players WHERE dota_id = ?").bind(String(dotaId)).first();
  return rowToPlayer(updated);
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function rowToMatch(row) {
  return {
    id: Number(row.id) || row.id,
    time: row.time || "",
    startTime: row.start_time || undefined,
    lobbyType: row.lobby_type ?? undefined,
    gameMode: row.game_mode ?? undefined,
    total: row.total || 10,
    status: row.status || "待确认",
    score: row.score || "",
    notes: row.notes || "",
    registered: row.registered || 0,
    sides: row.sides || "-",
    hidden: Boolean(row.hidden),
    isRankedLadder: Boolean(row.is_ranked_ladder),
    registeredPlayers: parseJson(row.registered_players_json, []),
  };
}

export async function getMatches(env) {
  const result = await env.DB.prepare("SELECT * FROM matches ORDER BY COALESCE(start_time, 0) DESC, created_at DESC").all();
  return (result.results || []).map(rowToMatch);
}

export async function getMatch(env, matchId) {
  const row = await env.DB.prepare("SELECT * FROM matches WHERE id = ?").bind(String(matchId)).first();
  return row ? rowToMatch(row) : null;
}

export async function getMatchDetail(env, matchId) {
  const row = await env.DB.prepare("SELECT detail_json FROM matches WHERE id = ?").bind(String(matchId)).first();
  return parseJson(row?.detail_json, null);
}

export async function upsertMatch(env, match, { preserveStatus = true } = {}) {
  const existing = await env.DB.prepare("SELECT status FROM matches WHERE id = ?").bind(String(match.id)).first();
  const status = preserveStatus && existing?.status ? existing.status : match.status || "待确认";
  await env.DB.prepare(`INSERT INTO matches
    (id, time, start_time, lobby_type, game_mode, total, status, score, notes, registered, sides, hidden, is_ranked_ladder, registered_players_json, detail_json, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      time = excluded.time,
      start_time = excluded.start_time,
      lobby_type = excluded.lobby_type,
      game_mode = excluded.game_mode,
      total = excluded.total,
      status = excluded.status,
      score = excluded.score,
      notes = excluded.notes,
      registered = excluded.registered,
      sides = excluded.sides,
      hidden = excluded.hidden,
      is_ranked_ladder = excluded.is_ranked_ladder,
      registered_players_json = excluded.registered_players_json,
      detail_json = COALESCE(excluded.detail_json, matches.detail_json),
      updated_at = CURRENT_TIMESTAMP`)
    .bind(
      String(match.id),
      match.time || "",
      match.startTime || null,
      match.lobbyType ?? null,
      match.gameMode ?? null,
      match.total || 10,
      status,
      match.score || "",
      match.notes || "",
      match.registered || 0,
      match.sides || "-",
      match.hidden ? 1 : 0,
      match.isRankedLadder ? 1 : 0,
      JSON.stringify(match.registeredPlayers || []),
      match.detail ? JSON.stringify(match.detail) : null,
    )
    .run();
  return getMatch(env, match.id);
}

export async function updateMatchStatus(env, matchId, status) {
  const notesByStatus = {
    待确认: "管理员已恢复到待确认，可重新识别和复核",
    已确认: "管理员已确认，等待入库计分",
    已入库: "已按当前积分规则完成入库",
    已驳回: "管理员驳回：不满足本期有效内战标准",
  };
  if (status === "待确认") {
    await env.DB.prepare("UPDATE matches SET status = ?, notes = ?, hidden = 0, is_ranked_ladder = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(status, notesByStatus[status], String(matchId))
      .run();
    return getMatch(env, matchId);
  }
  await env.DB.prepare("UPDATE matches SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(status, notesByStatus[status] || "", String(matchId))
    .run();
  return getMatch(env, matchId);
}

export async function updateMatchWinner(env, matchId, winnerSide) {
  if (!["天辉", "夜魇"].includes(winnerSide)) throw new Error("胜方只能选择天辉或夜魇");
  const row = await env.DB.prepare("SELECT registered_players_json, notes FROM matches WHERE id = ?").bind(String(matchId)).first();
  if (!row) return null;
  const registeredPlayers = parseJson(row.registered_players_json, []);
  if (!registeredPlayers.length) throw new Error("这场比赛还没有可修正的命中玩家");
  const nextPlayers = registeredPlayers.map((player) => ({
    ...player,
    result: player.side ? player.side === winnerSide : null,
  }));
  const currentNotes = row.notes || "";
  const cleanNotes = currentNotes.replace(/^管理员手动指定(天辉|夜魇)胜；?/, "");
  const notes = `管理员手动指定${winnerSide}胜；${cleanNotes}`;
  await env.DB.prepare("UPDATE matches SET registered_players_json = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(JSON.stringify(nextPlayers), notes, String(matchId))
    .run();
  return getMatch(env, matchId);
}

export function isPlaceholderPlayerName(name) {
  return !name || /^待补昵称\d*$/i.test(name) || /^新玩家\s*\d+$/i.test(name);
}

function dateTimeValueToSeconds(value, endOfDay = false) {
  if (!value) return NaN;
  const normalized = String(value).includes("T") ? value : `${value}T${endOfDay ? "23:59" : "00:00"}`;
  const time = new Date(normalized).getTime();
  return Number.isFinite(time) ? Math.floor(time / 1000) : NaN;
}

export function getDateRangeSeconds(dateRange) {
  const startSeconds = dateTimeValueToSeconds(dateRange?.start);
  const endSeconds = dateTimeValueToSeconds(dateRange?.end, true);
  return {
    startSeconds,
    endSeconds,
    valid: Number.isFinite(startSeconds) && Number.isFinite(endSeconds) && startSeconds <= endSeconds,
  };
}

export function playerSide(playerSlot) {
  return Number(playerSlot) < 128 ? "天辉" : "夜魇";
}

function hasBooleanWinner(match) {
  return typeof match?.radiant_win === "boolean";
}

function playerWon(side, match) {
  if (!hasBooleanWinner(match)) return null;
  return side === "天辉" ? match.radiant_win : !match.radiant_win;
}

export function isRankedLadderMatch(match) {
  return [6, 7].includes(Number(match?.lobby_type));
}

export function describeLobbyType(lobbyType) {
  const names = {
    "-1": "无效房间",
    0: "普通匹配",
    1: "练习房间",
    2: "锦标赛房间",
    3: "教程",
    4: "合作打电脑",
    5: "组队匹配",
    6: "单排天梯",
    7: "天梯匹配",
    8: "中等机器人",
    9: "勇士联赛",
    12: "活动房间",
  };
  return names[String(lobbyType)] || `房间类型 ${lobbyType ?? "-"}`;
}

export function describeGameMode(gameMode) {
  const names = {
    0: "未知模式",
    1: "全阵营选择",
    2: "队长模式",
    3: "随机征召",
    4: "小黑屋随机",
    5: "全阵营随机",
    12: "生疏模式",
    16: "队长征召",
    18: "技能征召",
    22: "天梯全阵营选择",
    23: "Turbo",
  };
  return names[String(gameMode)] || `模式 ${gameMode ?? "-"}`;
}

export function formatMatchTime(startTime) {
  if (!startTime) return "时间未知";
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(startTime * 1000))
    .replace(/\//g, "-");
}

export async function openDotaFetch(env, path, init) {
  const url = new URL(`${OPENDOTA_BASE_URL}${path}`);
  if (env.OPENDOTA_API_KEY) url.searchParams.set("api_key", env.OPENDOTA_API_KEY);
  return fetch(url.toString(), init);
}

export async function steamDotaFetch(env, method, params = {}, init) {
  if (!env.STEAM_API_KEY) throw new Error("STEAM_API_KEY 未配置");
  const url = new URL(`${STEAM_DOTA_MATCH_BASE_URL}/${method}/v1/`);
  url.searchParams.set("key", env.STEAM_API_KEY);
  url.searchParams.set("format", "json");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  });
  return fetch(url.toString(), init);
}

function parseJsonPayload(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractSteamApiMessage(payload, rawText) {
  const result = payload?.result || payload;
  const candidates = [
    result?.error,
    result?.message,
    result?.statusDetail,
    payload?.error,
    payload?.message,
    typeof result?.status === "number" ? `status=${result.status}` : null,
  ];
  const message = candidates.find((item) => typeof item === "string" && item.trim());
  if (message) return message.trim().replace(/\s+/g, " ").slice(0, 180);
  if (rawText && !payload) return rawText.trim().replace(/\s+/g, " ").slice(0, 180);
  return "";
}

export function normalizeSteamMatchDetail(payload, matchId) {
  const result = payload?.result || payload;
  if (!result || typeof result !== "object" || result.error) return null;
  const players = Array.isArray(result.players) ? result.players : [];
  if (!players.length) return null;

  return {
    ...result,
    match_id: Number(result.match_id || matchId),
    leagueid: Number(result.leagueid || 0),
    lobby_type: result.lobby_type,
    game_mode: result.game_mode,
    radiant_win: hasBooleanWinner(result) ? result.radiant_win : null,
    start_time: result.start_time,
    duration: result.duration,
    data_source: "steam",
    players: players.map((player) => ({
      ...player,
      account_id: player.account_id,
      player_slot: player.player_slot,
      hero_id: player.hero_id,
      kills: player.kills,
      deaths: player.deaths,
      assists: player.assists,
      gold_per_min: player.gold_per_min,
      xp_per_min: player.xp_per_min,
    })),
  };
}

export async function getSteamMatchDetail(env, matchId) {
  if (!env.STEAM_API_KEY) {
    return { ok: false, status: 0, error: "STEAM_API_KEY 未配置" };
  }

  let response;
  let payload = null;
  let rawText = "";
  try {
    response = await steamDotaFetch(env, "GetMatchDetails", { match_id: matchId });
    rawText = await response.text().catch(() => "");
    payload = parseJsonPayload(rawText);
  } catch (error) {
    return { ok: false, status: 0, error: error instanceof Error ? error.message : "Steam API 请求失败" };
  }

  if (!response.ok) {
    const message = extractSteamApiMessage(payload, rawText);
    return {
      ok: false,
      status: response.status,
      error: message ? `Steam API HTTP ${response.status}：${message}` : `Steam API HTTP ${response.status}`,
      payload,
    };
  }

  const detail = normalizeSteamMatchDetail(payload, matchId);
  if (!detail) {
    const message = extractSteamApiMessage(payload, rawText);
    return {
      ok: false,
      status: response.status,
      error: message ? `Steam API 未返回可用比赛详情：${message}` : "Steam API 未返回可用比赛详情",
      payload,
    };
  }

  return { ok: true, status: response.status, detail, payload };
}

export async function getSteamLeagueMatches(env, leagueId, { matchesRequested = 100 } = {}) {
  const cleanLeagueId = String(leagueId || "").trim();
  if (!cleanLeagueId) return { ok: false, status: 0, error: "League ID 未配置", matches: [] };
  if (!env.STEAM_API_KEY) return { ok: false, status: 0, error: "STEAM_API_KEY 未配置", matches: [] };

  let response;
  let payload = null;
  let rawText = "";
  try {
    response = await steamDotaFetch(env, "GetMatchHistory", {
      league_id: cleanLeagueId,
      min_players: 10,
      matches_requested: Math.min(Math.max(Number(matchesRequested) || 100, 1), 100),
    });
    rawText = await response.text().catch(() => "");
    payload = parseJsonPayload(rawText);
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : "Steam 联赛比赛列表请求失败",
      matches: [],
    };
  }

  if (!response.ok) {
    const message = extractSteamApiMessage(payload, rawText);
    return {
      ok: false,
      status: response.status,
      error: message ? `Steam GetMatchHistory HTTP ${response.status}：${message}` : `Steam GetMatchHistory HTTP ${response.status}`,
      matches: [],
      payload,
    };
  }

  const result = payload?.result || {};
  const matches = Array.isArray(result.matches) ? result.matches : [];
  const status = Number(result.status || 0);
  if (status && status !== 1 && !matches.length) {
    const message = extractSteamApiMessage(payload, rawText);
    return {
      ok: false,
      status: response.status,
      steamStatus: status,
      error: message ? `Steam GetMatchHistory status=${status}：${message}` : `Steam GetMatchHistory status=${status}`,
      matches: [],
      payload,
    };
  }

  return {
    ok: true,
    status: response.status,
    steamStatus: status || 1,
    matches,
    totalResults: Number(result.total_results || matches.length || 0),
    resultsRemaining: Number(result.results_remaining || 0),
    payload,
  };
}

export async function fetchMatchDetailWithFallback(env, matchId, { requestOpenDotaParse = false, useSteam = true } = {}) {
  const openDotaResponse = await openDotaFetch(env, `/matches/${matchId}`);
  let parseRequested = false;

  if (openDotaResponse.ok) {
    const detail = await openDotaResponse.json();
    return {
      ok: true,
      source: "opendota",
      detail: { ...detail, data_source: "opendota" },
      openDotaStatus: openDotaResponse.status,
      steamStatus: null,
      parseRequested,
    };
  }

  if (requestOpenDotaParse && openDotaResponse.status === 404) {
    await openDotaFetch(env, `/request/${matchId}`, { method: "POST" });
    parseRequested = true;
  }

  if (useSteam) {
    const steamResult = await getSteamMatchDetail(env, matchId);
    if (steamResult.ok) {
      return {
        ok: true,
        source: "steam",
        detail: steamResult.detail,
        openDotaStatus: openDotaResponse.status,
        steamStatus: steamResult.status,
        parseRequested,
      };
    }

    return {
      ok: false,
      source: null,
      detail: null,
      openDotaStatus: openDotaResponse.status,
      steamStatus: steamResult.status,
      parseRequested,
      error: `OpenDota HTTP ${openDotaResponse.status}；${steamResult.error}`,
    };
  }

  return {
    ok: false,
    source: null,
    detail: null,
    openDotaStatus: openDotaResponse.status,
    steamStatus: null,
    parseRequested,
    error: `OpenDota HTTP ${openDotaResponse.status}`,
  };
}

export function buildCandidatesFromRecentMatches(players, recentRows, dateRange, settings) {
  const { startSeconds, endSeconds, valid } = getDateRangeSeconds(dateRange);
  if (!valid) return [];
  const grouped = new Map();
  const playerByAccount = new Map(players.map((player) => [String(player.dotaId), player]));

  recentRows.forEach(({ player, match }) => {
    if (!match?.match_id || !match.start_time) return;
    if (match.start_time < startSeconds || match.start_time > endSeconds) return;
    if (isRankedLadderMatch(match)) return;

    const matchId = String(match.match_id);
    if (!grouped.has(matchId)) {
      grouped.set(matchId, {
        id: Number(match.match_id),
        time: formatMatchTime(match.start_time),
        startTime: match.start_time,
        lobbyType: match.lobby_type,
        gameMode: match.game_mode,
        total: 10,
        status: "待确认",
        score: "+80%",
        notes: "OpenDota recentMatches 自动识别，等待管理员复核",
        registeredPlayers: new Map(),
      });
    }

    const entry = grouped.get(matchId);
    const accountId = String(player.dotaId);
    const knownPlayer = playerByAccount.get(accountId) || player;
    if (!entry.registeredPlayers.has(accountId)) {
      const side = playerSide(match.player_slot);
      entry.registeredPlayers.set(accountId, {
        accountId,
        name: knownPlayer.name,
        side,
        playerSlot: match.player_slot,
        heroId: match.hero_id,
        kills: match.kills,
        deaths: match.deaths,
        assists: match.assists,
        result: playerWon(side, match),
      });
    }
  });

  return Array.from(grouped.values())
    .map((entry) => {
      const registeredPlayers = Array.from(entry.registeredPlayers.values());
      const radiantCount = registeredPlayers.filter((player) => player.side === "天辉").length;
      const direCount = registeredPlayers.filter((player) => player.side === "夜魇").length;
      const registered = registeredPlayers.length;
      return {
        ...entry,
        registered,
        sides: `${radiantCount} : ${direCount}`,
        score: registered >= 10 ? "100%" : "+80%",
        notes:
          registered >= 10
            ? "OpenDota 自动识别到完整 10 人登记内战，可确认后入库"
            : `OpenDota 自动识别到 ${registered} 名登记玩家，建议人工复核是否为群内战`,
        registeredPlayers,
      };
    })
    .filter((entry) => entry.registered >= settings.minRegisteredPlayers && (settings.allowPartialMatches || entry.registered >= 10))
    .sort((a, b) => b.startTime - a.startTime);
}

export function buildCandidatesFromLeagueMatches(players, leagueMatches, dateRange, settings, leagueId) {
  const { startSeconds, endSeconds, valid } = getDateRangeSeconds(dateRange);
  if (!valid) return [];
  const playerByAccount = new Map(players.map((player) => [String(player.dotaId), player]));
  const threshold = Number(settings?.minRegisteredPlayers || DEFAULT_SETTINGS.minRegisteredPlayers);

  return (leagueMatches || [])
    .filter((match) => match?.match_id && match.start_time)
    .filter((match) => match.start_time >= startSeconds && match.start_time <= endSeconds)
    .map((match) => {
      const matchPlayers = Array.isArray(match.players) ? match.players : [];
      const registeredPlayers = matchPlayers
        .map((player) => {
          const accountId = player.account_id ? String(player.account_id) : "";
          const knownPlayer = accountId ? playerByAccount.get(accountId) : null;
          if (!knownPlayer) return null;
          const side = playerSide(player.player_slot);
          return {
            accountId,
            name: knownPlayer.name,
            side,
            playerSlot: player.player_slot,
            heroId: player.hero_id,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            result: playerWon(side, match),
          };
        })
        .filter(Boolean);
      const radiantCount = registeredPlayers.filter((player) => player.side === "天辉").length;
      const direCount = registeredPlayers.filter((player) => player.side === "夜魇").length;
      const registered = registeredPlayers.length;
      const total = Math.max(matchPlayers.length || 0, 10);
      const fullInhouse = registered >= 10;

      return {
        id: Number(match.match_id),
        time: formatMatchTime(match.start_time),
        startTime: match.start_time,
        lobbyType: match.lobby_type,
        gameMode: match.game_mode,
        total,
        status: "待确认",
        score: fullInhouse ? "联赛房完整命中" : `联赛房命中 ${registered}`,
        notes: fullInhouse
          ? `Steam 联赛房 ${leagueId} 扫描到完整 10 人登记内战，等待管理员复核。`
          : `Steam 联赛房 ${leagueId} 扫描到 ${registered} 名登记玩家，建议人工复核是否为群内战。`,
        registered,
        sides: `${radiantCount} : ${direCount}`,
        hidden: false,
        isRankedLadder: false,
        registeredPlayers,
      };
    })
    .filter((entry) => entry.registered >= threshold && (settings.allowPartialMatches || entry.registered >= 10))
    .sort((a, b) => b.startTime - a.startTime);
}

export function mergeMatchCandidates(candidates) {
  const grouped = new Map();

  (candidates || []).forEach((candidate) => {
    if (!candidate?.id) return;
    const key = String(candidate.id);
    const current = grouped.get(key);
    if (!current || Number(candidate.registered || 0) > Number(current.registered || 0)) {
      grouped.set(key, candidate);
      return;
    }
    if (current && candidate.notes && !current.notes.includes(candidate.notes)) {
      grouped.set(key, {
        ...current,
        notes: `${current.notes} 另有来源也识别到该场。`,
      });
    }
  });

  return Array.from(grouped.values()).sort((a, b) => Number(b.startTime || 0) - Number(a.startTime || 0));
}

export function resolveMatchPlayers(match, detail, players) {
  const playerByAccount = new Map(players.map((player) => [String(player.dotaId), player]));
  const fallbackPlayers = match?.registeredPlayers || [];
  const fallbackByAccount = new Map(fallbackPlayers.map((player) => [String(player.accountId || player.dotaId || ""), player]).filter(([accountId]) => accountId));
  const fallbackBySlotHero = new Map(
    fallbackPlayers
      .filter((player) => player.playerSlot !== undefined && player.heroId !== undefined)
      .map((player) => [`${player.playerSlot}-${player.heroId}`, player]),
  );
  const detailPlayers = detail?.players || [];

  return detailPlayers.map((player) => {
    const accountId = player.account_id ? String(player.account_id) : "";
    const rosterPlayer = accountId ? playerByAccount.get(accountId) : null;
    const fallbackPlayer = (accountId && fallbackByAccount.get(accountId)) || (!accountId ? fallbackBySlotHero.get(`${player.player_slot}-${player.hero_id}`) : null);
    const knownPlayer = rosterPlayer || fallbackPlayer;
    const side = playerSide(player.player_slot);
    const fallbackResult = typeof fallbackPlayer?.result === "boolean" ? fallbackPlayer.result : null;
    return {
      accountId: accountId || knownPlayer?.accountId || knownPlayer?.dotaId || "",
      name: knownPlayer?.name || player.personaname || player.name || "匿名玩家",
      side,
      playerSlot: player.player_slot,
      heroId: player.hero_id,
      kills: player.kills,
      deaths: player.deaths,
      assists: player.assists,
      goldPerMin: player.gold_per_min,
      xpPerMin: player.xp_per_min,
      result: playerWon(side, detail) ?? fallbackResult,
      isRegistered: Boolean(knownPlayer),
      identifySource: rosterPlayer ? "玩家库 ID 匹配" : fallbackPlayer ? "同步记录匹配" : "未匹配",
    };
  });
}

export function registeredSideSummary(players) {
  const registeredPlayers = players.filter((player) => player.isRegistered);
  const radiant = registeredPlayers.filter((player) => player.side === "天辉").length;
  const dire = registeredPlayers.filter((player) => player.side === "夜魇").length;
  return { registered: registeredPlayers.length, radiant, dire, sides: `${radiant} : ${dire}` };
}

export function createPendingMatch(matchId, notes = "管理员手动添加；正在等待 OpenDota 返回详情。") {
  return {
    id: Number(matchId) || matchId,
    time: "待解析",
    registered: 0,
    total: 10,
    sides: "-",
    status: "待确认",
    score: "待解析",
    notes,
    registeredPlayers: [],
  };
}

export function buildMatchFromDetail(currentMatch, detail, players, settings = DEFAULT_SETTINGS) {
  const resolvedPlayers = resolveMatchPlayers(currentMatch, detail, players);
  const recognition = registeredSideSummary(resolvedPlayers);
  const rankedLadder = isRankedLadderMatch(detail);
  const threshold = Number(settings?.minRegisteredPlayers || DEFAULT_SETTINGS.minRegisteredPlayers);
  const total = detail.players?.length || currentMatch.total || 10;
  const fullInhouse = recognition.registered >= Math.min(total, 10);
  const meetsThreshold = recognition.registered >= threshold;
  const balancedSides = recognition.radiant > 0 && recognition.dire > 0 && Math.abs(recognition.radiant - recognition.dire) <= 1;
  const lobbyName = describeLobbyType(detail.lobby_type);
  const modeName = describeGameMode(detail.game_mode);
  const sourceLabel = detail.data_source === "steam" ? "Steam Web API" : "OpenDota";
  const leagueText = detail.leagueid ? `，League ID ${detail.leagueid}` : "";

  let score = `玩家库命中 ${recognition.registered}`;
  let notes = `${sourceLabel} 已解析：${lobbyName} / ${modeName}${leagueText}，玩家库命中 ${recognition.registered}/${total}，双方命中 ${recognition.sides}。`;

  if (rankedLadder) {
    score = "天梯跳过";
    notes = `${notes} 该房间类型属于天梯，已从内战识别队列隐藏，不计入积分。`;
  } else if (fullInhouse) {
    score = "完整 10 人内战";
    notes = `${notes} 命中完整 10 人，可优先确认后入库。`;
  } else if (meetsThreshold) {
    score = `达到阈值 ${recognition.registered}/${threshold}`;
    notes = `${notes} 已达到当前阈值，但不是完整 10 人，建议管理员结合语音/群内记录复核。`;
  } else {
    score = `命中不足 ${recognition.registered}/${threshold}`;
    notes = `${notes} 未达到当前阈值，暂不建议作为有效内战确认。`;
  }

  if (!rankedLadder && !balancedSides && recognition.registered > 0) {
    notes = `${notes} 两边命中不均衡，可能是玩家库缺 ID 或这不是完整群内战。`;
  }

  return {
    ...currentMatch,
    hidden: rankedLadder,
    isRankedLadder: rankedLadder,
    status: rankedLadder ? "已驳回" : currentMatch.status || "待确认",
    time: detail.start_time ? formatMatchTime(detail.start_time) : currentMatch.time,
    startTime: detail.start_time || currentMatch.startTime,
    lobbyType: detail.lobby_type,
    gameMode: detail.game_mode,
    registered: recognition.registered,
    total,
    sides: recognition.sides,
    registeredPlayers: resolvedPlayers
      .filter((player) => player.isRegistered)
      .map((player) => ({
        accountId: player.accountId,
        name: player.name,
        side: player.side,
        playerSlot: player.playerSlot,
        heroId: player.heroId,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        result: player.result,
      })),
    score,
    notes,
    detail,
    recognition: {
      ...recognition,
      total,
      threshold,
      fullInhouse,
      meetsThreshold,
      balancedSides,
      rankedLadder,
      lobbyName,
      modeName,
    },
  };
}
