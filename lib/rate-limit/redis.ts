import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL || "redis://localhost:6379", { maxRetriesPerRequest: null });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSeconds);
  return { allowed: count <= limit, count, limit };
}
