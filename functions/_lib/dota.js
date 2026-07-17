const OPENDOTA_BASE_URL = "https://api.opendota.com/api";
const STEAM_DOTA_MATCH_BASE_URL = "https://api.steampowered.com/IDOTA2Match_570";
const STRATZ_GRAPHQL_URL = "https://api.stratz.com/graphql";
const ROSTER_VERSION = "2026-06-18-roster-38";
export const DEFAULT_LEAGUE_SLUG = "pokemon-dota";

const TRIAL_SEASON_START = "2026-06-01T00:00";
const TRIAL_SEASON_END = "2026-06-20T11:59";
const DEFAULT_SEASON_START = "2026-06-20T12:00";
const CURRENT_SEASON_ID = "s1";
const DEFAULT_SEASONS = [
  {
    id: "s0",
    name: "S0 试运行赛季",
    start: TRIAL_SEASON_START,
    end: TRIAL_SEASON_END,
    status: "archived",
    locked: true,
  },
  {
    id: "s1",
    name: "S1 正式赛季",
    start: DEFAULT_SEASON_START,
    end: "",
    status: "active",
    locked: false,
  },
];

export const DEFAULT_SETTINGS = {
  seasonName: "S1 正式赛季",
  seasonStart: DEFAULT_SEASON_START,
  seasonEnd: "",
  currentSeasonId: CURRENT_SEASON_ID,
  seasons: DEFAULT_SEASONS,
  minRegisteredPlayers: 8,
  minCaptainGames: 6,
  winPoints: 10,
  lossPoints: 3,
  autoSync: true,
  autoStoreResolvedMatches: true,
  allowPartialMatches: true,
  useLeagueScan: true,
  leagueId: "19220",
};

export const PLAYOFF_SERIES = {
  semiA: { key: "semiA", label: "半决赛 A", shortLabel: "半决 A", targetWins: 2 },
  semiB: { key: "semiB", label: "半决赛 B", shortLabel: "半决 B", targetWins: 2 },
  final: { key: "final", label: "决赛", shortLabel: "决赛", targetWins: 2 },
};

