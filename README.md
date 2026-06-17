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

The admin prototype view only hides or shows frontend controls. Use a real backend and authentication before relying on it for secure production administration.
