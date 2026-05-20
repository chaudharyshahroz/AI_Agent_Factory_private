import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const crmCreateContactStubTool: ToolDefinition = {
  name: "crm_create_contact_stub",
  description: "Create an internal contact placeholder.",
  parametersSchema: z.object({ name: z.string().optional(), email: z.string().email().optional(), value: z.number().optional() }),
  requiresApproval: (args) => z.object({ value: z.number().optional() }).parse(args).value ? z.object({ value: z.number() }).parse(args).value > 10000 : false,
  category: "crm",
  riskLevel: "medium",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    const lead = await prisma.lead.create({ data: { organizationId: context.organizationId, agentId: context.agentId, name: input.name, email: input.email, metadata: input } });
    return { ok: true, message: "Contact placeholder created.", data: { leadId: lead.id } };
  }
};
