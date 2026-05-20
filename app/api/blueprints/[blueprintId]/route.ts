import { NextResponse } from "next/server";
import { requireOrganizationAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { toJson } from "@/lib/db/json";
import { validateBlueprint } from "@/lib/agents/blueprint-schema";

export async function PATCH(request: Request, { params }: { params: Promise<{ blueprintId: string }> }) {
  const { blueprintId } = await params;
  const user = await requireUser();
  const existing = await prisma.agentBlueprint.findUniqueOrThrow({ where: { id: blueprintId } });
  await requireOrganizationAccess(user.id, existing.organizationId);
  const input = await request.json();
  const content = validateBlueprint(input.content ?? input);
  const updated = await prisma.agentBlueprint.update({ where: { id: blueprintId }, data: { content: toJson(content) } });
  return NextResponse.json({ blueprint: updated });
}

export async function POST(request: Request, context: { params: Promise<{ blueprintId: string }> }) {
  const { blueprintId } = await context.params;
  const user = await requireUser();
  const existing = await prisma.agentBlueprint.findUniqueOrThrow({ where: { id: blueprintId } });
  await requireOrganizationAccess(user.id, existing.organizationId);
  const form = await request.formData();
  const content = validateBlueprint(JSON.parse(String(form.get("content") || "{}")));
  await prisma.agentBlueprint.update({ where: { id: existing.id }, data: { content: toJson(content) } });
  return NextResponse.redirect(new URL(`/dashboard/agents/${existing.agentId}/blueprint`, request.url), 303);
}
