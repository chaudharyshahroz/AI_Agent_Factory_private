# Dokploy Deployment

Use `docker-compose.dokploy.yml` for Dokploy deployments. Do not use `docker-compose.prod.yml` inside Dokploy unless you intentionally want the app stack to manage Caddy and bind ports 80/443.

Dokploy should route the public domain to:

- Service: `app`
- Internal port: `3000`

The compose file uses `expose: "3000"` instead of host `ports`, so it will not collide with existing apps already using ports 3000 through 3005 on the VPS.

## Required Environment Overrides

Inside Dokploy, create `.env` variables using service hostnames:

```env
APP_DOMAIN=your-domain.com
APP_URL=https://your-domain.com
DATABASE_URL=postgresql://agentfactory:CHANGE_ME@postgres:5432/agentfactory?schema=public
REDIS_URL=redis://redis:6379
LOCAL_STORAGE_PATH=/app/storage
```

Keep all OpenAI, Stripe, SMTP, `AUTH_SECRET`, and `ENCRYPTION_KEY` values in Dokploy environment variables only.

## First Deploy Commands

After the stack is healthy, open the `app` container terminal or Dokploy command runner and run:

```bash
npx prisma migrate deploy
npm run db:seed
```

Then redeploy once if you added the domain after the first deploy.
