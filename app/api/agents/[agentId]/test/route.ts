import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { toJson } from "@/lib/db/json";
import { runAgentChat } from "@/lib/agents/runtime";
import { redirectToPath } from "@/lib/utils/redirect";

export async function POST(request: Request, { params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const form = await request.formData();
  const message = String(form.get("message") || "");
  const output = await runAgentChat(agent.id, { message, source: "DASHBOARD_TEST" }, user.id);
  await prisma.agentTestRun.create({ data: { organizationId: agent.organizationId, agentId: agent.id, input: message, output: toJson(output) } });
  return redirectToPath(`/dashboard/agents/${agent.id}/test`);
}
