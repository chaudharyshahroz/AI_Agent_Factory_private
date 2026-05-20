import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const sendNotificationStubTool: ToolDefinition = {
  name: "send_notification_stub",
  description: "Record a notification request for later delivery.",
  parametersSchema: z.object({ channel: z.string(), recipient: z.string(), message: z.string() }),
  requiresApproval: true,
  category: "communications",
  riskLevel: "high",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    await prisma.auditLog.create({ data: { organizationId: context.organizationId, action: "notification_stub", targetType: "agent", targetId: context.agentId, metadata: input } });
    return { ok: true, message: "Notification recorded for approval.", data: input };
  }
};
