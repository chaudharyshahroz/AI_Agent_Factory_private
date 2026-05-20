# Dokploy Deployment

Use `docker-compose.dokploy.yml` for Dokploy deployments. Do not use `docker-compose.prod.yml` inside Dokploy unless you intentionally want the app stack to manage Caddy and bind ports 80/443.

## Important Dokploy Setting

Create this project as a **Docker Compose** deployment, not as a single **Dockerfile** application.

The app needs four services:

- `app`
- `worker`
- `postgres`
- `redis`

If Dokploy is showing Dockerfile fields such as "Dockerfile", "Docker Context Path", or "Docker Build Stage", you are in the wrong deployment type for the production stack. Switch/create the service as Docker Compose and set:

- Compose file: `docker-compose.dokploy.yml`
- Build path: `.`
- Branch: `main`

Dokploy should route the public domain to:

- Service: `app`
- Internal port: `3010`

The compose file sets `PORT=3010` and uses `expose: "3010"` instead of host `ports`, so it will not collide with existing apps already using ports 3000 through 3005 on the VPS.

## Required Environment Overrides

Inside Dokploy, create `.env` variables using service hostnames:

```env
APP_DOMAIN=your-domain.com
APP_URL=https://your-domain.com
PORT=3010
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
