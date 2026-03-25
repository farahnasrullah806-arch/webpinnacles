# @webpinnacles/api

Fastify backend for CMS and public content API.

## Features

- Public content endpoints for website rendering
- Admin auth (JWT + refresh) and RBAC
- Content publish hooks (revalidate + indexing queue)
- Integration adapters with `mock` / `live` modes
- Drizzle schema + seed scaffolding

## Run

```bash
pnpm --filter @webpinnacles/api dev
```

## Key Endpoints

- `GET /public/pages/:slug`
- `GET /public/services`
- `GET /public/services/:slug`
- `GET /public/blog`
- `GET /public/blog/:slug`
- `GET /public/case-studies`
- `GET /public/faqs?scope=...`
- `POST /public/contact`
- `POST /admin/auth/login`
