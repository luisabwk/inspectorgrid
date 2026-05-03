# InspectorGrid backend

Hono + Drizzle + Clerk. Talks to a Railway-hosted PostgreSQL.

## Local dev

```bash
npm install
cp .env.example .env  # fill in your values
npm run db:migrate     # apply migrations
npm run dev            # http://localhost:8080
```

## Required env vars

- `DATABASE_URL` — Postgres connection string (Railway gives you this).
- `CLERK_SECRET_KEY` — Clerk backend API key (`sk_test_...` or `sk_live_...`).
- `CLERK_PUBLISHABLE_KEY` — Clerk publishable key (used by the middleware to fetch JWKS).
- `CORS_ALLOWED_ORIGINS` — comma-separated list of allowed origins (your frontend URL). Empty means allow any origin (dev only).

## Deploying on Railway

Create a service in your Railway project pointing at this repo with:

- **Root Directory**: `server`
- **Builder**: Dockerfile (the `Dockerfile` in this folder)

The container runs `node dist/db/migrate.js && node dist/index.js`, so migrations apply on every deploy.
