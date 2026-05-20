# Backups

Database backup:

```bash
docker compose -f docker-compose.prod.yml exec postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > agentfactory-$(date +%F).sql
```

Uploads backup:

```bash
docker run --rm -v agentfactory_app_storage:/data -v "$PWD:/backup" alpine tar czf /backup/agentfactory-uploads-$(date +%F).tgz /data
```

Restore database:

```bash
cat agentfactory.sql | docker compose -f docker-compose.prod.yml exec -T postgres psql -U "$POSTGRES_USER" "$POSTGRES_DB"
```

Restore uploads:

```bash
docker run --rm -v agentfactory_app_storage:/data -v "$PWD:/backup" alpine tar xzf /backup/agentfactory-uploads.tgz -C /
```

Cron example:

```cron
0 2 * * * cd /opt/agentfactory && docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -U agentfactory agentfactory > backups/db-$(date +\%F).sql
```
