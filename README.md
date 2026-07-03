# DOTA2 Inhouse League Dashboard

DOTA2 小群内战积分、比赛识别、队长选人和淘汰赛看板原型。

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production output is generated in `dist`.

## Cloudflare Pages

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

## Access Modes

- Public read-only view: `/`
- Admin prototype view: `/?admin=1`

Admin write operations require the Cloudflare `ADMIN_TOKEN` environment variable.

## Runtime Data Keys

Set these in Cloudflare Pages -> Settings -> Environment variables:

- `ADMIN_TOKEN`: required for admin write APIs and GitHub Actions sync.
- `STEAM_API_KEY`: recommended for Steam league room scans and `GetMatchDetails`.
- `STRATZ_API_TOKEN`: optional fallback for match details when OpenDota or Steam have not returned full data.

## Automatic Sync

The app exposes a protected endpoint for scheduled sync:

```text
POST /api/cron/sync
Authorization: Bearer <ADMIN_TOKEN or CRON_SECRET>
```

The included GitHub Actions workflow runs it every day at 19:00 UTC, which is 03:00 in Asia/Shanghai, and at 04:05 UTC, which is 12:05 in Asia/Shanghai for the rate-limited player profile queue. To enable it, add a GitHub repository secret named `ADMIN_TOKEN` with the same value as the Cloudflare Pages `ADMIN_TOKEN`.

Manual sync and scheduled sync both retry unresolved matches. The detail fallback order is OpenDota -> Steam Web API -> STRATZ API -> cached Steam league list/manual review.
