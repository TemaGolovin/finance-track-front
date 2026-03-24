# Finance Track — frontend

Web client for shared family or group income and expense tracking: transactions, categories, groups, and invitations.

**Related repository:** [finance-track-back](../finance-track-back) — NestJS API.

**Roadmap and backlog:** [docs/ROADMAP.md](docs/ROADMAP.md).

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4, Radix UI, class-variance-authority
- TanStack Query, next-intl, react-hook-form, Zod
- Recharts, Sonner, next-themes

## Requirements

- Node.js 20+ (compatible with Next.js 15)

## Setup

```bash
pnpm install
# or npm install
```

## Environment variables

Create a `.env` file in the frontend root (do not commit secrets):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_BFF` | BFF base URL for browser requests (see `src/shared/api/instances.ts`) |
| `NEXT_API_BACKEND` | Backend URL for the Route Handler proxy (`src/app/api/[...path]/route.ts`) |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | VAPID public key for web push (optional) |
| `VAPID_PRIVATE_KEY` | VAPID private key on the Next server (optional; use with the public key) |

`NEXT_PUBLIC_*` values are included in the client bundle; the others are server-only.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` / `npm run dev` | Development (Turbopack), default [http://localhost:3000](http://localhost:3000) |
| `pnpm build` / `npm run build` | Production build |
| `pnpm start` / `npm run start` | Run after `build` |
| `pnpm lint` / `npm run lint` | ESLint (Next) |

## Running locally with the API

1. Start the backend (see the README in [finance-track-back](../finance-track-back)).
2. Set the BFF and backend URLs in `.env` so they match the API port.

By default Nest listens on port **3000**, same as `next dev`. To run both at once, run the API on another port (e.g. `PORT=3001`), point `NEXT_API_BACKEND` and `NEXT_PUBLIC_API_BFF` at that address on the frontend, and set `CLIENT_URL` to the frontend URL in the backend config.

## Deployment

Standard Next.js workflow: `build` and `start` on your host; set environment variables in the provider’s dashboard.
