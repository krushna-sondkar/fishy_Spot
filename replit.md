# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

- **Fishy Spot** (`artifacts/fishy-spot`) — React + Vite e-commerce frontend at `/` for the Fishy Spot fresh fish home delivery business (Mumbai & Navi Mumbai). Cart state via React Context + localStorage. Cash-on-delivery checkout. Floating WhatsApp button. Routes: `/`, `/shop`, `/cart`, `/checkout`, `/order-confirmation`, `/about`, `/contact`.
- **API Server** (`artifacts/api-server`) — Express API at `/api`. Endpoints: `GET /healthz`, `GET /fish` (static catalogue), `POST /orders`, `GET /orders`, `GET /orders/stats`. Orders are persisted to `artifacts/api-server/data/orders.json` (no DB required).

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
