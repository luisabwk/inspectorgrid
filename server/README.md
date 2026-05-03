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

## Admin: cadastrar casos

Endpoints `POST/PUT/DELETE /api/cases` exigem que o usuário Clerk tenha
`publicMetadata.role === "admin"`.

### 1. Marcar seu usuário como admin

No painel do Clerk → **Users** → seu usuário → **Metadata** → **Public** →
edite e salve:

```json
{ "role": "admin" }
```

### 2. Pegar um JWT pra usar em requests

Em qualquer página do app autenticada, abra o DevTools console e rode:

```js
await window.Clerk.session.getToken()
```

Copie o token retornado.

### 3. Criar um caso via curl

```bash
curl -X POST https://<seu-backend>.up.railway.app/api/cases \
  -H "Authorization: Bearer <token-do-passo-2>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "O Mistério da Sala Vermelha",
    "description": "...",
    "difficulty": 1,
    "gridSize": 6,
    "layoutConfig": { "cells": [...], "rooms": [...] },
    "suspects": [{ "id": "alice", ... }],
    "solution": { "alice": { "row": 0, "col": 2 } },
    "clues": [...]
  }'
```

`PUT /api/cases/:id` aceita os mesmos campos parcialmente. `DELETE /api/cases/:id` apaga.
