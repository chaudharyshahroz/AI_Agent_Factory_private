import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

const Schema = z.object({ name: z.string().optional(), description: z.string().optional(), status: z.enum(["DRAFT", "TESTING", "DEPLOYED", "PAUSED", "ARCHIVED"]).optional() });

export async function PATCH(request: Request, { params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const input = Schema.parse(await request.json());
  const updated = await prisma.agent.update({ where: { id: agent.id }, data: input });
  return NextResponse.json({ agent: updated });
}
