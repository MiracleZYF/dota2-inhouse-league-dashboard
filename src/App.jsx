import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Crown,
  Database,
  Download,
  Eye,
  ExternalLink,
  FileDown,
  Filter,
  Gamepad2,
  Home,
  Medal,
  Pencil,
  Plus,
  RotateCcw,
  RefreshCw,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Swords,
  Trophy,
  Upload,
  UserPlus,
  Users,
  X,
} from "lucide-react";

const OPENDOTA_BASE_URL = "https://api.opendota.com/api";
const ADMIN_TOKEN_STORAGE_KEY = "dota2-inhouse-admin-token";
const DEFAULT_DATE_RANGE = { start: "2026-06-01T00:00", end: "2026-06-21T23:59", preset: "season" };
const DEFAULT_SETTINGS = {
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
const DATE_RANGE_PRESETS = [
  { id: "season", label: "本周期" },
  { id: "lastNight", label: "昨晚" },
  { id: "today", label: "今天" },
  { id: "last24h", label: "近 24 小时" },
  { id: "last7d", label: "近 7 天" },
  { id: "custom", label: "自定义" },
];
const HERO_CN_NAMES = {
  1: "敌法师",
  2: "斧王",
  3: "祸乱之源",
  4: "血魔",
  5: "水晶室女",
  6: "卓尔游侠",
  7: "撼地者",
  8: "主宰",
  9: "米拉娜",
  10: "变体精灵",
  11: "影魔",
  12: "幻影长矛手",
  13: "帕克",
  14: "帕吉",
  15: "剃刀",
  16: "沙王",
  17: "风暴之灵",
  18: "斯温",
  19: "小小",
  20: "复仇之魂",
  21: "风行者",
  22: "宙斯",
  23: "昆卡",
  25: "莉娜",
  26: "莱恩",
  27: "暗影萨满",
  28: "斯拉达",
  29: "潮汐猎人",
  30: "巫医",
  31: "巫妖",
  32: "力丸",
  33: "谜团",
  34: "修补匠",
  35: "狙击手",
  36: "瘟疫法师",
  37: "术士",
  38: "兽王",
  39: "痛苦女王",
  40: "剧毒术士",
  41: "虚空假面",
  42: "冥魂大帝",
  43: "死亡先知",
  44: "幻影刺客",
  45: "帕格纳",
  46: "圣堂刺客",
  47: "冥界亚龙",
  48: "露娜",
  49: "龙骑士",
  50: "戴泽",
  51: "发条技师",
  52: "拉席克",
  53: "先知",
  54: "噬魂鬼",
  55: "黑暗贤者",
  56: "克林克兹",
  57: "全能骑士",
  58: "魅惑魔女",
  59: "哈斯卡",
  60: "暗夜魔王",
  61: "育母蜘蛛",
  62: "赏金猎人",
  63: "编织者",
  64: "杰奇洛",
  65: "蝙蝠骑士",
  66: "陈",
  67: "幽鬼",
  68: "远古冰魄",
  69: "末日使者",
  70: "熊战士",
  71: "裂魂人",
  72: "矮人直升机",
  73: "炼金术士",
  74: "祈求者",
  75: "沉默术士",
  76: "殁境神蚀者",
  77: "狼人",
  78: "酒仙",
  79: "暗影恶魔",
  80: "德鲁伊",
  81: "混沌骑士",
  82: "米波",
  83: "树精卫士",
  84: "食人魔魔法师",
  85: "不朽尸王",
  86: "拉比克",
  87: "干扰者",
  88: "司夜刺客",
  89: "娜迦海妖",
  90: "光之守卫",
  91: "艾欧",
  92: "维萨吉",
  93: "斯拉克",
  94: "美杜莎",
  95: "巨魔战将",
  96: "半人马战行者",
  97: "马格纳斯",
  98: "伐木机",
  99: "钢背兽",
  100: "巨牙海民",
  101: "天怒法师",
  102: "亚巴顿",
  103: "上古巨神",
  104: "军团指挥官",
  105: "工程师",
  106: "灰烬之灵",
  107: "大地之灵",
  108: "孽主",
  109: "恐怖利刃",
  110: "凤凰",
  111: "神谕者",
  112: "寒冬飞龙",
  113: "天穹守望者",
  114: "齐天大圣",
  119: "邪影芳灵",
  120: "石鳞剑士",
  121: "天涯墨客",
  123: "森海飞霞",
  126: "虚无之灵",
  128: "电炎绝手",
  129: "玛尔斯",
  131: "百戏大王",
  135: "破晓辰星",
  136: "玛西",
  137: "原始兽",
  138: "琼英碧灵",
  145: "凯",
  155: "拉戈",
};

function dateBoundarySeconds(date, endOfDay = false) {
  const suffix = endOfDay ? "T23:59:59" : "T00:00:00";
  return Math.floor(new Date(`${date}${suffix}`).getTime() / 1000);
}

function padTimeUnit(value) {
  return String(value).padStart(2, "0");
}

function formatDateTimeInput(date) {
  return `${date.getFullYear()}-${padTimeUnit(date.getMonth() + 1)}-${padTimeUnit(date.getDate())}T${padTimeUnit(date.getHours())}:${padTimeUnit(date.getMinutes())}`;
}

function normalizeDateTimeValue(value, endOfDay = false) {
  if (!value) return "";
  if (String(value).includes("T")) return value;
  return `${value}T${endOfDay ? "23:59" : "00:00"}`;
}

function dateTimeValueToSeconds(value, endOfDay = false) {
  const normalized = normalizeDateTimeValue(value, endOfDay);
  const time = new Date(normalized).getTime();
  if (!Number.isFinite(time)) return NaN;
  return Math.floor(time / 1000);
}

function getDateRangeSeconds(dateRange) {
  const startSeconds = dateTimeValueToSeconds(dateRange.start);
  const endSeconds = dateTimeValueToSeconds(dateRange.end, true);
  return {
    startSeconds,
    endSeconds,
    valid: Number.isFinite(startSeconds) && Number.isFinite(endSeconds) && startSeconds <= endSeconds,
  };
}

function formatDateRangeLabel(dateRange) {
  const start = normalizeDateTimeValue(dateRange.start);
  const end = normalizeDateTimeValue(dateRange.end, true);
  if (!start || !end) return "未设置";
  return `${start.replace("T", " ")} ~ ${end.replace("T", " ")}`;
}

function makeDateRangePreset(preset) {
  const now = new Date();
  if (preset === "season") return DEFAULT_DATE_RANGE;

  if (preset === "today") {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    return { start: formatDateTimeInput(start), end: formatDateTimeInput(now), preset };
  }

  if (preset === "lastNight") {
    const end = new Date(now);
    end.setHours(6, 0, 0, 0);
    const start = new Date(end);
    start.setDate(start.getDate() - 1);
    start.setHours(18, 0, 0, 0);
    return { start: formatDateTimeInput(start), end: formatDateTimeInput(end), preset };
  }

  if (preset === "last24h") {
    const start = new Date(now);
    start.setHours(start.getHours() - 24);
    return { start: formatDateTimeInput(start), end: formatDateTimeInput(now), preset };
  }

  if (preset === "last7d") {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    return { start: formatDateTimeInput(start), end: formatDateTimeInput(now), preset };
  }

  return { start: normalizeDateTimeValue(DEFAULT_DATE_RANGE.start), end: normalizeDateTimeValue(DEFAULT_DATE_RANGE.end, true), preset: "custom" };
}

function formatMatchTime(startTime) {
  if (!startTime) return "时间未知";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(startTime * 1000))
    .replace(/\//g, "-");
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return "-";
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  return `${minutes}:${String(remainSeconds).padStart(2, "0")}`;
}

function formatBackendTime(value) {
  if (!value) return "-";
  const time = new Date(value);
  if (!Number.isFinite(time.getTime())) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(time)
    .replace(/\//g, "-");
}

function playerSide(playerSlot) {
  return Number(playerSlot) < 128 ? "天辉" : "夜魇";
}

function formatHeroName(heroId, heroNames) {
  if (!heroId) return "未知英雄";
  return heroNames[String(heroId)] || HERO_CN_NAMES[String(heroId)] || `英雄 #${heroId}`;
}

function normalizeAccountId(accountId) {
  if (accountId === undefined || accountId === null || accountId === "") return "";
  return String(accountId);
}

function registeredAccountId(player) {
  if (!player) return "";
  return normalizeAccountId(player.accountId || player.dotaId);
}

function getInitialAdminMode() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("admin") === "1";
}

function getStoredAdminToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";
}

function askForAdminToken() {
  if (typeof window === "undefined") return "";
  const token = window.prompt("请输入管理员操作密码（ADMIN_TOKEN）");
  if (token) window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  return token || "";
}

function confirmAdminAction(message) {
  if (typeof window === "undefined") return true;
  return window.confirm(message);
}

