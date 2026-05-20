import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

export function getRedis() {
  if (!globalForRedis.redis) {
    globalForRedis.redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
      connectTimeout: 1500,
      commandTimeout: 1500,
      maxRetriesPerRequest: null,
      lazyConnect: true,
      retryStrategy: (times) => (times > 1 ? null : 250)
    });
    globalForRedis.redis.on("error", () => undefined);
  }
  return globalForRedis.redis;
}

export const redis = new Proxy({} as Redis, {
  get(_target, prop) {
    const client = getRedis();
    const value = client[prop as keyof Redis];
    return typeof value === "function" ? value.bind(client) : value;
  }
});

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  try {
    const client = getRedis();
    const count = await client.incr(key);
    if (count === 1) await client.expire(key, windowSeconds);
    return { allowed: count <= limit, count, limit };
  } catch {
    return { allowed: true, count: 0, limit };
  }
}
