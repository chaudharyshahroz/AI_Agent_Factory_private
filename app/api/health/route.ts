import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { redis } from "@/lib/rate-limit/redis";

export async function GET() {
  const database = await prisma.$queryRaw`SELECT 1`.then(() => "ok").catch(() => "error");
  const cache = await redis.ping().then(() => "ok").catch(() => "error");
  return NextResponse.json({ status: database === "ok" && cache === "ok" ? "ok" : "degraded", database, redis: cache });
}
