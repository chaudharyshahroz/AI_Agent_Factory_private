# Hostinger Deployment

1. Create a Hostinger VPS using Ubuntu 24.04 with Docker.
2. Point your domain A record to the VPS IP.
3. Open firewall ports 22, 80, and 443 only.
4. Clone the repository into `/opt/agentfactory`.
5. Create `.env.production` from `.env.example`.
6. Build and start Docker Compose.
7. Run Prisma migrations.
8. Seed category packs.
9. Check logs.
10. Visit the app domain.

```bash
sudo mkdir -p /opt/agentfactory
sudo chown -R $USER:$USER /opt/agentfactory
cd /opt/agentfactory

docker compose -f docker-compose.prod.yml --env-file .env.production build
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec app npm run db:seed
docker compose -f docker-compose.prod.yml logs -f app
```

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
