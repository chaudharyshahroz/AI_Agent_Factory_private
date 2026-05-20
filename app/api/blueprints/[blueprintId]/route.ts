import { NextResponse } from "next/server";
import { requireOrganizationAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { validateBlueprint } from "@/lib/agents/blueprint-schema";

export async function PATCH(request: Request, { params }: { params: { blueprintId: string } }) {
  const user = await requireUser();
  const existing = await prisma.agentBlueprint.findUniqueOrThrow({ where: { id: params.blueprintId } });
  await requireOrganizationAccess(user.id, existing.organizationId);
  const input = await request.json();
  const content = validateBlueprint(input.content ?? input);
  const updated = await prisma.agentBlueprint.update({ where: { id: params.blueprintId }, data: { content } });
  return NextResponse.json({ blueprint: updated });
}

export async function POST(request: Request, context: { params: { blueprintId: string } }) {
  const user = await requireUser();
  const existing = await prisma.agentBlueprint.findUniqueOrThrow({ where: { id: context.params.blueprintId } });
  await requireOrganizationAccess(user.id, existing.organizationId);
  const form = await request.formData();
  const content = validateBlueprint(JSON.parse(String(form.get("content") || "{}")));
  await prisma.agentBlueprint.update({ where: { id: existing.id }, data: { content } });
  return NextResponse.redirect(new URL(`/dashboard/agents/${existing.agentId}/blueprint`, request.url), 303);
}
