import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/db/prisma";

export const SESSION_COOKIE = "af_session";

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await prisma.session.create({ data: { userId, tokenHash: hashToken(token), expiresAt } });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  jar.delete(SESSION_COOKIE);
}

export async function readSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return prisma.session.findFirst({
    where: { tokenHash: hashToken(token), expiresAt: { gt: new Date() } },
    include: { user: { include: { memberships: true } } }
  });
}
