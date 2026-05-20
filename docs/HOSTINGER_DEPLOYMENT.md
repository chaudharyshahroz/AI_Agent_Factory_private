# Hostinger Deployment

1. Create a Hostinger VPS using Ubuntu 24.04 with Docker.
2. Point your domain A record to the VPS IP.
3. Open firewall ports 22, 80, and 443 only.
4. Clone the repository into `/opt/categent`.
5. Create `.env.production` from `.env.example`.
6. Build and start Docker Compose.
7. Run Prisma migrations.
8. Seed category packs.
9. Check logs.
10. Visit the app domain.

```bash
sudo mkdir -p /opt/categent
sudo chown -R $USER:$USER /opt/categent
cd /opt/categent

docker compose -f docker-compose.prod.yml --env-file .env.production build
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec app npm run db:seed
docker compose -f docker-compose.prod.yml logs -f app
```

Set `INITIAL_SUPER_ADMIN_EMAIL` in production before creating your first account. The matching signup becomes the super admin user for `/admin`.

## Dokploy Notes

If deploying through Dokploy on a VPS that already runs other apps:

1. Use the Dokploy compose deployment, not a single Dockerfile deployment, when you need app, worker, Postgres, and Redis together.
2. Route `categent.com` to the app service on internal port `3010`.
3. Do not bind public ports for Postgres or Redis.
4. Use `pgvector/pgvector:pg16` for the Categent database.
5. Run migrations from the app container:

```bash
cd /app
npm run db:deploy
npm run db:seed
```

Use these production values as the shape, replacing passwords and hosts with your Dokploy service names:

```bash
APP_NAME=Categent
APP_DOMAIN=categent.com
ADMIN_DOMAIN=admin.categent.com
APP_URL=https://categent.com
PORT=3010
HOSTNAME=0.0.0.0
INITIAL_SUPER_ADMIN_EMAIL=you@example.com
DATABASE_URL=postgresql://agentfactory:password@categent-pgvector:5432/agentfactory?schema=public
REDIS_URL=redis://default:password@categent-redis:6379
```

For the admin subdomain:

1. Add a DNS `A` record for `admin.categent.com` pointing to the same VPS IP.
2. In Dokploy, add `admin.categent.com` as an additional domain for the same Categent app service on internal port `3010`.
3. Keep `ADMIN_DOMAIN=admin.categent.com` in the Categent service environment.
4. Visit `https://admin.categent.com`; it rewrites to the protected `/admin` area automatically.

## Updates

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.production build
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

## Backups

```bash
docker compose -f docker-compose.prod.yml exec postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup.sql
docker run --rm -v agentfactory_app_storage:/data -v "$PWD:/backup" alpine tar czf /backup/uploads.tgz /data
```

## Restore

```bash
cat backup.sql | docker compose -f docker-compose.prod.yml exec -T postgres psql -U "$POSTGRES_USER" "$POSTGRES_DB"
docker run --rm -v agentfactory_app_storage:/data -v "$PWD:/backup" alpine tar xzf /backup/uploads.tgz -C /
```
