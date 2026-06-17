import { useMemo, useState } from "react";
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
  FileDown,
  Filter,
  Gamepad2,
  Home,
  Medal,
  Plus,
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
const DEFAULT_DATE_RANGE = { start: "2026-06-01", end: "2026-06-21" };
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

function isRankedLadderMatch(match) {
  return [6, 7].includes(Number(match?.lobby_type));
}

function isConfirmedInhouseMatch(match) {
  return match.status === "已确认" || match.status === "已入库";
}

function isReviewableMatch(match) {
  return !match.hidden && !match.isRankedLadder && match.status !== "已驳回";
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
      return {
        accountId: accountId || registeredAccountId(knownPlayer),
        name: knownPlayer?.name || player.personaname || player.name || "匿名玩家",
        side,
        playerSlot: player.player_slot,
        heroId: player.hero_id,
        heroName: formatHeroName(player.hero_id, heroNames),
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        goldPerMin: player.gold_per_min,
        xpPerMin: player.xp_per_min,
        result: side === "天辉" ? Boolean(detail.radiant_win) : !detail.radiant_win,
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
  const startSeconds = dateBoundarySeconds(dateRange.start);
  const endSeconds = dateBoundarySeconds(dateRange.end, true);
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
        result: playerSide(match.player_slot) === "天辉" ? Boolean(match.radiant_win) : !match.radiant_win,
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

function buildStandingsFromConfirmedMatches(players, matches, settings) {
  const playerByAccount = new Map(players.map((player) => [String(player.dotaId), player]));
  const standingById = new Map(
    players.map((player) => [
      player.id,
      {
        ...player,
        played: 0,
        wins: 0,
        points: 0,
        captain: false,
        form: [],
      },
    ]),
  );

  matches
    .filter(isConfirmedInhouseMatch)
    .forEach((match) => {
      (match.registeredPlayers || []).forEach((matchPlayer) => {
        const accountId = registeredAccountId(matchPlayer);
        const rosterPlayer = playerByAccount.get(accountId);
        if (!rosterPlayer) return;

        const row = standingById.get(rosterPlayer.id);
        const won = Boolean(matchPlayer.result);
        row.played += 1;
        row.wins += won ? 1 : 0;
        row.points += won ? settings.winPoints : settings.lossPoints;
        row.form = [won ? "W" : "L", ...row.form].slice(0, 5);
      });
    });

  return Array.from(standingById.values())
    .filter((player) => player.played > 0)
    .map((player) => ({
      ...player,
      captain: player.played >= settings.minCaptainGames,
      form: player.form.length ? player.form : ["-", "-", "-", "-", "-"],
    }))
    .sort((a, b) => b.points - a.points || b.wins - a.wins || b.played - a.played);
}

function rosterPlayer(id, name, dotaId, role) {
  return {
    id,
    name,
    dotaId,
    role,
    played: 0,
    wins: 0,
    points: 0,
    captain: false,
    publicData: false,
    form: ["-", "-", "-", "-", "-"],
    status: "待内战统计",
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

function avatarUrl(name) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}&backgroundColor=0f172a,1f2937,2f1f19`;
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
        title="暂无已确认内战积分"
        body="待管理员在比赛识别中确认有效内战后，这里才会生成排名。天梯或普通路人局不会计入。"
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
                  <img src={avatarUrl(player.name)} alt="" />
                  <div>
                    <strong>{player.name}</strong>
                    {!compact && <span>DOTA2 ID {player.dotaId}</span>}
                  </div>
                </div>
              </td>
              <td>{player.played}</td>
              <td>{player.wins}</td>
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

function MatchQueue({ matches, onConfirm, onReject, onView, compact = false }) {
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
            <th>比赛时间</th>
            <th>命中人数</th>
            <th>双方命中</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>
                <span className={`status-pill ${statusClass(match.status)}`}>{match.status}</span>
              </td>
              <td>{match.id}</td>
              <td>{match.time}</td>
              <td>
                <strong>{match.registered}</strong> / {match.total}
              </td>
              <td>{match.sides}</td>
              <td>
                <div className="table-actions">
                  <button
                    className={`ghost-button ${compact ? "icon-action" : ""}`}
                    type="button"
                    title="查看"
                    aria-label={`查看比赛 ${match.id}`}
                    onClick={() => onView?.(match)}
                  >
                    <Eye size={15} />
                    {!compact && "查看"}
                  </button>
                  {match.status === "待确认" && !compact && (
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
                  {match.status === "待确认" && compact && (
                    <button className="primary-button compact-button icon-action" type="button" onClick={() => onConfirm(match.id)} title="确认">
                      <Check size={15} />
                    </button>
                  )}
                  {match.status === "已确认" && (
                    <button className={`primary-button compact-button ${compact ? "icon-action" : ""}`} type="button" onClick={() => onConfirm(match.id)} title="入库">
                      <Database size={15} />
                      {!compact && "入库"}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
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
          <img src={avatarUrl(player.name)} alt="" />
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
        return {
          id: Date.now() + index,
          name: name || `新玩家 ${index + 1}`,
          dotaId: dotaId || "待补充",
          role: role || "全能",
          played: 0,
          wins: 0,
          points: 0,
          captain: false,
          publicData: false,
          form: ["-", "-", "-", "-", "-"],
          status: "待内战统计",
        };
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

function MatchDetailModal({ match, detail, loading, error, players, heroNames, onClose, onConfirm, onReject }) {
  if (!match) return null;

  const canConfirm = match.status === "待确认";
  const canStore = match.status === "已确认";
  const detailPlayers = detail?.players || [];
  const displayedPlayers = resolveMatchPlayers(match, detail, players, heroNames);
  const radiantPlayers = displayedPlayers.filter((player) => player.side === "天辉");
  const direPlayers = displayedPlayers.filter((player) => player.side === "夜魇");
  const recognition = registeredSideSummary(displayedPlayers);
  const registeredCount = recognition.registered;
  const totalPlayers = detailPlayers.length || match.total || 10;
  const winner = detail ? (detail.radiant_win ? "天辉" : "夜魇") : "-";
  const verdict =
    registeredCount >= 10
      ? "玩家库命中 10 人，可按完整内战复核"
      : registeredCount > 0
        ? `玩家库命中 ${registeredCount} 人，需要补全名单或人工复核`
        : "暂无玩家库命中，需先补充 DOTA2 ID 或等待同步";

  function renderTeam(title, teamPlayers, won) {
    return (
      <section className={`team-detail-card ${won ? "winner" : ""}`}>
        <div className="team-detail-head">
          <div>
            <h3>{title}</h3>
            <span>{won ? "胜方" : "负方"}</span>
          </div>
          <strong>{teamPlayers.filter((player) => player.isRegistered).length} 名命中</strong>
        </div>
        <div className="team-player-list">
          {teamPlayers.length ? (
            teamPlayers.map((player, index) => (
              <article className={`team-player-row ${player.isRegistered ? "registered" : ""}`} key={`${title}-${player.accountId || index}-${player.heroId}`}>
                <div className="team-player-main">
                  <span className={`member-badge ${player.isRegistered ? "registered" : "outsider"}`}>{player.isRegistered ? "已命中" : "未匹配"}</span>
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
              <strong>{verdict}</strong>
            </div>
            <p>
              胜方：{winner} · 时长：{detail ? formatDuration(detail.duration) : "-"} · 玩家库命中：{registeredCount} / {totalPlayers}
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
              <span>比赛时间</span>
              <strong>{match.time}</strong>
            </div>
            <div className="detail-card">
              <span>玩家库命中</span>
              <strong>
                {registeredCount} / {totalPlayers}
              </strong>
            </div>
            <div className="detail-card">
              <span>双方命中</span>
              <strong>{recognition.sides}</strong>
            </div>
            <div className="detail-card">
              <span>队列记录</span>
              <strong>{match.score}</strong>
            </div>
            <div className="detail-card">
              <span>复核结论</span>
              <strong>{registeredCount >= 10 ? "完整内战" : "名单不足"}</strong>
            </div>
            <div className="detail-card">
              <span>OpenDota</span>
              <strong>{loading ? "拉取中" : detail ? "已拉取" : error ? "暂无详情" : "未请求"}</strong>
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

          {error && (
            <div className="detail-alert">
              OpenDota 暂时没有返回这场比赛详情：{error}。如果这是手动输入或测试 match_id，可以继续按本地识别结果复核。
            </div>
          )}

          {registeredCount < totalPlayers && (
            <div className="detail-alert detail-alert-info">
              未匹配不等于不是群友；它只表示当前玩家库里没有对应 DOTA2 ID，或完整对局详情隐藏了账号。补充玩家 ID 后重新同步/查看即可重算。
            </div>
          )}

          <div className="team-detail-layout">
            {renderTeam("天辉", radiantPlayers, detail ? detail.radiant_win : false)}
            {renderTeam("夜魇", direPlayers, detail ? !detail.radiant_win : false)}
          </div>

          <details className="match-record-section">
            <summary>展开原始技术表</summary>
            <div className="section-title-row">
              <h3>原始技术记录</h3>
              <span>{detail ? "来自 OpenDota /matches" : "来自已识别玩家记录"}</span>
            </div>
            <div className="table-wrap">
              <table className="data-table match-record-table">
                <thead>
                  <tr>
                    <th>阵营</th>
                    <th>玩家</th>
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
                        <td>{player.accountId || "-"}</td>
                        <td>{player.heroName}</td>
                        <td>
                          {player.kills ?? "-"} / {player.deaths ?? "-"} / {player.assists ?? "-"}
                        </td>
                        <td>{player.goldPerMin ?? "-"}</td>
                        <td>{player.xpPerMin ?? "-"}</td>
                        <td>
                          <span className={`result-pill ${player.result ? "win" : "loss"}`}>{player.result ? "胜" : "负"}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="empty-cell">
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
          {canConfirm && (
            <button className="danger-button" type="button" onClick={() => onReject(match.id)}>
              <X size={16} />
              驳回
            </button>
          )}
          {(canConfirm || canStore) && (
            <button className="primary-button" type="button" onClick={() => onConfirm(match.id)}>
              {canStore ? <Database size={16} /> : <Check size={16} />}
              {canStore ? "入库计分" : "确认有效"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Overview({ players, matches, captains, onNavigate, onConfirm, onReject, onView }) {
  const pendingCount = matches.filter((match) => match.status === "待确认").length;
  const effectiveMatches = matches.filter(isConfirmedInhouseMatch);
  const effectiveCount = effectiveMatches.length;
  const activeCount = players.length;
  const averagePlayers = effectiveMatches.length
    ? (effectiveMatches.reduce((total, match) => total + (match.registered || 0), 0) / effectiveMatches.length).toFixed(1)
    : "-";

  return (
    <div className="view-stack">
      <div className="kpi-grid">
        <KpiCard icon={Swords} label="有效内战场次" value={effectiveCount} meta="仅统计已确认内战" tone="red" />
        <KpiCard icon={Users} label="上榜玩家" value={activeCount} meta="来自已确认内战" tone="gold" />
        <KpiCard icon={CircleHelp} label="今日待确认" value={pendingCount} meta="待处理比赛" tone="yellow" />
        <KpiCard icon={CalendarDays} label="当前周期" value="第 12 天" meta="共 21 天" tone="cyan" />
        <KpiCard icon={Activity} label="场均命中人数" value={averagePlayers} meta="天梯不计入" tone="teal" />
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
          <p className="footnote">积分只统计管理员确认的有效内战；待确认、驳回、天梯/路人局均不计入。</p>
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
          <MatchQueue matches={matches} onConfirm={onConfirm} onReject={onReject} onView={onView} compact />
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
            <EmptyState title="队长池未生成" body="暂无满足最低场次的已确认内战积分，周期末会按积分榜自动生成队长候选。" />
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
          {captains.length ? <BracketPreview captains={captains} /> : <EmptyState title="赛程待生成" body="确认足够内战并生成队长池后，淘汰赛对阵会在这里展示。" />}
        </Panel>
      </div>
    </div>
  );
}

function PlayersView({ players, openImport }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("全部");
  const filtered = players.filter((player) => {
    const matchQuery = `${player.name}${player.dotaId}`.toLowerCase().includes(query.toLowerCase());
    const matchRole = role === "全部" || player.role.includes(role);
    return matchQuery && matchRole;
  });

  return (
    <div className="view-stack">
      <Panel
        title="玩家库"
        action={
          <button className="primary-button" type="button" onClick={openImport}>
            <UserPlus size={16} />
            导入玩家
          </button>
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
          <button className="ghost-button" type="button">
            <FileDown size={16} />
            导出 CSV
          </button>
        </div>
        <div className="table-wrap">
          <table className="data-table players-table">
            <thead>
              <tr>
                <th>玩家</th>
                <th>DOTA2 ID</th>
                <th>常用位置</th>
                <th>名单用途</th>
                <th>OpenDota 状态</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((player) => (
                <tr key={player.id}>
                  <td>
                    <div className="player-cell">
                      <img src={avatarUrl(player.name)} alt="" />
                      <strong>{player.name}</strong>
                    </div>
                  </td>
                  <td>{player.dotaId}</td>
                  <td>{player.role}</td>
                  <td>
                    <span className="status-pill status-muted">内战识别名单</span>
                  </td>
                  <td>
                    <span className={`status-pill ${player.publicData ? "status-success" : "status-muted"}`}>
                      {player.publicData ? "可读取" : "待检测"}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill status-muted">{player.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">玩家库只维护昵称和 DOTA2 ID，不直接存放积分；场次、积分、队长资格只由已确认内战生成，OpenDota 状态需同步验证。</p>
      </Panel>
    </div>
  );
}

function MatchesView({ matches, setMatches, onConfirm, onReject, onView, dateRange, settings, onOpenSettings }) {
  const [matchId, setMatchId] = useState("");
  const [threshold, setThreshold] = useState(settings.minRegisteredPlayers);
  const [manualMessage, setManualMessage] = useState("");

  function addMatch() {
    const cleanId = matchId.trim();
    if (!cleanId) return;
    if (matches.some((match) => String(match.id) === cleanId)) {
      setManualMessage(`Match ID ${cleanId} 已在识别队列中，已跳过去重。`);
      setMatchId("");
      return;
    }

    const nextMatch = {
      id: Number(cleanId) || Date.now(),
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
      if (current.some((match) => String(match.id) === cleanId)) return current;
      return [nextMatch, ...current];
    });
    setManualMessage(`Match ID ${cleanId} 已加入候选队列。`);
    setMatchId("");
  }

  return (
    <div className="match-layout">
      <aside className="filter-rail">
        <div className="rail-section">
          <span className="rail-label">自动同步</span>
          <button className="sync-toggle active" type="button">
            <RefreshCw size={16} />
            每日 03:00
          </button>
        </div>
        <div className="rail-section">
          <span className="rail-label">有效内战阈值</span>
          <div className="slider-readout">{threshold} / 10 人</div>
          <input min="2" max="10" value={threshold} type="range" onChange={(event) => setThreshold(Number(event.target.value))} />
        </div>
        <div className="rail-section">
          <span className="rail-label">当前日期范围</span>
          <div className="date-readout">
            {dateRange.start} ~ {dateRange.end}
          </div>
          <small>由顶部日期输入控制，同步时按此范围过滤。</small>
        </div>
        <div className="rail-section">
          <span className="rail-label">识别来源</span>
          <label className="check-row">
            <input type="checkbox" defaultChecked />
            OpenDota
          </label>
          <label className="check-row">
            <input type="checkbox" defaultChecked />
            Steam API
          </label>
          <label className="check-row">
            <input type="checkbox" />
            群截图佐证
          </label>
        </div>
      </aside>

      <div className="view-stack">
        <Panel title="比赛识别" action={<span className="status-pill status-success">数据同步正常</span>}>
          <div className="manual-add">
            <label className="search-field">
              <Gamepad2 size={16} />
              <input value={matchId} onChange={(event) => setMatchId(event.target.value)} placeholder="输入 match_id 手动加入候选队列" />
            </label>
            <button className="primary-button" type="button" onClick={addMatch}>
              <Plus size={16} />
              加入队列
            </button>
            <button className="ghost-button" type="button" onClick={onOpenSettings}>
              <SlidersHorizontal size={16} />
              同步设置
            </button>
          </div>
          {manualMessage && <p className="inline-message">{manualMessage}</p>}
          <MatchQueue matches={matches} onConfirm={onConfirm} onReject={onReject} onView={onView} />
        </Panel>

        <div className="note-grid">
          {matches.slice(0, 3).map((match) => (
            <article className="review-note" key={`note-${match.id}`}>
              <div>
                <span className={`status-pill ${statusClass(match.status)}`}>{match.status}</span>
                <strong>{match.id}</strong>
              </div>
              <p>{match.notes}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaderboardView({ players, settings }) {
  return (
    <div className="leaderboard-layout">
      <Panel title="完整积分榜" action={<span className="status-pill status-warning">最低 {settings.minCaptainGames} 场进入选人池</span>}>
        <LeaderboardTable players={players} />
      </Panel>
      <Panel title="积分规则" className="rules-panel">
        <div className="rule-list">
          <div>
            <strong>胜方</strong>
            <span>+10</span>
          </div>
          <div>
            <strong>负方</strong>
            <span>+3</span>
          </div>
          <div>
            <strong>MVP / 团队贡献</strong>
            <span>+1 ~ +2</span>
          </div>
          <div>
            <strong>爆冷胜利</strong>
            <span>+1 ~ +2</span>
          </div>
          <div>
            <strong>单场上限</strong>
            <span>+14</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function DraftView({ players, captains }) {
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
          <EmptyState title="暂无队长候选" body="积分榜只统计已确认内战；当前没有满足最低场次的玩家，暂不生成选人池。" />
        </Panel>
      </div>
    );
  }

  return (
    <div className="draft-page">
      <Panel
        title="队长选人"
        action={
          <button className="primary-button" type="button" onClick={pickPlayer} disabled={!selected}>
            <ShieldCheck size={16} />
            为当前轮选人
          </button>
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
            {pool.map((player) => (
              <button key={player.id} className={`pool-row ${selected === player.id ? "selected" : ""}`} type="button" onClick={() => setSelected(player.id)}>
                <img src={avatarUrl(player.name)} alt="" />
                <span>
                  <strong>{player.name}</strong>
                  <small>{player.role} 号位 · {player.points} 分</small>
                </span>
              </button>
            ))}
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
                            <img src={avatarUrl(player.name)} alt="" />
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

function PlayoffView({ captains }) {
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
            <button className="series-card" type="button" onClick={() => bump("a1")}>
              <span>{teams[0] || "TBD"}</span>
              <strong>{scores.a1}</strong>
            </button>
            <button className="series-card" type="button" onClick={() => bump("a2")}>
              <span>{teams[3] || "TBD"}</span>
              <strong>{scores.a2}</strong>
            </button>
            <button className="series-card" type="button" onClick={() => bump("b1")}>
              <span>{teams[1] || "TBD"}</span>
              <strong>{scores.b1}</strong>
            </button>
            <button className="series-card" type="button" onClick={() => bump("b2")}>
              <span>{teams[2] || "TBD"}</span>
              <strong>{scores.b2}</strong>
            </button>
          </div>
          <div className="playoff-round">
            <h3>决赛</h3>
            <button className="series-card wide" type="button" onClick={() => bump("f1")}>
              <span>半决赛胜者 A</span>
              <strong>{scores.f1}</strong>
            </button>
            <button className="series-card wide" type="button" onClick={() => bump("f2")}>
              <span>半决赛胜者 B</span>
              <strong>{scores.f2}</strong>
            </button>
          </div>
          <div className="champion-card">
            <Trophy size={34} />
            <span>冠军</span>
            <strong>{scores.f1 >= 2 ? "胜者 A" : scores.f2 >= 2 ? "胜者 B" : "TBD"}</strong>
            <small>点击比分卡可录入/循环比分</small>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function RulesView() {
  return (
    <div className="rules-layout">
      {[
        ["有效内战", "一场比赛至少 8 名登记玩家参与，双方每边至少 4 名登记玩家。"],
        ["日常积分", "胜方 +10，负方 +3，MVP 或团队贡献最多 +2，爆冷胜利最多 +2。"],
        ["队长资格", "周期结束时积分前 4 且至少 6 场有效内战的玩家成为队长候选。"],
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
    title: "暂无已确认内战",
    body: "积分榜只会统计管理员确认的有效内战；天梯和路人局不会进入积分。",
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
              <small>每日 03:00 拉取测试 ID 的 recentMatches</small>
            </span>
            <input
              type="checkbox"
              checked={settings.autoSync}
              onChange={(event) => updateSetting("autoSync", event.target.checked)}
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
  const [players, setPlayers] = useState(initialPlayers);
  const [matches, setMatches] = useState(initialMatches);
  const [showImport, setShowImport] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [settings, setSettings] = useState({
    seasonName: "S1 积分周期",
    minRegisteredPlayers: 8,
    minCaptainGames: 6,
    winPoints: 10,
    lossPoints: 3,
    autoSync: true,
    allowPartialMatches: true,
  });
  const [lastSync, setLastSync] = useState("刚刚更新");
  const [syncing, setSyncing] = useState(false);
  const [matchDetails, setMatchDetails] = useState({});
  const [matchDetailLoading, setMatchDetailLoading] = useState(false);
  const [matchDetailError, setMatchDetailError] = useState("");
  const [heroNames, setHeroNames] = useState({});

  const visibleMatches = useMemo(() => matches.filter(isReviewableMatch), [matches]);
  const rankedPlayers = useMemo(() => buildStandingsFromConfirmedMatches(players, matches, settings), [players, matches, settings]);
  const captains = rankedPlayers.filter((player) => player.played >= settings.minCaptainGames).slice(0, 4);
  const activeNav = navItems.find((item) => item.id === activeView) || navItems[0];
  const selectedMatch = matches.find((match) => match.id === selectedMatchId);
  const unreadCount = notifications.filter((item) => !item.read).length;

  function confirmMatch(matchId) {
    setMatches((current) =>
      current.map((match) => {
        if (match.id !== matchId) return match;
        if (match.status === "待确认") return { ...match, status: "已确认", notes: "管理员已确认，等待入库计分" };
        if (match.status === "已确认") return { ...match, status: "已入库", notes: "已按当前积分规则完成入库" };
        return match;
      }),
    );
  }

  function rejectMatch(matchId) {
    setMatches((current) => current.map((match) => (match.id === matchId ? { ...match, status: "已驳回", notes: "管理员驳回：不满足本期有效内战标准" } : match)));
  }

  function importPlayers(importedPlayers) {
    setPlayers((current) => [...current, ...importedPlayers]);
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
    setSyncing(true);
    setLastSync("正在拉取 OpenDota");
    try {
      const results = await Promise.allSettled(
        players.map(async (player) => {
          const response = await fetch(`${OPENDOTA_BASE_URL}/players/${player.dotaId}/recentMatches`);
          if (!response.ok) throw new Error(`${player.name} 拉取失败 ${response.status}`);
          const recentMatches = await response.json();
          return recentMatches.map((match) => ({ player, match }));
        }),
      );
      const recentRows = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
      const failedCount = results.filter((result) => result.status === "rejected").length;
      const candidates = buildCandidatesFromRecentMatches(players, recentRows, dateRange, settings);
      const existingIds = new Set(matches.map((match) => String(match.id)));
      const newCandidates = candidates.filter((match) => !existingIds.has(String(match.id)));
      const duplicatedCount = candidates.length - newCandidates.length;
      setMatches([...newCandidates, ...matches].sort((a, b) => (b.startTime || 0) - (a.startTime || 0)));
      setLastSync(`${newCandidates.length} 新增，${duplicatedCount} 重复已跳过`);
      setNotifications((current) => [
        {
          id: `sync-${Date.now()}`,
          title: `同步完成：${newCandidates.length} 场新增`,
          body: `${dateRange.start} ~ ${dateRange.end}，${duplicatedCount} 场重复已跳过，${failedCount} 个账号拉取失败。`,
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
      const response = await fetch(`${OPENDOTA_BASE_URL}/matches/${match.id}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const detail = await response.json();
      setMatchDetails((current) => ({ ...current, [match.id]: detail }));
      const resolvedPlayers = resolveMatchPlayers(match, detail, players, heroNames);
      const recognition = registeredSideSummary(resolvedPlayers);
      const rankedLadder = isRankedLadderMatch(detail);
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
            registered: recognition.registered,
            total: detail.players?.length || item.total || 10,
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
            score: recognition.registered >= 10 ? "玩家库命中 10" : `玩家库命中 ${recognition.registered}`,
            notes: rankedLadder
              ? "OpenDota 识别为天梯/单排类型，已从内战识别队列隐藏，不计入积分。"
              : recognition.registered >= 10
                ? "OpenDota 详情与本地玩家库匹配到 10 人，可按完整内战复核。"
                : `OpenDota 详情与本地玩家库匹配到 ${recognition.registered} 人；若实际群友更多，需要补充对应 DOTA2 ID 后重算。`,
          };
        }),
      );
    } catch (error) {
      setMatchDetailError(error instanceof Error ? error.message : "OpenDota 请求失败");
    } finally {
      setMatchDetailLoading(false);
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
    setSettings({
      seasonName: "S1 积分周期",
      minRegisteredPlayers: 8,
      minCaptainGames: 6,
      winPoints: 10,
      lossPoints: 3,
      autoSync: true,
      allowPartialMatches: true,
    });
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
          <img src={avatarUrl("Admin")} alt="" />
          <div>
            <strong>Admin</strong>
            <span>在线</span>
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
          <div className="date-range">
            <input
              type="date"
              aria-label="开始日期"
              value={dateRange.start}
              onChange={(event) => setDateRange((current) => ({ ...current, start: event.target.value }))}
            />
            <span>~</span>
            <input
              type="date"
              aria-label="结束日期"
              value={dateRange.end}
              onChange={(event) => setDateRange((current) => ({ ...current, end: event.target.value }))}
            />
            <CalendarDays size={16} />
          </div>
          <div className="sync-pill">
            <RefreshCw size={15} />
            数据同步
            <span>{lastSync}</span>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button" type="button" onClick={syncNow} disabled={syncing}>
              <RefreshCw size={16} />
              {syncing ? "同步中" : "手动同步"}
            </button>
            <button className="ghost-button" type="button">
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
          </div>
        </header>

        {activeView === "overview" && (
          <Overview
            players={rankedPlayers}
            matches={visibleMatches}
            captains={captains}
            onNavigate={setActiveView}
            onConfirm={confirmMatch}
            onReject={rejectMatch}
            onView={openMatch}
          />
        )}
        {activeView === "players" && <PlayersView players={players} openImport={() => setShowImport(true)} />}
        {activeView === "matches" && (
          <MatchesView
            matches={visibleMatches}
            setMatches={setMatches}
            onConfirm={confirmMatch}
            onReject={rejectMatch}
            onView={openMatch}
            dateRange={dateRange}
            settings={settings}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
        {activeView === "leaderboard" && <LeaderboardView players={rankedPlayers} settings={settings} />}
        {activeView === "draft" && <DraftView players={rankedPlayers} captains={captains} />}
        {activeView === "playoff" && <PlayoffView captains={captains} />}
        {activeView === "rules" && <RulesView />}
      </main>

      {showImport && <ImportModal onClose={() => setShowImport(false)} onImport={importPlayers} />}
      {showSettings && <SettingsModal settings={settings} onChange={setSettings} onClose={() => setShowSettings(false)} onReset={resetSettings} />}
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
        />
      )}
    </div>
  );
}
