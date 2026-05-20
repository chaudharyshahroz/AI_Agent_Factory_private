import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit/redis";
import { safeError } from "@/lib/security/errors";
import { redirectToPath } from "@/lib/utils/redirect";

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  organizationName: z.string().optional(),
  businessCategory: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const input = SignupSchema.parse(Object.fromEntries(form));
    const limited = await rateLimit(`signup:${input.email}`, 5, 3600);
    if (!limited.allowed) return NextResponse.json({ error: "Too many signup attempts" }, { status: 429 });
    const user = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        name: input.name,
        passwordHash: await hashPassword(input.password),
        memberships: {
          create: {
            role: process.env.INITIAL_SUPER_ADMIN_EMAIL?.toLowerCase() === input.email.toLowerCase() ? "SUPER_ADMIN" : "OWNER",
            organization: {
              create: {
                name: input.organizationName || (input.name ? `${input.name}'s organization` : "My organization"),
                subscriptions: { create: { plan: "FREE", status: "free" } },
                auditLogs: { create: { action: "organization_created", metadata: { businessCategory: input.businessCategory || "not_set" } } }
              }
            }
          }
        }
      }
    });
    const org = await prisma.organizationMember.findFirstOrThrow({ where: { userId: user.id } });
    await prisma.auditLog.create({ data: { organizationId: org.organizationId, actorUserId: user.id, action: "signup" } });
    await createSession(user.id);
    return redirectToPath("/onboarding");
  } catch (error) {
    return safeError(error, "Signup failed");
  }
}
