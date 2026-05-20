import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { searchKnowledge } from "@/lib/agents/knowledge";

const Schema = z.object({ agentId: z.string().uuid(), query: z.string().min(1), limit: z.number().int().min(1).max(10).default(5) });

export async function POST(request: Request) {
  const user = await requireUser();
  const input = Schema.parse(await request.json());
  const agent = await requireAgentAccess(user.id, input.agentId);
  const chunks = await searchKnowledge({ organizationId: agent.organizationId, agentId: agent.id, query: input.query, limit: input.limit });
  return NextResponse.json({ chunks });
}
