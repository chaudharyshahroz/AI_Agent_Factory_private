import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { redis } from "@/lib/rate-limit/redis";

function withTimeout<T>(promise: Promise<T>, ms = 1500) {
  return Promise.race([
    promise,
    new Promise<T>((_resolve, reject) => setTimeout(() => reject(new Error("Timed out")), ms))
  ]);
}

export async function GET() {
  const database = await prisma.$queryRaw`SELECT 1`.then(() => "ok").catch(() => "error");
  const cache = await withTimeout(redis.ping()).then(() => "ok").catch(() => "error");
  return NextResponse.json({ status: database === "ok" && cache === "ok" ? "ok" : "degraded", database, redis: cache });
}
