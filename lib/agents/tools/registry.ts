import { prisma } from "@/lib/db/prisma";
import type { ToolContext } from "@/lib/agents/tools/types";
import { knowledgeSearchTool } from "@/lib/agents/tools/knowledge-search";
import { humanHandoffTool } from "@/lib/agents/tools/human-handoff";
import { createInternalLeadTool } from "@/lib/agents/tools/create-internal-lead";
import { bookAppointmentStubTool } from "@/lib/agents/tools/book-appointment-stub";
import { sendNotificationStubTool } from "@/lib/agents/tools/send-notification-stub";
import { createSupportTicketStubTool } from "@/lib/agents/tools/create-support-ticket-stub";
import { ecommerceOrderLookupStubTool } from "@/lib/agents/tools/ecommerce-order-lookup-stub";
import { productSearchStubTool } from "@/lib/agents/tools/product-search-stub";
import { crmCreateContactStubTool } from "@/lib/agents/tools/crm-create-contact-stub";

export const toolRegistry = new Map(
  [
    knowledgeSearchTool,
    humanHandoffTool,
    createInternalLeadTool,
    bookAppointmentStubTool,
    sendNotificationStubTool,
    createSupportTicketStubTool,
    ecommerceOrderLookupStubTool,
    productSearchStubTool,
    crmCreateContactStubTool
  ].map((tool) => [tool.name, tool])
);

export function isRiskyAction(action: string) {
  return /refund|cancel order|change shipping|book appointment|send email|send whatsapp|crm deal|contract|legal advice|medical advice|financial advice/i.test(action);
}

export async function executeRegisteredTool(context: ToolContext, name: string, args: unknown, restrictedActions: string[] = []) {
  if (restrictedActions.includes(name)) throw new Error("Tool is restricted by the blueprint");
  const tool = toolRegistry.get(name);
  if (!tool) throw new Error("Unknown tool");
  const parsed = tool.parametersSchema.parse(args);
  const approvalRequired = typeof tool.requiresApproval === "function" ? tool.requiresApproval(parsed) : tool.requiresApproval;
  if (approvalRequired) {
    await prisma.humanApproval.create({
      data: {
        organizationId: context.organizationId,
        agentId: context.agentId,
        conversationId: context.conversationId,
        toolName: name,
        requestedAction: name,
        proposedArguments: parsed,
        riskLevel: tool.riskLevel
      }
    });
    return { ok: false, message: "This action requires human approval.", approvalRequired: true };
  }

  const call = await prisma.toolCall.create({ data: { organizationId: context.organizationId, conversationId: context.conversationId, toolName: name, arguments: parsed, status: "running" } });
  const result = await tool.execute(context, parsed);
  await prisma.toolResult.create({ data: { organizationId: context.organizationId, toolCallId: call.id, result } });
  await prisma.toolCall.update({ where: { id: call.id }, data: { status: result.ok ? "completed" : "failed" } });
  await prisma.auditLog.create({ data: { organizationId: context.organizationId, actorUserId: context.userId, action: "tool_execution", targetType: "tool", targetId: name, metadata: { args: parsed, result } } });
  return { ...result, approvalRequired: false };
}
