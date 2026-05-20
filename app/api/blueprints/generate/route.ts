import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOrganizationAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { generateBlueprint } from "@/lib/agents/generate-blueprint";

const Schema = z.object({ organizationId: z.string().uuid(), agentId: z.string().uuid().optional(), category: z.string(), templateSlug: z.string(), setupAnswers: z.unknown().optional(), uploadedKnowledgeSummary: z.string().optional(), enabledIntegrations: z.array(z.string()).optional(), desiredTone: z.string().optional(), approvalPreferences: z.array(z.string()).optional() });

export async function POST(request: Request) {
  const user = await requireUser();
  const contentType = request.headers.get("content-type") || "";
  const raw = contentType.includes("application/json") ? await request.json() : Object.fromEntries(await request.formData());
  const input = Schema.parse(raw);
  await requireOrganizationAccess(user.id, input.organizationId);
  const blueprint = await generateBlueprint(input);
  const agent = input.agentId ? await prisma.agent.findFirstOrThrow({ where: { id: input.agentId, organizationId: input.organizationId } }) : await prisma.agent.create({ data: { organizationId: input.organizationId, categorySlug: input.category, name: blueprint.agentName, description: blueprint.agentDescription } });
  const saved = await prisma.agentBlueprint.create({ data: { organizationId: input.organizationId, agentId: agent.id, content: blueprint, promptMetadata: { generatedAt: new Date().toISOString() } } });
  await prisma.usageEvent.create({ data: { organizationId: input.organizationId, type: "blueprint_generation" } });
  return contentType.includes("application/json") ? NextResponse.json({ blueprint: saved }) : NextResponse.redirect(new URL(`/dashboard/agents/${agent.id}/blueprint`, request.url), 303);
}
