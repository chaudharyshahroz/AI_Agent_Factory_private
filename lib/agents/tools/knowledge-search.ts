import { z } from "zod";
import { searchKnowledge } from "@/lib/agents/knowledge";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const knowledgeSearchTool: ToolDefinition = {
  name: "knowledge_search",
  description: "Search uploaded business knowledge.",
  parametersSchema: z.object({ query: z.string().min(1) }),
  requiresApproval: false,
  category: "knowledge",
  riskLevel: "low",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    const chunks = await searchKnowledge({ organizationId: context.organizationId, agentId: context.agentId, query: input.query });
    return { ok: true, message: "Knowledge search completed.", data: { chunks } };
  }
};
