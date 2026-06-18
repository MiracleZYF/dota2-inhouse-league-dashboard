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

## Automatic Sync

The app exposes a protected endpoint for scheduled sync:

```text
POST /api/cron/sync
Authorization: Bearer <ADMIN_TOKEN or CRON_SECRET>
```

The included GitHub Actions workflow runs it every day at 19:00 UTC, which is 03:00 in Asia/Shanghai. To enable it, add a GitHub repository secret named `ADMIN_TOKEN` with the same value as the Cloudflare Pages `ADMIN_TOKEN`.
