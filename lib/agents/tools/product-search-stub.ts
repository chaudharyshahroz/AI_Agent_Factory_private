import { z } from "zod";
import { searchKnowledge } from "@/lib/agents/knowledge";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const productSearchStubTool: ToolDefinition = {
  name: "product_search_stub",
  description: "Search uploaded product information.",
  parametersSchema: z.object({ query: z.string() }),
  requiresApproval: false,
  category: "ecommerce",
  riskLevel: "low",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    const chunks = await searchKnowledge({ organizationId: context.organizationId, agentId: context.agentId, query: input.query });
    return { ok: true, message: "Product information searched.", data: { chunks } };
  }
};
