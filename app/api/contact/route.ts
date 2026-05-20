import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { rateLimit } from "@/lib/rate-limit/redis";
import { safeError } from "@/lib/security/errors";
import { redirectToPath } from "@/lib/utils/redirect";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  company: z.string().max(160).optional(),
  companySize: z.string().max(80).optional(),
  categoryInterest: z.string().max(120).optional(),
  useCase: z.string().max(120).optional(),
  message: z.string().min(10).max(3000)
});

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const input = ContactSchema.parse(Object.fromEntries(form));
    const limited = await rateLimit(`contact:${input.email.toLowerCase()}`, 3, 3600);
    if (!limited.allowed) {
      return NextResponse.json({ error: "Too many contact requests. Please try again later." }, { status: 429 });
    }

    await prisma.contactLead.create({
      data: {
        ...input,
        email: input.email.toLowerCase(),
        metadata: {
          source: "marketing_contact",
          userAgent: request.headers.get("user-agent") ?? "unknown"
        }
      }
    });

    return redirectToPath("/contact?submitted=1");
  } catch (error) {
    return safeError(error, "Could not submit contact request");
  }
}