async function apiRequest(path, { method = "GET", body, admin = false, retryAuth = true } = {}) {
  const headers = {};
  if (body !== undefined) headers["content-type"] = "application/json";
  if (admin) {
    const token = getStoredAdminToken() || askForAdminToken();
    if (!token) throw new Error("已取消管理员操作");
    headers.authorization = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && admin && retryAuth && typeof window !== "undefined") {
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    return apiRequest(path, { method, body, admin, retryAuth: false });
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

function registeredSideSummary(players) {
  const registeredPlayers = players.filter((player) => player.isRegistered);
  const radiant = registeredPlayers.filter((player) => player.side === "天辉").length;
  const dire = registeredPlayers.filter((player) => player.side === "夜魇").length;
  return {
    registered: registeredPlayers.length,
    radiant,
    dire,
    sides: `${radiant} : ${dire}`,
  };
}

function matchLobbyType(match) {
  return match?.lobby_type ?? match?.lobbyType;
}

function matchGameMode(match) {
  return match?.game_mode ?? match?.gameMode;
}

function isRankedLadderMatch(match) {
  return [6, 7].includes(Number(matchLobbyType(match)));
}

function isScoredInhouseMatch(match) {
  return match.status === "已入库";
}

function isReviewableMatch(match) {
  return !match.hidden && !match.isRankedLadder && match.status !== "已驳回";
}

function describeLobbyType(lobbyType) {
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
  if (lobbyType === undefined || lobbyType === null || lobbyType === "") return "待解析";
  return names[String(lobbyType)] || `房间类型 ${lobbyType}`;
}

function describeGameMode(gameMode) {
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
  if (gameMode === undefined || gameMode === null || gameMode === "") return "待解析";
  return names[String(gameMode)] || `模式 ${gameMode}`;
}

function parseSideCounts(sides) {
  const [radiant, dire] = String(sides || "")
    .split(":")
    .map((value) => Number(value.trim()));
  return {
    radiant: Number.isFinite(radiant) ? radiant : 0,
    dire: Number.isFinite(dire) ? dire : 0,
  };
}

function hasKnownResult(value) {
  return typeof value === "boolean";
}

function resultMeta(value) {
  if (value === true) return { known: true, won: true, label: "胜", className: "win" };
  if (value === false) return { known: true, won: false, label: "负", className: "loss" };
  return { known: false, won: false, label: "待定", className: "unknown" };
}

function buildMatchRecognition(match, settings = DEFAULT_SETTINGS, detail) {
  const registered = Number(match?.registered || 0);
  const total = Number(detail?.players?.length || match?.total || 10);
  const threshold = Number(settings?.minRegisteredPlayers || DEFAULT_SETTINGS.minRegisteredPlayers);
  const sideCounts = parseSideCounts(match?.sides);
  const parsed = Boolean(detail || match?.startTime || matchLobbyType(match) !== undefined || matchGameMode(match) !== undefined);
  const rankedLadder = Boolean(match?.isRankedLadder || isRankedLadderMatch(detail || match));
  const fullInhouse = registered >= Math.min(total, 10);
  const meetsThreshold = registered >= threshold;
  const balancedSides = sideCounts.radiant > 0 && sideCounts.dire > 0 && Math.abs(sideCounts.radiant - sideCounts.dire) <= 1;

  let label = "待解析";
  let tone = "info";
  const sourceLabel = detail?.data_source === "steam" ? "Steam Web API" : detail ? "OpenDota" : "数据源";
  let verdict = "还没有拿到对局详情，先不要确认计分。";

  if (rankedLadder) {
    label = "天梯跳过";
    tone = "muted";
    verdict = "房间类型属于天梯，不进入内战积分。";
  } else if (fullInhouse) {
    label = "完整内战";
    tone = "success";
    verdict = "玩家库命中完整 10 人，可优先确认。";
  } else if (meetsThreshold) {
    label = "需要复核";
    tone = "warning";
    verdict = `命中 ${registered} 人，已达到 ${threshold} 人阈值，但不是完整 10 人。`;
  } else if (parsed) {
    label = "命中不足";
    tone = "muted";
    verdict = `只命中 ${registered} 人，未达到 ${threshold} 人阈值。`;
  }

  const checks = [
    {
      label: "已拿到对局详情",
      ok: parsed,
      text: parsed ? `${sourceLabel} 已返回时间、模式和阵容` : "等待 OpenDota/Steam 返回详情",
    },
    {
      label: "不是天梯",
      ok: parsed && !rankedLadder,
      text: rankedLadder ? "天梯/单排类型，自动跳过" : parsed ? "房间类型没有命中天梯规则" : "待解析",
    },
    {
      label: "命中人数达标",
      ok: meetsThreshold,
      text: `${registered}/${total}，当前阈值 ${threshold} 人`,
    },
    {
      label: "双方接近 5v5",
      ok: balancedSides,
      text: sideCounts.radiant || sideCounts.dire ? `天辉 ${sideCounts.radiant} / 夜魇 ${sideCounts.dire}` : "待识别阵营",
    },
  ];

  return {
    label,
    tone,
    verdict,
    parsed,
    rankedLadder,
    fullInhouse,
    meetsThreshold,
    balancedSides,
    registered,
    total,
    threshold,
    radiant: sideCounts.radiant,
    dire: sideCounts.dire,
    lobbyName: describeLobbyType(matchLobbyType(detail || match)),
    modeName: describeGameMode(matchGameMode(detail || match)),
    checks,
  };
}

function resolveMatchPlayers(match, detail, players, heroNames = {}) {
  const playerByAccount = new Map(players.map((player) => [String(player.dotaId), player]));
  const fallbackPlayers = match?.registeredPlayers || [];
  const fallbackByAccount = new Map(fallbackPlayers.map((player) => [registeredAccountId(player), player]).filter(([accountId]) => accountId));
  const fallbackBySlotHero = new Map(
    fallbackPlayers
      .filter((player) => player.playerSlot !== undefined && player.heroId !== undefined)
      .map((player) => [`${player.playerSlot}-${player.heroId}`, player]),
  );
  const detailPlayers = detail?.players || [];

  if (detailPlayers.length) {
    return detailPlayers.map((player) => {
      const accountId = normalizeAccountId(player.account_id);
      const rosterPlayer = accountId ? playerByAccount.get(accountId) : null;
      const fallbackPlayer = (accountId && fallbackByAccount.get(accountId)) || (!accountId ? fallbackBySlotHero.get(`${player.player_slot}-${player.hero_id}`) : null);
      const knownPlayer = rosterPlayer || fallbackPlayer;
      const side = playerSide(player.player_slot);
      const fallbackResult = hasKnownResult(fallbackPlayer?.result) ? fallbackPlayer.result : null;
      return {
        accountId: accountId || registeredAccountId(knownPlayer),
        name: knownPlayer?.name || player.personaname || player.name || (accountId ? `未登记玩家 ${accountId}` : "匿名玩家"),
        side,
        playerSlot: player.player_slot,
        heroId: player.hero_id,
        heroName: formatHeroName(player.hero_id, heroNames),
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        goldPerMin: player.gold_per_min,
        xpPerMin: player.xp_per_min,
        result: hasKnownResult(fallbackResult)
          ? fallbackResult
          : hasKnownResult(detail.radiant_win)
          ? side === "天辉"
            ? detail.radiant_win
            : !detail.radiant_win
          : null,
        isRegistered: Boolean(knownPlayer),
        identifySource: rosterPlayer ? "玩家库 ID 匹配" : fallbackPlayer ? "同步记录匹配" : "未匹配",
      };
    });
  }

  return fallbackPlayers.map((player) => {
    const accountId = registeredAccountId(player);
    const rosterPlayer = playerByAccount.get(accountId);
    return {
      ...player,
      accountId,
      name: rosterPlayer?.name || player.name,
      heroName: formatHeroName(player.heroId, heroNames),
      isRegistered: true,
      identifySource: "同步记录匹配",
    };
  });
}

function buildCandidatesFromRecentMatches(players, recentRows, dateRange, settings) {
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
      entry.registeredPlayers.set(accountId, {
        accountId,
        name: knownPlayer.name,
        side: playerSide(match.player_slot),
        playerSlot: match.player_slot,
        heroId: match.hero_id,
        kills: match.kills,
        deaths: match.deaths,
        assists: match.assists,
        result: hasKnownResult(match.radiant_win) ? (playerSide(match.player_slot) === "天辉" ? match.radiant_win : !match.radiant_win) : null,
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

function buildScoreEntries(players, matches, settings) {
  const playerByAccount = new Map(players.map((player) => [String(player.dotaId), player]));
  return matches.filter(isScoredInhouseMatch).flatMap((match) =>
    (match.registeredPlayers || [])
      .map((matchPlayer) => {
        const accountId = registeredAccountId(matchPlayer);
        const rosterPlayer = playerByAccount.get(accountId);
        if (!rosterPlayer) return null;
        if (!hasKnownResult(matchPlayer.result)) return null;

        const meta = resultMeta(matchPlayer.result);
        return {
          id: `${match.id}-${accountId}`,
          matchId: match.id,
          time: match.time || "时间未知",
          startTime: match.startTime || 0,
          playerId: rosterPlayer.id,
          playerName: rosterPlayer.name,
          accountId,
          side: matchPlayer.side || "-",
          heroId: matchPlayer.heroId,
          kills: matchPlayer.kills,
          deaths: matchPlayer.deaths,
          assists: matchPlayer.assists,
          result: meta.label,
          won: meta.won,
          resultClass: meta.className,
          points: meta.won ? settings.winPoints : settings.lossPoints,
        };
      })
      .filter(Boolean),
  );
}

function buildMatchScorePreview(displayedPlayers, settings = DEFAULT_SETTINGS) {
  const entries = displayedPlayers
    .filter((player) => player.isRegistered)
    .map((player) => {
      const meta = resultMeta(player.result);
      return {
        accountId: player.accountId || "-",
        playerName: player.name,
        side: player.side || "-",
        heroName: player.heroName || "-",
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        won: meta.won,
        result: meta.label,
        resultClass: meta.className,
        knownResult: meta.known,
        points: meta.known ? (meta.won ? settings.winPoints : settings.lossPoints) : 0,
      };
    })
    .sort((a, b) => {
      const sideOrder = { 天辉: 0, 夜魇: 1 };
      return (sideOrder[a.side] ?? 2) - (sideOrder[b.side] ?? 2) || Number(b.won) - Number(a.won) || a.playerName.localeCompare(b.playerName, "zh-CN");
    });

  const missingPlayers = displayedPlayers.filter((player) => !player.isRegistered);
  const winners = entries.filter((entry) => entry.knownResult && entry.won);
  const losers = entries.filter((entry) => entry.knownResult && !entry.won);
  const unknowns = entries.filter((entry) => !entry.knownResult);

  return {
    entries,
    missingPlayers,
    totalPoints: entries.reduce((total, entry) => total + entry.points, 0),
    winnerPoints: winners.reduce((total, entry) => total + entry.points, 0),
    loserPoints: losers.reduce((total, entry) => total + entry.points, 0),
    winnerCount: winners.length,
    loserCount: losers.length,
    unknownCount: unknowns.length,
  };
}

function buildReviewSteps(recognition, status) {
  const confirmed = status === "已确认" || status === "已入库";
  const stored = status === "已入库";
  const rejected = status === "已驳回" || recognition.rankedLadder;
  return [
    {
      label: "解析对局",
      text: recognition.parsed ? "已拿到模式、阵营和玩家记录" : "等待 OpenDota 返回详情",
      state: recognition.parsed ? "done" : "current",
    },
    {
      label: "人工复核",
      text: rejected ? "当前不建议确认" : confirmed ? "已确认有效内战" : recognition.meetsThreshold ? "达到阈值，可人工确认" : "命中不足，建议补名单或驳回",
      state: rejected ? "blocked" : confirmed ? "done" : recognition.parsed ? "current" : "pending",
    },
    {
      label: "入库计分",
      text: stored ? "积分流水已生成" : confirmed ? "下一步可入库计分" : "确认后才会开放入库",
      state: stored ? "done" : confirmed ? "current" : "pending",
    },
  ];
}

function buildReviewWarnings(recognition, scorePreview, status) {
  const warnings = [];
  if (!recognition.parsed) warnings.push({ tone: "warning", title: "未拿到对局详情", body: "当前只能看到队列记录，建议等待解析成功后再确认。" });
  if (recognition.rankedLadder) warnings.push({ tone: "muted", title: "疑似天梯对局", body: "房间类型命中天梯规则，不建议进入内战积分。" });
  if (!recognition.meetsThreshold) warnings.push({ tone: "warning", title: "命中人数不足", body: `当前命中 ${recognition.registered}/${recognition.threshold}，未达到有效内战阈值。` });
  if (recognition.meetsThreshold && !recognition.fullInhouse) warnings.push({ tone: "warning", title: "不是完整 10 人", body: "已达到阈值，但仍建议核对未匹配玩家是否为群友小号或未登记账号。" });
  if (recognition.parsed && !recognition.balancedSides) warnings.push({ tone: "warning", title: "双方命中不均衡", body: `当前天辉 ${recognition.radiant} / 夜魇 ${recognition.dire}，可能存在缺失 ID。` });
  if (scorePreview.unknownCount) warnings.push({ tone: "warning", title: "胜负尚未解析", body: `${scorePreview.unknownCount} 名命中玩家没有明确胜负；当前不会产生计分，等待完整详情后再入库。` });
  if (scorePreview.missingPlayers.length) warnings.push({ tone: "info", title: "存在未匹配玩家", body: `${scorePreview.missingPlayers.length} 名玩家没有匹配到玩家库，入库后不会给他们计分。` });
  if (status === "已入库") warnings.push({ tone: "success", title: "已入库", body: "这场比赛已经计入积分榜，后续重复确认不会新增计分流水。" });
  return warnings;
}

function buildReviewActionHint(match, recognition) {
  if (match.status === "已入库") return { tone: "success", title: "已完成", body: "已进入积分榜" };
  if (match.status === "已确认") return { tone: "info", title: "待入库", body: "下一步入库计分" };
  if (recognition.rankedLadder) return { tone: "muted", title: "建议驳回", body: "房间类型是天梯" };
  if (!recognition.parsed) return { tone: "warning", title: "等待解析", body: "先查看或稍后重试" };
  if (!recognition.meetsThreshold) return { tone: "warning", title: "补名单/驳回", body: `${recognition.registered}/${recognition.threshold} 未达标` };
  if (recognition.fullInhouse) return { tone: "success", title: "可确认", body: "完整 10 人内战" };
  return { tone: "warning", title: "人工复核", body: `${recognition.registered}/${recognition.total} 命中` };
}

function buildStandingsFromScoredMatches(players, scoreEntries, settings) {
  const standingById = new Map(
    players.map((player) => [
      player.id,
      {
        ...player,
        played: 0,
        wins: 0,
        losses: 0,
        points: 0,
        captain: false,
        form: [],
        scoreEntries: [],
      },
    ]),
  );

  scoreEntries.forEach((entry) => {
    const row = standingById.get(entry.playerId);
    if (!row) return;
    row.played += 1;
    row.wins += entry.won ? 1 : 0;
    row.losses += entry.won ? 0 : 1;
    row.points += entry.points;
    row.form = [entry.won ? "W" : "L", ...row.form].slice(0, 5);
    row.scoreEntries = [entry, ...row.scoreEntries].sort((a, b) => b.startTime - a.startTime);
  });

  return Array.from(standingById.values())
    .filter((player) => player.played > 0)
    .map((player) => ({
      ...player,
      captain: player.played >= settings.minCaptainGames,
      form: player.form.length ? player.form : ["-", "-", "-", "-", "-"],
      winRate: player.wins / Math.max(player.played, 1),
    }))
    .sort((a, b) => b.points - a.points || b.wins - a.wins || b.winRate - a.winRate || b.played - a.played);
}

const PLAYER_PROFILE_FIXTURES = {
  79759941: {
    gameName: "ChaiBot★",
    profileUrl: "https://steamcommunity.com/id/stormchai/",
    avatarUrl: "https://avatars.steamstatic.com/8f67304c9e5e8d5d63d3ae468abe4966c3225479_full.jpg",
  },
  133666698: {
    gameName: "能帮我弄干净吗",
    profileUrl: "https://steamcommunity.com/profiles/76561198093932426/",
    avatarUrl: "https://avatars.steamstatic.com/198cc4ad9a2c31ad45c4d83d54498df854aedcf4_full.jpg",
  },
  139135702: {
    gameName: "别问！学就行",
    profileUrl: "https://steamcommunity.com/profiles/76561198099401430/",
    avatarUrl: "https://avatars.steamstatic.com/355575d8bb0d2ec52ee18a112212a6fcc929d833_full.jpg",
  },
  139203171: {
    gameName: "全自动立功",
    profileUrl: "https://steamcommunity.com/profiles/76561198099468899/",
    avatarUrl: "https://avatars.steamstatic.com/9561d6d2da2e4805bc0bc74f88d7856950412c47_full.jpg",
  },
  139291120: {
    gameName: "钢琴家睿达",
    profileUrl: "https://steamcommunity.com/id/GunyumL/",
    avatarUrl: "https://avatars.steamstatic.com/bc55afd6180a0aebd83a33fc36da2d534370498e_full.jpg",
  },
  139595295: {
    gameName: "Kano",
    profileUrl: "https://steamcommunity.com/profiles/76561198099861023/",
    avatarUrl: "https://avatars.steamstatic.com/80f218cad570a586adf3990d20ca8ab664b2e88f_full.jpg",
  },
  155292084: {
    gameName: "我要玩旮旯给木",
    profileUrl: "https://steamcommunity.com/profiles/76561198115557812/",
    avatarUrl: "https://avatars.steamstatic.com/43b37b323147bfd12f7ef41a8a9f40cfa384f57e_full.jpg",
  },
  155361267: {
    gameName: "卷毛&吉米.Bilibili",
    profileUrl: "https://steamcommunity.com/profiles/76561198115626995/",
    avatarUrl: "https://avatars.steamstatic.com/b118287d839980d742303cee50f726d6d39b1917_full.jpg",
  },
  161822486: {
    gameName: "茶酒",
    profileUrl: "https://steamcommunity.com/profiles/76561198122088214/",
    avatarUrl: "https://avatars.steamstatic.com/4b0a7d7b987e9878d82900f8c150ab1b9b7a849f_full.jpg",
  },
  175928804: {
    gameName: "Zsso_zao",
    profileUrl: "https://steamcommunity.com/profiles/76561198136194532/",
    avatarUrl: "https://avatars.steamstatic.com/e1edeeccc8320a26774cfabd63467ab9f0a5a6d8_full.jpg",
  },
  201599278: {
    gameName: "牢焖",
    profileUrl: "https://steamcommunity.com/profiles/76561198161865006/",
    avatarUrl: "https://avatars.steamstatic.com/44aa729ce88eed142dc9877b2a10bcf561b1e785_full.jpg",
  },
  237169385: {
    gameName: "Pupa",
    profileUrl: "https://steamcommunity.com/profiles/76561198197435113/",
    avatarUrl: "https://avatars.steamstatic.com/be65902c43f582d8c064c0fed73dceaf885b6455_full.jpg",
  },
  253121211: {
    gameName: "天下伍酒（red card）",
    profileUrl: "https://steamcommunity.com/profiles/76561198213386939/",
    avatarUrl: "https://avatars.steamstatic.com/8734c268db82dab0d602b9be87c985ba15a03610_full.jpg",
  },
  338957505: {
    gameName: "暴鲤龙的大爷爷",
    profileUrl: "https://steamcommunity.com/profiles/76561198299223233/",
    avatarUrl: "https://avatars.steamstatic.com/764f5bf486117c83ed29e5f29e33cd69e583dc29_full.jpg",
  },
  339743252: {
    gameName: "等我上个马",
    profileUrl: "https://steamcommunity.com/profiles/76561198300008980/",
    avatarUrl: "https://avatars.steamstatic.com/752eb38c3b0bc6f74708ec2c3d44d00bda41edde_full.jpg",
  },
  399825811: {
    gameName: "1ndulge",
    profileUrl: "https://steamcommunity.com/profiles/76561198360091539/",
    avatarUrl: "https://avatars.steamstatic.com/182257a09582c4814f37652e387861dd2ac67cc9_full.jpg",
  },
  403665770: {
    gameName: "李斯",
    profileUrl: "https://steamcommunity.com/id/798780530/",
    avatarUrl: "https://avatars.steamstatic.com/af339fcac970b1098c7f3c3bd0107af2645fad59_full.jpg",
  },
  409431719: {
    gameName: "正高",
    profileUrl: "https://steamcommunity.com/profiles/76561198369697447/",
    avatarUrl: "https://avatars.steamstatic.com/9369852486ef1143d9453f0164c8ef35a7103a48_full.jpg",
  },
  448417036: {
    gameName: "cheaterbush",
    profileUrl: "https://steamcommunity.com/profiles/76561198408682764/",
    avatarUrl: "https://avatars.steamstatic.com/f9e7e02b28bf8f1f18c07a5e95cb714b795195fd_full.jpg",
  },
  456880925: {
    gameName: "Inmost",
    profileUrl: "https://steamcommunity.com/profiles/76561198417146653/",
    avatarUrl: "https://avatars.steamstatic.com/5fea668694c95ff82c2d9cc2b2afdb06a9d2bbb4_full.jpg",
  },
  880277674: {
    gameName: 'American "Free Speech"',
    profileUrl: "https://steamcommunity.com/profiles/76561198840543402/",
    avatarUrl: "https://avatars.steamstatic.com/cf514dcf1a4e826e61988ab052f820c3abf3c4e3_full.jpg",
  },
  948306561: {
    gameName: "0v0",
    profileUrl: "https://steamcommunity.com/profiles/76561198908572289/",
    avatarUrl: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
  },
  1041606597: {
    gameName: "GHzQcE",
    profileUrl: "https://steamcommunity.com/profiles/76561199001872325/",
    avatarUrl: "https://avatars.steamstatic.com/c0aa7c6eca1b76156941959e3d8ff50efb0cf191_full.jpg",
  },
  1045578592: {
    gameName: "酒蒙子黄毛体育生卡提",
    profileUrl: "https://steamcommunity.com/id/tipsong/",
    avatarUrl: "https://avatars.steamstatic.com/088d1a708489f77ae2a59d4e2c5335d5f45cffae_full.jpg",
  },
  1206359917: {
    gameName: "ico",
    profileUrl: "https://steamcommunity.com/id/qiubo666/",
    avatarUrl: "https://avatars.steamstatic.com/b5984ec17651d765dce7eaf215ae6ec9cec268d2_full.jpg",
  },
  1241554543: {
    gameName: "雨",
    profileUrl: "https://steamcommunity.com/profiles/76561199201820271/",
    avatarUrl: "https://avatars.steamstatic.com/58bd67cf047436f84c8a308c31be95e1e23a809b_full.jpg",
  },
  1255889937: {
    gameName: "pluviophile",
    profileUrl: "https://steamcommunity.com/profiles/76561199216155665/",
    avatarUrl: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
  },
  1512446117: {
    gameName: "Af Am",
    profileUrl: "https://steamcommunity.com/profiles/76561199472711845/",
    avatarUrl: "https://avatars.steamstatic.com/c0b7310b0c3568616a989161b86de33d940f37ad_full.jpg",
  },
  1742683220: {
    gameName: "Artol",
    profileUrl: "https://steamcommunity.com/profiles/76561199702948948/",
    avatarUrl: "https://avatars.steamstatic.com/48b8d8cd5cd35b94299f7951a118f6fff33f891b_full.jpg",
  },
  1765455118: {
    gameName: "Cherry",
    profileUrl: "https://steamcommunity.com/profiles/76561199725720846/",
    avatarUrl: "https://avatars.steamstatic.com/774151f6a68b1a9c34b5248a92b7e842a3fcf3b4_full.jpg",
  },
};

function rosterPlayer(id, name, dotaId, role) {
  const profile = PLAYER_PROFILE_FIXTURES[String(dotaId)] || {};
  const displayName = isPlaceholderPlayerName(name) && profile.gameName ? profile.gameName : name;
  return {
    id,
    name: displayName,
    dotaId,
    role,
    gameName: profile.gameName || "",
    avatarUrl: profile.avatarUrl || "",
    profileUrl: profile.profileUrl || "",
    profileSyncedAt: "",
    profileError: "",
    played: 0,
    wins: 0,
    points: 0,
    captain: false,
    publicData: Boolean(profile.gameName),
    form: ["-", "-", "-", "-", "-"],
    status: profile.gameName ? "资料已同步" : "待内战统计",
  };
}

const initialPlayers = [
  rosterPlayer(1, "果粒橙", "155292084", "1 / 2"),
  rosterPlayer(2, "吴", "1255889937", "2 / 4"),
  rosterPlayer(3, "为人低调", "139203171", "3 / 5"),
  rosterPlayer(4, "鱼人永不败", "399825811", "1 / 3"),
  rosterPlayer(5, "Chaibot", "79759941", "4 / 5"),
  rosterPlayer(6, "QcccE", "1041606597", "2 / 3"),
  rosterPlayer(7, "正高", "409431719", "1 / 2"),
  rosterPlayer(8, "吉米", "155361267", "3 / 4"),
  rosterPlayer(9, "茶酒", "161822486", "1 / 2"),
  rosterPlayer(10, "天下伍酒", "253121211", "1 / 3"),
  rosterPlayer(11, "别问", "139135702", "全能"),
  rosterPlayer(12, "待补昵称12", "948306561", "待补"),
  rosterPlayer(13, "inmost", "456880925", "2 / 4"),
  rosterPlayer(14, "Pupa", "237169385", "3 / 5"),
  rosterPlayer(15, "阿均", "880277674", "4 / 5"),
  rosterPlayer(16, "焖焖", "201599278", "2 / 3"),
  rosterPlayer(17, "奶龙抚琴", "1512446117", "1 / 2"),
  rosterPlayer(18, "待补昵称18", "1742683220", "待补"),
  rosterPlayer(19, "Tips", "1045578592", "3 / 4"),
  rosterPlayer(20, "雨", "1241554543", "4 / 5"),
  rosterPlayer(21, "哈基马", "339743252", "1 / 3"),
  rosterPlayer(22, "哈基暴", "338957505", "3 / 5"),
  rosterPlayer(23, "Zsso_zao", "175928804", "4 / 5"),
  rosterPlayer(24, "KAMI", "133666698", "全能"),
  rosterPlayer(25, "待补昵称25", "403665770", "待补"),
  rosterPlayer(26, "待补昵称26", "448417036", "待补"),
  rosterPlayer(27, "待补昵称27", "139291120", "待补"),
  rosterPlayer(28, "待补昵称28", "139595295", "待补"),
  rosterPlayer(29, "待补昵称29", "1765455118", "待补"),
  rosterPlayer(30, "待补昵称30", "1206359917", "待补"),
];

const initialMatches = [];

const navItems = [
  { id: "overview", label: "总览", icon: Home },
  { id: "players", label: "玩家库", icon: Users },
  { id: "matches", label: "比赛识别", icon: Search },
  { id: "leaderboard", label: "积分榜", icon: BarChart3 },
  { id: "draft", label: "队长选人", icon: Crown },
  { id: "playoff", label: "淘汰赛", icon: Trophy },
  { id: "rules", label: "规则", icon: ScrollText },
];

function isPlaceholderPlayerName(name) {
  return !name || /^待补昵称\d*$/i.test(name) || /^新玩家\s*\d+$/i.test(name);
}

function playerDisplayName(player) {
  return player?.name || player?.gameName || `玩家 ${player?.dotaId || ""}`.trim();
}

function avatarUrl(playerOrName) {
  if (playerOrName && typeof playerOrName === "object") {
    if (playerOrName.avatarUrl) return playerOrName.avatarUrl;
    const seed = playerOrName.name || playerOrName.gameName || playerOrName.dotaId || "player";
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0f172a,1f2937,2f1f19`;
  }

  const seed = playerOrName || "player";
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0f172a,1f2937,2f1f19`;
}

function statusClass(status) {
  if (status === "待确认") return "status-warning";
  if (status === "已确认") return "status-info";
  if (status === "已入库") return "status-success";
  if (status === "已驳回") return "status-muted";
  return "status-info";
}

function formatWinRate(player) {
  return `${Math.round((player.wins / Math.max(player.played, 1)) * 1000) / 10}%`;
}

function KpiCard({ icon: Icon, label, value, meta, tone }) {
  return (
    <section className={`kpi-card tone-${tone}`}>
      <div className="kpi-icon">
        <Icon size={28} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{meta}</span>
      </div>
    </section>
  );
}

function Panel({ title, action, children, className = "" }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function syncStatusMeta(run) {
  if (!run) return { label: "未运行", tone: "muted" };
  if (run.status === "failed") return { label: "失败", tone: "warning" };
  if (run.status === "warning") return { label: "部分异常", tone: "warning" };
  return { label: "成功", tone: "success" };
}

function actionLabel(action) {
  const labels = {
    manual_sync: "手动同步",
    auto_sync: "自动同步",
    refresh_match: "重新识别",
    set_winner: "修正胜方",
    restore_match: "恢复比赛",
    confirm_match: "确认有效",
    store_match: "入库计分",
    rollback_match: "撤销入库",
    reject_match: "驳回比赛",
    manual_add_match: "手动添加",
    manual_reidentify_match: "手动重识别",
  };
  return labels[action] || action || "操作";
}

function runKindLabel(kind) {
  if (kind === "auto") return "自动";
  if (kind === "manual") return "手动";
  return kind || "-";
}

function compactJson(value) {
  if (!value || typeof value !== "object") return "";
  const json = JSON.stringify(value, null, 2);
  return json.length > 1000 ? `${json.slice(0, 1000)}\n...` : json;
}

function syncRunIssueList(run) {
  const details = run?.details || {};
  const issues = [];
  if (details.failedCount) issues.push(`${details.failedCount} 个玩家 recentMatches 拉取失败`);
  if (details.leagueScan?.failed) issues.push(`联赛房扫描失败：${details.leagueScan.error || "未知错误"}`);
  const retryResults = Array.isArray(details.retry?.results) ? details.retry.results : [];
  const retryFailed = retryResults.filter((item) => item && !item.ok).length;
  if (retryFailed) issues.push(`${retryFailed} 场重试解析仍未成功`);
  return issues;
}

function SyncStatusPanel({ syncRuns = [], onNavigate, onSyncNow, syncing = false, dateRangeLabel, dateRangeValid = true, isAdmin = false }) {
  const [expandedRunId, setExpandedRunId] = useState("");
  const latest = syncRuns[0];
  const meta = syncStatusMeta(latest);
  const details = latest?.details || {};
  const leagueScan = details.leagueScan || {};
  const retry = details.retry || {};
  const issues = syncRunIssueList(latest);

  return (
    <Panel
      title="自动同步状态"
      action={
        <div className="panel-actions">
          <span className={`status-pill status-${meta.tone}`}>{meta.label}</span>
          {isAdmin && (
            <button className="ghost-button compact-button" type="button" onClick={onSyncNow} disabled={syncing || !dateRangeValid}>
              <RefreshCw size={15} className={syncing ? "spin-icon" : ""} />
              {syncing ? "同步中" : "立即同步"}
            </button>
          )}
        </div>
      }
      className="ops-panel"
    >
      {latest ? (
        <>
          <div className="sync-status-grid">
            <div>
              <span>最近运行</span>
              <strong>{formatBackendTime(latest.finishedAt)}</strong>
              <small>{latest.kind === "auto" ? "GitHub Actions" : "管理员手动"}</small>
            </div>
            <div>
              <span>新增比赛</span>
              <strong>{details.newCount ?? 0}</strong>
              <small>重复 {details.duplicatedCount ?? 0}</small>
            </div>
            <div>
              <span>联赛扫描</span>
              <strong>{leagueScan.fetched ?? 0}</strong>
              <small>命中 {leagueScan.candidateCount ?? 0}</small>
            </div>
            <div>
              <span>重试解析</span>
              <strong>{retry.attempted ?? 0}</strong>
              <small>成功 {retry.succeeded ?? 0}</small>
            </div>
          </div>
          <p className="panel-note">{latest.summary}</p>
          {issues.length > 0 && (
            <div className="sync-issues">
              {issues.map((issue) => (
                <span key={issue}>{issue}</span>
              ))}
            </div>
          )}
          <div className="sync-run-list">
            {syncRuns.slice(0, 5).map((run) => {
              const runMeta = syncStatusMeta(run);
              const isExpanded = String(expandedRunId) === String(run.id);
              return (
                <article className="sync-run-item" key={run.id}>
                  <button className="sync-run-main" type="button" onClick={() => setExpandedRunId(isExpanded ? "" : run.id)}>
                    <span className={`status-dot status-${runMeta.tone}`} />
                    <strong>{runKindLabel(run.kind)}同步</strong>
                    <span>{formatBackendTime(run.finishedAt)}</span>
                    <small>{run.summary}</small>
                    <ChevronDown size={15} className={isExpanded ? "rotate-icon" : ""} />
                  </button>
                  {isExpanded && (
                    <div className="record-detail">
                      <div>
                        <span>运行结果</span>
                        <strong>{runMeta.label}</strong>
                      </div>
                      <div>
                        <span>当前检索段</span>
                        <strong>{dateRangeLabel || "-"}</strong>
                      </div>
                      {compactJson(run.details) && <pre>{compactJson(run.details)}</pre>}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <EmptyState title="暂无同步记录" body="首次手动同步或每日自动同步完成后，这里会显示结果。" />
      )}
      <button className="full-width-button" type="button" onClick={() => onNavigate?.("matches")}>
        前往比赛识别中心
        <ChevronRight size={16} />
      </button>
    </Panel>
  );
}

function AuditLogPanel({ auditLogs = [] }) {
  const [expandedLogId, setExpandedLogId] = useState("");
  return (
    <Panel title="最近操作记录" action={<span className="status-pill status-info">{auditLogs.length} 条</span>} className="ops-panel">
      {auditLogs.length ? (
        <div className="audit-list">
          {auditLogs.slice(0, 8).map((item) => {
            const isExpanded = String(expandedLogId) === String(item.id);
            const detail = compactJson(item.details);
            return (
              <article className="audit-item" key={item.id}>
                <button className="audit-item-main" type="button" onClick={() => setExpandedLogId(isExpanded ? "" : item.id)}>
                  <div>
                    <strong>{actionLabel(item.action)}</strong>
                    <span>{item.matchId ? `Match ID ${item.matchId}` : item.actor}</span>
                  </div>
                  <p>{item.summary}</p>
                  <time>{formatBackendTime(item.createdAt)}</time>
                  <ChevronDown size={15} className={isExpanded ? "rotate-icon" : ""} />
                </button>
                {isExpanded && (
                  <div className="record-detail">
                    <div>
                      <span>执行人</span>
                      <strong>{item.actor || "-"}</strong>
                    </div>
                    <div>
                      <span>动作</span>
                      <strong>{actionLabel(item.action)}</strong>
                    </div>
                    {detail && <pre>{detail}</pre>}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState title="暂无操作记录" body="确认、入库、撤销、修正胜方等操作会记录在这里。" />
      )}
    </Panel>
  );
}

function EmptyState({ title, body, action }) {
  return (
    <div className="empty-state">
      <CircleHelp size={24} />
      <strong>{title}</strong>
      <p>{body}</p>
      {action}
    </div>
  );
}

function LeaderboardTable({ players, limit, compact = false }) {
  const rows = limit ? players.slice(0, limit) : players;
  if (!rows.length) {
    return (
      <EmptyState
        title="暂无已入库内战积分"
        body="比赛需要先确认有效，再点击入库计分后才会生成排名。天梯或普通路人局不会计入。"
      />
    );
  }

  return (
    <div className="table-wrap">
      <table className={`data-table ${compact ? "compact" : ""}`}>
        <thead>
          <tr>
            <th>#</th>
            <th>玩家</th>
            <th>场次</th>
            <th>胜场</th>
            <th>负场</th>
            <th>胜率</th>
            <th>总积分</th>
            <th>近期表现</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((player, index) => (
            <tr key={player.id}>
              <td>
                <span className={`rank rank-${index + 1 <= 3 ? index + 1 : "normal"}`}>{index + 1}</span>
              </td>
              <td>
                <div className="player-cell">
                  <img src={avatarUrl(player)} alt="" />
                  <div>
                    <strong>{player.name}</strong>
                    {!compact && <span>DOTA2 ID {player.dotaId}</span>}
                  </div>
                </div>
              </td>
              <td>{player.played}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
              <td>{formatWinRate(player)}</td>
              <td className="score">{player.points}</td>
              <td>
                <div className="form-dots">
                  {player.form.map((mark, markIndex) => (
                    <span key={`${player.id}-${markIndex}`} className={`form-dot ${mark === "W" ? "win" : mark === "L" ? "loss" : "idle"}`}>
                      {mark}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MatchQueue({ matches, onConfirm, onReject, onRestore, onRollback, onView, onRefresh, refreshingMatchIds = [], compact = false, isAdmin = false, settings = DEFAULT_SETTINGS }) {
  if (!matches.length) {
    return (
      <EmptyState
        title="暂无候选内战"
        body="自动同步会跳过明显天梯对局；只有达到阈值的疑似群内战或手动添加的 Match ID 会进入这里。"
      />
    );
  }

  return (
    <div className="table-wrap">
      <table className={`data-table match-table ${compact ? "compact" : ""}`}>
        <thead>
          <tr>
            <th>状态</th>
            <th>Match ID</th>
            <th>识别结论</th>
            <th>复核建议</th>
            <th>比赛时间</th>
            <th>命中人数</th>
            <th>双方命中</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => {
            const recognition = buildMatchRecognition(match, settings);
            const reviewHint = buildReviewActionHint(match, recognition);
            const isRefreshing = refreshingMatchIds.includes(String(match.id));
            return (
              <tr key={match.id}>
                <td>
                  <span className={`status-pill ${statusClass(match.status)}`}>{match.status}</span>
                </td>
                <td className="match-id-cell">
                  <strong>{match.id}</strong>
                  <small>
                    {recognition.lobbyName} · {recognition.modeName}
                  </small>
                </td>
                <td className="recognition-cell">
                  <span className={`status-pill status-${recognition.tone}`}>{recognition.label}</span>
                  {!compact && <small>{recognition.verdict}</small>}
                </td>
                <td className="review-hint-cell">
                  <span className={`status-pill status-${reviewHint.tone}`}>{reviewHint.title}</span>
                  {!compact && <small>{reviewHint.body}</small>}
                </td>
                <td>{match.time}</td>
                <td className="match-hit-cell">
                  <strong>{recognition.registered}</strong> / {recognition.total}
                </td>
                <td>{match.sides}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className={`ghost-button ${compact ? "icon-action" : ""}`}
                      type="button"
                      title="查看并重新识别"
                      aria-label={`查看比赛 ${match.id}`}
                      onClick={() => onView?.(match)}
                    >
                      <Eye size={15} />
                      {!compact && "查看"}
                    </button>
                    {isAdmin && !compact && (
                      <button className="ghost-button compact-button" type="button" onClick={() => onRefresh?.(match.id)} disabled={isRefreshing}>
                        <RefreshCw size={15} className={isRefreshing ? "spin-icon" : ""} />
                        {isRefreshing ? "刷新中" : "重新识别"}
                      </button>
                    )}
                    {isAdmin && match.status === "待确认" && !compact && (
                      <>
                        <button className="danger-button" type="button" onClick={() => onReject(match.id)}>
                          <X size={15} />
                          驳回
                        </button>
                        <button className="primary-button compact-button" type="button" onClick={() => onConfirm(match.id)}>
                          <Check size={15} />
                          确认
                        </button>
                      </>
                    )}
                    {isAdmin && match.status === "待确认" && compact && (
                      <button className="primary-button compact-button icon-action" type="button" onClick={() => onConfirm(match.id)} title="确认">
                        <Check size={15} />
                      </button>
                    )}
                    {isAdmin && match.status === "已确认" && (
                      <button className={`primary-button compact-button ${compact ? "icon-action" : ""}`} type="button" onClick={() => onConfirm(match.id)} title="入库">
                        <Database size={15} />
                        {!compact && "入库"}
                      </button>
                    )}
                    {isAdmin && match.status === "已入库" && !compact && (
                      <button className="ghost-button compact-button" type="button" onClick={() => onRollback?.(match.id)}>
                        <RotateCcw size={15} />
                        撤销入库
                      </button>
                    )}
                    {isAdmin && match.status === "已驳回" && !compact && (
                      <button className="ghost-button compact-button" type="button" onClick={() => onRestore?.(match.id)}>
                        <RefreshCw size={15} />
                        恢复
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CaptainPreview({ captains }) {
  return (
    <div className="captain-preview">
      {captains.map((player, index) => (
        <article className={`captain-card captain-${index + 1}`} key={player.id}>
          <span>{index + 1}号队长</span>
          <img src={avatarUrl(player)} alt="" />
          <strong>{player.name}</strong>
          <small>总积分 {player.points}</small>
        </article>
      ))}
    </div>
  );
}

function BracketPreview({ captains }) {
  const names = captains.map((player) => `${player.name}队`);
  return (
    <div className="bracket">
      <div className="round">
        <span>半决赛 BO3</span>
        <div className="match-box">{names[0] || "TBD"}</div>
        <div className="match-box">{names[3] || "TBD"}</div>
        <div className="match-box">{names[1] || "TBD"}</div>
        <div className="match-box">{names[2] || "TBD"}</div>
      </div>
      <div className="round final">
        <span>决赛 BO3</span>
        <div className="match-box muted">胜者 A</div>
        <div className="match-box muted">胜者 B</div>
      </div>
      <div className="round champion">
        <span>冠军</span>
        <div className="match-box trophy-box">
          <Trophy size={16} />
          TBD
        </div>
      </div>
    </div>
  );
}

function ImportModal({ onClose, onImport }) {
  const [draft, setDraft] = useState("夜魇术士,901230011,4 / 5\n天辉猛男,901230012,1 / 3");

  function submit() {
    const parsed = draft
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [name, dotaId, role] = line.split(",").map((value) => value?.trim());
        return rosterPlayer(Date.now() + index, name || `新玩家 ${index + 1}`, dotaId || "待补充", role || "全能");
      });
    onImport(parsed);
    onClose();
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label="导入玩家">
        <div className="modal-head">
          <div>
            <h2>导入玩家</h2>
            <p>每行格式：群昵称,DOTA2 ID,常用位置</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </div>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} />
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onClose}>
            取消
          </button>
          <button className="primary-button" type="button" onClick={submit}>
            <Upload size={16} />
            导入到玩家库
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayerEditModal({ player, onClose, onSave }) {
  const [draft, setDraft] = useState({
    name: player?.name || "",
    role: player?.role || "",
    gameName: player?.gameName || "",
    profileUrl: player?.profileUrl || "",
    avatarUrl: player?.avatarUrl || "",
    status: player?.status || "资料已手动修正",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave?.({ ...draft, dotaId: player.dotaId });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "保存失败，请稍后重试。");
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="modal settings-modal player-edit-modal" role="dialog" aria-modal="true" aria-label="编辑玩家资料" onSubmit={submit}>
        <div className="modal-head">
          <div>
            <h2>编辑玩家资料</h2>
            <p>DOTA2 ID 作为比赛识别主键，只读展示；昵称、位置和资料链接会写入 D1。</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </div>

        <div className="settings-grid">
          <label className="setting-field">
            <span>DOTA2 ID</span>
            <input className="readonly-input" type="text" value={player.dotaId} readOnly />
          </label>
          <label className="setting-field">
            <span>群昵称</span>
            <input type="text" value={draft.name} onChange={(event) => updateField("name", event.target.value)} required />
          </label>
          <label className="setting-field">
            <span>常用位置</span>
            <input type="text" value={draft.role} onChange={(event) => updateField("role", event.target.value)} placeholder="例如 1 / 3 或 全能" />
          </label>
          <label className="setting-field">
            <span>游戏昵称</span>
            <input type="text" value={draft.gameName} onChange={(event) => updateField("gameName", event.target.value)} placeholder="OpenDota 未同步时可手动填" />
          </label>
          <label className="setting-field full">
            <span>Steam 主页</span>
            <input type="text" value={draft.profileUrl} onChange={(event) => updateField("profileUrl", event.target.value)} placeholder="https://steamcommunity.com/..." />
          </label>
          <label className="setting-field full">
            <span>头像链接</span>
            <input type="text" value={draft.avatarUrl} onChange={(event) => updateField("avatarUrl", event.target.value)} placeholder="图片 URL，可留空使用默认头像" />
          </label>
          <label className="setting-field full">
            <span>状态备注</span>
            <input type="text" value={draft.status} onChange={(event) => updateField("status", event.target.value)} />
          </label>
        </div>

        {error && <p className="inline-message modal-message">{error}</p>}

        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onClose} disabled={saving}>
            取消
          </button>
          <button className="primary-button" type="submit" disabled={saving}>
            <Check size={16} />
            {saving ? "保存中" : "保存资料"}
          </button>
        </div>
      </form>
    </div>
  );
}

function MatchDetailModal({
  match,
  detail,
  loading,
  error,
  players,
  heroNames,
  onClose,
  onConfirm,
  onReject,
  onRollback,
  onRefresh,
  refreshing = false,
  onSetWinner,
  settings = DEFAULT_SETTINGS,
  isAdmin = false,
}) {
  if (!match) return null;

  const canConfirm = isAdmin && match.status === "待确认";
  const canStore = isAdmin && match.status === "已确认";
  const canRollback = isAdmin && match.status === "已入库";
  const detailPlayers = detail?.players || [];
  const displayedPlayers = resolveMatchPlayers(match, detail, players, heroNames);
  const radiantPlayers = displayedPlayers.filter((player) => player.side === "天辉");
  const direPlayers = displayedPlayers.filter((player) => player.side === "夜魇");
  const sideSummary = registeredSideSummary(displayedPlayers);
  const registeredCount = sideSummary.registered;
  const totalPlayers = detailPlayers.length || match.total || 10;
  const detailSourceLabel = detail?.data_source === "steam" ? "Steam Web API" : detail?.data_source === "steam-history" ? "Steam 联赛列表" : detail ? "OpenDota" : "-";
  const leagueId = detail?.leagueid || detail?.league_id || 0;
  const recognition = buildMatchRecognition(
    {
      ...match,
      registered: registeredCount,
      total: totalPlayers,
      sides: sideSummary.sides,
      lobbyType: detail?.lobby_type ?? match.lobbyType,
      gameMode: detail?.game_mode ?? match.gameMode,
      isRankedLadder: match.isRankedLadder || (detail ? isRankedLadderMatch(detail) : false),
    },
    settings,
    detail,
  );
  const scorePreview = buildMatchScorePreview(displayedPlayers, settings);
  const manualWinner = displayedPlayers.find((player) => player.isRegistered && player.result === true)?.side || "";
  const winner = manualWinner || (detail && hasKnownResult(detail.radiant_win) ? (detail.radiant_win ? "天辉" : "夜魇") : "-");
  const storeBlockedByUnknownResult = canStore && scorePreview.unknownCount > 0;
  const reviewSteps = buildReviewSteps(recognition, match.status);
  const reviewWarnings = buildReviewWarnings(recognition, scorePreview, match.status);

  function renderTeam(title, teamPlayers, won) {
    return (
      <section className={`team-detail-card ${won ? "winner" : ""}`}>
        <div className="team-detail-head">
          <div>
            <h3>{title}</h3>
            <span>{winner === "-" ? "胜负待定" : won ? "胜方" : "负方"}</span>
          </div>
          <strong>{teamPlayers.filter((player) => player.isRegistered).length} 名命中</strong>
        </div>
        <div className="team-player-list">
          {teamPlayers.length ? (
            teamPlayers.map((player, index) => (
              <article className={`team-player-row ${player.isRegistered ? "registered" : ""}`} key={`${title}-${player.accountId || index}-${player.heroId}`}>
                <div className="team-player-main">
                  <span className={`member-badge ${player.isRegistered ? "registered" : "outsider"}`}>{player.isRegistered ? "内战人员" : "非名单"}</span>
                  <div>
                    <strong>{player.name}</strong>
                    <small>
                      {player.heroName} · {player.identifySource}
                    </small>
                  </div>
                </div>
                <div className="team-player-stats">
                  <span>
                    KDA <strong>{player.kills ?? "-"} / {player.deaths ?? "-"} / {player.assists ?? "-"}</strong>
                  </span>
                  <span>
                    效率 <strong>{player.goldPerMin ?? "-"} / {player.xpPerMin ?? "-"}</strong>
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-team">{loading ? "正在拉取这边阵容..." : "暂无该阵营记录"}</div>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal match-detail-modal" role="dialog" aria-modal="true" aria-label="比赛详情">
        <div className="modal-head">
          <div>
            <h2>比赛详情</h2>
            <p>Match ID {match.id}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </div>

        <div className="match-detail-body">
          <div className="match-summary-banner">
            <div>
              <span>本场结论</span>
              <strong>{recognition.verdict}</strong>
            </div>
            <p>
              <span className={`status-pill status-${recognition.tone}`}>{recognition.label}</span>
              数据源：{detailSourceLabel} · 胜方：{winner} · 时长：{detail ? formatDuration(detail.duration) : "-"} · 玩家库命中：{registeredCount} / {totalPlayers}
            </p>
          </div>

          <div className="match-detail-grid compact-summary-grid">
            <div className="detail-card">
              <span>当前状态</span>
              <strong>
                <span className={`status-pill ${statusClass(match.status)}`}>{match.status}</span>
              </strong>
            </div>
            <div className="detail-card">
              <span>识别标签</span>
              <strong>
                <span className={`status-pill status-${recognition.tone}`}>{recognition.label}</span>
              </strong>
            </div>
            <div className="detail-card">
              <span>比赛时间</span>
              <strong>{match.time}</strong>
            </div>
            <div className="detail-card">
              <span>房间类型</span>
              <strong>{recognition.lobbyName}</strong>
            </div>
            <div className="detail-card">
              <span>游戏模式</span>
              <strong>{recognition.modeName}</strong>
            </div>
            <div className="detail-card">
              <span>玩家库命中</span>
              <strong>
                {registeredCount} / {totalPlayers}
              </strong>
            </div>
            <div className="detail-card">
              <span>双方命中</span>
              <strong>{sideSummary.sides}</strong>
            </div>
            <div className="detail-card">
              <span>队列记录</span>
              <strong>{match.score}</strong>
            </div>
            <div className="detail-card">
              <span>League ID</span>
              <strong>{leagueId || "未绑定"}</strong>
            </div>
            <div className="detail-card">
              <span>数据源</span>
              <strong>{loading ? "拉取中" : detail ? detailSourceLabel : error ? "暂无详情" : "未请求"}</strong>
            </div>
            <div className="detail-card">
              <span>时长</span>
              <strong>{detail ? formatDuration(detail.duration) : "-"}</strong>
            </div>
            <div className="detail-card">
              <span>胜方</span>
              <strong>{winner}</strong>
            </div>
          </div>

          <div className="detail-note">
            <span>识别备注</span>
            <p>{match.notes}</p>
          </div>

          <div className="recognition-checklist">
            {recognition.checks.map((check) => (
              <div className={`recognition-check ${check.ok ? "ok" : "pending"}`} key={check.label}>
                <span>{check.ok ? <Check size={15} /> : <X size={15} />}</span>
                <div>
                  <strong>{check.label}</strong>
                  <small>{check.text}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="review-workbench">
            <section className="review-flow-card">
              <div className="review-card-head">
                <span>复核流程</span>
                <strong>{match.status}</strong>
              </div>
              <div className="review-step-list">
                {reviewSteps.map((step, index) => (
                  <div className={`review-step ${step.state}`} key={step.label}>
                    <span>{index + 1}</span>
                    <div>
                      <strong>{step.label}</strong>
                      <small>{step.text}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="scoring-preview-card">
              <div className="review-card-head">
                <span>入库计分预览</span>
                <strong>{scorePreview.entries.length} 人</strong>
              </div>
              <div className="score-preview-stats">
                <div>
                  <span>胜方</span>
                  <strong>{scorePreview.winnerCount} 人</strong>
                  <small>+{scorePreview.winnerPoints}</small>
                </div>
                <div>
                  <span>负方</span>
                  <strong>{scorePreview.loserCount} 人</strong>
                  <small>+{scorePreview.loserPoints}</small>
                </div>
                <div>
                  <span>待定</span>
                  <strong>{scorePreview.unknownCount} 人</strong>
                  <small>+0</small>
                </div>
                <div>
                  <span>合计</span>
                  <strong>{scorePreview.totalPoints}</strong>
                  <small>积分</small>
                </div>
              </div>
              <div className="table-wrap score-preview-wrap">
                <table className="data-table score-preview-table">
                  <thead>
                    <tr>
                      <th>玩家</th>
                      <th>阵营</th>
                      <th>英雄</th>
                      <th>结果</th>
                      <th>积分</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scorePreview.entries.length ? (
                      scorePreview.entries.map((entry) => (
                        <tr key={`${entry.accountId}-${entry.side}-${entry.heroName}`}>
                          <td>{entry.playerName}</td>
                          <td>{entry.side}</td>
                          <td>{entry.heroName}</td>
                          <td>
                            <span className={`result-pill ${entry.resultClass}`}>{entry.result}</span>
                          </td>
                          <td className="score">{entry.points ? `+${entry.points}` : "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="empty-cell">
                          暂无可计分玩家
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="review-warning-list">
              <div className="review-card-head">
                <span>复核风险</span>
                <strong>{reviewWarnings.length ? `${reviewWarnings.length} 项` : "无明显风险"}</strong>
              </div>
              {reviewWarnings.length ? (
                reviewWarnings.map((warning) => (
                  <article className={`review-warning status-${warning.tone}`} key={`${warning.title}-${warning.body}`}>
                    <strong>{warning.title}</strong>
                    <p>{warning.body}</p>
                  </article>
                ))
              ) : (
                <article className="review-warning status-success">
                  <strong>可以入库</strong>
                  <p>当前识别结果满足完整内战条件，入库后会按当前胜负基础分生成积分流水。</p>
                </article>
              )}
            </section>
          </div>

          {error && (
            <div className="detail-alert">
              OpenDota/Steam 暂时没有返回这场比赛详情：{error}。如果这是手动输入或测试 match_id，可以继续按本地识别结果复核。
            </div>
          )}

          {registeredCount < totalPlayers && (
            <div className="detail-alert detail-alert-info">
              未匹配不等于不是群友；它只表示当前玩家库里没有对应 DOTA2 ID，或完整对局详情隐藏了账号。补充玩家 ID 后重新同步/查看即可重算。
            </div>
          )}

          <div className="team-detail-layout">
            {renderTeam("天辉", radiantPlayers, winner === "天辉")}
            {renderTeam("夜魇", direPlayers, winner === "夜魇")}
          </div>

          <details className="match-record-section">
            <summary>展开原始技术表</summary>
            <div className="section-title-row">
              <h3>原始技术记录</h3>
              <span>{detail ? `来自 ${detailSourceLabel}` : "来自已识别玩家记录"}</span>
            </div>
            <div className="table-wrap">
              <table className="data-table match-record-table">
                <thead>
                  <tr>
                    <th>阵营</th>
                    <th>玩家</th>
                    <th>内战人员</th>
                    <th>Account ID</th>
                    <th>英雄</th>
                    <th>K / D / A</th>
                    <th>GPM</th>
                    <th>XPM</th>
                    <th>结果</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPlayers.length ? (
                    displayedPlayers.map((player, index) => (
                      <tr key={`${player.accountId || "anonymous"}-${player.side}-${player.heroId}-${index}`}>
                        <td>{player.side}</td>
                        <td>{player.name}</td>
                        <td>
                          <span className={`member-badge ${player.isRegistered ? "registered" : "outsider"}`}>{player.isRegistered ? "是" : "否"}</span>
                        </td>
                        <td>{player.accountId || "-"}</td>
                        <td>{player.heroName}</td>
                        <td>
                          {player.kills ?? "-"} / {player.deaths ?? "-"} / {player.assists ?? "-"}
                        </td>
                        <td>{player.goldPerMin ?? "-"}</td>
                        <td>{player.xpPerMin ?? "-"}</td>
                        <td>
                          <span className={`result-pill ${resultMeta(player.result).className}`}>{resultMeta(player.result).label}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="empty-cell">
                        {loading ? "正在拉取 OpenDota 对局详情..." : "暂无可展示的对局记录"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </details>
        </div>

        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onClose}>
            关闭
          </button>
          {isAdmin && (
            <button className="ghost-button" type="button" onClick={() => onRefresh?.(match.id)} disabled={refreshing}>
              <RefreshCw size={16} className={refreshing ? "spin-icon" : ""} />
              {refreshing ? "刷新中" : "刷新状态"}
            </button>
          )}
          {isAdmin && scorePreview.entries.length > 0 && match.status !== "已驳回" && (
            <>
              <button className="ghost-button" type="button" onClick={() => onSetWinner?.(match.id, "天辉")}>
                {winner === "-" ? "天辉胜" : "改为天辉胜"}
              </button>
              <button className="ghost-button" type="button" onClick={() => onSetWinner?.(match.id, "夜魇")}>
                {winner === "-" ? "夜魇胜" : "改为夜魇胜"}
              </button>
            </>
          )}
          {canRollback && (
            <button className="danger-button" type="button" onClick={() => onRollback?.(match.id)}>
              <RotateCcw size={16} />
              撤销入库
            </button>
          )}
          {canConfirm && (
            <button className="danger-button" type="button" onClick={() => onReject(match.id)}>
              <X size={16} />
              驳回
            </button>
          )}
          {(canConfirm || canStore) && (
            <button className="primary-button" type="button" onClick={() => onConfirm(match.id)} disabled={storeBlockedByUnknownResult}>
              {canStore ? <Database size={16} /> : <Check size={16} />}
              {storeBlockedByUnknownResult ? "先指定胜方" : canStore ? "入库计分" : "确认有效"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Overview({
  players,
  matches,
  captains,
  syncRuns,
  auditLogs,
  onNavigate,
  onConfirm,
  onReject,
  onRollback,
  onView,
  onRefresh,
  onSyncNow,
  syncing = false,
  dateRangeLabel,
  dateRangeValid = true,
  refreshingMatchIds = [],
  settings,
  isAdmin = false,
}) {
  const pendingCount = matches.filter((match) => match.status === "待确认").length;
  const readyToStoreCount = matches.filter((match) => match.status === "已确认").length;
  const effectiveMatches = matches.filter(isScoredInhouseMatch);
  const effectiveCount = effectiveMatches.length;
  const activeCount = players.length;
  const averagePlayers = effectiveMatches.length
    ? (effectiveMatches.reduce((total, match) => total + (match.registered || 0), 0) / effectiveMatches.length).toFixed(1)
    : "-";

  return (
    <div className="view-stack">
      <div className="kpi-grid">
        <KpiCard icon={Swords} label="入库计分场次" value={effectiveCount} meta="仅统计已入库内战" tone="red" />
        <KpiCard icon={Users} label="上榜玩家" value={activeCount} meta="来自已入库内战" tone="gold" />
        <KpiCard icon={CircleHelp} label="待处理比赛" value={pendingCount} meta={`${readyToStoreCount} 场待入库`} tone="yellow" />
        <KpiCard icon={CalendarDays} label="当前周期" value="第 12 天" meta="共 21 天" tone="cyan" />
        <KpiCard icon={Activity} label="场均命中人数" value={averagePlayers} meta="天梯不计入" tone="teal" />
      </div>

      <div className="ops-grid">
        <SyncStatusPanel
          syncRuns={syncRuns}
          onNavigate={onNavigate}
          onSyncNow={onSyncNow}
          syncing={syncing}
          dateRangeLabel={dateRangeLabel}
          dateRangeValid={dateRangeValid}
          isAdmin={isAdmin}
        />
        <AuditLogPanel auditLogs={auditLogs} />
      </div>

      <div className="overview-grid">
        <Panel
          title="积分榜"
          action={
            <button className="link-button" type="button" onClick={() => onNavigate("leaderboard")}>
              查看完整榜单
              <ChevronRight size={16} />
            </button>
          }
        >
          <LeaderboardTable players={players} limit={10} compact />
          <p className="footnote">积分只统计管理员点击“入库计分”的有效内战；待确认、已确认未入库、驳回、天梯/路人局均不计入。</p>
        </Panel>

        <Panel
          title={
            <>
              内战识别队列 <span className="count-badge">{pendingCount}</span>
            </>
          }
          action={
            <button className="link-button" type="button" onClick={() => onNavigate("matches")}>
              查看全部
              <ChevronRight size={16} />
            </button>
          }
        >
          <MatchQueue
            matches={matches}
            onConfirm={onConfirm}
            onReject={onReject}
            onRollback={onRollback}
            onView={onView}
            onRefresh={onRefresh}
            refreshingMatchIds={refreshingMatchIds}
            compact
            isAdmin={isAdmin}
            settings={settings}
          />
          <button className="full-width-button" type="button" onClick={() => onNavigate("matches")}>
            前往比赛识别中心
            <ChevronRight size={16} />
          </button>
        </Panel>
      </div>

      <div className="bottom-grid">
        <Panel
          title="队长选人"
          action={
            <button className="link-button" type="button" onClick={() => onNavigate("draft")}>
              进入选人页面
              <ChevronRight size={16} />
            </button>
          }
        >
          <div className="panel-subhead">
            <span className="status-pill status-muted">未开始</span>
            <span>预计开始时间：06-22 20:00</span>
          </div>
          {captains.length ? (
            <>
              <CaptainPreview captains={captains} />
              <p className="draft-order">蛇形选人：第 4 名 → 第 3 名 → 第 2 名 → 第 1 名 → 第 1 名 → 第 2 名 → 第 3 名 → 第 4 名 ...</p>
            </>
          ) : (
            <EmptyState title="队长池未生成" body="暂无满足最低场次的已入库内战积分，周期末会按积分榜自动生成队长候选。" />
          )}
        </Panel>

        <Panel
          title="淘汰赛"
          action={
            <button className="link-button" type="button" onClick={() => onNavigate("playoff")}>
              进入赛程页面
              <ChevronRight size={16} />
            </button>
          }
        >
          <div className="panel-subhead">
            <span className="status-pill status-muted">未开始</span>
            <span>预计开始时间：06-24</span>
          </div>
          {captains.length ? <BracketPreview captains={captains} /> : <EmptyState title="赛程待生成" body="入库足够内战并生成队长池后，淘汰赛对阵会在这里展示。" />}
        </Panel>
      </div>
    </div>
  );
}

function PlayersView({ players, openImport, onEditPlayer, onSyncProfiles, profileSyncing = false, profileSyncMessage = "", isAdmin = false }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("全部");
  const filtered = players.filter((player) => {
    const matchQuery = `${player.name}${player.gameName}${player.dotaId}`.toLowerCase().includes(query.toLowerCase());
    const matchRole = role === "全部" || player.role.includes(role);
    return matchQuery && matchRole;
  });

  return (
    <div className="view-stack">
      <Panel
        title="玩家库"
        action={
          isAdmin ? (
            <div className="panel-actions">
              <button className="ghost-button" type="button" onClick={onSyncProfiles} disabled={profileSyncing}>
                <RefreshCw size={16} />
                {profileSyncing ? "同步昵称中" : "同步游戏昵称"}
              </button>
              <button className="primary-button" type="button" onClick={openImport}>
                <UserPlus size={16} />
                导入玩家
              </button>
            </div>
          ) : (
            <span className="status-pill status-muted">公开名单</span>
          )
        }
      >
        <div className="toolbar">
          <label className="search-field">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索群昵称或 DOTA2 ID" />
          </label>
          <div className="segmented">
            {["全部", "1", "2", "3", "4", "5"].map((item) => (
              <button key={item} className={role === item ? "active" : ""} type="button" onClick={() => setRole(item)}>
                {item === "全部" ? "全部位置" : `${item}号位`}
              </button>
            ))}
          </div>
          {isAdmin && (
            <button className="ghost-button" type="button">
              <FileDown size={16} />
              导出 CSV
            </button>
          )}
        </div>
        {profileSyncMessage && <p className="inline-message">{profileSyncMessage}</p>}
        <div className="table-wrap">
          <table className="data-table players-table">
            <thead>
              <tr>
                <th>玩家</th>
                <th>DOTA2 ID</th>
                <th>常用位置</th>
                <th>名单用途</th>
                <th>Steam 主页</th>
                <th>OpenDota 状态</th>
                <th>状态</th>
                {isAdmin && <th>操作</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((player) => (
                <tr key={player.id}>
                  <td>
                    <div className="player-cell">
                      <img src={avatarUrl(player)} alt="" />
                      <div>
                        <strong>{playerDisplayName(player)}</strong>
                        <span>{player.gameName ? `游戏昵称：${player.gameName}` : "游戏昵称待同步"}</span>
                      </div>
                    </div>
                  </td>
                  <td>{player.dotaId}</td>
                  <td>{player.role}</td>
                  <td>
                    <span className="status-pill status-muted">内战识别名单</span>
                  </td>
                  <td>
                    {player.profileUrl ? (
                      <a className="steam-link" href={player.profileUrl} target="_blank" rel="noreferrer">
                        <ExternalLink size={14} />
                        Steam
                      </a>
                    ) : (
                      <span className="status-pill status-muted">待同步</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-pill ${player.profileError ? "status-warning" : player.publicData ? "status-success" : "status-muted"}`}>
                      {player.profileError ? "同步失败" : player.publicData ? "已同步" : "待检测"}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill status-muted">{player.profileSyncedAt ? `${player.status} ${player.profileSyncedAt}` : player.status}</span>
                  </td>
                  {isAdmin && (
                    <td>
                      <button className="ghost-button compact-button" type="button" onClick={() => onEditPlayer?.(player)}>
                        <Pencil size={14} />
                        编辑
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">玩家库会保留群内显示名，并可从 OpenDota 同步游戏昵称、Steam 头像和主页；场次、积分、队长资格只由已入库内战生成。</p>
      </Panel>
    </div>
  );
}

function MatchesView({
  matches,
  onAddMatch,
  onConfirm,
  onReject,
  onRestore,
  onRollback,
  onView,
  onRefresh,
  refreshingMatchIds = [],
  dateRange,
  dateRangeLabel,
  dateRangeValid,
  settings,
  onOpenSettings,
  isAdmin = false,
}) {
  const [matchId, setMatchId] = useState("");
  const [threshold, setThreshold] = useState(settings.minRegisteredPlayers);
  const [manualMessage, setManualMessage] = useState("");
  const [addingMatch, setAddingMatch] = useState(false);
  const reviewableMatches = isAdmin ? matches.filter(isReviewableMatch) : matches;
  const archivedMatches = isAdmin ? matches.filter((match) => !isReviewableMatch(match)) : [];
  const reviewCounts = matches.reduce(
    (counts, match) => {
      const recognition = buildMatchRecognition(match, settings);
      if (match.status === "待确认") counts.pending += 1;
      if (match.status === "已确认") counts.ready += 1;
      if (match.status === "已入库") counts.stored += 1;
      if (recognition.rankedLadder || !recognition.meetsThreshold || (recognition.meetsThreshold && !recognition.fullInhouse)) counts.needsReview += 1;
      return counts;
    },
    { pending: 0, ready: 0, stored: 0, needsReview: 0 },
  );

  async function addMatch() {
    const cleanId = matchId.trim();
    if (!cleanId) return;
    const existed = matches.some((match) => String(match.id) === cleanId);
    setAddingMatch(true);
    setManualMessage(`正在${existed ? "重新" : ""}识别 Match ID ${cleanId}，会同时尝试拉取 OpenDota/Steam 详情...`);
    try {
      const result = await onAddMatch?.(cleanId);
      setManualMessage(result?.message || `Match ID ${cleanId} 已加入候选队列。`);
      setMatchId("");
    } catch (error) {
      setManualMessage(error instanceof Error ? error.message : "加入队列失败");
    } finally {
      setAddingMatch(false);
    }
  }

  return (
    <div className="match-layout">
      <aside className="filter-rail">
        {isAdmin ? (
          <>
            <div className="rail-section">
              <span className="rail-label">自动同步</span>
              <button className="sync-toggle active" type="button">
                <RefreshCw size={16} />
                每日 03:00
              </button>
            </div>
            <div className="rail-section">
              <span className="rail-label">复核概况</span>
              <div className="review-rail-stats">
                <div>
                  <strong>{reviewCounts.pending}</strong>
                  <span>待确认</span>
                </div>
                <div>
                  <strong>{reviewCounts.ready}</strong>
                  <span>待入库</span>
                </div>
                <div>
                  <strong>{reviewCounts.stored}</strong>
                  <span>已入库</span>
                </div>
                <div>
                  <strong>{reviewCounts.needsReview}</strong>
                  <span>需复核</span>
                </div>
              </div>
            </div>
            <div className="rail-section">
              <span className="rail-label">有效内战阈值</span>
              <div className="slider-readout">{threshold} / 10 人</div>
              <input min="2" max="10" value={threshold} type="range" onChange={(event) => setThreshold(Number(event.target.value))} />
            </div>
            <div className="rail-section">
              <span className="rail-label">当前日期范围</span>
              <div className="date-readout">{dateRangeLabel}</div>
              <small>由顶部日期输入控制，同步时按此范围过滤。</small>
              {!dateRangeValid && <small className="range-error">开始时间需要早于结束时间。</small>}
            </div>
            <div className="rail-section">
              <span className="rail-label">识别来源</span>
              <span className={`status-pill ${settings.useLeagueScan && settings.leagueId ? "status-success" : "status-muted"}`}>
                联赛房 {settings.leagueId || "未设置"}
              </span>
              <span className="status-pill status-success">OpenDota recentMatches</span>
              <span className="status-pill status-success">Steam MatchDetails 兜底</span>
            </div>
          </>
        ) : (
          <>
            <div className="rail-section">
              <span className="rail-label">访问模式</span>
              <span className="status-pill status-muted">公开只读</span>
              <small>这里只展示候选、已确认和已入库比赛；确认、入库、驳回和同步由管理员处理。</small>
            </div>
            <div className="rail-section">
              <span className="rail-label">当前日期范围</span>
              <div className="date-readout">{dateRangeLabel}</div>
              {!dateRangeValid && <small className="range-error">开始时间需要早于结束时间。</small>}
            </div>
          </>
        )}
      </aside>

      <div className="view-stack">
        <Panel title="比赛识别" action={<span className={`status-pill ${isAdmin ? "status-success" : "status-muted"}`}>{isAdmin ? "数据同步正常" : "公开只读"}</span>}>
          {isAdmin && (
            <>
              <div className="manual-add">
                <label className="search-field">
                  <Gamepad2 size={16} />
                  <input value={matchId} onChange={(event) => setMatchId(event.target.value)} placeholder="输入 match_id 后立即识别" disabled={addingMatch} />
                </label>
                <button className="primary-button" type="button" onClick={addMatch} disabled={addingMatch}>
                  {addingMatch ? <RefreshCw size={16} /> : <Plus size={16} />}
                  {addingMatch ? "识别中" : "加入并识别"}
                </button>
                <button className="ghost-button" type="button" onClick={onOpenSettings}>
                  <SlidersHorizontal size={16} />
                  同步设置
                </button>
              </div>
              {manualMessage && <p className="inline-message">{manualMessage}</p>}
            </>
          )}
          <MatchQueue
            matches={reviewableMatches}
            onConfirm={onConfirm}
            onReject={onReject}
            onRollback={onRollback}
            onView={onView}
            onRefresh={onRefresh}
            refreshingMatchIds={refreshingMatchIds}
            isAdmin={isAdmin}
            settings={settings}
          />
        </Panel>

        {isAdmin && archivedMatches.length > 0 && (
          <Panel title="已驳回/隐藏记录" action={<span className="status-pill status-muted">{archivedMatches.length} 场</span>}>
            <p className="panel-note">这些比赛不会进入公开候选和积分榜；可以查看详情、重新识别，或恢复到待确认。</p>
            <MatchQueue
              matches={archivedMatches}
              onConfirm={onConfirm}
              onReject={onReject}
              onRestore={onRestore}
              onRollback={onRollback}
              onView={onView}
              onRefresh={onRefresh}
              refreshingMatchIds={refreshingMatchIds}
              isAdmin={isAdmin}
              settings={settings}
            />
          </Panel>
        )}

        <div className="note-grid">
          {reviewableMatches.slice(0, 3).map((match) => {
            const recognition = buildMatchRecognition(match, settings);
            const reviewHint = buildReviewActionHint(match, recognition);
            return (
              <article className="review-note" key={`note-${match.id}`}>
                <div>
                  <span className={`status-pill status-${recognition.tone}`}>{recognition.label}</span>
                  <span className={`status-pill status-${reviewHint.tone}`}>{reviewHint.title}</span>
                  <strong>{match.id}</strong>
                </div>
                <p>{match.notes || recognition.verdict}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ScoreEntriesTable({ entries, limit = 30 }) {
  const rows = limit ? entries.slice(0, limit) : entries;
  if (!rows.length) {
    return <EmptyState title="暂无计分明细" body="只有已入库比赛会生成计分流水；确认有效后还需要点击入库计分。" />;
  }

  return (
    <div className="table-wrap">
      <table className="data-table score-ledger-table">
        <thead>
          <tr>
            <th>Match ID</th>
            <th>时间</th>
            <th>玩家</th>
            <th>阵营</th>
            <th>结果</th>
            <th>KDA</th>
            <th>积分</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.matchId}</td>
              <td>{entry.time}</td>
              <td>{entry.playerName}</td>
              <td>{entry.side}</td>
              <td>
                <span className={`result-pill ${entry.resultClass || (entry.won ? "win" : "loss")}`}>{entry.result}</span>
              </td>
              <td>
                {entry.kills ?? "-"} / {entry.deaths ?? "-"} / {entry.assists ?? "-"}
              </td>
              <td className="score">+{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PendingStoreTable({ matches }) {
  if (!matches.length) {
    return <EmptyState title="暂无待入库比赛" body="已确认的比赛都会出现在这里；点击入库计分后才会进入积分榜。" />;
  }

  return (
    <div className="pending-store-list">
      {matches.map((match) => (
        <article className="pending-store-row" key={match.id}>
          <div>
            <strong>{match.id}</strong>
            <span>{match.time || "时间未知"}</span>
          </div>
          <span>{match.registered || 0} / {match.total || 10}</span>
          <small>{match.sides || "-"}</small>
        </article>
      ))}
    </div>
  );
}

function LeaderboardView({ players, matches, scoreEntries, settings }) {
  const scoredMatches = matches.filter(isScoredInhouseMatch);
  const pendingStoreMatches = matches.filter((match) => match.status === "已确认");
  const totalPoints = scoreEntries.reduce((total, entry) => total + entry.points, 0);
  const averagePlayers = scoredMatches.length ? (scoreEntries.length / scoredMatches.length).toFixed(1) : "-";

  return (
    <div className="leaderboard-page">
      <div className="score-kpi-row">
        <section className="score-kpi-card">
          <span>入库比赛</span>
          <strong>{scoredMatches.length}</strong>
          <small>只统计已入库</small>
        </section>
        <section className="score-kpi-card">
          <span>待入库</span>
          <strong>{pendingStoreMatches.length}</strong>
          <small>已确认但未计分</small>
        </section>
        <section className="score-kpi-card">
          <span>计分流水</span>
          <strong>{scoreEntries.length}</strong>
          <small>玩家单场记录</small>
        </section>
        <section className="score-kpi-card">
          <span>已发积分</span>
          <strong>{totalPoints}</strong>
          <small>胜负基础分</small>
        </section>
        <section className="score-kpi-card">
          <span>场均计分人数</span>
          <strong>{averagePlayers}</strong>
          <small>用于发现异常场次</small>
        </section>
      </div>

      <div className="leaderboard-layout">
        <Panel title="完整积分榜" action={<span className="status-pill status-warning">最低 {settings.minCaptainGames} 场进入选人池</span>}>
          <LeaderboardTable players={players} />
        </Panel>
        <Panel title="积分规则" className="rules-panel">
          <div className="rule-list">
            <div>
              <strong>胜方</strong>
              <span>+{settings.winPoints}</span>
            </div>
            <div>
              <strong>负方</strong>
              <span>+{settings.lossPoints}</span>
            </div>
            <div>
              <strong>计分口径</strong>
              <span>仅已入库</span>
            </div>
            <div>
              <strong>队长资格</strong>
              <span>{settings.minCaptainGames} 场</span>
            </div>
            <div>
              <strong>排名规则</strong>
              <span>积分 ＞ 胜场 ＞ 胜率 ＞ 场次</span>
            </div>
            <div>
              <strong>MVP / 加扣分</strong>
              <span>后续扩展</span>
            </div>
          </div>
        </Panel>
      </div>

      <div className="leaderboard-detail-grid">
        <Panel title="计分明细" action={<span className="status-pill status-success">可追溯</span>}>
          <ScoreEntriesTable entries={scoreEntries} />
        </Panel>
        <Panel title="待入库比赛" action={<span className="status-pill status-info">确认后待计分</span>}>
          <PendingStoreTable matches={pendingStoreMatches} />
        </Panel>
      </div>
    </div>
  );
}

function DraftView({ players, captains, isAdmin = false }) {
  const orderedCaptains = [captains[3], captains[2], captains[1], captains[0]].filter(Boolean);
  const draftOrder = [...orderedCaptains, ...orderedCaptains.slice().reverse(), ...orderedCaptains, ...orderedCaptains.slice().reverse()];
  const initialTeams = useMemo(() => Object.fromEntries(captains.map((captain) => [captain.id, [captain.id]])), [captains]);
  const [teams, setTeams] = useState(initialTeams);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState(null);

  const draftedIds = new Set(Object.values(teams).flat());
  const pool = players.filter((player) => !draftedIds.has(player.id) && player.played >= 4);
  const activeCaptain = draftOrder[cursor % draftOrder.length] || captains[0];

  function pickPlayer() {
    if (!selected || !activeCaptain) return;
    setTeams((current) => ({
      ...current,
      [activeCaptain.id]: [...(current[activeCaptain.id] || [activeCaptain.id]), selected],
    }));
    setSelected(null);
    setCursor((value) => value + 1);
  }

  if (!captains.length) {
    return (
      <div className="draft-page">
        <Panel title="队长选人" action={<span className="status-pill status-muted">未开始</span>}>
          <EmptyState title="暂无队长候选" body="积分榜只统计已入库内战；当前没有满足最低场次的玩家，暂不生成选人池。" />
        </Panel>
      </div>
    );
  }

  return (
    <div className="draft-page">
      <Panel
        title="队长选人"
        action={
          isAdmin ? (
          <button className="primary-button" type="button" onClick={pickPlayer} disabled={!selected}>
            <ShieldCheck size={16} />
            为当前轮选人
          </button>
          ) : (
            <span className="status-pill status-muted">公开只读</span>
          )
        }
      >
        <div className="draft-topline">
          <span className="status-pill status-warning">蛇形选人</span>
          <strong>当前轮：{activeCaptain?.name || "TBD"}</strong>
          <span>规则：积分榜前 4 为队长，低排名队长先选。</span>
        </div>
        <div className="draft-order-strip">
          {draftOrder.slice(0, 12).map((captain, index) => (
            <span key={`${captain.id}-${index}`} className={index === cursor ? "active" : ""}>
              {index + 1}. {captain.name}
            </span>
          ))}
        </div>
        <div className="draft-board">
          <div className="player-pool">
            <h3>可选玩家池</h3>
            {pool.map((player) =>
              isAdmin ? (
                <button key={player.id} className={`pool-row ${selected === player.id ? "selected" : ""}`} type="button" onClick={() => setSelected(player.id)}>
                  <img src={avatarUrl(player)} alt="" />
                  <span>
                    <strong>{player.name}</strong>
                    <small>{player.role} 号位 · {player.points} 分</small>
                  </span>
                </button>
              ) : (
                <div key={player.id} className="pool-row readonly-row">
                  <img src={avatarUrl(player)} alt="" />
                  <span>
                    <strong>{player.name}</strong>
                    <small>{player.role} 号位 · {player.points} 分</small>
                  </span>
                </div>
              ),
            )}
          </div>
          <div className="team-columns">
            {captains.map((captain, index) => {
              const roster = (teams[captain.id] || [captain.id]).map((id) => players.find((player) => player.id === id)).filter(Boolean);
              return (
                <article className="team-column" key={captain.id}>
                  <div className="team-head">
                    <span>{index + 1}号队长</span>
                    <strong>{captain.name}队</strong>
                  </div>
                  {Array.from({ length: 5 }).map((_, slotIndex) => {
                    const player = roster[slotIndex];
                    return (
                      <div className={`roster-slot ${player ? "filled" : ""}`} key={`${captain.id}-${slotIndex}`}>
                        <span>{slotIndex + 1}</span>
                        {player ? (
                          <>
                            <img src={avatarUrl(player)} alt="" />
                            <strong>{player.name}</strong>
                            <small>{player.role}</small>
                          </>
                        ) : (
                          <em>待选择</em>
                        )}
                      </div>
                    );
                  })}
                </article>
              );
            })}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function PlayoffView({ captains, isAdmin = false }) {
  const [scores, setScores] = useState({ a1: 0, a2: 0, b1: 0, b2: 0, f1: 0, f2: 0 });
  const teams = captains.map((captain) => `${captain.name}队`);

  function bump(key) {
    setScores((current) => ({ ...current, [key]: (current[key] + 1) % 4 }));
  }

  if (!captains.length) {
    return (
      <div className="view-stack">
        <Panel title="淘汰赛" action={<span className="status-pill status-muted">未生成</span>}>
          <EmptyState title="暂无淘汰赛对阵" body="队长池生成后，这里才会展示半决赛和决赛对阵。" />
        </Panel>
      </div>
    );
  }

  return (
    <div className="view-stack">
      <Panel title="淘汰赛" action={<span className="status-pill status-info">半决赛 BO3 · 决赛 BO3</span>}>
        <div className="playoff-board">
          <div className="playoff-round">
            <h3>半决赛</h3>
            <button className={`series-card ${isAdmin ? "" : "readonly-card"}`} type="button" onClick={() => bump("a1")} disabled={!isAdmin}>
              <span>{teams[0] || "TBD"}</span>
              <strong>{scores.a1}</strong>
            </button>
            <button className={`series-card ${isAdmin ? "" : "readonly-card"}`} type="button" onClick={() => bump("a2")} disabled={!isAdmin}>
              <span>{teams[3] || "TBD"}</span>
              <strong>{scores.a2}</strong>
            </button>
            <button className={`series-card ${isAdmin ? "" : "readonly-card"}`} type="button" onClick={() => bump("b1")} disabled={!isAdmin}>
              <span>{teams[1] || "TBD"}</span>
              <strong>{scores.b1}</strong>
            </button>
            <button className={`series-card ${isAdmin ? "" : "readonly-card"}`} type="button" onClick={() => bump("b2")} disabled={!isAdmin}>
              <span>{teams[2] || "TBD"}</span>
              <strong>{scores.b2}</strong>
            </button>
          </div>
          <div className="playoff-round">
            <h3>决赛</h3>
            <button className={`series-card wide ${isAdmin ? "" : "readonly-card"}`} type="button" onClick={() => bump("f1")} disabled={!isAdmin}>
              <span>半决赛胜者 A</span>
              <strong>{scores.f1}</strong>
            </button>
            <button className={`series-card wide ${isAdmin ? "" : "readonly-card"}`} type="button" onClick={() => bump("f2")} disabled={!isAdmin}>
              <span>半决赛胜者 B</span>
              <strong>{scores.f2}</strong>
            </button>
          </div>
          <div className="champion-card">
            <Trophy size={34} />
            <span>冠军</span>
            <strong>{scores.f1 >= 2 ? "胜者 A" : scores.f2 >= 2 ? "胜者 B" : "TBD"}</strong>
            <small>{isAdmin ? "点击比分卡可录入/循环比分" : "比分由管理员更新"}</small>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function RulesView({ settings = DEFAULT_SETTINGS }) {
  return (
    <div className="rules-layout">
      {[
        ["有效内战", "一场比赛至少 8 名登记玩家参与，双方每边至少 4 名登记玩家。"],
        ["日常积分", `确认有效后还要入库才计分；胜方 +${settings.winPoints}，负方 +${settings.lossPoints}。`],
        ["队长资格", `周期结束时积分前 4 且至少 ${settings.minCaptainGames} 场已入库内战的玩家成为队长候选。`],
        ["选人机制", "低排名队长先选，之后蛇形返回；每队 5 人，可额外登记 1 名替补。"],
        ["淘汰赛", "4 队半决赛 BO3，决赛 BO3；时间紧时可改半决赛 BO1。"],
        ["违规处理", "代打、小号、假赛、恶意摆烂会扣分，严重者取消本期资格。"],
      ].map(([title, body]) => (
        <article className="rule-card" key={title}>
          <div className="rule-icon">
            <ClipboardList size={20} />
          </div>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

const initialNotifications = [
  {
    id: "no-confirmed-matches",
    title: "暂无已入库内战",
    body: "积分榜只会统计管理员入库计分的有效内战；天梯和路人局不会进入积分。",
    time: "刚刚",
    read: false,
    action: "leaderboard",
  },
  {
    id: "public-data",
    title: "30 个测试 ID 可用",
    body: "OpenDota 已能读取 profile 和 recentMatches，可用于测试识别。",
    time: "今天",
    read: false,
    action: "players",
  },
];

function NotificationPanel({ notifications, onClose, onMarkAllRead, onOpenNotification }) {
  return (
    <section className="notification-panel" aria-label="通知消息">
      <div className="notification-head">
        <div>
          <h2>通知</h2>
          <p>{notifications.filter((item) => !item.read).length} 条未读</p>
        </div>
        <button className="ghost-button" type="button" onClick={onMarkAllRead}>
          全部已读
        </button>
      </div>
      <div className="notification-list">
        {notifications.map((item) => (
          <button
            className={`notification-item ${item.read ? "read" : ""}`}
            key={item.id}
            type="button"
            onClick={() => {
              onOpenNotification(item);
            }}
          >
            <span className="notification-dot" />
            <span>
              <strong>{item.title}</strong>
              <small>{item.body}</small>
              <em>{item.time}</em>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SettingsModal({ settings, onChange, onClose, onReset }) {
  function updateSetting(key, value) {
    onChange((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal settings-modal" role="dialog" aria-modal="true" aria-label="系统设置">
        <div className="modal-head">
          <div>
            <h2>系统设置</h2>
            <p>调整本周期的识别阈值、积分规则和同步策略。</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </div>

        <div className="settings-grid">
          <label className="setting-field full">
            <span>赛季名称</span>
            <input value={settings.seasonName} onChange={(event) => updateSetting("seasonName", event.target.value)} />
          </label>

          <label className="setting-field">
            <span>联赛房 League ID</span>
            <input
              inputMode="numeric"
              value={settings.leagueId || ""}
              onChange={(event) => updateSetting("leagueId", event.target.value.replace(/\D/g, ""))}
              placeholder="19220"
            />
          </label>

          <label className="setting-field">
            <span>有效内战最低登记人数</span>
            <strong>{settings.minRegisteredPlayers} / 10 人</strong>
            <input
              type="range"
              min="2"
              max="10"
              value={settings.minRegisteredPlayers}
              onChange={(event) => updateSetting("minRegisteredPlayers", Number(event.target.value))}
            />
          </label>

          <label className="setting-field">
            <span>队长资格最低场次</span>
            <strong>{settings.minCaptainGames} 场</strong>
            <input
              type="range"
              min="4"
              max="10"
              value={settings.minCaptainGames}
              onChange={(event) => updateSetting("minCaptainGames", Number(event.target.value))}
            />
          </label>

          <label className="setting-field">
            <span>胜方基础积分</span>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.winPoints}
              onChange={(event) => updateSetting("winPoints", Number(event.target.value))}
            />
          </label>

          <label className="setting-field">
            <span>负方参与积分</span>
            <input
              type="number"
              min="0"
              max="10"
              value={settings.lossPoints}
              onChange={(event) => updateSetting("lossPoints", Number(event.target.value))}
            />
          </label>

          <label className="switch-row">
            <span>
              <strong>自动同步</strong>
              <small>每日 03:00 拉取联赛房与玩家 recentMatches</small>
            </span>
            <input
              type="checkbox"
              checked={settings.autoSync}
              onChange={(event) => updateSetting("autoSync", event.target.checked)}
            />
          </label>

          <label className="switch-row">
            <span>
              <strong>启用 Steam 联赛房扫描</strong>
              <small>优先按 League ID 查近期比赛，再用玩家记录补漏</small>
            </span>
            <input
              type="checkbox"
              checked={settings.useLeagueScan}
              onChange={(event) => updateSetting("useLeagueScan", event.target.checked)}
            />
          </label>

          <label className="switch-row">
            <span>
              <strong>允许 8-9 人候选内战</strong>
              <small>低于 10 人时进入人工复核，不直接入库</small>
            </span>
            <input
              type="checkbox"
              checked={settings.allowPartialMatches}
              onChange={(event) => updateSetting("allowPartialMatches", event.target.checked)}
            />
          </label>
        </div>

        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onReset}>
            恢复默认
          </button>
          <button className="primary-button" type="button" onClick={onClose}>
            <Check size={16} />
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [activeView, setActiveView] = useState("overview");
  const [isAdmin] = useState(getInitialAdminMode);
  const [players, setPlayers] = useState(initialPlayers);
  const [matches, setMatches] = useState(initialMatches);
  const [showImport, setShowImport] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [syncRuns, setSyncRuns] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [lastSync, setLastSync] = useState("刚刚更新");
  const [syncing, setSyncing] = useState(false);
  const [refreshingMatchIds, setRefreshingMatchIds] = useState([]);
  const [backendReady, setBackendReady] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataRefreshing, setDataRefreshing] = useState(false);
  const [profileSyncing, setProfileSyncing] = useState(false);
  const [profileSyncMessage, setProfileSyncMessage] = useState("");
  const [matchDetails, setMatchDetails] = useState({});
  const [matchDetailLoading, setMatchDetailLoading] = useState(false);
  const [matchDetailError, setMatchDetailError] = useState("");
  const [heroNames, setHeroNames] = useState({});

  const visibleMatches = useMemo(() => matches.filter(isReviewableMatch), [matches]);
  const scoreEntries = useMemo(() => buildScoreEntries(players, matches, settings), [players, matches, settings]);
  const rankedPlayers = useMemo(() => buildStandingsFromScoredMatches(players, scoreEntries, settings), [players, scoreEntries, settings]);
  const captains = rankedPlayers.filter((player) => player.played >= settings.minCaptainGames).slice(0, 4);
  const activeNav = navItems.find((item) => item.id === activeView) || navItems[0];
  const selectedMatch = matches.find((match) => match.id === selectedMatchId);
  const unreadCount = notifications.filter((item) => !item.read).length;
  const dateRangeStatus = useMemo(() => getDateRangeSeconds(dateRange), [dateRange]);
  const dateRangeLabel = useMemo(() => formatDateRangeLabel(dateRange), [dateRange]);

  useEffect(() => {
    let cancelled = false;

    async function loadBootstrap() {
      try {
        const data = await apiRequest("/api/bootstrap");
        if (cancelled) return;
        if (Array.isArray(data.players)) setPlayers(data.players);
        if (Array.isArray(data.matches)) setMatches(data.matches);
        if (Array.isArray(data.syncRuns)) setSyncRuns(data.syncRuns);
        if (Array.isArray(data.auditLogs)) setAuditLogs(data.auditLogs);
        if (data.settings) setSettings((current) => ({ ...current, ...data.settings }));
        setBackendReady(true);
        setLastSync("已连接 D1");
      } catch (error) {
        if (cancelled) return;
        setBackendReady(false);
        setLastSync("本地演示数据");
        setNotifications((current) => [
          {
            id: `bootstrap-error-${Date.now()}`,
            title: "D1 后端暂不可用",
            body: error instanceof Error ? error.message : "当前使用本地演示数据，部署后会自动连接 Cloudflare D1。",
            time: "刚刚",
            read: false,
            action: "overview",
          },
          ...current.slice(0, 5),
        ]);
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    }

    loadBootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!backendReady) return undefined;
    const intervalId = window.setInterval(async () => {
      if (typeof document !== "undefined" && document.hidden) return;
      try {
        const data = await apiRequest("/api/bootstrap");
        if (Array.isArray(data.players)) setPlayers(data.players);
        applyServerState(data);
        if (data.settings) setSettings((current) => ({ ...current, ...data.settings }));
        setLastSync("状态已自动刷新");
      } catch {
        // 后台轮询失败不打扰正在操作的人，下一轮会继续尝试。
      }
    }, 120000);
    return () => window.clearInterval(intervalId);
  }, [backendReady]);

  function updateDateRangeField(field, value) {
    setDateRange((current) => ({ ...current, [field]: value, preset: "custom" }));
  }

  function applyDateRangePreset(preset) {
    if (preset === "custom") {
      setDateRange((current) => ({ ...current, preset: "custom" }));
      return;
    }
    setDateRange(makeDateRangePreset(preset));
  }

  function applyServerState(data) {
    if (Array.isArray(data?.matches)) setMatches(data.matches);
    if (Array.isArray(data?.syncRuns)) setSyncRuns(data.syncRuns);
    if (Array.isArray(data?.auditLogs)) setAuditLogs(data.auditLogs);
  }

  async function refreshBackendData() {
    if (dataRefreshing) return;
    setDataRefreshing(true);
    try {
      const data = await apiRequest("/api/bootstrap");
      if (Array.isArray(data.players)) setPlayers(data.players);
      applyServerState(data);
      if (data.settings) setSettings((current) => ({ ...current, ...data.settings }));
      setBackendReady(true);
      setLastSync("状态已刷新");
    } catch (error) {
      setNotifications((current) => [
        {
          id: `refresh-error-${Date.now()}`,
          title: "刷新状态失败",
          body: error instanceof Error ? error.message : "读取 D1 数据失败，请稍后重试。",
          time: "刚刚",
          read: false,
          action: "overview",
        },
        ...current.slice(0, 5),
      ]);
    } finally {
      setDataRefreshing(false);
    }
  }

  function exportDataSnapshot() {
    const exportedAt = new Date().toISOString();
    const snapshot = {
      exportedAt,
      seasonName: settings.seasonName,
      dateRange,
      settings,
      players,
      matches,
      syncRuns,
      auditLogs,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dota2-inhouse-backup-${exportedAt.slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setNotifications((current) => [
      {
        id: `export-${Date.now()}`,
        title: "数据已导出",
        body: "已生成当前玩家、比赛、同步状态和操作记录的 JSON 备份。",
        time: "刚刚",
        read: false,
        action: "overview",
      },
      ...current.slice(0, 5),
    ]);
  }

  async function confirmMatch(matchId) {
    const target = matches.find((match) => String(match.id) === String(matchId));
    const nextStatus = target?.status === "待确认" ? "已确认" : target?.status === "已确认" ? "已入库" : target?.status;
    if (!nextStatus) return;
    if (nextStatus === "已入库") {
      const count = target?.registeredPlayers?.length || target?.registered || 0;
      const ok = confirmAdminAction(`确认将 Match ID ${matchId} 入库计分？\n\n这会立刻影响积分榜，共计 ${count} 名命中玩家会按当前胜负获得积分。`);
      if (!ok) return;
    }

    try {
      const data = await apiRequest(`/api/matches/${matchId}`, { method: "PATCH", admin: true, body: { status: nextStatus } });
      applyServerState(data);
      setLastSync("D1 已保存");
    } catch (error) {
      setNotifications((current) => [
        {
          id: `confirm-error-${Date.now()}`,
          title: "比赛状态未变更",
          body: error instanceof Error ? error.message : "保存到 D1 失败，请稍后重试。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    }
  }

  async function rejectMatch(matchId) {
    if (!confirmAdminAction(`确认驳回 Match ID ${matchId}？\n\n驳回后它不会进入公开候选和积分榜，可以之后从隐藏记录恢复。`)) return;
    try {
      const data = await apiRequest(`/api/matches/${matchId}`, { method: "PATCH", admin: true, body: { status: "已驳回" } });
      applyServerState(data);
      setLastSync("D1 已保存");
    } catch (error) {
      setNotifications((current) => [
        {
          id: `reject-error-${Date.now()}`,
          title: "比赛状态未变更",
          body: error instanceof Error ? error.message : "保存到 D1 失败，请稍后重试。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    }
  }

  async function restoreMatch(matchId) {
    try {
      const data = await apiRequest(`/api/matches/${matchId}`, { method: "PATCH", admin: true, body: { status: "待确认" } });
      applyServerState(data);
      setLastSync("已恢复待确认");
    } catch (error) {
      setNotifications((current) => [
        {
          id: `restore-error-${Date.now()}`,
          title: "恢复失败",
          body: error instanceof Error ? error.message : "保存到 D1 失败，请稍后重试。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    }
  }

  async function rollbackMatch(matchId) {
    if (!confirmAdminAction(`确认撤销 Match ID ${matchId} 的入库计分？\n\n这场比赛会回到“已确认”，积分榜会立即扣回本场产生的分数。`)) return;
    try {
      const data = await apiRequest(`/api/matches/${matchId}`, { method: "PATCH", admin: true, body: { status: "已确认" } });
      applyServerState(data);
      setLastSync("已撤销入库，积分已回滚");
      setNotifications((current) => [
        {
          id: `rollback-${Date.now()}`,
          title: "入库已撤销",
          body: `Match ID ${matchId} 已回到已确认，积分榜已自动回滚。`,
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    } catch (error) {
      setNotifications((current) => [
        {
          id: `rollback-error-${Date.now()}`,
          title: "撤销入库失败",
          body: error instanceof Error ? error.message : "保存到 D1 失败，请稍后重试。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    }
  }

  async function setMatchWinner(matchId, winnerSide) {
    const target = matches.find((match) => String(match.id) === String(matchId));
    const storedText = target?.status === "已入库" ? "\n\n这场比赛已经入库，修改胜方会立即重算积分榜。" : "";
    if (!confirmAdminAction(`确认将 Match ID ${matchId} 的胜方设为${winnerSide}？${storedText}`)) return;
    try {
      const data = await apiRequest(`/api/matches/${matchId}`, { method: "PATCH", admin: true, body: { winnerSide } });
      applyServerState(data);
      setMatchDetails((current) => {
        const detail = current[matchId];
        if (!detail) return current;
        return {
          ...current,
          [matchId]: {
            ...detail,
            radiant_win: winnerSide === "天辉",
            manual_winner_override: true,
          },
        };
      });
      setLastSync(data.message || `已指定${winnerSide}胜`);
      setNotifications((current) => [
        {
          id: `winner-${Date.now()}`,
          title: "胜方已修正",
          body: data.message || `Match ID ${matchId} 已指定${winnerSide}胜。`,
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    } catch (error) {
      setNotifications((current) => [
        {
          id: `winner-error-${Date.now()}`,
          title: "胜方修正失败",
          body: error instanceof Error ? error.message : "保存到 D1 失败，请稍后重试。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    }
  }

  async function importPlayers(importedPlayers) {
    try {
      const data = await apiRequest("/api/players/import", { method: "POST", admin: true, body: { players: importedPlayers } });
      if (Array.isArray(data.players)) setPlayers(data.players);
      setLastSync("玩家库已保存");
    } catch (error) {
      setPlayers((current) => [...current, ...importedPlayers]);
      setNotifications((current) => [
        {
          id: `import-error-${Date.now()}`,
          title: "玩家导入未写入 D1",
          body: error instanceof Error ? error.message : "玩家只在当前页面临时加入。",
          time: "刚刚",
          read: false,
          action: "players",
        },
        ...current.slice(0, 5),
      ]);
    }
  }

  async function savePlayerEdit(playerDraft) {
    const data = await apiRequest(`/api/players/${playerDraft.dotaId}`, { method: "PATCH", admin: true, body: playerDraft });
    if (Array.isArray(data.players)) setPlayers(data.players);
    setLastSync("玩家资料已保存");
    setEditingPlayer(null);
    setNotifications((current) => [
      {
        id: `player-edit-${Date.now()}`,
        title: "玩家资料已保存",
        body: data.message || `${playerDraft.name || playerDraft.dotaId} 的资料已写入 D1。`,
        time: "刚刚",
        read: false,
        action: "players",
      },
      ...current.slice(0, 5),
    ]);
    return data;
  }

  async function addManualMatch(matchId) {
    try {
      const data = await apiRequest("/api/matches/manual", { method: "POST", admin: true, body: { matchId } });
      applyServerState(data);
      if (data.detail) setMatchDetails((current) => ({ ...current, [matchId]: data.detail }));
      setLastSync("比赛队列已保存");
      return data;
    } catch (error) {
      const nextMatch = {
        id: Number(matchId) || Date.now(),
        time: "刚刚",
        registered: 0,
        total: 10,
        sides: "-",
        status: "待确认",
        score: "待拉取",
        notes: "管理员手动添加；打开查看后会按 OpenDota 详情和本地玩家库重算命中人数。",
        registeredPlayers: [],
      };
      setMatches((current) => {
        if (current.some((match) => String(match.id) === String(matchId))) return current;
        return [nextMatch, ...current];
      });
      setNotifications((current) => [
        {
          id: `manual-match-error-${Date.now()}`,
          title: "比赛未写入 D1",
          body: error instanceof Error ? error.message : "Match ID 只在当前页面临时加入。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
      return { message: `Match ID ${matchId} 已临时加入；D1 保存失败。` };
    }
  }

  async function syncPlayerProfiles() {
    if (profileSyncing) return;

    setProfileSyncing(true);
    setProfileSyncMessage("正在从 OpenDota 同步游戏昵称、头像和 Steam 主页...");
    try {
      const data = await apiRequest("/api/players/sync-profiles", { method: "POST", admin: true });
      if (Array.isArray(data.players)) setPlayers(data.players);
      const message = data.message || `同步完成：${data.successCount || 0} 个成功，${data.failedCount || 0} 个失败。`;
      setProfileSyncMessage(message);
      setLastSync("玩家库已保存");
      setNotifications((current) => [
        {
          id: `profile-sync-${Date.now()}`,
          title: "玩家昵称同步完成",
          body: message,
          time: "刚刚",
          read: false,
          action: "players",
        },
        ...current.slice(0, 5),
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "OpenDota 请求失败，请稍后重试。";
      setProfileSyncMessage(`同步失败：${message}`);
      setNotifications((current) => [
        {
          id: `profile-sync-error-${Date.now()}`,
          title: "玩家昵称同步失败",
          body: message,
          time: "刚刚",
          read: false,
          action: "players",
        },
        ...current.slice(0, 5),
      ]);
    } finally {
      setProfileSyncing(false);
    }
  }

  async function loadHeroNames() {
    if (Object.keys(heroNames).length) return;
    try {
      const response = await fetch(`${OPENDOTA_BASE_URL}/constants/heroes`);
      if (!response.ok) return;
      const data = await response.json();
      const mapped = Object.values(data).reduce((names, hero) => {
        if (hero?.id) names[String(hero.id)] = HERO_CN_NAMES[String(hero.id)] || hero.localized_name || hero.name || `英雄 #${hero.id}`;
        return names;
      }, {});
      setHeroNames({ ...mapped, ...HERO_CN_NAMES });
    } catch {
      // 英雄字典失败不影响对局复核，界面会保留英雄 ID 兜底。
    }
  }

  async function syncNow() {
    if (syncing) return;
    if (!dateRangeStatus.valid) {
      setLastSync("时间范围无效");
      setNotifications((current) => [
        {
          id: `sync-range-error-${Date.now()}`,
          title: "时间范围无效",
          body: "开始时间需要早于结束时间，请调整检索时间段后再同步。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
      return;
    }
    setSyncing(true);
    setLastSync("正在扫描联赛房与 OpenDota");
    try {
      const data = await apiRequest("/api/sync-recent", {
        method: "POST",
        admin: true,
        body: { dateRange, settings },
      });
      const newCandidates = data.newCandidates || [];
      const duplicatedCount = data.duplicatedCount || 0;
      const failedCount = data.failedCount || 0;
      const leagueScan = data.leagueScan || {};
      const leagueSummary = leagueScan.enabled
        ? `联赛房 ${leagueScan.leagueId || settings.leagueId} 扫到 ${leagueScan.fetched || 0} 场，命中 ${leagueScan.candidateCount || 0} 场`
        : "联赛房扫描未启用";
      applyServerState(data);
      setLastSync(data.message || `${newCandidates.length} 新增，${duplicatedCount} 重复已跳过`);
      setNotifications((current) => [
        {
          id: `sync-${Date.now()}`,
          title: `同步完成：${newCandidates.length} 场新增`,
          body: `${dateRangeLabel}，${leagueSummary}，${duplicatedCount} 场重复已跳过，${failedCount} 个账号拉取失败。`,
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    } catch (error) {
      setLastSync("同步失败");
      setNotifications((current) => [
        {
          id: `sync-error-${Date.now()}`,
          title: "同步失败",
          body: error instanceof Error ? error.message : "OpenDota 请求失败，请稍后重试。",
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    } finally {
      setSyncing(false);
    }
  }

  async function openMatch(match) {
    setSelectedMatchId(match.id);
    setMatchDetailError("");
    loadHeroNames();
    if (matchDetails[match.id]) return;

    setMatchDetailLoading(true);
    try {
      const data = await apiRequest(`/api/matches/${match.id}`);
      if (Array.isArray(data.matches)) setMatches(data.matches);
      if (!data.detail) throw new Error(data.error || "OpenDota/Steam 暂未返回对局详情");
      const detail = data.detail;
      setMatchDetails((current) => ({ ...current, [match.id]: detail }));
    } catch (error) {
      try {
        const response = await fetch(`${OPENDOTA_BASE_URL}/matches/${match.id}`);
        if (!response.ok) throw error;
        const detail = await response.json();
        setMatchDetails((current) => ({ ...current, [match.id]: detail }));
        const resolvedPlayers = resolveMatchPlayers(match, detail, players, heroNames);
        const sideSummary = registeredSideSummary(resolvedPlayers);
        const rankedLadder = isRankedLadderMatch(detail);
        const totalPlayers = detail.players?.length || match.total || 10;
        const recognition = buildMatchRecognition(
          {
            ...match,
            registered: sideSummary.registered,
            total: totalPlayers,
            sides: sideSummary.sides,
            lobbyType: detail.lobby_type,
            gameMode: detail.game_mode,
            isRankedLadder: rankedLadder,
          },
          settings,
          detail,
        );
        setMatches((current) =>
          current.map((item) => {
            if (item.id !== match.id) return item;
            return {
              ...item,
              hidden: rankedLadder,
              isRankedLadder: rankedLadder,
              status: rankedLadder ? "已驳回" : item.status,
              time: detail.start_time ? formatMatchTime(detail.start_time) : item.time,
              startTime: detail.start_time || item.startTime,
              lobbyType: detail.lobby_type,
              gameMode: detail.game_mode,
              registered: sideSummary.registered,
              total: totalPlayers,
              sides: sideSummary.sides,
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
              score: recognition.fullInhouse ? "完整 10 人内战" : recognition.meetsThreshold ? `达到阈值 ${sideSummary.registered}/${recognition.threshold}` : `命中不足 ${sideSummary.registered}/${recognition.threshold}`,
              notes: rankedLadder
                ? "OpenDota 识别为天梯/单排类型，已从内战识别队列隐藏，不计入积分。"
                : recognition.fullInhouse
                  ? "OpenDota 详情与本地玩家库匹配到 10 人，可按完整内战复核。"
                  : `OpenDota 详情与本地玩家库匹配到 ${sideSummary.registered} 人；${recognition.meetsThreshold ? "已达到阈值但仍需人工复核。" : "未达到当前阈值，建议补充玩家 ID 后重算。"}`,
            };
          }),
        );
      } catch {
        setMatchDetailError(error instanceof Error ? error.message : "OpenDota/Steam 请求失败");
      }
    } finally {
      setMatchDetailLoading(false);
    }
  }

  async function refreshMatch(matchId) {
    const key = String(matchId);
    if (refreshingMatchIds.includes(key)) return;

    setRefreshingMatchIds((current) => [...current, key]);
    setMatchDetailError("");
    loadHeroNames();
    setMatchDetails((current) => {
      const next = { ...current };
      delete next[matchId];
      return next;
    });

    try {
      const data = await apiRequest(`/api/matches/${matchId}`, { method: "POST", admin: true, body: { action: "refresh" } });
      applyServerState(data);
      if (data.detail) {
        setMatchDetails((current) => ({ ...current, [matchId]: data.detail }));
      } else if (String(selectedMatchId) === key) {
        setMatchDetailError(data.error || "OpenDota/Steam 暂未返回对局详情");
      }
      const message = data.message || `Match ID ${matchId} 已重新识别`;
      setLastSync(message);
      setNotifications((current) => [
        {
          id: `refresh-match-${Date.now()}`,
          title: "比赛状态已刷新",
          body: data.warning ? `${message}；${data.warning}` : message,
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "刷新比赛状态失败，请稍后重试。";
      if (String(selectedMatchId) === key) setMatchDetailError(message);
      setNotifications((current) => [
        {
          id: `refresh-match-error-${Date.now()}`,
          title: "重新识别失败",
          body: message,
          time: "刚刚",
          read: false,
          action: "matches",
        },
        ...current.slice(0, 5),
      ]);
    } finally {
      setRefreshingMatchIds((current) => current.filter((item) => item !== key));
    }
  }

  function openNotification(item) {
    setNotifications((current) => current.map((notification) => (notification.id === item.id ? { ...notification, read: true } : notification)));
    setActiveView(item.action);
    setShowNotifications(false);
  }

  function markAllNotificationsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
  }

  async function saveSettingsAndClose() {
    try {
      const data = await apiRequest("/api/settings", { method: "PUT", admin: true, body: { settings } });
      if (data.settings) setSettings(data.settings);
      setLastSync("设置已保存");
      setShowSettings(false);
    } catch (error) {
      setNotifications((current) => [
        {
          id: `settings-error-${Date.now()}`,
          title: "设置未写入 D1",
          body: error instanceof Error ? error.message : "当前设置只保留在本页面。",
          time: "刚刚",
          read: false,
          action: "rules",
        },
        ...current.slice(0, 5),
      ]);
      setShowSettings(false);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Swords size={26} />
          </div>
          <div>
            <h1>CDEC 小群联赛</h1>
            <p>DOTA2 小群内战积分 + 组队淘汰赛</p>
          </div>
        </div>

        <nav className="main-nav" aria-label="主导航">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={activeView === item.id ? "active" : ""} type="button" onClick={() => setActiveView(item.id)}>
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

          <div className="season-card">
          <div className="season-row">
            <span>当前阶段</span>
            <strong>{settings.seasonName}</strong>
          </div>
          <div className="season-day">第 12 天 / 共 21 天</div>
          <div className="progress-track">
            <span style={{ width: "57%" }} />
          </div>
          <small>57%</small>
        </div>

        <div className="admin-card">
          <img src={avatarUrl(isAdmin ? "Admin" : "Viewer")} alt="" />
          <div>
            <strong>{isAdmin ? "Admin" : "Viewer"}</strong>
            <span>{isAdmin ? "管理模式" : "公开只读"}</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="page-title">
            <activeNav.icon size={22} />
            <div>
              <span>{activeNav.label}</span>
              <strong>{settings.seasonName}</strong>
            </div>
          </div>
          <div className="season-select">
            <strong>{settings.seasonName}</strong>
            <ChevronDown size={16} />
          </div>
          <div className={`date-range ${dateRangeStatus.valid ? "" : "invalid"}`}>
            <select aria-label="快捷时间段" value={dateRange.preset || "custom"} onChange={(event) => applyDateRangePreset(event.target.value)}>
              {DATE_RANGE_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              aria-label="开始时间"
              value={normalizeDateTimeValue(dateRange.start)}
              onChange={(event) => updateDateRangeField("start", event.target.value)}
              onInput={(event) => updateDateRangeField("start", event.target.value)}
            />
            <span>~</span>
            <input
              type="datetime-local"
              aria-label="结束时间"
              value={normalizeDateTimeValue(dateRange.end, true)}
              onChange={(event) => updateDateRangeField("end", event.target.value)}
              onInput={(event) => updateDateRangeField("end", event.target.value)}
            />
            <CalendarDays size={16} />
          </div>
          <div className="sync-pill">
            <RefreshCw size={15} />
            数据同步
            <span>{lastSync}</span>
          </div>
          <div className="topbar-actions">
            {isAdmin ? (
              <>
                <button className="ghost-button" type="button" onClick={refreshBackendData} disabled={dataRefreshing}>
                  <RefreshCw size={16} className={dataRefreshing ? "spin-icon" : ""} />
                  {dataRefreshing ? "刷新中" : "刷新状态"}
                </button>
                <button className="ghost-button" type="button" onClick={syncNow} disabled={syncing || !dateRangeStatus.valid}>
                  <RefreshCw size={16} className={syncing ? "spin-icon" : ""} />
                  {syncing ? "同步中" : "手动同步"}
                </button>
                <button className="ghost-button" type="button" onClick={exportDataSnapshot}>
                  <Download size={16} />
                  导出数据
                </button>
                <button
                  className={`icon-button notification-button ${showNotifications ? "active" : ""}`}
                  type="button"
                  aria-label="通知"
                  aria-expanded={showNotifications}
                  onClick={() => setShowNotifications((current) => !current)}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && <span>{unreadCount}</span>}
                </button>
                <button className={`icon-button ${showSettings ? "active" : ""}`} type="button" aria-label="设置" onClick={() => setShowSettings(true)}>
                  <Settings size={18} />
                </button>
                {showNotifications && (
                  <NotificationPanel
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    onMarkAllRead={markAllNotificationsRead}
                    onOpenNotification={openNotification}
                  />
                )}
              </>
            ) : (
              <span className="mode-pill">公开只读</span>
            )}
          </div>
        </header>

        {activeView === "overview" && (
          <Overview
            players={rankedPlayers}
            matches={visibleMatches}
            captains={captains}
            syncRuns={syncRuns}
            auditLogs={auditLogs}
            onNavigate={setActiveView}
            onConfirm={confirmMatch}
            onReject={rejectMatch}
            onRollback={rollbackMatch}
            onView={openMatch}
            onRefresh={refreshMatch}
            onSyncNow={syncNow}
            syncing={syncing}
            dateRangeLabel={dateRangeLabel}
            dateRangeValid={dateRangeStatus.valid}
            refreshingMatchIds={refreshingMatchIds}
            settings={settings}
            isAdmin={isAdmin}
          />
        )}
        {activeView === "players" && (
          <PlayersView
            players={players}
            openImport={() => setShowImport(true)}
            onEditPlayer={setEditingPlayer}
            onSyncProfiles={syncPlayerProfiles}
            profileSyncing={profileSyncing}
            profileSyncMessage={profileSyncMessage}
            isAdmin={isAdmin}
          />
        )}
        {activeView === "matches" && (
          <MatchesView
            matches={isAdmin ? matches : visibleMatches}
            onAddMatch={addManualMatch}
            onConfirm={confirmMatch}
            onReject={rejectMatch}
            onRestore={restoreMatch}
            onRollback={rollbackMatch}
            onView={openMatch}
            onRefresh={refreshMatch}
            refreshingMatchIds={refreshingMatchIds}
            dateRange={dateRange}
            dateRangeLabel={dateRangeLabel}
            dateRangeValid={dateRangeStatus.valid}
            settings={settings}
            onOpenSettings={() => setShowSettings(true)}
            isAdmin={isAdmin}
          />
        )}
        {activeView === "leaderboard" && <LeaderboardView players={rankedPlayers} matches={matches} scoreEntries={scoreEntries} settings={settings} />}
        {activeView === "draft" && <DraftView players={rankedPlayers} captains={captains} isAdmin={isAdmin} />}
        {activeView === "playoff" && <PlayoffView captains={captains} isAdmin={isAdmin} />}
        {activeView === "rules" && <RulesView settings={settings} />}
      </main>

      {isAdmin && showImport && <ImportModal onClose={() => setShowImport(false)} onImport={importPlayers} />}
      {isAdmin && editingPlayer && <PlayerEditModal player={editingPlayer} onClose={() => setEditingPlayer(null)} onSave={savePlayerEdit} />}
      {isAdmin && showSettings && <SettingsModal settings={settings} onChange={setSettings} onClose={saveSettingsAndClose} onReset={resetSettings} />}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          detail={matchDetails[selectedMatch.id]}
          loading={matchDetailLoading}
          error={matchDetailError}
          players={players}
          heroNames={heroNames}
          onClose={() => setSelectedMatchId(null)}
          onConfirm={confirmMatch}
          onReject={rejectMatch}
          onRollback={rollbackMatch}
          onRefresh={refreshMatch}
          refreshing={refreshingMatchIds.includes(String(selectedMatchId))}
          onSetWinner={setMatchWinner}
          settings={settings}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
}
