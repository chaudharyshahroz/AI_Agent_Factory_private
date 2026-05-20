import { z } from "zod";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const ecommerceOrderLookupStubTool: ToolDefinition = {
  name: "ecommerce_order_lookup_stub",
  description: "Placeholder order lookup until Shopify/WooCommerce is connected.",
  parametersSchema: z.object({ orderNumber: z.string() }),
  requiresApproval: false,
  category: "ecommerce",
  riskLevel: "low",
  enabledByDefault: true,
  async execute() {
    return { ok: false, message: "Order lookup is not connected yet. Connect Shopify or WooCommerce when integrations are enabled." };
  }
};
