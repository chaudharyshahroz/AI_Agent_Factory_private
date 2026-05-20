import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser, getDefaultOrganization } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { getCategory } from "@/lib/categories/catalog";
import { generateBlueprint } from "@/lib/agents/generate-blueprint";

const Schema = z.object({ category: z.string(), templateSlug: z.string() });

export async function POST(request: Request) {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  if (!org) return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  const form = await request.formData();
  const input = Schema.parse(Object.fromEntries(form));
  const category = getCategory(input.category);
  const template = category?.templates.find(([slug]) => slug === input.templateSlug);
  if (!category || !template) return NextResponse.json({ error: "Template not found" }, { status: 404 });
  const answers = Object.fromEntries(Array.from(form.entries()).filter(([key]) => key.startsWith("answer:")));
  const agent = await prisma.agent.create({ data: { organizationId: org.id, categorySlug: category.slug, name: template[1], description: template[2], setupAnswers: { ...answers, templateSlug: input.templateSlug } } });
  const blueprint = await generateBlueprint({ category: category.slug, templateSlug: input.templateSlug, setupAnswers: answers });
  await prisma.agentBlueprint.create({ data: { organizationId: org.id, agentId: agent.id, content: blueprint, promptMetadata: { source: "create-agent-wizard" } } });
  await prisma.agentTestCase.createMany({ data: blueprint.testCases.map((testCase) => ({ organizationId: org.id, agentId: agent.id, name: testCase.name, input: testCase.userMessage, expected: testCase.expectedBehavior, metadata: testCase })) });
  await prisma.auditLog.create({ data: { organizationId: org.id, actorUserId: user.id, action: "agent_create", targetType: "agent", targetId: agent.id } });
  return NextResponse.redirect(new URL(`/dashboard/agents/${agent.id}/blueprint`, request.url), 303);
}
