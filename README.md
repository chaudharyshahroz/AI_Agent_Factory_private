# AgentFactory AI

AgentFactory AI is a self-hostable MVP for category-based AI agent generation. Users choose a business category, select a template, answer setup questions, upload knowledge, generate a validated agent blueprint, test the agent, and deploy it as a website chat widget.

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

## Production

Production is designed for a Hostinger VPS with Docker Compose, Caddy, Next.js, PostgreSQL 16 with pgvector, Redis, and a shared local storage volume.

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production build
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec app npm run db:seed
```

For Dokploy, use `docker-compose.dokploy.yml` and route the domain to service `app` on internal port `3010`. Dokploy supplies the public reverse proxy, so the Dokploy compose file does not bind host ports.

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

## Notes

OpenAI, Stripe, SMTP, and optional integrations are configured only through server-side environment variables. The MVP includes integration placeholders and approval-protected stubs for risky actions.