export const DEFAULT_PLAYOFF_STATE = {
  version: 1,
  status: "drafting",
  teams: [],
  series: [],
  games: [],
  championTeamId: "",
  runnerUpTeamId: "",
  updatedAt: "",
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
  { id: 17, name: "猎奇", dotaId: "788744238", role: "待补", gameName: "猎奇", profileUrl: "https://steamcommunity.com/profiles/76561198749009966/", avatarUrl: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" },
  { id: 18, name: "范瑶", dotaId: "830568211", role: "待补", gameName: "范瑶", profileUrl: "https://steamcommunity.com/profiles/76561198790833939/", avatarUrl: "https://avatars.steamstatic.com/2719f0cda01e8db67b3a0c4c885d9876b367b8df_full.jpg" },
  { id: 19, name: "Artol", dotaId: "1742683220", role: "待补", gameName: "Artol", profileUrl: "https://steamcommunity.com/profiles/76561199702948948/", avatarUrl: "https://avatars.steamstatic.com/48b8d8cd5cd35b94299f7951a118f6fff33f891b_full.jpg" },
  { id: 20, name: "Tips", dotaId: "1045578592", role: "3 / 4", gameName: "酒蒙子黄毛体育生卡提", profileUrl: "https://steamcommunity.com/id/tipsong/", avatarUrl: "https://avatars.steamstatic.com/088d1a708489f77ae2a59d4e2c5335d5f45cffae_full.jpg" },
  { id: 21, name: "雨", dotaId: "1241554543", role: "4 / 5", gameName: "雨", profileUrl: "https://steamcommunity.com/profiles/76561199201820271/", avatarUrl: "https://avatars.steamstatic.com/58bd67cf047436f84c8a308c31be95e1e23a809b_full.jpg" },
  { id: 22, name: "哈基马", dotaId: "339743252", role: "1 / 3", gameName: "等我上个马", profileUrl: "https://steamcommunity.com/profiles/76561198300008980/", avatarUrl: "https://avatars.steamstatic.com/752eb38c3b0bc6f74708ec2c3d44d00bda41edde_full.jpg" },
  { id: 23, name: "哈基暴", dotaId: "338957505", role: "3 / 5", gameName: "暴鲤龙的大爷爷", profileUrl: "https://steamcommunity.com/profiles/76561198299223233/", avatarUrl: "https://avatars.steamstatic.com/764f5bf486117c83ed29e5f29e33cd69e583dc29_full.jpg" },
  { id: 24, name: "Zsso_zao", dotaId: "175928804", role: "4 / 5", gameName: "Zsso_zao", profileUrl: "https://steamcommunity.com/profiles/76561198136194532/", avatarUrl: "https://avatars.steamstatic.com/e1edeeccc8320a26774cfabd63467ab9f0a5a6d8_full.jpg" },
  { id: 25, name: "KAMI", dotaId: "133666698", role: "全能", gameName: "能帮我弄干净吗", profileUrl: "https://steamcommunity.com/profiles/76561198093932426/", avatarUrl: "https://avatars.steamstatic.com/198cc4ad9a2c31ad45c4d83d54498df854aedcf4_full.jpg" },
  { id: 26, name: "李斯", dotaId: "403665770", role: "待补", gameName: "李斯", profileUrl: "https://steamcommunity.com/id/798780530/", avatarUrl: "https://avatars.steamstatic.com/af339fcac970b1098c7f3c3bd0107af2645fad59_full.jpg" },
  { id: 27, name: "cheaterbush", dotaId: "448417036", role: "待补", gameName: "cheaterbush", profileUrl: "https://steamcommunity.com/profiles/76561198408682764/", avatarUrl: "https://avatars.steamstatic.com/f9e7e02b28bf8f1f18c07a5e95cb714b795195fd_full.jpg" },
  { id: 28, name: "钢琴家睿达", dotaId: "139291120", role: "待补", gameName: "钢琴家睿达", profileUrl: "https://steamcommunity.com/id/GunyumL/", avatarUrl: "https://avatars.steamstatic.com/bc55afd6180a0aebd83a33fc36da2d534370498e_full.jpg" },
  { id: 29, name: "Kano", dotaId: "139595295", role: "待补", gameName: "Kano", profileUrl: "https://steamcommunity.com/profiles/76561198099861023/", avatarUrl: "https://avatars.steamstatic.com/80f218cad570a586adf3990d20ca8ab664b2e88f_full.jpg" },
  { id: 30, name: "Cherry", dotaId: "1765455118", role: "待补", gameName: "Cherry", profileUrl: "https://steamcommunity.com/profiles/76561199725720846/", avatarUrl: "https://avatars.steamstatic.com/774151f6a68b1a9c34b5248a92b7e842a3fcf3b4_full.jpg" },
  { id: 31, name: "ico", dotaId: "1206359917", role: "待补", gameName: "ico", profileUrl: "https://steamcommunity.com/id/qiubo666/", avatarUrl: "https://avatars.steamstatic.com/b5984ec17651d765dce7eaf215ae6ec9cec268d2_full.jpg" },
  { id: 32, name: "be happy", dotaId: "1261852738", role: "待补", gameName: "be happy", profileUrl: "https://steamcommunity.com/id/a1726355653/", avatarUrl: "https://avatars.steamstatic.com/1d624398f7d78e30860f065744ce8221756c61d0_full.jpg" },
  { id: 33, name: "我去监督李达康", dotaId: "183774603", role: "待补", gameName: "我去监督李达康", profileUrl: "https://steamcommunity.com/profiles/76561198144040331/", avatarUrl: "https://avatars.steamstatic.com/c26286f1a292309692f9a3a04eed8e0b8c15c66b_full.jpg" },
  { id: 34, name: "Moribund", dotaId: "1065035539", role: "待补", gameName: "Moribund", profileUrl: "https://steamcommunity.com/profiles/76561199025301267/", avatarUrl: "https://avatars.steamstatic.com/3e7fa82d331c950cc2dffca68c4e0f723849cff0_full.jpg" },
  { id: 35, name: "Denn1s", dotaId: "208476639", role: "待补", gameName: "Denn1s", profileUrl: "https://steamcommunity.com/profiles/76561198168742367/", avatarUrl: "https://avatars.steamstatic.com/ab6436a6821059163a6514eb245e23e52c4ad9d3_full.jpg" },
  { id: 36, name: "你是哪塊小餅乾", dotaId: "1067592430", role: "待补", gameName: "你是哪塊小餅乾", profileUrl: "https://steamcommunity.com/profiles/76561199027858158/", avatarUrl: "https://avatars.steamstatic.com/d918c28ebc011aef576647577bb55f9cbf333541_full.jpg" },
  { id: 37, name: "海绵", dotaId: "138638303", role: "待补", gameName: "海绵", profileUrl: "https://steamcommunity.com/profiles/76561198098904031/", avatarUrl: "https://avatars.steamstatic.com/a5fda511842c996d37157b5fa2a33e657d2eaf32_full.jpg" },
  { id: 38, name: "今晚执翻剂", dotaId: "182726435", role: "待补", gameName: "今晚执翻剂", profileUrl: "https://steamcommunity.com/profiles/76561198142992163/", avatarUrl: "https://avatars.steamstatic.com/d9fd361f2f6f46e78959617190a493da4da8696e_full.jpg" },
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

export async function requireAdmin(request, env) {
  const expected = env.ADMIN_TOKEN;
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : request.headers.get("x-admin-token");
  if (!token) return json({ error: "请输入管理员密码" }, { status: 401 });
  if (expected && token === expected) return null;

  try {
    if (env.DB) {
      const leagueSlug = getLeagueSlugFromRequest(request);
      const row = await env.DB.prepare("SELECT admin_key FROM league_spaces WHERE slug = ?").bind(leagueSlug).first();
      if (row?.admin_key && token === row.admin_key) return null;
    }
  } catch {
    // 如果空间表尚未初始化，继续走统一错误提示。
  }

  if (!expected && !env.DB) return json({ error: "ADMIN_TOKEN 未配置" }, { status: 500 });
  if (!expected) return json({ error: "该空间还没有可用的管理密码" }, { status: 401 });
  if (env.DB) return json({ error: "管理员密码不正确" }, { status: 401 });
  return json({ error: "管理员密码不正确" }, { status: 401 });
}

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function randomToken(prefix = "adm") {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = new Uint8Array(18);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 255);
  }
  return `${prefix}-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
}

export function normalizeLeagueSlug(value, fallback = "") {
  const clean = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return clean || fallback;
}

export function getLeagueSlugFromRequest(request) {
  if (!request?.url) return DEFAULT_LEAGUE_SLUG;
  const url = new URL(request.url);
  return normalizeLeagueSlug(url.searchParams.get("league"), DEFAULT_LEAGUE_SLUG);
}

export function withLeague(env, leagueSlug) {
  return { ...env, __leagueSlug: normalizeLeagueSlug(leagueSlug, DEFAULT_LEAGUE_SLUG) };
}

function currentLeagueSlug(env) {
  return normalizeLeagueSlug(env?.__leagueSlug, DEFAULT_LEAGUE_SLUG);
}

function normalizeDateTimeSetting(value, fallback = "", endOfDay = false) {
  const clean = String(value || "").trim();
  if (!clean) return fallback;
  if (clean.includes("T")) return clean;
  return `${clean}T${endOfDay ? "23:59" : "00:00"}`;
}

function normalizeSeasonId(value, fallback = "") {
  const clean = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return clean || fallback;
}

function normalizeSeason(raw = {}, fallback = {}, index = 0) {
  const source = raw && typeof raw === "object" ? raw : {};
  const base = fallback && typeof fallback === "object" ? fallback : {};
  const id = normalizeSeasonId(source.id, normalizeSeasonId(base.id, `s${index}`));
  return {
    id,
    name: String(source.name || source.seasonName || base.name || `S${index}`).trim(),
    start: normalizeDateTimeSetting(source.start || source.seasonStart || base.start || base.seasonStart, DEFAULT_SEASON_START),
    end: normalizeDateTimeSetting(source.end || source.seasonEnd || base.end || base.seasonEnd, "", true),
    status: ["active", "archived", "draft"].includes(source.status) ? source.status : base.status || "active",
    locked: Boolean(source.locked ?? base.locked),
  };
}

function normalizeSeasons(settings = {}) {
  const source = settings && typeof settings === "object" ? settings : {};
  const byId = new Map();
  DEFAULT_SEASONS.forEach((season, index) => {
    const normalized = normalizeSeason(season, season, index);
    byId.set(normalized.id, normalized);
  });

  if (Array.isArray(source.seasons)) {
    source.seasons.forEach((season, index) => {
      const fallbackId = normalizeSeasonId(season?.id, "");
      const fallback = byId.get(fallbackId) || DEFAULT_SEASONS[index] || DEFAULT_SEASONS[DEFAULT_SEASONS.length - 1];
      const normalized = normalizeSeason(season, fallback, index);
      byId.set(normalized.id, { ...(byId.get(normalized.id) || {}), ...normalized });
    });
  }

  const requestedCurrentId = normalizeSeasonId(source.currentSeasonId, CURRENT_SEASON_ID);
  const currentSeasonId = byId.has(requestedCurrentId) ? requestedCurrentId : CURRENT_SEASON_ID;
  const currentSeason = byId.get(currentSeasonId) || byId.get(CURRENT_SEASON_ID);
  if (currentSeason) {
    if (source.seasonName) currentSeason.name = String(source.seasonName).trim();
    if (source.seasonStart) currentSeason.start = normalizeDateTimeSetting(source.seasonStart, DEFAULT_SEASON_START);
    if ("seasonEnd" in source) currentSeason.end = normalizeDateTimeSetting(source.seasonEnd, "", true);
  }

  const defaultOrder = new Map(DEFAULT_SEASONS.map((season, index) => [season.id, index]));
  const seasons = Array.from(byId.values()).sort((left, right) => {
    const leftOrder = defaultOrder.has(left.id) ? defaultOrder.get(left.id) : 99;
    const rightOrder = defaultOrder.has(right.id) ? defaultOrder.get(right.id) : 99;
    return leftOrder - rightOrder || left.name.localeCompare(right.name, "zh-CN");
  });
  return { seasons, currentSeasonId, currentSeason: currentSeason || seasons[0] || DEFAULT_SEASONS[1] };
}

function normalizeSettings(settings = {}) {
  const merged = { ...DEFAULT_SETTINGS, ...(settings || {}) };
  const { seasons, currentSeasonId, currentSeason } = normalizeSeasons(merged);
  merged.seasons = seasons;
  merged.currentSeasonId = currentSeasonId;
  merged.seasonName = currentSeason.name;
  merged.seasonStart = currentSeason.start || DEFAULT_SETTINGS.seasonStart;
  merged.seasonEnd = currentSeason.end || "";
  return merged;
}

function dateTimeSettingToSeconds(value, endOfDay = false) {
  const normalized = normalizeDateTimeSetting(value, "", endOfDay);
  if (!normalized) return NaN;
  const time = new Date(normalized).getTime();
  return Number.isFinite(time) ? Math.floor(time / 1000) : NaN;
}

function seasonForStartTime(settings = DEFAULT_SETTINGS, startTime = 0) {
  const normalizedSettings = normalizeSettings(settings);
  const seconds = Number(startTime || 0);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  return (normalizedSettings.seasons || []).find((season) => {
    const start = dateTimeSettingToSeconds(season.start || season.seasonStart);
    const endValue = season.end || season.seasonEnd || "";
    const end = endValue ? dateTimeSettingToSeconds(endValue, true) : Infinity;
    return Number.isFinite(start) && seconds >= start && seconds <= end;
  }) || null;
}

function seasonLogDetails(settings = DEFAULT_SETTINGS, details = {}, preferredSeason = null) {
  const base = details && typeof details === "object" ? { ...details } : {};
  if (base.seasonId) return base;
  const normalizedSettings = normalizeSettings(settings);
  const season = preferredSeason || (normalizedSettings.seasons || []).find((item) => item.id === normalizedSettings.currentSeasonId) || normalizedSettings.seasons?.[0];
  if (!season) return base;
  return {
    ...base,
    seasonId: season.id,
    seasonName: season.name,
    seasonStart: season.start,
    seasonEnd: season.end || "",
  };
}

function leagueSpaceFromRow(row, { includeSecret = false, origin = "" } = {}) {
  if (!row) return null;
  const slug = String(row.slug || "");
  const publicUrl = origin ? `${origin}/?league=${encodeURIComponent(slug)}` : `?league=${encodeURIComponent(slug)}`;
  const adminUrl = origin ? `${publicUrl}&admin=1` : `${publicUrl}&admin=1`;
  const settings = normalizeSettings(safeJsonParse(row.settings_json, {}));
  return {
    id: row.id,
    slug,
    name: row.name,
    ownerName: row.owner_name || "",
    contact: row.contact || "",
    status: row.status || "setup",
    settings,
    playerCount: Number(row.player_count || 0),
    matchCount: Number(row.match_count || 0),
    dataReady: Number(row.data_ready || 0) === 1,
    isDefault: slug === DEFAULT_LEAGUE_SLUG,
    publicUrl,
    adminUrl,
    createdAt: row.created_at || "",
    updatedAt: row.updated_at || "",
    ...(includeSecret ? { adminKey: row.admin_key || "" } : {}),
  };
}

async function ensureDefaultLeagueSpace(env) {
  const settings = await getSettings(env);
  await env.DB.prepare(`INSERT INTO league_spaces
    (slug, name, owner_name, contact, admin_key, status, settings_json, data_ready, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT(slug) DO UPDATE SET
      name = COALESCE(NULLIF(league_spaces.name, ''), excluded.name),
      owner_name = COALESCE(NULLIF(league_spaces.owner_name, ''), excluded.owner_name),
      contact = COALESCE(league_spaces.contact, excluded.contact),
      status = COALESCE(NULLIF(league_spaces.status, ''), excluded.status),
      settings_json = excluded.settings_json,
      data_ready = 1,
      updated_at = CURRENT_TIMESTAMP`)
    .bind(
      DEFAULT_LEAGUE_SLUG,
      "第三届宝可梦 DOTA2 内战",
      "MiracleZYF",
      "",
      "",
      "active",
      JSON.stringify(settings),
    )
    .run();
}

async function activateRegisteredLeagueSpaces(env) {
  await env.DB.prepare(`UPDATE league_spaces
    SET data_ready = 1,
      status = 'active',
      updated_at = CURRENT_TIMESTAMP
    WHERE data_ready = 0 OR status = 'setup'`)
    .run();

  const result = await env.DB.prepare("SELECT slug, settings_json FROM league_spaces").all();
  const rows = result.results || [];
  if (rows.length) {
    await env.DB.batch(rows.map((row) =>
      env.DB.prepare(`INSERT OR IGNORE INTO league_settings (league_slug, key, value, updated_at)
        VALUES (?, 'league', ?, CURRENT_TIMESTAMP)`)
        .bind(row.slug, row.settings_json || JSON.stringify(DEFAULT_SETTINGS)),
    ));
  }

  for (const row of rows) {
    await refreshLeagueSpaceCounts(env, row.slug);
  }
}

async function migrateDefaultLeagueData(env) {
  const leagueSlug = DEFAULT_LEAGUE_SLUG;
  const scopedPlayerCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_players WHERE league_slug = ?").bind(leagueSlug).first();
  if (!Number(scopedPlayerCount?.count || 0)) {
    await env.DB.prepare(`INSERT OR IGNORE INTO league_players
      (league_slug, id, name, dota_id, role, game_name, avatar_url, profile_url, profile_synced_at, profile_error, public_data, status, created_at, updated_at)
      SELECT ?, id, name, dota_id, role, game_name, avatar_url, profile_url, profile_synced_at, profile_error, public_data, status, created_at, updated_at
      FROM players`)
      .bind(leagueSlug)
      .run();
  }

  const scopedMatchCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_matches WHERE league_slug = ?").bind(leagueSlug).first();
  if (!Number(scopedMatchCount?.count || 0)) {
    await env.DB.prepare(`INSERT OR IGNORE INTO league_matches
      (league_slug, id, time, start_time, lobby_type, game_mode, total, status, score, notes, registered, sides, hidden, is_ranked_ladder, registered_players_json, detail_json, created_at, updated_at)
      SELECT ?, id, time, start_time, lobby_type, game_mode, total, status, score, notes, registered, sides, hidden, is_ranked_ladder, registered_players_json, detail_json, created_at, updated_at
      FROM matches`)
      .bind(leagueSlug)
      .run();
  }

  const scopedSettingsCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_settings WHERE league_slug = ? AND key = 'league'").bind(leagueSlug).first();
  if (!Number(scopedSettingsCount?.count || 0)) {
    const oldSettings = await env.DB.prepare("SELECT value FROM settings WHERE key = 'league'").first();
    await env.DB.prepare(`INSERT OR IGNORE INTO league_settings (league_slug, key, value, updated_at)
      VALUES (?, 'league', ?, CURRENT_TIMESTAMP)`)
      .bind(leagueSlug, oldSettings?.value || JSON.stringify(DEFAULT_SETTINGS))
      .run();
  }

  const scopedPlayoffCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_playoff_state WHERE league_slug = ?").bind(leagueSlug).first();
  if (!Number(scopedPlayoffCount?.count || 0)) {
    await env.DB.prepare(`INSERT OR IGNORE INTO league_playoff_state (league_slug, key, value, updated_at)
      SELECT ?, key, value, updated_at FROM playoff_state`)
      .bind(leagueSlug)
      .run();
  }

  const scopedSyncCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_sync_runs WHERE league_slug = ?").bind(leagueSlug).first();
  if (!Number(scopedSyncCount?.count || 0)) {
    await env.DB.prepare(`INSERT INTO league_sync_runs
      (league_slug, kind, status, summary, details_json, started_at, finished_at)
      SELECT ?, kind, status, summary, details_json, started_at, finished_at FROM sync_runs`)
      .bind(leagueSlug)
      .run();
  }

  const scopedAuditCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_audit_logs WHERE league_slug = ?").bind(leagueSlug).first();
  if (!Number(scopedAuditCount?.count || 0)) {
    await env.DB.prepare(`INSERT INTO league_audit_logs
      (league_slug, action, match_id, actor, summary, details_json, created_at)
      SELECT ?, action, match_id, actor, summary, details_json, created_at FROM audit_logs`)
      .bind(leagueSlug)
      .run();
  }
}

async function refreshLeagueSpaceCounts(env, leagueSlug = DEFAULT_LEAGUE_SLUG) {
  const players = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_players WHERE league_slug = ?").bind(leagueSlug).first();
  const matches = await env.DB.prepare("SELECT COUNT(*) AS count FROM league_matches WHERE league_slug = ?").bind(leagueSlug).first();
  await env.DB.prepare("UPDATE league_spaces SET player_count = ?, match_count = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?")
    .bind(Number(players?.count || 0), Number(matches?.count || 0), leagueSlug)
    .run();
}

async function reconcileInitialPlayerRoster(env) {
  const leagueSlug = DEFAULT_LEAGUE_SLUG;
  const versionRow = await env.DB.prepare("SELECT value FROM league_settings WHERE league_slug = ? AND key = 'roster_version'").bind(leagueSlug).first();
  if (versionRow?.value === ROSTER_VERSION) return;

  const now = new Date().toISOString();
  const desiredIds = new Set(INITIAL_PLAYERS.map((player) => String(player.dotaId)));
  const currentResult = await env.DB.prepare("SELECT * FROM league_players WHERE league_slug = ? ORDER BY id ASC").bind(leagueSlug).all();
  const currentRows = currentResult.results || [];
  const currentByDotaId = new Map(currentRows.map((row) => [String(row.dota_id), row]));
  const deleteStatements = currentRows
    .filter((row) => !desiredIds.has(String(row.dota_id)))
    .map((row) => env.DB.prepare("DELETE FROM league_players WHERE league_slug = ? AND dota_id = ?").bind(leagueSlug, String(row.dota_id)));

  if (deleteStatements.length) await env.DB.batch(deleteStatements);

  const upsertStatements = INITIAL_PLAYERS.map((player) => {
    const current = currentByDotaId.get(String(player.dotaId));
    const currentName = String(current?.name || "");
    const currentRole = String(current?.role || "");
    const name = isPlaceholderPlayerName(currentName) ? player.name : currentName || player.name;
    const role = !currentRole || currentRole === "待补" ? player.role : currentRole;
    const gameName = current?.game_name || player.gameName || "";
    const avatarUrl = current?.avatar_url || player.avatarUrl || "";
    const profileUrl = current?.profile_url || player.profileUrl || "";
    const profileSyncedAt = current?.profile_synced_at || "";
    const profileError = current?.profile_error || "";
    const publicData = current?.public_data || gameName || avatarUrl || profileUrl ? 1 : 0;
    const status = current?.status && current.status !== "待内战统计" ? current.status : publicData ? "资料已同步" : "待内战统计";

    return env.DB.prepare(`INSERT INTO league_players
      (league_slug, id, name, dota_id, role, game_name, avatar_url, profile_url, profile_synced_at, profile_error, public_data, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(league_slug, dota_id) DO UPDATE SET
        id = excluded.id,
        name = excluded.name,
        role = excluded.role,
        game_name = excluded.game_name,
        avatar_url = excluded.avatar_url,
        profile_url = excluded.profile_url,
        profile_synced_at = excluded.profile_synced_at,
        profile_error = excluded.profile_error,
        public_data = excluded.public_data,
        status = excluded.status,
        updated_at = excluded.updated_at`)
      .bind(
        leagueSlug,
        player.id,
        name,
        player.dotaId,
        role,
        gameName,
        avatarUrl,
        profileUrl,
        profileSyncedAt,
        profileError,
        publicData,
        status,
        current?.created_at || now,
        now,
      );
  });

  await env.DB.batch(upsertStatements);
  await env.DB.prepare(`INSERT INTO league_settings (league_slug, key, value, updated_at)
    VALUES (?, 'roster_version', ?, CURRENT_TIMESTAMP)
    ON CONFLICT(league_slug, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`)
    .bind(leagueSlug, ROSTER_VERSION)
    .run();
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
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS sync_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL DEFAULT 'manual',
      status TEXT NOT NULL DEFAULT 'success',
      summary TEXT NOT NULL DEFAULT '',
      details_json TEXT NOT NULL DEFAULT '{}',
      started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      finished_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      match_id TEXT NOT NULL DEFAULT '',
      actor TEXT NOT NULL DEFAULT '管理员',
      summary TEXT NOT NULL DEFAULT '',
      details_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS playoff_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS league_spaces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      owner_name TEXT NOT NULL DEFAULT '',
      contact TEXT NOT NULL DEFAULT '',
      admin_key TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'setup',
      settings_json TEXT NOT NULL DEFAULT '{}',
      player_count INTEGER NOT NULL DEFAULT 0,
      match_count INTEGER NOT NULL DEFAULT 0,
      data_ready INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS league_players (
      league_slug TEXT NOT NULL DEFAULT '${DEFAULT_LEAGUE_SLUG}',
      id INTEGER NOT NULL,
      name TEXT NOT NULL,
      dota_id TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT '全能',
      game_name TEXT NOT NULL DEFAULT '',
      avatar_url TEXT NOT NULL DEFAULT '',
      profile_url TEXT NOT NULL DEFAULT '',
      profile_synced_at TEXT NOT NULL DEFAULT '',
      profile_error TEXT NOT NULL DEFAULT '',
      public_data INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT '待内战统计',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (league_slug, id),
      UNIQUE (league_slug, dota_id)
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS league_matches (
      league_slug TEXT NOT NULL DEFAULT '${DEFAULT_LEAGUE_SLUG}',
      id TEXT NOT NULL,
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
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (league_slug, id)
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS league_settings (
      league_slug TEXT NOT NULL DEFAULT '${DEFAULT_LEAGUE_SLUG}',
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (league_slug, key)
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS league_sync_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      league_slug TEXT NOT NULL DEFAULT '${DEFAULT_LEAGUE_SLUG}',
      kind TEXT NOT NULL DEFAULT 'manual',
      status TEXT NOT NULL DEFAULT 'success',
      summary TEXT NOT NULL DEFAULT '',
      details_json TEXT NOT NULL DEFAULT '{}',
      started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      finished_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS league_audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      league_slug TEXT NOT NULL DEFAULT '${DEFAULT_LEAGUE_SLUG}',
      action TEXT NOT NULL,
      match_id TEXT NOT NULL DEFAULT '',
      actor TEXT NOT NULL DEFAULT '管理员',
      summary TEXT NOT NULL DEFAULT '',
      details_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS league_playoff_state (
      league_slug TEXT NOT NULL DEFAULT '${DEFAULT_LEAGUE_SLUG}',
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (league_slug, key)
    )`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_matches_start_time ON matches(start_time)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_sync_runs_finished_at ON sync_runs(finished_at)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_league_spaces_status ON league_spaces(status)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_league_matches_start_time ON league_matches(league_slug, start_time)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_league_matches_status ON league_matches(league_slug, status)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_league_sync_runs_finished_at ON league_sync_runs(league_slug, finished_at)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_league_audit_logs_created_at ON league_audit_logs(league_slug, created_at)"),
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

  await migrateDefaultLeagueData(env);
  await reconcileInitialPlayerRoster(env);
  await ensureDefaultLeagueSpace(env);
  await activateRegisteredLeagueSpaces(env);
  await refreshLeagueSpaceCounts(env, DEFAULT_LEAGUE_SLUG);
}

export async function getSettings(env) {
  const leagueSlug = currentLeagueSlug(env);
  const row = await env.DB.prepare("SELECT value FROM league_settings WHERE league_slug = ? AND key = 'league'").bind(leagueSlug).first();
  if (!row?.value) return normalizeSettings();
  try {
    return normalizeSettings(JSON.parse(row.value));
  } catch {
    return normalizeSettings();
  }
}

export async function saveSettings(env, settings) {
  const leagueSlug = currentLeagueSlug(env);
  const merged = normalizeSettings(settings);
  await env.DB.prepare(`INSERT INTO league_settings (league_slug, key, value, updated_at)
    VALUES (?, 'league', ?, CURRENT_TIMESTAMP)
    ON CONFLICT(league_slug, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`)
    .bind(leagueSlug, JSON.stringify(merged))
    .run();
  await env.DB.prepare("UPDATE league_spaces SET settings_json = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?")
    .bind(JSON.stringify(merged), leagueSlug)
    .run();
  return merged;
}

export async function listLeagueSpaces(env, { origin = "", includeArchived = false } = {}) {
  const query = includeArchived
    ? "SELECT * FROM league_spaces ORDER BY data_ready DESC, updated_at DESC, id DESC"
    : "SELECT * FROM league_spaces WHERE COALESCE(status, 'active') != 'archived' ORDER BY data_ready DESC, updated_at DESC, id DESC";
  const result = await env.DB.prepare(query).all();
  return (result.results || []).map((row) => leagueSpaceFromRow(row, { origin }));
}

export async function getLeagueSpace(env, slug, { origin = "" } = {}) {
  const cleanSlug = normalizeLeagueSlug(slug, DEFAULT_LEAGUE_SLUG);
  const row = await env.DB.prepare("SELECT * FROM league_spaces WHERE slug = ?").bind(cleanSlug).first();
  return leagueSpaceFromRow(row, { origin });
}

export async function createLeagueSpace(env, payload = {}, { origin = "" } = {}) {
  const name = String(payload.name || payload.leagueName || "").trim();
  if (name.length < 2) throw new Error("请填写至少 2 个字的小组或联赛名称");

  const fallbackSlug = `league-${Math.random().toString(36).slice(2, 8)}`;
  const slug = normalizeLeagueSlug(payload.slug, fallbackSlug).slice(0, 48);
  if (slug === DEFAULT_LEAGUE_SLUG) throw new Error("这个页面路径已被默认联赛使用");

  const existing = await env.DB.prepare("SELECT slug FROM league_spaces WHERE slug = ?").bind(slug).first();
  if (existing) throw new Error("这个页面路径已经被使用，请换一个");

  const ownerName = String(payload.ownerName || payload.owner || "").trim();
  const contact = String(payload.contact || "").trim();
  const adminKey = String(payload.adminKey || "").trim() || randomToken("adm");
  if (adminKey.length < 6) throw new Error("管理密码至少 6 位");

  const settings = normalizeSettings({
    seasonName: String(payload.seasonName || `${name} S1`).trim(),
    leagueId: String(payload.leagueId || "").trim(),
    useLeagueScan: Boolean(String(payload.leagueId || "").trim()),
  });

  await env.DB.prepare(`INSERT INTO league_spaces
    (slug, name, owner_name, contact, admin_key, status, settings_json, data_ready, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'active', ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`)
    .bind(slug, name, ownerName, contact, adminKey, JSON.stringify(settings))
    .run();
  await env.DB.prepare(`INSERT INTO league_settings (league_slug, key, value, updated_at)
    VALUES (?, 'league', ?, CURRENT_TIMESTAMP)
    ON CONFLICT(league_slug, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`)
    .bind(slug, JSON.stringify(settings))
    .run();

  const row = await env.DB.prepare("SELECT * FROM league_spaces WHERE slug = ?").bind(slug).first();
  return leagueSpaceFromRow(row, { includeSecret: true, origin });
}

export async function updateLeagueSpace(env, slug, payload = {}, { origin = "" } = {}) {
  const cleanSlug = normalizeLeagueSlug(slug, DEFAULT_LEAGUE_SLUG);
  const row = await env.DB.prepare("SELECT * FROM league_spaces WHERE slug = ?").bind(cleanSlug).first();
  if (!row) throw new Error("没有找到这个联赛空间");

  const nextName = "name" in payload ? String(payload.name || "").trim() : row.name;
  if (nextName.length < 2) throw new Error("请填写至少 2 个字的联赛名称");

  const ownerName = "ownerName" in payload || "owner" in payload ? String(payload.ownerName || payload.owner || "").trim() : row.owner_name || "";
  const contact = "contact" in payload ? String(payload.contact || "").trim() : row.contact || "";
  const status = ["active", "paused", "archived"].includes(payload.status) ? payload.status : row.status || "active";
  const currentSettings = normalizeSettings(safeJsonParse(row.settings_json, {}));
  const nextSettings = { ...currentSettings, ...(payload.settings || {}) };

  if ("seasonName" in payload) nextSettings.seasonName = String(payload.seasonName || "").trim() || currentSettings.seasonName;
  if ("seasonStart" in payload) nextSettings.seasonStart = String(payload.seasonStart || "").trim() || DEFAULT_SETTINGS.seasonStart;
  if ("seasonEnd" in payload) nextSettings.seasonEnd = String(payload.seasonEnd || "").trim();
  if ("leagueId" in payload) nextSettings.leagueId = String(payload.leagueId || "").trim();
  if ("autoSync" in payload) nextSettings.autoSync = Boolean(payload.autoSync);
  if ("useLeagueScan" in payload) nextSettings.useLeagueScan = Boolean(payload.useLeagueScan);
  if ("allowPartialMatches" in payload) nextSettings.allowPartialMatches = Boolean(payload.allowPartialMatches);
  if ("minRegisteredPlayers" in payload) nextSettings.minRegisteredPlayers = Math.max(1, Math.min(10, Number(payload.minRegisteredPlayers) || DEFAULT_SETTINGS.minRegisteredPlayers));
  if ("minCaptainGames" in payload) nextSettings.minCaptainGames = Math.max(1, Number(payload.minCaptainGames) || DEFAULT_SETTINGS.minCaptainGames);
  if ("winPoints" in payload) nextSettings.winPoints = Math.max(0, Number(payload.winPoints) || DEFAULT_SETTINGS.winPoints);
  if ("lossPoints" in payload) nextSettings.lossPoints = Math.max(0, Number(payload.lossPoints) || DEFAULT_SETTINGS.lossPoints);

  Object.assign(nextSettings, normalizeSettings(nextSettings));
  if (!String(nextSettings.leagueId || "").trim()) nextSettings.useLeagueScan = false;

  let nextAdminKey = row.admin_key || "";
  let includeSecret = false;
  const providedAdminKey = String(payload.adminKey || "").trim();
  if (payload.resetAdminKey) {
    nextAdminKey = randomToken("adm");
    includeSecret = true;
  } else if (providedAdminKey) {
    if (providedAdminKey.length < 6) throw new Error("管理密码至少 6 位");
    nextAdminKey = providedAdminKey;
    includeSecret = true;
  }

  await env.DB.prepare(`UPDATE league_spaces
    SET name = ?,
      owner_name = ?,
      contact = ?,
      admin_key = ?,
      status = ?,
      settings_json = ?,
      data_ready = 1,
      updated_at = CURRENT_TIMESTAMP
    WHERE slug = ?`)
    .bind(nextName, ownerName, contact, nextAdminKey, status, JSON.stringify(nextSettings), cleanSlug)
    .run();

  await env.DB.prepare(`INSERT INTO league_settings (league_slug, key, value, updated_at)
    VALUES (?, 'league', ?, CURRENT_TIMESTAMP)
    ON CONFLICT(league_slug, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`)
    .bind(cleanSlug, JSON.stringify(nextSettings))
    .run();

  const updatedRow = await env.DB.prepare("SELECT * FROM league_spaces WHERE slug = ?").bind(cleanSlug).first();
  return leagueSpaceFromRow(updatedRow, { includeSecret, origin });
}

function normalizePlayoffTeam(team, index = 0) {
  const seed = Number(team?.seed) || index + 1;
  const captainId = team?.captainId ?? team?.captain_id ?? team?.captain?.id ?? "";
  const captainDotaId = String(team?.captainDotaId || team?.captain_dota_id || team?.captain?.dotaId || "").trim();
  const fallbackId = captainId || captainDotaId || seed;
  const players = (Array.isArray(team?.players) ? team.players : [])
    .map((player, playerIndex) => ({
      id: player?.id ?? player?.playerId ?? playerIndex + 1,
      name: String(player?.name || player?.playerName || `队员 ${playerIndex + 1}`).trim(),
      dotaId: String(player?.dotaId || player?.dota_id || "").trim(),
      role: String(player?.role || "").trim(),
      points: Number(player?.points) || 0,
    }))
    .filter((player) => player.name || player.dotaId);

  return {
    id: String(team?.id || `team-${fallbackId}`),
    seed,
    name: String(team?.name || team?.teamName || `${players[0]?.name || `第 ${seed} 队`}队`).trim(),
    captainId,
    captainDotaId,
    captainName: String(team?.captainName || team?.captain_name || players[0]?.name || "").trim(),
    players,
  };
}

function normalizePlayoffSeries(series, index = 0) {
  const key = String(series?.key || "").trim().replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 48);
  const targetWins = [1, 2, 3].includes(Number(series?.targetWins)) ? Number(series.targetWins) : 2;
  if (!key) return null;
  return {
    key,
    label: String(series?.label || `系列赛 ${index + 1}`).trim().slice(0, 60),
    shortLabel: String(series?.shortLabel || series?.label || key).trim().slice(0, 36),
    targetWins,
    teamAId: String(series?.teamAId || "").trim(),
    teamBId: String(series?.teamBId || "").trim(),
    isFinal: Boolean(series?.isFinal),
    order: Number(series?.order) || index + 1,
  };
}

function playoffSeriesDefinitions(state) {
  const custom = (Array.isArray(state?.series) ? state.series : []).map(normalizePlayoffSeries).filter(Boolean);
  return custom.length ? custom.sort((a, b) => a.order - b.order) : Object.values(PLAYOFF_SERIES);
}

function normalizePlayoffGame(game, definitions = PLAYOFF_SERIES) {
  const seriesKey = String(game?.seriesKey || game?.series_key || "").trim();
  const gameNumber = Number(game?.gameNumber || game?.game_number);
  const series = Array.isArray(definitions) ? definitions.find((item) => item.key === seriesKey) : definitions[seriesKey];
  if (!series || !Number.isInteger(gameNumber) || gameNumber < 1 || gameNumber > series.targetWins * 2 - 1) return null;
  return {
    id: `${seriesKey}-${gameNumber}`,
    seriesKey,
    gameNumber,
    matchId: String(game?.matchId || game?.match_id || "").trim(),
    radiantTeamId: String(game?.radiantTeamId || game?.radiant_team_id || "").trim(),
    direTeamId: String(game?.direTeamId || game?.dire_team_id || "").trim(),
    winnerTeamId: String(game?.winnerTeamId || game?.winner_team_id || "").trim(),
    winnerSide: String(game?.winnerSide || game?.winner_side || "").trim(),
    matchTime: String(game?.matchTime || game?.match_time || "").trim(),
    recordedAt: String(game?.recordedAt || game?.recorded_at || "").trim(),
  };
}

function normalizePlayoffState(rawState) {
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const teams = (Array.isArray(source.teams) ? source.teams : [])
    .map(normalizePlayoffTeam)
    .sort((a, b) => a.seed - b.seed);
  const series = (Array.isArray(source.series) ? source.series : []).map(normalizePlayoffSeries).filter(Boolean);
  const definitions = playoffSeriesDefinitions({ series });
  const games = (Array.isArray(source.games) ? source.games : [])
    .map((game) => normalizePlayoffGame(game, definitions))
    .filter(Boolean)
    .filter((game) => game.matchId && game.radiantTeamId && game.direTeamId && game.winnerTeamId);

  return {
    ...DEFAULT_PLAYOFF_STATE,
    ...source,
    version: 1,
    teams,
    series,
    games,
    championTeamId: String(source.championTeamId || ""),
    runnerUpTeamId: String(source.runnerUpTeamId || ""),
    updatedAt: String(source.updatedAt || ""),
  };
}

function playoffTeamBySeed(teams, seed) {
  return teams.find((team) => Number(team.seed) === Number(seed)) || null;
}

function summarizeSeries(state, seriesKey) {
  const series = playoffSeriesDefinitions(state).find((item) => item.key === seriesKey);
  const games = state.games
    .filter((game) => game.seriesKey === seriesKey)
    .sort((a, b) => a.gameNumber - b.gameNumber);
  const scoreByTeam = {};
  games.forEach((game) => {
    if (!game.winnerTeamId) return;
    scoreByTeam[game.winnerTeamId] = (scoreByTeam[game.winnerTeamId] || 0) + 1;
  });

  let defaultTeams = [];
  if (!state.series?.length && seriesKey === "semiA") defaultTeams = [playoffTeamBySeed(state.teams, 1), playoffTeamBySeed(state.teams, 4)].filter(Boolean);
  if (!state.series?.length && seriesKey === "semiB") defaultTeams = [playoffTeamBySeed(state.teams, 2), playoffTeamBySeed(state.teams, 3)].filter(Boolean);
  if (state.series?.length) defaultTeams = [series.teamAId, series.teamBId].map((id) => state.teams.find((team) => team.id === id)).filter(Boolean);

  const usedTeamIds = Array.from(new Set(games.flatMap((game) => [game.radiantTeamId, game.direTeamId]).filter(Boolean)));
  const teams = usedTeamIds.length
    ? usedTeamIds.map((teamId) => state.teams.find((team) => team.id === teamId)).filter(Boolean)
    : defaultTeams;
  const winnerTeamId = Object.entries(scoreByTeam).find(([, score]) => score >= series.targetWins)?.[0] || "";

  return {
    ...series,
    teams,
    games,
    scoreByTeam,
    winnerTeamId,
  };
}

export function summarizePlayoffState(state) {
  const normalized = normalizePlayoffState(state);
  const series = Object.fromEntries(playoffSeriesDefinitions(normalized).map((definition) => [definition.key, summarizeSeries(normalized, definition.key)]));
  const finalSeries = Object.values(series).find((item) => item.isFinal) || series.final || Object.values(series).at(-1);
  const finalScores = finalSeries?.scoreByTeam || {};
  const championTeamId = finalSeries?.winnerTeamId || "";
  const runnerUpTeamId = championTeamId
    ? Object.keys(finalScores).find((teamId) => teamId !== championTeamId) || ""
    : "";
  const status = championTeamId ? "completed" : normalized.teams.length >= 4 ? "playoff" : "drafting";

  return {
    ...normalized,
    status,
    championTeamId,
    runnerUpTeamId,
    series,
  };
}

export async function getPlayoffState(env) {
  const leagueSlug = currentLeagueSlug(env);
  const row = await env.DB.prepare("SELECT value FROM league_playoff_state WHERE league_slug = ? AND key = 'current'").bind(leagueSlug).first();
  if (!row?.value) return summarizePlayoffState(DEFAULT_PLAYOFF_STATE);
  try {
    return summarizePlayoffState(JSON.parse(row.value));
  } catch {
    return summarizePlayoffState(DEFAULT_PLAYOFF_STATE);
  }
}

async function savePlayoffState(env, state) {
  const leagueSlug = currentLeagueSlug(env);
  const summarized = summarizePlayoffState({
    ...state,
    updatedAt: new Date().toISOString(),
  });
  const stored = {
    version: summarized.version,
    status: summarized.status,
    teams: summarized.teams,
    series: summarized.series,
    games: summarized.games,
    championTeamId: summarized.championTeamId,
    runnerUpTeamId: summarized.runnerUpTeamId,
    updatedAt: summarized.updatedAt,
  };
  await env.DB.prepare(`INSERT INTO league_playoff_state (league_slug, key, value, updated_at)
    VALUES (?, 'current', ?, CURRENT_TIMESTAMP)
    ON CONFLICT(league_slug, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`)
    .bind(leagueSlug, JSON.stringify(stored))
    .run();
  return getPlayoffState(env);
}

export async function updatePlayoffSchedule(env, series = []) {
  const current = await getPlayoffState(env);
  const nextSeries = (Array.isArray(series) ? series : []).map(normalizePlayoffSeries).filter(Boolean);
  const keys = new Set();
  const teamIds = new Set(current.teams.map((team) => team.id));
  if (!nextSeries.length) throw new Error("请至少安排一组淘汰赛对阵");
  nextSeries.forEach((item) => {
    if (keys.has(item.key)) throw new Error("淘汰赛系列标识不能重复");
    keys.add(item.key);
    if (!teamIds.has(item.teamAId) || !teamIds.has(item.teamBId) || item.teamAId === item.teamBId) throw new Error("每组对阵都需要选择两支不同的已保存队伍");
  });
  const validKeys = new Set(nextSeries.map((item) => item.key));
  const incompatibleGames = current.games.filter((game) => !validKeys.has(game.seriesKey));
  if (incompatibleGames.length) {
    throw new Error("已有淘汰赛比赛收录在旧赛程中。请先在页面逐局清除旧收录，或保留对应系列标识后再保存新赛程。");
  }
  return savePlayoffState(env, { ...current, series: nextSeries, games: current.games.filter((game) => validKeys.has(game.seriesKey)) });
}

export async function updatePlayoffTeams(env, teams = []) {
  const current = await getPlayoffState(env);
  const nextTeams = (Array.isArray(teams) ? teams : [])
    .map(normalizePlayoffTeam)
    .filter((team) => team.id && team.players.length)
    .sort((a, b) => a.seed - b.seed);
  if (!nextTeams.length) throw new Error("没有可保存的淘汰赛队伍");
  const nextTeamIds = new Set(nextTeams.map((team) => team.id));
  const nextGames = current.games.filter(
    (game) => nextTeamIds.has(game.radiantTeamId) && nextTeamIds.has(game.direTeamId) && nextTeamIds.has(game.winnerTeamId),
  );
  return savePlayoffState(env, {
    ...current,
    teams: nextTeams,
    games: nextGames,
  });
}

function matchWinnerSide(match) {
  const winners = (match?.registeredPlayers || [])
    .filter((player) => player.result === true && player.side)
    .map((player) => player.side);
  const unique = Array.from(new Set(winners));
  return unique.length === 1 ? unique[0] : "";
}

export async function bindPlayoffMatch(env, { matchId, seriesKey, gameNumber, radiantTeamId, direTeamId } = {}) {
  const current = await getPlayoffState(env);
  const cleanSeriesKey = String(seriesKey || "").trim();
  const cleanGameNumber = Number(gameNumber);
  const definition = playoffSeriesDefinitions(current).find((item) => item.key === cleanSeriesKey);
  if (!definition) throw new Error("淘汰赛轮次无效");
  if (!Number.isInteger(cleanGameNumber) || cleanGameNumber < 1 || cleanGameNumber > definition.targetWins * 2 - 1) throw new Error("局数超出该系列赛上限");

  const teamIds = new Set(current.teams.map((team) => team.id));
  const cleanRadiantTeamId = String(radiantTeamId || "").trim();
  const cleanDireTeamId = String(direTeamId || "").trim();
  if (!teamIds.has(cleanRadiantTeamId) || !teamIds.has(cleanDireTeamId)) throw new Error("请选择已保存的淘汰赛队伍");
  if (cleanRadiantTeamId === cleanDireTeamId) throw new Error("天辉和夜魇不能绑定同一支队");

  const match = await getMatch(env, matchId);
  if (!match) throw new Error("比赛不存在，请先识别或手动添加 Match ID");
  const winnerSide = matchWinnerSide(match);
  if (!["天辉", "夜魇"].includes(winnerSide)) throw new Error("这场比赛还没有明确胜方，请先在比赛详情里指定天辉胜或夜魇胜");

  const winnerTeamId = winnerSide === "天辉" ? cleanRadiantTeamId : cleanDireTeamId;
  const game = {
    id: `${cleanSeriesKey}-${cleanGameNumber}`,
    seriesKey: cleanSeriesKey,
    gameNumber: cleanGameNumber,
    matchId: String(match.id),
    radiantTeamId: cleanRadiantTeamId,
    direTeamId: cleanDireTeamId,
    winnerTeamId,
    winnerSide,
    matchTime: match.time || "",
    recordedAt: new Date().toISOString(),
  };

  const games = current.games.filter((item) => item.id !== game.id && String(item.matchId) !== String(game.matchId));
  return savePlayoffState(env, {
    ...current,
    games: [...games, game],
  });
}

export async function clearPlayoffGame(env, { seriesKey, gameNumber } = {}) {
  const current = await getPlayoffState(env);
  const cleanSeriesKey = String(seriesKey || "").trim();
  const cleanGameNumber = Number(gameNumber);
  const id = `${cleanSeriesKey}-${cleanGameNumber}`;
  const definition = playoffSeriesDefinitions(current).find((item) => item.key === cleanSeriesKey);
  if (!definition || !Number.isInteger(cleanGameNumber) || cleanGameNumber < 1 || cleanGameNumber > definition.targetWins * 2 - 1) throw new Error("淘汰赛局数无效");
  return savePlayoffState(env, {
    ...current,
    games: current.games.filter((game) => game.id !== id),
  });
}

export async function resetPlayoffState(env) {
  return savePlayoffState(env, DEFAULT_PLAYOFF_STATE);
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
  const leagueSlug = currentLeagueSlug(env);
  const result = await env.DB.prepare("SELECT * FROM league_players WHERE league_slug = ? ORDER BY id ASC").bind(leagueSlug).all();
  return (result.results || []).map(rowToPlayer);
}

export async function upsertPlayers(env, players) {
  const leagueSlug = currentLeagueSlug(env);
  const now = new Date().toISOString();
  const currentMax = await env.DB.prepare("SELECT COALESCE(MAX(id), 0) AS max_id FROM league_players WHERE league_slug = ?").bind(leagueSlug).first();
  const statements = players.map((player, index) => {
    const id = Number(player.id) || Number(currentMax?.max_id || 0) + index + 1;
    const publicData = player.publicData || player.gameName ? 1 : 0;
    return env.DB.prepare(`INSERT INTO league_players
      (league_slug, id, name, dota_id, role, game_name, avatar_url, profile_url, profile_synced_at, profile_error, public_data, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(league_slug, dota_id) DO UPDATE SET
        name = excluded.name,
        role = excluded.role,
        game_name = COALESCE(NULLIF(excluded.game_name, ''), league_players.game_name),
        avatar_url = COALESCE(NULLIF(excluded.avatar_url, ''), league_players.avatar_url),
        profile_url = COALESCE(NULLIF(excluded.profile_url, ''), league_players.profile_url),
        profile_synced_at = COALESCE(NULLIF(excluded.profile_synced_at, ''), league_players.profile_synced_at),
        profile_error = excluded.profile_error,
        public_data = CASE WHEN excluded.public_data = 1 THEN 1 ELSE league_players.public_data END,
        status = excluded.status,
        updated_at = excluded.updated_at`)
      .bind(
        leagueSlug,
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
  await refreshLeagueSpaceCounts(env, leagueSlug);
  return getPlayers(env);
}

export async function replacePlayers(env, players) {
  const leagueSlug = currentLeagueSlug(env);
  const desiredIds = new Set((players || []).map((player) => String(player.dotaId || player.dota_id || "").trim()).filter(Boolean));
  if (!desiredIds.size) return getPlayers(env);

  const current = await env.DB.prepare("SELECT dota_id FROM league_players WHERE league_slug = ?").bind(leagueSlug).all();
  const deleteStatements = (current.results || [])
    .filter((row) => !desiredIds.has(String(row.dota_id)))
    .map((row) => env.DB.prepare("DELETE FROM league_players WHERE league_slug = ? AND dota_id = ?").bind(leagueSlug, String(row.dota_id)));

  if (deleteStatements.length) await env.DB.batch(deleteStatements);
  return upsertPlayers(env, players);
}

export async function deletePlayer(env, dotaId) {
  const leagueSlug = currentLeagueSlug(env);
  await env.DB.prepare("DELETE FROM league_players WHERE league_slug = ? AND dota_id = ?").bind(leagueSlug, String(dotaId)).run();
  await refreshLeagueSpaceCounts(env, leagueSlug);
  return getPlayers(env);
}

export async function updatePlayer(env, dotaId, patch = {}) {
  const leagueSlug = currentLeagueSlug(env);
  const current = await env.DB.prepare("SELECT * FROM league_players WHERE league_slug = ? AND dota_id = ?").bind(leagueSlug, String(dotaId)).first();
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

  await env.DB.prepare(`UPDATE league_players SET
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
    WHERE league_slug = ? AND dota_id = ?`)
    .bind(name, role, gameName, avatarUrl, profileUrl, profileSyncedAt, profileError, publicData, status, leagueSlug, String(dotaId))
    .run();

  const updated = await env.DB.prepare("SELECT * FROM league_players WHERE league_slug = ? AND dota_id = ?").bind(leagueSlug, String(dotaId)).first();
  return rowToPlayer(updated);
}

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

function prioritizeProfileSyncQueue(players) {
  return [...players].sort((left, right) => {
    const leftNeedsSync = !left.publicData || left.profileError;
    const rightNeedsSync = !right.publicData || right.profileError;
    if (leftNeedsSync !== rightNeedsSync) return leftNeedsSync ? -1 : 1;
    return Number(left.id || 0) - Number(right.id || 0);
  });
}

export async function syncPlayerProfiles(env, { limit = 45, throttleMs = 850, retryAttempts = 2 } = {}) {
  const leagueSlug = currentLeagueSlug(env);
  const roster = prioritizeProfileSyncQueue(await getPlayers(env));
  const safeLimit = Math.max(1, Math.min(roster.length || 1, Number(limit) || 45));
  const safeThrottleMs = Math.max(250, Math.min(3000, Number(throttleMs) || 850));
  const results = [];
  let rateLimited = false;

  for (const player of roster.slice(0, safeLimit)) {
    if (results.length > 0) await delay(safeThrottleMs);

    const dotaId = String(player.dotaId || "").trim();
    if (!/^\d+$/.test(dotaId)) {
      results.push({ id: player.id, ok: false, error: "DOTA2 ID 无效" });
      continue;
    }

    try {
      const response = await openDotaFetchWithRetry(env, `/players/${dotaId}`, undefined, { attempts: retryAttempts, baseDelayMs: 1800 });
      if (!response.ok) {
        const error = describeOpenDotaError(response.status);
        results.push({ id: player.id, ok: false, error, status: response.status });
        if (response.status === 429) {
          rateLimited = true;
          break;
        }
        continue;
      }

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
      return env.DB.prepare(`UPDATE league_players
        SET profile_error = ?, status = CASE WHEN public_data = 1 THEN '资料保留，等待重试' ELSE '资料待重试' END, updated_at = CURRENT_TIMESTAMP
        WHERE league_slug = ? AND id = ?`)
        .bind(result.error, leagueSlug, result.id);
    }

    return env.DB.prepare(`UPDATE league_players
      SET name = ?, game_name = ?, avatar_url = ?, profile_url = ?, profile_synced_at = ?, profile_error = '', public_data = 1, status = '资料已同步', updated_at = CURRENT_TIMESTAMP
      WHERE league_slug = ? AND id = ?`)
      .bind(result.name, result.gameName, result.avatarUrl, result.profileUrl, syncedAt, leagueSlug, result.id);
  });
  if (statements.length) await env.DB.batch(statements);

  const successCount = results.filter((result) => result.ok).length;
  const failedCount = results.length - successCount;
  const skippedCount = Math.max(0, roster.length - results.length);
  const message = rateLimited
    ? `限速同步已暂停：${successCount} 个成功，${failedCount} 个待重试，${skippedCount} 个留到下一轮。`
    : `限速同步完成：${successCount} 个成功，${failedCount} 个失败，${skippedCount} 个未处理。`;

  return {
    players: await getPlayers(env),
    successCount,
    failedCount,
    skippedCount,
    processedCount: results.length,
    rateLimited,
    results,
    message,
  };
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function rowToSyncRun(row) {
  return {
    id: row.id,
    kind: row.kind || "manual",
    status: row.status || "success",
    summary: row.summary || "",
    details: parseJson(row.details_json, {}),
    startedAt: row.started_at || "",
    finishedAt: row.finished_at || "",
  };
}

function rowToAuditLog(row) {
  return {
    id: row.id,
    action: row.action || "",
    matchId: row.match_id || "",
    actor: row.actor || "管理员",
    summary: row.summary || "",
    details: parseJson(row.details_json, {}),
    createdAt: row.created_at || "",
  };
}

export async function getSyncRuns(env, limit = 50) {
  const leagueSlug = currentLeagueSlug(env);
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 50);
  const result = await env.DB.prepare("SELECT * FROM league_sync_runs WHERE league_slug = ? ORDER BY finished_at DESC, id DESC LIMIT ?").bind(leagueSlug, safeLimit).all();
  return (result.results || []).map(rowToSyncRun);
}

export async function getAuditLogs(env, limit = 100) {
  const leagueSlug = currentLeagueSlug(env);
  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 100);
  const result = await env.DB.prepare("SELECT * FROM league_audit_logs WHERE league_slug = ? ORDER BY created_at DESC, id DESC LIMIT ?").bind(leagueSlug, safeLimit).all();
  return (result.results || []).map(rowToAuditLog);
}

export async function recordSyncRun(env, { kind = "manual", status = "success", summary = "", details = {}, startedAt } = {}) {
  const leagueSlug = currentLeagueSlug(env);
  const started = startedAt || new Date().toISOString();
  const finished = new Date().toISOString();
  let normalizedDetails = details || {};
  try {
    normalizedDetails = seasonLogDetails(await getSettings(env), normalizedDetails);
  } catch {
    normalizedDetails = details || {};
  }
  const result = await env.DB.prepare(`INSERT INTO league_sync_runs
    (league_slug, kind, status, summary, details_json, started_at, finished_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(leagueSlug, kind, status, summary, JSON.stringify(normalizedDetails || {}), started, finished)
    .run();
  const row = await env.DB.prepare("SELECT * FROM league_sync_runs WHERE league_slug = ? AND id = ?").bind(leagueSlug, result.meta?.last_row_id || 0).first();
  return row ? rowToSyncRun(row) : null;
}

export async function logAuditAction(env, { action, matchId = "", actor = "管理员", summary = "", details = {} } = {}) {
  if (!action) return null;
  const leagueSlug = currentLeagueSlug(env);
  let normalizedDetails = details || {};
  try {
    const settings = await getSettings(env);
    let preferredSeason = null;
    if (matchId) {
      const match = await getMatch(env, matchId);
      if (match?.startTime) {
        preferredSeason = seasonForStartTime(settings, match.startTime);
        normalizedDetails = {
          ...(normalizedDetails || {}),
          matchStartTime: normalizedDetails.matchStartTime || match.startTime,
        };
      }
    }
    normalizedDetails = seasonLogDetails(settings, normalizedDetails, preferredSeason);
  } catch {
    normalizedDetails = details || {};
  }
  const result = await env.DB.prepare(`INSERT INTO league_audit_logs
    (league_slug, action, match_id, actor, summary, details_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`)
    .bind(leagueSlug, action, String(matchId || ""), actor || "管理员", summary || "", JSON.stringify(normalizedDetails || {}))
    .run();
  const row = await env.DB.prepare("SELECT * FROM league_audit_logs WHERE league_slug = ? AND id = ?").bind(leagueSlug, result.meta?.last_row_id || 0).first();
  return row ? rowToAuditLog(row) : null;
}

function rowToMatch(row) {
  const detail = parseJson(row.detail_json, null);
  const detailPlayers = Array.isArray(detail?.players) ? detail.players : [];
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
    detailSource: detail?.data_source || "",
    detailPlayerCount: detailPlayers.length,
    hasKnownWinner: hasBooleanWinner(detail),
  };
}

export async function getMatches(env) {
  const leagueSlug = currentLeagueSlug(env);
  const result = await env.DB.prepare("SELECT * FROM league_matches WHERE league_slug = ? ORDER BY COALESCE(start_time, 0) DESC, created_at DESC").bind(leagueSlug).all();
  return (result.results || []).map(rowToMatch);
}

export async function getMatch(env, matchId) {
  const leagueSlug = currentLeagueSlug(env);
  const row = await env.DB.prepare("SELECT * FROM league_matches WHERE league_slug = ? AND id = ?").bind(leagueSlug, String(matchId)).first();
  return row ? rowToMatch(row) : null;
}

export async function getMatchDetail(env, matchId) {
  const leagueSlug = currentLeagueSlug(env);
  const row = await env.DB.prepare("SELECT detail_json FROM league_matches WHERE league_slug = ? AND id = ?").bind(leagueSlug, String(matchId)).first();
  return parseJson(row?.detail_json, null);
}

export async function upsertMatch(env, match, { preserveStatus = true } = {}) {
  const leagueSlug = currentLeagueSlug(env);
  const existing = await env.DB.prepare("SELECT status FROM league_matches WHERE league_slug = ? AND id = ?").bind(leagueSlug, String(match.id)).first();
  const status = preserveStatus && existing?.status ? existing.status : match.status || "待确认";
  await env.DB.prepare(`INSERT INTO league_matches
    (league_slug, id, time, start_time, lobby_type, game_mode, total, status, score, notes, registered, sides, hidden, is_ranked_ladder, registered_players_json, detail_json, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(league_slug, id) DO UPDATE SET
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
      detail_json = COALESCE(excluded.detail_json, league_matches.detail_json),
      updated_at = CURRENT_TIMESTAMP`)
    .bind(
      leagueSlug,
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
  await refreshLeagueSpaceCounts(env, leagueSlug);
  return getMatch(env, match.id);
}

export async function updateMatchStatus(env, matchId, status) {
  const current = await getMatch(env, matchId);
  const notesByStatus = {
    待确认: "管理员已恢复到待确认，可重新识别和复核",
    已确认: "管理员已确认，等待入库计分",
    已入库: "已按当前积分规则完成入库",
    已驳回: "管理员驳回：不满足本期有效内战标准",
  };
  const notes = current?.status === "已入库" && status === "已确认" ? "管理员已撤销入库，积分榜已回滚；比赛保留为已确认，可重新复核后再次入库" : notesByStatus[status] || "";
  if (status === "待确认") {
    const leagueSlug = currentLeagueSlug(env);
    await env.DB.prepare("UPDATE league_matches SET status = ?, notes = ?, hidden = 0, is_ranked_ladder = 0, updated_at = CURRENT_TIMESTAMP WHERE league_slug = ? AND id = ?")
      .bind(status, notes, leagueSlug, String(matchId))
      .run();
    return getMatch(env, matchId);
  }
  const leagueSlug = currentLeagueSlug(env);
  await env.DB.prepare("UPDATE league_matches SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE league_slug = ? AND id = ?")
    .bind(status, notes, leagueSlug, String(matchId))
    .run();
  return getMatch(env, matchId);
}

export async function updateMatchWinner(env, matchId, winnerSide) {
  if (!["天辉", "夜魇"].includes(winnerSide)) throw new Error("胜方只能选择天辉或夜魇");
  const leagueSlug = currentLeagueSlug(env);
  const row = await env.DB.prepare("SELECT registered_players_json, detail_json, notes FROM league_matches WHERE league_slug = ? AND id = ?").bind(leagueSlug, String(matchId)).first();
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
  const detail = parseJson(row.detail_json, null);
  const nextDetail = detail && typeof detail === "object" ? { ...detail, radiant_win: winnerSide === "天辉", manual_winner_override: true } : detail;
  await env.DB.prepare("UPDATE league_matches SET registered_players_json = ?, detail_json = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE league_slug = ? AND id = ?")
    .bind(JSON.stringify(nextPlayers), nextDetail ? JSON.stringify(nextDetail) : row.detail_json || null, notes, leagueSlug, String(matchId))
    .run();
  return getMatch(env, matchId);
}

function normalizeManualRosterRows(rows) {
  return (Array.isArray(rows) ? rows : [])
    .map((row, index) => {
      const side = row?.side === "夜魇" ? "夜魇" : "天辉";
      const sideIndex = Number.isFinite(Number(row?.sideIndex)) ? Number(row.sideIndex) : index % 5;
      const playerSlot = side === "天辉" ? sideIndex : 128 + sideIndex;
      return {
        side,
        sideIndex,
        playerSlot,
        accountId: String(row?.accountId || "").trim(),
        name: String(row?.name || "").trim(),
        heroId: Number(row?.heroId) || 0,
        kills: Number.isFinite(Number(row?.kills)) ? Number(row.kills) : null,
        deaths: Number.isFinite(Number(row?.deaths)) ? Number(row.deaths) : null,
        assists: Number.isFinite(Number(row?.assists)) ? Number(row.assists) : null,
      };
    })
    .filter((row) => row.accountId || row.name || row.heroId);
}

function validateManualRosterInput(rows) {
  const entries = Array.isArray(rows) ? rows : [];
  const errors = [];
  const seenAccounts = new Set();
  const seenSlots = new Set();
  let filledRows = 0;

  entries.forEach((row, index) => {
    const side = row?.side === "夜魇" ? "夜魇" : "天辉";
    const sideIndex = Number.isFinite(Number(row?.sideIndex)) ? Number(row.sideIndex) : index % 5;
    const slot = `${side}${sideIndex + 1}`;
    const accountId = String(row?.accountId || "").trim();
    const hasData = accountId || String(row?.name || "").trim() || [row?.heroId, row?.kills, row?.deaths, row?.assists].some((value) => value !== "" && value !== null && value !== undefined);
    if (hasData) filledRows += 1;
    if (hasData) {
      if (seenSlots.has(slot)) errors.push(`${slot} 被重复填写。`);
      seenSlots.add(slot);
    }
    if (accountId && !/^\d+$/.test(accountId)) errors.push(`${slot} 的 DOTA2 ID 必须是数字。`);
    if (accountId) {
      if (seenAccounts.has(accountId)) errors.push(`DOTA2 ID ${accountId} 重复出现。`);
      seenAccounts.add(accountId);
    }
    [["英雄 ID", row?.heroId, true], ["击杀", row?.kills, false], ["死亡", row?.deaths, false], ["助攻", row?.assists, false]].forEach(([label, value, integerOnly]) => {
      if (value === "" || value === null || value === undefined) return;
      const number = Number(value);
      if (!Number.isFinite(number) || number < 0 || (integerOnly && !Number.isInteger(number))) errors.push(`${slot} 的${label}必须是非负${integerOnly ? "整数" : "数字"}。`);
    });
  });

  if (entries.length > 10) errors.push("手动阵容最多只能保存 10 个位置。");
  if (!filledRows) errors.push("至少需要保留一名玩家记录。");
  return Array.from(new Set(errors));
}

export async function updateMatchManualRoster(env, matchId, manualRoster = []) {
  const leagueSlug = currentLeagueSlug(env);
  const row = await env.DB.prepare("SELECT * FROM league_matches WHERE league_slug = ? AND id = ?").bind(leagueSlug, String(matchId)).first();
  if (!row) return null;

  const validationErrors = validateManualRosterInput(manualRoster);
  if (validationErrors.length) throw new Error(validationErrors[0]);
  const rosterRows = normalizeManualRosterRows(manualRoster);
  const playerLibrary = await getPlayers(env);
  const playerByAccount = new Map(playerLibrary.map((player) => [String(player.dotaId), player]));
  const currentDetail = parseJson(row.detail_json, null);
  const currentPlayers = Array.isArray(currentDetail?.players) ? currentDetail.players : [];
  const mergedPlayers = new Map(currentPlayers.map((player, index) => [String(player.player_slot ?? index), player]));

  rosterRows.forEach((entry) => {
    const libraryPlayer = entry.accountId ? playerByAccount.get(entry.accountId) : null;
    const personaname = libraryPlayer?.name || entry.name || (entry.accountId ? `非名单玩家 ${entry.accountId}` : `手动玩家 ${entry.sideIndex + 1}`);
    const key = String(entry.playerSlot);
    mergedPlayers.set(key, {
      account_id: entry.accountId || undefined,
      personaname,
      name: personaname,
      player_slot: entry.playerSlot,
      hero_id: entry.heroId,
      kills: entry.kills,
      deaths: entry.deaths,
      assists: entry.assists,
      manual_player: true,
      registered_roster_player: Boolean(libraryPlayer),
    });
  });

  const nextPlayers = Array.from(mergedPlayers.values()).sort((a, b) => Number(a.player_slot || 0) - Number(b.player_slot || 0));
  const nextDetail = {
    ...(currentDetail || {}),
    match_id: Number(matchId) || matchId,
    lobby_type: currentDetail?.lobby_type ?? row.lobby_type ?? undefined,
    game_mode: currentDetail?.game_mode ?? row.game_mode ?? undefined,
    start_time: currentDetail?.start_time ?? row.start_time ?? undefined,
    data_source: currentDetail?.data_source || "manual-roster",
    manual_roster_override: true,
    players: nextPlayers,
  };

  const seenRegisteredAccounts = new Set();
  const registeredPlayers = nextPlayers
    .map((player) => {
      const accountId = String(player.account_id || "");
      const libraryPlayer = accountId ? playerByAccount.get(accountId) : null;
      if (!libraryPlayer) return null;
      if (seenRegisteredAccounts.has(accountId)) return null;
      seenRegisteredAccounts.add(accountId);
      const side = playerSide(player.player_slot);
      return {
        accountId,
        name: libraryPlayer.name,
        side,
        playerSlot: player.player_slot,
        heroId: player.hero_id,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        result: playerWon(side, nextDetail),
      };
    })
    .filter(Boolean);

  const radiantCount = registeredPlayers.filter((player) => player.side === "天辉").length;
  const direCount = registeredPlayers.filter((player) => player.side === "夜魇").length;
  const currentNotes = row.notes || "";
  const cleanNotes = currentNotes.replace(/^管理员手动补全阵容；?/, "");
  const notes = `管理员手动补全阵容；${cleanNotes || "非玩家库人员只用于展示，不进入积分统计。"}`;

  await env.DB.prepare(`UPDATE league_matches SET
    total = ?,
    registered = ?,
    sides = ?,
    score = ?,
    notes = ?,
    registered_players_json = ?,
    detail_json = ?,
    updated_at = CURRENT_TIMESTAMP
    WHERE league_slug = ? AND id = ?`)
    .bind(
      Math.max(nextPlayers.length, Number(row.total || 10), 10),
      registeredPlayers.length,
      `${radiantCount} : ${direCount}`,
      registeredPlayers.length >= 10 ? "手动补全 10 人内战" : `手动补全，玩家库命中 ${registeredPlayers.length}`,
      notes,
      JSON.stringify(registeredPlayers),
      JSON.stringify(nextDetail),
      leagueSlug,
      String(matchId),
    )
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
  if (Number.isFinite(Number(dateRange?.startSeconds)) && Number.isFinite(Number(dateRange?.endSeconds))) {
    return {
      startSeconds: Number(dateRange.startSeconds),
      endSeconds: Number(dateRange.endSeconds),
      valid: Number(dateRange.startSeconds) <= Number(dateRange.endSeconds),
    };
  }
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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryAfterMs(response, fallbackMs) {
  const retryAfter = Number(response?.headers?.get("retry-after"));
  if (Number.isFinite(retryAfter) && retryAfter > 0) return Math.min(retryAfter * 1000, 10000);
  return fallbackMs;
}

export function describeOpenDotaError(status) {
  if (status === 429) return "OpenDota 限流，已暂停本轮队列，稍后会自动重试";
  if (status >= 500) return `OpenDota 服务暂时异常 HTTP ${status}`;
  return `OpenDota HTTP ${status}`;
}

export async function openDotaFetchWithRetry(env, path, init, { attempts = 2, baseDelayMs = 1400 } = {}) {
  let response = null;
  const safeAttempts = Math.max(1, Number(attempts) || 1);

  for (let attempt = 1; attempt <= safeAttempts; attempt += 1) {
    response = await openDotaFetch(env, path, init);
    if (response.ok || (response.status !== 429 && response.status < 500)) return response;
    if (attempt < safeAttempts) {
      await delay(retryAfterMs(response, baseDelayMs * attempt));
    }
  }

  return response;
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

export async function getSteamMatchDetailBySequence(env, matchId, matchSeqNum) {
  if (!env.STEAM_API_KEY) {
    return { ok: false, status: 0, error: "STEAM_API_KEY is not configured" };
  }
  const cleanSequence = String(matchSeqNum || "").trim();
  if (!/^\d+$/.test(cleanSequence)) {
    return { ok: false, skipped: true, status: 0, error: "Steam league history is missing match_seq_num" };
  }

  const sequenceCandidates = [cleanSequence];
  try {
    const sequence = BigInt(cleanSequence);
    for (const offset of [1n, 1000n, 5000n, 25000n]) {
      const candidate = sequence - offset;
      if (candidate > 0n) sequenceCandidates.push(String(candidate));
    }
  } catch {
    // Keep the original sequence if BigInt parsing is unavailable for any reason.
  }

  let lastStatus = 0;
  let lastPayload = null;
  let lastError = "";
  const seenSequences = Array.from(new Set(sequenceCandidates));

  for (const sequence of seenSequences) {
    let response;
    let payload = null;
    let rawText = "";
    try {
      response = await steamDotaFetch(env, "GetMatchHistoryBySequenceNum", {
        start_at_match_seq_num: sequence,
        matches_requested: 100,
      });
      rawText = await response.text().catch(() => "");
      payload = parseJsonPayload(rawText);
    } catch (error) {
      return { ok: false, status: 0, error: error instanceof Error ? error.message : "Steam sequence request failed" };
    }

    lastStatus = response.status;
    lastPayload = payload;

    if (!response.ok) {
      const message = extractSteamApiMessage(payload, rawText);
      lastError = message ? `Steam Sequence API HTTP ${response.status}: ${message}` : `Steam Sequence API HTTP ${response.status}`;
      break;
    }

    const matches = Array.isArray(payload?.result?.matches) ? payload.result.matches : [];
    const rawMatch = matches.find((match) => String(match?.match_id || "") === String(matchId));
    if (!rawMatch) {
      const returnedIds = matches
        .slice(0, 5)
        .map((match) => match?.match_id)
        .filter(Boolean)
        .join(", ");
      lastError = returnedIds
        ? `Steam Sequence API did not include match ${matchId} from seq ${sequence}; returned ${returnedIds}`
        : `Steam Sequence API did not include match ${matchId} from seq ${sequence}`;
      continue;
    }

    const detail = normalizeSteamMatchDetail(rawMatch, matchId);
    if (!detail) {
      const message = extractSteamApiMessage(payload, rawText);
      lastError = message ? `Steam Sequence API returned unusable detail: ${message}` : "Steam Sequence API returned unusable detail";
      continue;
    }

    return { ok: true, status: response.status, detail: { ...detail, data_source: "steam-sequence" }, payload };
  }

  return {
    ok: false,
    status: lastStatus,
    error: lastError || `Steam Sequence API did not include match ${matchId}`,
    payload: lastPayload,
  };
}

function stratzToken(env) {
  return env.STRATZ_API_TOKEN || env.STRATZ_TOKEN || env.STRATZ_API_KEY || "";
}

export function getRuntimeCapabilities(env) {
  return {
    d1: Boolean(env.DB),
    openDotaApiKey: Boolean(env.OPENDOTA_API_KEY),
    steamApiKey: Boolean(env.STEAM_API_KEY),
    stratzApiToken: Boolean(stratzToken(env)),
    cronSecret: Boolean(env.CRON_SECRET || env.ADMIN_TOKEN),
  };
}

function normalizeStratzUnixTime(value) {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) return undefined;
    if (value > 1000000000000) return Math.floor(value / 1000);
    return Math.floor(value);
  }
  const trimmed = String(value).trim();
  if (!trimmed) return undefined;
  if (/^\d+$/.test(trimmed)) return normalizeStratzUnixTime(Number(trimmed));
  const parsed = Date.parse(trimmed);
  return Number.isFinite(parsed) ? Math.floor(parsed / 1000) : undefined;
}

function normalizeStratzAccountId(value) {
  if (value === undefined || value === null || value === "") return "";
  const text = String(value).trim();
  if (!/^\d+$/.test(text)) return text;
  try {
    const steam64Base = 76561197960265728n;
    const number = BigInt(text);
    if (number > steam64Base) return String(number - steam64Base);
  } catch {
    // Keep the original value if BigInt parsing fails.
  }
  return text;
}

function finiteNumberOrUndefined(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function normalizeStratzWinner(match, players) {
  if (typeof match?.didRadiantWin === "boolean") return match.didRadiantWin;
  if (typeof match?.radiantWin === "boolean") return match.radiantWin;
  if (typeof match?.radiant_win === "boolean") return match.radiant_win;
  const winningPlayer = (players || []).find((player) => typeof player?.isVictory === "boolean");
  if (!winningPlayer) return null;
  return Boolean(winningPlayer.isRadiant) === Boolean(winningPlayer.isVictory);
}

function normalizeStratzPlayerSlot(player, teamIndex) {
  const explicitSlot = finiteNumberOrUndefined(player?.playerSlot ?? player?.player_slot);
  if (explicitSlot !== undefined) return explicitSlot;
  const safeIndex = Math.min(Math.max(Number(teamIndex) || 0, 0), 4);
  return player?.isRadiant === false ? 128 + safeIndex : safeIndex;
}

function normalizeStratzMatchDetail(payload, matchId) {
  const match = payload?.data?.match || payload?.match || null;
  if (!match || typeof match !== "object") return null;
  const sourcePlayers = Array.isArray(match.players) ? match.players : [];
  if (!sourcePlayers.length) return null;

  const radiantWin = normalizeStratzWinner(match, sourcePlayers);
  let radiantIndex = 0;
  let direIndex = 0;
  const players = sourcePlayers.map((player) => {
    const isRadiant = player?.isRadiant !== false;
    const teamIndex = isRadiant ? radiantIndex++ : direIndex++;
    return {
      account_id: normalizeStratzAccountId(player?.steamAccountId ?? player?.accountId ?? player?.steamAccount?.id),
      player_slot: normalizeStratzPlayerSlot(player, teamIndex),
      hero_id: finiteNumberOrUndefined(player?.heroId ?? player?.hero_id),
      kills: finiteNumberOrUndefined(player?.kills ?? player?.numKills),
      deaths: finiteNumberOrUndefined(player?.deaths ?? player?.numDeaths),
      assists: finiteNumberOrUndefined(player?.assists ?? player?.numAssists),
      gold_per_min: finiteNumberOrUndefined(player?.goldPerMinute ?? player?.goldPerMin ?? player?.gpm),
      xp_per_min: finiteNumberOrUndefined(player?.experiencePerMinute ?? player?.xpPerMinute ?? player?.xpm),
      personaname: player?.steamAccount?.name || player?.name || "",
    };
  });

  return {
    match_id: Number(match.id || match.matchId || matchId),
    leagueid: finiteNumberOrUndefined(match.leagueId ?? match.league?.id) || 0,
    lobby_type: finiteNumberOrUndefined(match.lobbyType ?? match.lobby_type),
    game_mode: finiteNumberOrUndefined(match.gameMode ?? match.game_mode),
    radiant_win: typeof radiantWin === "boolean" ? radiantWin : null,
    start_time: normalizeStratzUnixTime(match.startDateTime ?? match.startTime ?? match.start_time),
    duration: finiteNumberOrUndefined(match.durationSeconds ?? match.duration),
    data_source: "stratz",
    players,
  };
}

function stratzQueryVariants(matchId) {
  const id = String(matchId || "").replace(/\D/g, "");
  return [
    `query { match(id: ${id}) { id didRadiantWin durationSeconds startDateTime gameMode lobbyType leagueId players { steamAccountId heroId kills deaths assists goldPerMinute experiencePerMinute isRadiant isVictory playerSlot steamAccount { name } } } }`,
    `query { match(id: ${id}) { id didRadiantWin durationSeconds startDateTime players { steamAccountId heroId kills deaths assists isRadiant isVictory playerSlot } } }`,
    `query { match(id: ${id}) { id players { steamAccountId heroId kills deaths assists isRadiant isVictory } } }`,
  ];
}

function extractStratzApiMessage(payload, rawText) {
  const messages = Array.isArray(payload?.errors)
    ? payload.errors.map((error) => error?.message).filter(Boolean)
    : [];
  if (messages.length) return messages.join("；").slice(0, 220);
  if (payload?.error) return String(payload.error).slice(0, 220);
  if (rawText && !payload) return rawText.trim().replace(/\s+/g, " ").slice(0, 180);
  return "";
}

export async function getStratzMatchDetail(env, matchId) {
  const token = stratzToken(env);
  if (!token) {
    return { ok: false, skipped: true, status: 0, error: "STRATZ_API_TOKEN 未配置" };
  }
  if (!/^\d+$/.test(String(matchId || ""))) {
    return { ok: false, status: 0, error: "Match ID 无效" };
  }

  let lastStatus = 0;
  let lastError = "";
  let lastPayload = null;

  for (const query of stratzQueryVariants(matchId)) {
    let response;
    let rawText = "";
    let payload = null;
    try {
      response = await fetch(STRATZ_GRAPHQL_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
          "user-agent": "dota2-inhouse-league-dashboard/1.0",
        },
        body: JSON.stringify({ query }),
      });
      rawText = await response.text().catch(() => "");
      payload = parseJsonPayload(rawText);
    } catch (error) {
      return { ok: false, status: 0, error: error instanceof Error ? error.message : "STRATZ API 请求失败" };
    }

    lastStatus = response.status;
    lastPayload = payload;
    if (!response.ok) {
      const message = extractStratzApiMessage(payload, rawText);
      lastError = message ? `STRATZ HTTP ${response.status}：${message}` : `STRATZ HTTP ${response.status}`;
      break;
    }

    const detail = normalizeStratzMatchDetail(payload, matchId);
    if (detail) return { ok: true, status: response.status, detail, payload };

    lastError = extractStratzApiMessage(payload, rawText) || "STRATZ 未返回可用比赛详情";
  }

  return {
    ok: false,
    status: lastStatus,
    error: lastError || "STRATZ 未返回可用比赛详情",
    payload: lastPayload,
  };
}

export async function getSteamLeagueMatches(env, leagueId, { matchesRequested = 100, maxPages = 6 } = {}) {
  const cleanLeagueId = String(leagueId || "").trim();
  if (!cleanLeagueId) return { ok: false, status: 0, error: "League ID 未配置", matches: [] };
  if (!env.STEAM_API_KEY) return { ok: false, status: 0, error: "STEAM_API_KEY 未配置", matches: [] };

  const pageSize = Math.min(Math.max(Number(matchesRequested) || 100, 1), 100);
  const pageLimit = Math.min(Math.max(Number(maxPages) || 6, 1), 10);
  const allMatches = [];
  const seenMatchIds = new Set();
  let startAtMatchId = "";
  let lastPayload = null;
  let lastStatus = 0;
  let lastSteamStatus = 1;
  let totalResults = 0;
  let resultsRemaining = 0;
  let pagesFetched = 0;
  let partial = false;
  let partialError = "";

  for (let page = 0; page < pageLimit; page += 1) {
    let response;
    let payload = null;
    let rawText = "";
    const beforeCount = allMatches.length;

    try {
      const params = {
        league_id: cleanLeagueId,
        min_players: 10,
        matches_requested: pageSize,
      };
      if (startAtMatchId) params.start_at_match_id = startAtMatchId;
      response = await steamDotaFetch(env, "GetMatchHistory", params);
      rawText = await response.text().catch(() => "");
      payload = parseJsonPayload(rawText);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Steam 联赛比赛列表请求失败";
      if (allMatches.length) {
        partial = true;
        partialError = errorMessage;
        break;
      }
      return {
        ok: false,
        status: 0,
        error: errorMessage,
        matches: [],
      };
    }

    lastStatus = response.status;
    lastPayload = payload;

    if (!response.ok) {
      const message = extractSteamApiMessage(payload, rawText);
      const errorMessage = message ? `Steam GetMatchHistory HTTP ${response.status}：${message}` : `Steam GetMatchHistory HTTP ${response.status}`;
      if (allMatches.length) {
        partial = true;
        partialError = errorMessage;
        break;
      }
      return {
        ok: false,
        status: response.status,
        error: errorMessage,
        matches: [],
        payload,
      };
    }

    const result = payload?.result || {};
    const matches = Array.isArray(result.matches) ? result.matches : [];
    const status = Number(result.status || 0);
    lastSteamStatus = status || 1;
    totalResults = Number(result.total_results || totalResults || matches.length || 0);
    resultsRemaining = Number(result.results_remaining || 0);
    pagesFetched += 1;

    if (status && status !== 1 && !matches.length) {
      const message = extractSteamApiMessage(payload, rawText);
      const errorMessage = message ? `Steam GetMatchHistory status=${status}：${message}` : `Steam GetMatchHistory status=${status}`;
      if (allMatches.length) {
        partial = true;
        partialError = errorMessage;
        break;
      }
      return {
        ok: false,
        status: response.status,
        steamStatus: status,
        error: errorMessage,
        matches: [],
        payload,
      };
    }

    for (const match of matches) {
      const matchId = String(match?.match_id || "");
      if (!matchId || seenMatchIds.has(matchId)) continue;
      seenMatchIds.add(matchId);
      allMatches.push(match);
    }

    const lastMatchId = String(matches[matches.length - 1]?.match_id || "");
    if (!matches.length || !lastMatchId || resultsRemaining <= 0) break;
    if (page > 0 && allMatches.length === beforeCount) break;
    startAtMatchId = lastMatchId;
  }

  if (resultsRemaining > 0 && pagesFetched >= pageLimit) partial = true;

  return {
    ok: true,
    status: lastStatus,
    steamStatus: lastSteamStatus,
    matches: allMatches,
    totalResults: totalResults || allMatches.length || 0,
    resultsRemaining,
    pagesFetched,
    pageSize,
    partial,
    error: partialError,
    payload: lastPayload,
  };
}

function sourceAttemptError(attempt) {
  if (!attempt) return "";
  if (attempt.skipped) return "";
  if (attempt.ok) return "";
  if (attempt.error) return attempt.error;
  if (attempt.status) return `${attempt.source} HTTP ${attempt.status}`;
  return `${attempt.source} 未返回可用详情`;
}

function combinedLookupError(attempts) {
  return (attempts || [])
    .map(sourceAttemptError)
    .filter(Boolean)
    .join("；") || "数据源暂未返回这场比赛详情";
}

export async function fetchMatchDetailWithFallback(env, matchId, { requestOpenDotaParse = false, useSteam = true, useStratz = true } = {}) {
  const attempts = [];
  let openDotaResponse = null;
  let openDotaStatus = 0;
  let parseRequested = false;
  let openDotaError = "";

  try {
    openDotaResponse = await openDotaFetch(env, `/matches/${matchId}`);
    openDotaStatus = openDotaResponse.status;
  } catch (error) {
    openDotaError = error instanceof Error ? error.message : "OpenDota 请求失败";
    attempts.push({ source: "opendota", ok: false, status: 0, error: openDotaError });
  }

  if (openDotaResponse?.ok) {
    const detail = await openDotaResponse.json();
    attempts.push({ source: "opendota", ok: true, status: openDotaResponse.status });
    return {
      ok: true,
      source: "opendota",
      detail: { ...detail, data_source: "opendota" },
      openDotaStatus: openDotaResponse.status,
      steamStatus: null,
      stratzStatus: null,
      parseRequested,
      attempts,
    };
  }

  if (openDotaResponse && !openDotaResponse.ok) {
    attempts.push({ source: "opendota", ok: false, status: openDotaResponse.status, error: `OpenDota HTTP ${openDotaResponse.status}` });
  }

  if (requestOpenDotaParse && openDotaResponse?.status === 404) {
    try {
      await openDotaFetch(env, `/request/${matchId}`, { method: "POST" });
      parseRequested = true;
    } catch {
      // 解析请求失败不阻塞后续 Steam / STRATZ 兜底。
    }
  }

  let steamResult = null;
  if (useSteam) {
    steamResult = await getSteamMatchDetail(env, matchId);
    attempts.push({ source: "steam", ok: steamResult.ok, status: steamResult.status, error: steamResult.error });
    if (steamResult.ok) {
      return {
        ok: true,
        source: "steam",
        detail: steamResult.detail,
        openDotaStatus,
        steamStatus: steamResult.status,
        stratzStatus: null,
        parseRequested,
        attempts,
      };
    }
  }

  let stratzResult = null;
  if (useStratz) {
    stratzResult = await getStratzMatchDetail(env, matchId);
    attempts.push({ source: "stratz", ok: stratzResult.ok, status: stratzResult.status, skipped: stratzResult.skipped, error: stratzResult.error });
    if (stratzResult.ok) {
      return {
        ok: true,
        source: "stratz",
        detail: stratzResult.detail,
        openDotaStatus,
        steamStatus: steamResult?.status ?? null,
        stratzStatus: stratzResult.status,
        parseRequested,
        attempts,
      };
    }
  }

  return {
    ok: false,
    source: null,
    detail: null,
    openDotaStatus,
    steamStatus: steamResult?.status ?? null,
    stratzStatus: stratzResult?.status ?? null,
    parseRequested,
    attempts,
    error: combinedLookupError(attempts),
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

export function buildSteamHistoryDetail(match, leagueId) {
  const matchPlayers = Array.isArray(match?.players) ? match.players : [];
  return {
    match_id: Number(match?.match_id || 0),
    match_seq_num: match?.match_seq_num,
    leagueid: Number(match?.leagueid || leagueId || 0),
    lobby_type: match?.lobby_type,
    game_mode: match?.game_mode,
    radiant_win: hasBooleanWinner(match) ? match.radiant_win : null,
    start_time: match?.start_time,
    duration: match?.duration,
    data_source: "steam-history",
    players: matchPlayers.map((player) => ({
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
      const detail = buildSteamHistoryDetail(match, leagueId);
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
        detail,
      };
    })
    .filter((entry) => entry.registered >= threshold && (settings.allowPartialMatches || entry.registered >= 10))
    .sort((a, b) => b.startTime - a.startTime);
}

export function buildLeagueScanDiagnostics(players, leagueMatches, dateRange, settings, limit = 20) {
  const { startSeconds, endSeconds, valid } = getDateRangeSeconds(dateRange);
  const playerByAccount = new Map(players.map((player) => [String(player.dotaId), player]));
  const threshold = Number(settings?.minRegisteredPlayers || DEFAULT_SETTINGS.minRegisteredPlayers);
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);

  return (leagueMatches || [])
    .filter((match) => match?.match_id)
    .map((match) => {
      const matchPlayers = Array.isArray(match.players) ? match.players : [];
      const registeredPlayers = matchPlayers
        .map((player) => {
          const accountId = player?.account_id ? String(player.account_id) : "";
          const knownPlayer = accountId ? playerByAccount.get(accountId) : null;
          return knownPlayer
            ? {
                accountId,
                name: knownPlayer.name,
                side: playerSide(player.player_slot),
                heroId: player.hero_id,
              }
            : null;
        })
        .filter(Boolean);
      const inRange = valid && Number(match.start_time || 0) >= startSeconds && Number(match.start_time || 0) <= endSeconds;
      const reasons = [];
      if (!valid) reasons.push("invalid_date_range");
      if (valid && !inRange) reasons.push("outside_date_range");
      if (!matchPlayers.length) reasons.push("no_player_list");
      if (registeredPlayers.length < threshold) reasons.push(`registered_below_threshold:${registeredPlayers.length}/${threshold}`);
      if (registeredPlayers.length >= threshold && !settings.allowPartialMatches && registeredPlayers.length < 10) reasons.push("partial_matches_disabled");
      if (!reasons.length) reasons.push("candidate_or_duplicate");

      return {
        id: Number(match.match_id),
        time: formatMatchTime(match.start_time),
        startTime: match.start_time || 0,
        lobbyType: match.lobby_type,
        gameMode: match.game_mode,
        registered: registeredPlayers.length,
        total: Math.max(matchPlayers.length || 0, 10),
        registeredNames: registeredPlayers.map((player) => player.name),
        reasons,
      };
    })
    .sort((a, b) => Number(b.startTime || 0) - Number(a.startTime || 0))
    .slice(0, safeLimit);
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

export function makeRecentDateRange(hours = 72) {
  const safeHours = Math.min(Math.max(Number(hours) || 72, 6), 168);
  const now = Math.floor(Date.now() / 1000);
  return {
    startSeconds: now - safeHours * 60 * 60,
    endSeconds: now + 60 * 60,
  };
}

export async function syncRecentMatches(env, { dateRange = makeRecentDateRange(), settingsOverride = {} } = {}) {
  const players = await getPlayers(env);
  const settings = { ...(await getSettings(env)), ...(settingsOverride || {}) };
  const leagueId = String(settingsOverride?.leagueId || settings.leagueId || "").trim();
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
      const leagueStartTimes = leagueResult.matches.map((match) => Number(match?.start_time || 0)).filter(Boolean);
      leagueScan = {
        ...leagueScan,
        fetched: leagueResult.matches.length,
        totalResults: leagueResult.totalResults,
        resultsRemaining: leagueResult.resultsRemaining,
        pagesFetched: leagueResult.pagesFetched,
        pageSize: leagueResult.pageSize,
        partial: leagueResult.partial,
        error: leagueResult.error || "",
        latestStartTime: leagueStartTimes.length ? Math.max(...leagueStartTimes) : 0,
        oldestStartTime: leagueStartTimes.length ? Math.min(...leagueStartTimes) : 0,
        diagnostics: buildLeagueScanDiagnostics(players, leagueResult.matches, dateRange, settings),
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

  const shouldFetchRecentMatches = !leagueScan.enabled || leagueScan.failed || !leagueScan.fetched || settings.fetchRecentMatchesSupplement === true;
  const recentRows = [];
  const recentErrors = [];
  let recentRateLimited = false;

  if (shouldFetchRecentMatches) {
    const throttleMs = Math.max(250, Math.min(3000, Number(env.OPENDOTA_THROTTLE_MS) || 850));
    for (const player of players) {
      if (recentRows.length || recentErrors.length) await delay(throttleMs);
      try {
        const response = await openDotaFetchWithRetry(env, `/players/${player.dotaId}/recentMatches`, undefined, { attempts: 2, baseDelayMs: 1800 });
        if (!response.ok) {
          recentErrors.push({ player: player.name, status: response.status, error: describeOpenDotaError(response.status) });
          if (response.status === 429) {
            recentRateLimited = true;
            break;
          }
          continue;
        }
        const recentMatches = await response.json();
        recentRows.push(...recentMatches.map((match) => ({ player, match })));
      } catch (error) {
        recentErrors.push({ player: player.name, error: error instanceof Error ? error.message : "请求失败" });
      }
    }
  }

  const failedCount = recentErrors.length;
  const recentCandidates = buildCandidatesFromRecentMatches(players, recentRows, dateRange, settings);
  const candidates = mergeMatchCandidates([...leagueCandidates, ...recentCandidates]);
  const existingIds = new Set((await getMatches(env)).map((match) => String(match.id)));
  const newCandidates = candidates.filter((match) => !existingIds.has(String(match.id)));
  const preparedNewCandidates = [];
  const storedCandidates = [];
  const manualInterventionCandidates = [];

  for (const match of newCandidates) {
    const preparedMatch = match.detail?.players?.length ? buildMatchFromDetail(match, match.detail, players, settings) : buildMatchFromCandidate(match, settings);
    preparedNewCandidates.push(preparedMatch);
    await upsertMatch(env, preparedMatch, { preserveStatus: false });
    if (preparedMatch.status === "已入库") storedCandidates.push(preparedMatch);
    if (preparedMatch.recognition?.requiresManualIntervention || preparedMatch.score === "需要人工介入") manualInterventionCandidates.push(preparedMatch);
  }

  const duplicatedCount = candidates.length - newCandidates.length;
  const sourceDuplicateCount = leagueCandidates.length + recentCandidates.length - candidates.length;
  const leagueMessage = leagueScan.enabled
    ? `联赛房 ${leagueId} 扫到 ${leagueScan.fetched} 场（${leagueScan.pagesFetched || 0} 页），命中 ${leagueScan.candidateCount} 场`
    : "未启用联赛房扫描";

  return {
    matches: await getMatches(env),
    newCandidates: preparedNewCandidates,
    failedCount,
    autoStoredCount: storedCandidates.length,
    manualInterventionCount: manualInterventionCandidates.length,
    duplicatedCount,
    sourceDuplicateCount,
    leagueScan,
    recentMatches: {
      skipped: !shouldFetchRecentMatches,
      fetchedRows: recentRows.length,
      failedCount,
      rateLimited: recentRateLimited,
      errors: recentErrors.slice(0, 8),
    },
    leagueId,
    leagueCandidateCount: leagueCandidates.length,
    recentCandidateCount: recentCandidates.length,
    message: `${newCandidates.length} 新增，${storedCandidates.length} 场自动入库，${manualInterventionCandidates.length} 场需人工介入，${duplicatedCount} 重复已跳过；${leagueMessage}${leagueScan.failed ? `（${leagueScan.error}）` : ""}`,
  };
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
      result: fallbackResult ?? playerWon(side, detail),
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

function hasNumericStat(value) {
  return Number.isFinite(Number(value));
}

function hasUsablePlayerStats(player) {
  return hasNumericStat(player?.kills) && hasNumericStat(player?.deaths) && hasNumericStat(player?.assists);
}

function detailHasFullPlayerStats(detail, expectedTotal = 10) {
  const detailPlayers = Array.isArray(detail?.players) ? detail.players : [];
  const required = Math.min(Math.max(Number(expectedTotal) || 10, 1), 10);
  if (detailPlayers.length < required) return false;
  return detailPlayers.slice(0, required).every((player) => player?.player_slot !== undefined && hasNumericStat(player?.hero_id) && hasUsablePlayerStats(player));
}

function registeredPlayersHaveKnownResults(players) {
  const registeredPlayers = (players || []).filter((player) => player.isRegistered);
  return registeredPlayers.length > 0 && registeredPlayers.every((player) => typeof player.result === "boolean");
}

function buildManualInterventionReasons({ recognition, threshold, rankedLadder, hasKnownWinner, hasFullPlayerStats, registeredHaveResults, meetsThreshold, balancedSides, fullInhouse, allowPartialMatches, allowAutoStore }) {
  const reasons = [];
  if (rankedLadder) return reasons;
  if (!allowAutoStore) reasons.push("自动入库已关闭");
  if (!hasKnownWinner) reasons.push("缺少明确胜负");
  if (!hasFullPlayerStats) reasons.push("缺少完整 10 人战绩/KDA");
  if (!registeredHaveResults) reasons.push("命中玩家胜负未全部确定");
  if (!meetsThreshold) reasons.push(`玩家库命中 ${recognition.registered}/${threshold}，低于有效阈值`);
  if (!balancedSides && recognition.registered > 0) reasons.push(`双方命中不均衡：${recognition.sides}`);
  if (!allowPartialMatches && !fullInhouse) reasons.push("当前设置要求完整 10 名登记玩家");
  return reasons;
}

function describeDetailSource(detail) {
  if (detail?.data_source === "steam") return "Steam Web API";
  if (detail?.data_source === "steam-sequence") return "Steam Sequence API";
  if (detail?.data_source === "steam-history") return "Steam 联赛列表";
  if (detail?.data_source === "stratz") return "STRATZ API";
  if (detail?.data_source === "cached") return "缓存详情";
  if (detail?.data_source === "manual-roster") return "手动补全阵容";
  return "OpenDota";
}

function buildMatchFromCandidate(match, settings = DEFAULT_SETTINGS) {
  const registeredPlayers = Array.isArray(match?.registeredPlayers) ? match.registeredPlayers : [];
  const resolvedPlayers = registeredPlayers.map((player) => ({ ...player, isRegistered: true }));
  const recognition = registeredSideSummary(resolvedPlayers);
  const threshold = Number(settings?.minRegisteredPlayers || DEFAULT_SETTINGS.minRegisteredPlayers);
  const total = match.total || 10;
  const expectedTotal = Math.min(Number(total) || 10, 10);
  const fullInhouse = recognition.registered >= expectedTotal;
  const meetsThreshold = recognition.registered >= threshold;
  const balancedSides = recognition.radiant > 0 && recognition.dire > 0 && Math.abs(recognition.radiant - recognition.dire) <= 1;
  const hasKnownWinner = registeredPlayers.length > 0 && registeredPlayers.every((player) => typeof player.result === "boolean");
  const hasFullPlayerStats = registeredPlayers.length >= expectedTotal && registeredPlayers.slice(0, expectedTotal).every(hasUsablePlayerStats);
  const registeredHaveResults = hasKnownWinner;
  const allowPartialMatches = settings?.allowPartialMatches !== false;
  const allowAutoStore = settings?.autoStoreResolvedMatches !== false;
  const canAutoStore =
    allowAutoStore &&
    meetsThreshold &&
    balancedSides &&
    hasKnownWinner &&
    hasFullPlayerStats &&
    registeredHaveResults &&
    (allowPartialMatches || fullInhouse);
  const manualInterventionReasons = buildManualInterventionReasons({
    recognition,
    threshold,
    rankedLadder: false,
    hasKnownWinner,
    hasFullPlayerStats,
    registeredHaveResults,
    meetsThreshold,
    balancedSides,
    fullInhouse,
    allowPartialMatches,
    allowAutoStore,
  });
  const notesBase = match.notes || "OpenDota recentMatches 自动识别到候选比赛。";

  return {
    ...match,
    status: canAutoStore ? "已入库" : match.status || "待确认",
    score: canAutoStore ? "recentMatches 完整战绩自动入库" : "需要人工介入",
    notes: canAutoStore
      ? `${notesBase} 已拿到 10 名登记玩家的 KDA 与胜负，系统自动入库计分。`
      : `${notesBase} 还不能自动计分：${manualInterventionReasons.join("；") || "缺少完整比赛详情"}。请管理员补阵容/胜方，或稍后重新识别。`,
    recognition: {
      ...recognition,
      total,
      threshold,
      fullInhouse,
      meetsThreshold,
      balancedSides,
      rankedLadder: false,
      hasKnownWinner,
      hasFullPlayerStats,
      registeredHaveResults,
      canAutoStore,
      requiresManualIntervention: !canAutoStore,
      manualInterventionReasons,
    },
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
  const sourceLabel = describeDetailSource(detail);
  const leagueText = detail.leagueid ? `，League ID ${detail.leagueid}` : "";
  const hasKnownWinner = hasBooleanWinner(detail);
  const hasFullPlayerStats = detailHasFullPlayerStats(detail, total);
  const registeredHaveResults = registeredPlayersHaveKnownResults(resolvedPlayers);
  const allowPartialMatches = settings?.allowPartialMatches !== false;
  const allowAutoStore = settings?.autoStoreResolvedMatches !== false;
  const canAutoStore =
    allowAutoStore &&
    !rankedLadder &&
    meetsThreshold &&
    balancedSides &&
    hasKnownWinner &&
    hasFullPlayerStats &&
    registeredHaveResults &&
    (allowPartialMatches || fullInhouse);
  const manualInterventionReasons = buildManualInterventionReasons({
    recognition,
    threshold,
    rankedLadder,
    hasKnownWinner,
    hasFullPlayerStats,
    registeredHaveResults,
    meetsThreshold,
    balancedSides,
    fullInhouse,
    allowPartialMatches,
    allowAutoStore,
  });

  let score = `玩家库命中 ${recognition.registered}`;
  let notes = `${sourceLabel} 已解析：${lobbyName} / ${modeName}${leagueText}，玩家库命中 ${recognition.registered}/${total}，双方命中 ${recognition.sides}。`;

  if (rankedLadder) {
    score = "天梯跳过";
    notes = `${notes} 该房间类型属于天梯，已从内战识别队列隐藏，不计入积分。`;
  } else if (canAutoStore) {
    score = fullInhouse ? "完整战绩自动入库" : `完整战绩自动入库 ${recognition.registered}/${threshold}`;
    notes = `${notes} 已拿到完整战绩与明确胜负，系统自动入库计分；仅玩家库成员进入积分。`;
  } else if (fullInhouse) {
    score = manualInterventionReasons.length ? "需要人工介入" : "完整 10 人内战";
    notes = `${notes} 命中完整 10 人，${manualInterventionReasons.length ? `但${manualInterventionReasons.join("；")}，请管理员补充或复核后入库。` : "可优先确认后入库。"}`;
  } else if (meetsThreshold) {
    score = manualInterventionReasons.length ? "需要人工介入" : `达到阈值 ${recognition.registered}/${threshold}`;
    notes = `${notes} 已达到当前阈值，${manualInterventionReasons.length ? `但${manualInterventionReasons.join("；")}，请管理员结合语音/群内记录复核。` : "可按当前规则确认。"}`;
  } else {
    score = `命中不足 ${recognition.registered}/${threshold}`;
    notes = `${notes} 未达到当前阈值，暂不建议作为有效内战确认。`;
  }

  if (!rankedLadder && !balancedSides && recognition.registered > 0) {
    notes = `${notes} 两边命中不均衡，可能是玩家库缺 ID 或这不是完整群内战。`;
  }

  let status = currentMatch.status || "待确认";
  if (rankedLadder) {
    status = "已驳回";
  } else if (currentMatch.status === "已驳回") {
    status = "已驳回";
  } else if (currentMatch.status === "已入库" || canAutoStore) {
    status = "已入库";
  }

  return {
    ...currentMatch,
    hidden: rankedLadder,
    isRankedLadder: rankedLadder,
    status,
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
      hasKnownWinner,
      hasFullPlayerStats,
      registeredHaveResults,
      canAutoStore,
      requiresManualIntervention: manualInterventionReasons.length > 0,
      manualInterventionReasons,
      lobbyName,
      modeName,
    },
  };
}

async function findLeagueHistoryMatchForSequence(env, matchId, settings) {
  const leagueId = String(settings?.leagueId || "").trim();
  if (!leagueId || !settings?.useLeagueScan) return { match: null, leagueResult: null, error: "" };
  const leagueResult = await getSteamLeagueMatches(env, leagueId);
  if (!leagueResult.ok) return { match: null, leagueResult, error: leagueResult.error || "Steam league history is unavailable" };
  const leagueMatch = (leagueResult.matches || []).find((match) => String(match.match_id) === String(matchId));
  if (!leagueMatch) return { match: null, leagueResult, error: `Steam league ${leagueId} history did not include Match ID ${matchId}` };
  return { match: leagueMatch, leagueResult, error: "" };
}

async function getLeagueHistoryFallback(env, matchId, settings) {
  const leagueId = String(settings?.leagueId || "").trim();
  if (!leagueId || !settings?.useLeagueScan) return { detail: null, match: null, leagueResult: null, error: "" };
  const leagueResult = await getSteamLeagueMatches(env, leagueId);
  if (!leagueResult.ok) return { detail: null, error: leagueResult.error || "Steam 联赛列表暂不可用" };
  const leagueMatch = (leagueResult.matches || []).find((match) => String(match.match_id) === String(matchId));
  if (!leagueMatch) return { detail: null, error: `Steam 联赛 ${leagueId} 最近记录中未找到该 Match ID` };
  return { detail: buildSteamHistoryDetail(leagueMatch, leagueId), error: "" };
}

function applyManualMatchOverrides(currentDetail, incomingDetail) {
  if (!currentDetail || !incomingDetail) return incomingDetail;
  const nextDetail = { ...incomingDetail };

  if (currentDetail.manual_roster_override) {
    const manualPlayers = (Array.isArray(currentDetail.players) ? currentDetail.players : []).filter((player) => player?.manual_player);
    if (manualPlayers.length) {
      const mergedBySlot = new Map((Array.isArray(incomingDetail.players) ? incomingDetail.players : []).map((player, index) => [String(player?.player_slot ?? index), player]));
      manualPlayers.forEach((player, index) => mergedBySlot.set(String(player?.player_slot ?? index), { ...player, manual_player: true }));
      nextDetail.players = Array.from(mergedBySlot.values()).sort((a, b) => Number(a?.player_slot || 0) - Number(b?.player_slot || 0));
      nextDetail.manual_roster_override = true;
    }
  }

  if (currentDetail.manual_winner_override && typeof currentDetail.radiant_win === "boolean") {
    nextDetail.radiant_win = currentDetail.radiant_win;
    nextDetail.manual_winner_override = true;
  }

  return nextDetail;
}

export async function refreshStoredMatch(env, matchId, { resetReviewStatus = false, requestOpenDotaParse = true, useSteam = true, useStratz = true } = {}) {
  const existingMatch = await getMatch(env, matchId);
  const currentMatch = existingMatch || createPendingMatch(matchId);
  const currentDetail = existingMatch ? await getMatchDetail(env, matchId) : null;
  const players = await getPlayers(env);
  const settings = await getSettings(env);
  const lookup = await fetchMatchDetailWithFallback(env, matchId, {
    requestOpenDotaParse,
    useSteam,
    useStratz,
  });

  if (lookup.ok) {
    const baseMatch = resetReviewStatus && currentMatch.status !== "已入库" ? { ...currentMatch, status: "待确认", hidden: false, isRankedLadder: false } : currentMatch;
    const effectiveDetail = applyManualMatchOverrides(currentDetail, lookup.detail);
    const updatedMatch = buildMatchFromDetail(baseMatch, effectiveDetail, players, settings);
    const match = existingMatch ? await upsertMatch(env, updatedMatch, { preserveStatus: false }) : updatedMatch;
    return {
      ok: true,
      match,
      detail: effectiveDetail,
      source: lookup.source,
      openDotaStatus: lookup.openDotaStatus,
      steamStatus: lookup.steamStatus,
      stratzStatus: lookup.stratzStatus,
      parseRequested: lookup.parseRequested,
      attempts: lookup.attempts,
      message: `已通过 ${describeDetailSource(lookup.detail)} 刷新比赛详情`,
    };
  }

  const leagueHistory = await findLeagueHistoryMatchForSequence(env, matchId, settings);
  const leagueFallback = leagueHistory.match
    ? {
        detail: buildSteamHistoryDetail(leagueHistory.match, settings?.leagueId),
        match: leagueHistory.match,
        leagueResult: leagueHistory.leagueResult,
        error: "",
      }
    : { detail: null, match: null, leagueResult: leagueHistory.leagueResult, error: leagueHistory.error };
  let sequenceResult = null;
  if (useSteam) {
    const leagueSequenceMatch = leagueFallback.match;
    if (leagueSequenceMatch?.match_seq_num) {
      sequenceResult = await getSteamMatchDetailBySequence(env, matchId, leagueSequenceMatch.match_seq_num);
      lookup.attempts = [
        ...(lookup.attempts || []),
        {
          source: "steam-sequence",
          ok: sequenceResult.ok,
          status: sequenceResult.status,
          skipped: sequenceResult.skipped,
          error: sequenceResult.error,
        },
      ];
      if (sequenceResult.ok) {
        const baseMatch = resetReviewStatus && currentMatch.status !== "已入库" ? { ...currentMatch, status: "待确认", hidden: false, isRankedLadder: false } : currentMatch;
        const effectiveDetail = applyManualMatchOverrides(currentDetail, sequenceResult.detail);
        const updatedMatch = buildMatchFromDetail(baseMatch, effectiveDetail, players, settings);
        const match = existingMatch ? await upsertMatch(env, updatedMatch, { preserveStatus: false }) : updatedMatch;
        return {
          ok: true,
          match,
          detail: effectiveDetail,
          source: "steam-sequence",
          openDotaStatus: lookup.openDotaStatus,
          steamStatus: sequenceResult.status,
          stratzStatus: lookup.stratzStatus,
          parseRequested: lookup.parseRequested,
          attempts: lookup.attempts,
          warning: lookup.error,
          message: `已通过 ${describeDetailSource(sequenceResult.detail)} 刷新比赛详情`,
        };
      }
    }
  }
  const cachedDetail = await getMatchDetail(env, matchId);
  const fallbackDetail = leagueFallback.detail || cachedDetail;
  if (fallbackDetail?.players?.length) {
    const baseMatch = resetReviewStatus && currentMatch.status !== "已入库" ? { ...currentMatch, status: "待确认", hidden: false, isRankedLadder: false } : currentMatch;
    const effectiveDetail = applyManualMatchOverrides(currentDetail, fallbackDetail);
    const updatedMatch = buildMatchFromDetail(baseMatch, effectiveDetail, players, settings);
    const match = existingMatch ? await upsertMatch(env, updatedMatch, { preserveStatus: false }) : updatedMatch;
    const source = leagueFallback.detail ? "steam-history" : fallbackDetail.data_source || "cached";
    return {
      ok: true,
      match,
      detail: effectiveDetail,
      source,
      openDotaStatus: lookup.openDotaStatus,
      steamStatus: lookup.steamStatus,
      stratzStatus: lookup.stratzStatus,
      parseRequested: lookup.parseRequested,
      attempts: lookup.attempts,
      warning: lookup.error,
      message: source === "steam-history" ? "单场详情暂未返回，已用 Steam 联赛列表刷新 10 人阵容" : "单场详情暂未返回，已保留当前缓存阵容",
    };
  }

  let match = currentMatch;
  if (existingMatch) {
    match = await upsertMatch(
      env,
      {
        ...currentMatch,
        status: ["已入库", "已驳回"].includes(currentMatch.status) ? currentMatch.status : "待确认",
        score: currentMatch.status === "已入库" ? currentMatch.score : "需要人工介入",
        notes: `${lookup.error || "数据源暂未返回这场比赛详情"}；${leagueFallback.error || "稍后重新识别即可重试。"} 已交给管理员手动介入，可先补阵容/胜方，或稍后重新识别。`,
      },
      { preserveStatus: false },
    );
  }

  return {
    ok: false,
    match,
    detail: null,
    source: null,
    openDotaStatus: lookup.openDotaStatus,
    steamStatus: lookup.steamStatus,
    stratzStatus: lookup.stratzStatus,
    parseRequested: lookup.parseRequested,
    attempts: lookup.attempts,
    error: lookup.error || leagueFallback.error || `OpenDota HTTP ${lookup.openDotaStatus}`,
    message: "已重新请求解析，但数据源仍未返回完整详情",
  };
}

function hasRetryHint(match, detail) {
  // 已入库的比赛也可能先以 Steam 联赛历史的简略信息进入系统。保留既有
  // 状态、积分和人工判定，只在后续同步中尝试补齐英雄、KDA 和胜负详情。
  if (match.isRankedLadder) return false;
  if (!detail) {
    return match.time === "待解析" || /待解析|已请求解析|暂未返回|OpenDota HTTP|Steam API|STRATZ|数据源/i.test(`${match.score || ""} ${match.notes || ""}`);
  }
  if (detail.data_source === "steam-history" || detail.data_source === "cached") return true;
  if (typeof detail.radiant_win !== "boolean") return (match.registeredPlayers || []).some((player) => typeof player.result !== "boolean");
  return false;
}

export async function retryUnresolvedMatches(env, { retryLimit = 12, requestOpenDotaParse = true, useSteam = true, useStratz = true } = {}) {
  const safeLimit = Math.min(Math.max(Number(retryLimit) || 0, 0), 50);
  if (!safeLimit) return { attempted: 0, succeeded: 0, autoStoredCount: 0, manualInterventionCount: 0, results: [] };

  const matches = await getMatches(env);
  const candidates = [];

  for (const match of matches) {
    if (candidates.length >= safeLimit) break;
    const detail = await getMatchDetail(env, match.id);
    if (hasRetryHint(match, detail)) candidates.push(match);
  }

  const results = [];
  for (const match of candidates) {
    try {
      const wasStored = match.status === "已入库";
      const result = await refreshStoredMatch(env, match.id, {
        resetReviewStatus: false,
        requestOpenDotaParse,
        useSteam,
        useStratz,
      });
      results.push({
        id: match.id,
        wasStored,
        ok: result.ok,
        source: result.source,
        status: result.match?.status,
        score: result.match?.score,
        requiresManualIntervention: result.match?.score === "需要人工介入",
        message: result.message,
        error: result.error,
        warning: result.warning,
        openDotaStatus: result.openDotaStatus,
        steamStatus: result.steamStatus,
        stratzStatus: result.stratzStatus,
        attempts: result.attempts || [],
      });
    } catch (error) {
      results.push({
        id: match.id,
        ok: false,
        error: error instanceof Error ? error.message : "重试失败",
      });
    }
  }

  return {
    attempted: results.length,
    succeeded: results.filter((item) => item.ok).length,
    // 这里仅统计本轮从候选/待确认状态变成已入库的比赛；旧比赛的详情补全
    // 单独计数，避免在同步摘要里被误报为新增计分。
    autoStoredCount: results.filter((item) => !item.wasStored && item.status === "已入库").length,
    enrichedStoredCount: results.filter((item) => item.wasStored && item.ok).length,
    manualInterventionCount: results.filter((item) => item.requiresManualIntervention).length,
    results,
  };
}
