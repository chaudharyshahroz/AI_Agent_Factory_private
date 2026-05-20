import { z } from "zod";

export type ToolContext = {
  organizationId: string;
  agentId: string;
  conversationId?: string;
  userId?: string;
};

export type ToolExecutionResult = {
  ok: boolean;
  message: string;
  data?: unknown;
};

export type ToolDefinition = {
  name: string;
  description: string;
  parametersSchema: z.ZodTypeAny;
  execute: (context: ToolContext, args: unknown) => Promise<ToolExecutionResult>;
  requiresApproval: boolean | ((args: unknown) => boolean);
  requiredIntegration?: string;
  category: string;
  riskLevel: "low" | "medium" | "high";
  enabledByDefault: boolean;
};
