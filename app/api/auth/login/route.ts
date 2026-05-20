import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit/redis";
import { safeError } from "@/lib/security/errors";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  redirectTo: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const input = LoginSchema.parse(Object.fromEntries(await request.formData()));
    const limited = await rateLimit(`login:${input.email}`, 10, 900);
    if (!limited.allowed) return NextResponse.json({ error: "Too many login attempts" }, { status: 429 });
    const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() }, include: { memberships: true } });
    if (!user || !(await verifyPassword(user.passwordHash, input.password))) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    await createSession(user.id);
    const organizationId = user.memberships[0]?.organizationId;
    if (organizationId) await prisma.auditLog.create({ data: { organizationId, actorUserId: user.id, action: "login" } });
    const redirectPath = input.redirectTo && input.redirectTo.startsWith("/") && !input.redirectTo.startsWith("//") ? input.redirectTo : "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url), 303);
  } catch (error) {
    return safeError(error, "Login failed");
  }
}
