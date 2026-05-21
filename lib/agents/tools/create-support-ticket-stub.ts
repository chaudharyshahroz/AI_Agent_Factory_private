import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const createSupportTicketStubTool: ToolDefinition = {
  name: "create_support_ticket_stub",
  description: "Create an internal support ticket record for the team queue.",
  parametersSchema: z.object({ subject: z.string(), details: z.string(), email: z.string().email().optional() }),
  requiresApproval: false,
  category: "support",
  riskLevel: "low",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    await prisma.auditLog.create({ data: { organizationId: context.organizationId, action: "support_ticket_stub", targetType: "agent", targetId: context.agentId, metadata: input } });
    return { ok: true, message: "Support ticket recorded for the team queue.", data: input };
  }
};
