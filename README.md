# WebPinnacles v2.0 Monorepo

Production scaffold for the WebPinnacles March 2026 rebuild blueprint.

## Workspace Layout

```text
apps/
  web/         Next.js 14 public website
  cms-admin/   React + Vite CMS admin panel
packages/
  api/         Fastify CMS/API backend
  contracts/   Shared Zod schemas + TS contracts
  seo-tools/   Python SEO automation scripts
```

## Core Stack

- `pnpm` workspaces + Turborepo orchestration
- Next.js 14 App Router + TypeScript strict
- Fastify + Drizzle ORM + PostgreSQL schema definitions
- Shared contracts for API/frontend consistency
- Mock/live adapter modes for external providers (HubSpot, Resend, GSC, Redis, Queue)

## Quick Start

1. Install Node.js 20+, pnpm 10+, and Python 3.12+.
2. Copy env templates:
   - `apps/web/.env.example` -> `apps/web/.env.local`
   - `apps/cms-admin/.env.example` -> `apps/cms-admin/.env`
   - `packages/api/.env.example` -> `packages/api/.env`
3. Install dependencies:

```bash
pnpm install
```

4. Start all apps:

```bash
pnpm dev
```

## Service URLs (default)

- Web app: `http://localhost:3000`
- CMS admin: `http://localhost:3100`
- API: `http://localhost:4000`

## Test + Build

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Seeded Credentials (local scaffold)

- Admin: `admin@webpinnacles.com` / `Admin!234`
- Editor: `editor@webpinnacles.com` / `Editor!234`

These are scaffold defaults for local dev only. Replace before production.
