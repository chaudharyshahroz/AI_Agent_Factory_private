import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const humanHandoffTool: ToolDefinition = {
  name: "human_handoff",
  description: "Create an escalation request for a human.",
  parametersSchema: z.object({ reason: z.string().min(1), summary: z.string().optional() }),
  requiresApproval: false,
  category: "support",
  riskLevel: "medium",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    await prisma.auditLog.create({ data: { organizationId: context.organizationId, action: "human_handoff", targetType: "agent", targetId: context.agentId, metadata: input } });
    return { ok: true, message: "A human handoff has been created.", data: input };
  }
};
