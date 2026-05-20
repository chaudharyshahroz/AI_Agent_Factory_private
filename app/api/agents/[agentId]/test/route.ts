import { NextResponse } from "next/server";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { runAgentChat } from "@/lib/agents/runtime";

export async function POST(request: Request, { params }: { params: { agentId: string } }) {
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, params.agentId);
  const form = await request.formData();
  const message = String(form.get("message") || "");
  const output = await runAgentChat(agent.id, { message, source: "DASHBOARD_TEST" }, user.id);
  await prisma.agentTestRun.create({ data: { organizationId: agent.organizationId, agentId: agent.id, input: message, output } });
  return NextResponse.redirect(new URL(`/dashboard/agents/${agent.id}/test`, request.url), 303);
}
