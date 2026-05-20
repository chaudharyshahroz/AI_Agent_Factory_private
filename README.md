# Categent

Categent means Category + Agent. It is a self-hostable AI agent creation platform for building production-ready business agents from category packs, templates, knowledge, tools, test cases, approvals, and website widget deployments.

## What Changed In This Version

- Premium public website for home, product, categories, category landers, templates, integrations, security, pricing, and contact.
- Guided onboarding and polished login/signup pages.
- Professional workspace dashboard with analytics, conversations, knowledge, tools, approvals, deployments, billing, and settings.
- Multi-step agent builder for category, template, workflow description, setup questions, tools, blueprint, testing, and deployment.
- Super admin dashboard at `/admin` for users, organizations, agents, conversations, categories, templates, tools, integrations, pricing, subscriptions, approvals, contact leads, audit logs, system health, and content controls.
- Contact/demo form persisted to the database.
- Expanded Prisma schema with `SUPER_ADMIN`, contact leads, admin content blocks, feature flags, system settings, API keys, and notifications.
- Rich internal tool registry metadata and implementation aliases for knowledge search, lead capture, appointment requests, support tickets, product search, customer info collection, notifications, webhooks, and order lookup stubs.

## Local Development

```bash
npm install
docker compose -f docker-compose.dev.yml up -d
npx prisma migrate dev
npm run db:seed
npm run dev
npm run worker
```

Open `http://localhost:3000`.

## Required Environment

Copy `.env.example` and set at minimum:

- `APP_URL`
- `APP_DOMAIN`
- `AUTH_SECRET`
- `ENCRYPTION_KEY`
- `INITIAL_SUPER_ADMIN_EMAIL`
- `DATABASE_URL`
- `REDIS_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- Stripe keys and price IDs when billing is live

When a user signs up with `INITIAL_SUPER_ADMIN_EMAIL`, their first membership is assigned `SUPER_ADMIN`.

## Production

Categent is designed for Hostinger VPS or Dokploy with Docker, Next.js standalone output, PostgreSQL 16 with pgvector, Redis, and a shared local storage volume.

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production build
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec app npm run db:seed
```

For Dokploy, use `docker-compose.dokploy.yml` and route the domain to the `app` service on internal port `3010`. Dokploy owns the public Traefik proxy, so do not expose app, Postgres, or Redis ports publicly.

## Commands

- `npm run dev`
- `npm run worker`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run db:migrate`
- `npm run db:deploy`
- `npm run db:seed`

## Security Notes

Secrets stay server-side. The widget receives only a public deployment key. Organization-owned routes check authenticated access, super admin pages require `SUPER_ADMIN`, and risky tools create human approval records instead of executing directly.
