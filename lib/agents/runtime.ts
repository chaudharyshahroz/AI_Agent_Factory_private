import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { searchKnowledge } from "@/lib/agents/knowledge";
import { buildSystemPrompt, loadAgentContext } from "@/lib/agents/context";
import { runAgentModel } from "@/lib/agents/run-agent";
import { executeRegisteredTool, isRiskyAction } from "@/lib/agents/tools/registry";
import { moderateText } from "@/lib/openai/moderation";

export const ChatInputSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
  visitorId: z.string().optional(),
  deploymentKey: z.string().optional(),
  source: z.enum(["DASHBOARD_TEST", "WEBSITE_WIDGET", "API", "WHATSAPP_PLACEHOLDER", "EMAIL_PLACEHOLDER"]).default("DASHBOARD_TEST")
});

export async function runAgentChat(agentId: string, input: z.infer<typeof ChatInputSchema>, userId?: string) {
  const { agent, blueprint } = await loadAgentContext(agentId);
  const moderation = await moderateText(input.message);
  if (!moderation.allowed) throw new Error("Message could not be processed safely");

  const conversation =
    input.conversationId
      ? await prisma.conversation.findFirstOrThrow({ where: { id: input.conversationId, organizationId: agent.organizationId, agentId } })
      : await prisma.conversation.create({ data: { organizationId: agent.organizationId, agentId, source: input.source, visitorId: input.visitorId, title: input.message.slice(0, 80) } });

  const userMessage = await prisma.message.create({ data: { organizationId: agent.organizationId, conversationId: conversation.id, role: "USER", content: input.message } });
  const chunks = await searchKnowledge({ organizationId: agent.organizationId, agentId, query: input.message, limit: 4 }).catch(() => []);
  const knowledgeContext = chunks.map((chunk, index) => `[${index + 1}] ${chunk.content}`).join("\n\n");
  const systemPrompt = buildSystemPrompt({ blueprint, knowledgeContext });

  const lower = input.message.toLowerCase();
  const risky = blueprint.approvalRequiredFor.find((action) => lower.includes(action.toLowerCase())) || blueprint.restrictedActions.find((action) => isRiskyAction(action) && lower.includes(action.toLowerCase()));
  if (risky) {
    await prisma.humanApproval.create({
      data: {
        organizationId: agent.organizationId,
        agentId,
        conversationId: conversation.id,
        toolName: "human_handoff",
        requestedAction: risky,
        proposedArguments: { message: input.message },
        riskLevel: "high",
        requestedByMessageId: userMessage.id
      }
    });
    const content = "I can help collect the details, but this action needs a human approval before anything is changed.";
    await prisma.message.create({ data: { organizationId: agent.organizationId, conversationId: conversation.id, role: "ASSISTANT", content } });
    return { message: content, conversationId: conversation.id, status: "approval_required", citations: chunks, approvalRequired: true, toolCalls: ["human_handoff"] };
  }

  let toolSummary: string[] = [];
  if (/lead|contact|quote|consultation/i.test(input.message) && blueprint.tools.some((tool) => tool.name === "create_internal_lead")) {
    const tool = await executeRegisteredTool({ organizationId: agent.organizationId, agentId, conversationId: conversation.id, userId }, "create_internal_lead", { notes: input.message }, blueprint.restrictedActions);
    toolSummary = [tool.message];
  }

  const message = await runAgentModel(systemPrompt, input.message);
  await prisma.message.create({ data: { organizationId: agent.organizationId, conversationId: conversation.id, role: "ASSISTANT", content: message, metadata: { citations: chunks, toolSummary } } });
  await prisma.usageEvent.create({ data: { organizationId: agent.organizationId, type: "message_sent", metadata: { agentId, source: input.source } } });
  return { message, conversationId: conversation.id, status: "completed", citations: chunks, approvalRequired: false, toolCalls: toolSummary };
}
