import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const createInternalLeadTool: ToolDefinition = {
  name: "create_internal_lead",
  description: "Create an internal lead record.",
  parametersSchema: z.object({ name: z.string().optional(), email: z.string().email().optional(), phone: z.string().optional(), notes: z.string().optional() }),
  requiresApproval: false,
  category: "crm",
  riskLevel: "low",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    const lead = await prisma.lead.create({ data: { organizationId: context.organizationId, agentId: context.agentId, name: input.name, email: input.email, phone: input.phone, metadata: input } });
    return { ok: true, message: "Lead saved.", data: { leadId: lead.id } };
  }
};
