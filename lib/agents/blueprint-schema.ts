import { z } from "zod";

export const BlueprintToolSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  inputSchema: z.record(z.string(), z.unknown()).default({}),
  requiresApproval: z.boolean().default(false),
  category: z.string().min(1),
  enabledByDefault: z.boolean().default(true)
});

export const BlueprintTestCaseSchema = z.object({
  name: z.string().min(1),
  userMessage: z.string().min(1),
  expectedBehavior: z.string().min(1),
  shouldCallTools: z.array(z.string()).default([]),
  shouldEscalate: z.boolean().default(false),
  shouldRequireApproval: z.boolean().default(false)
});

export const BlueprintWorkflowNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.string().default("step"),
  description: z.string().optional()
});

export const BlueprintWorkflowEdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  label: z.string().optional()
});

export const BlueprintReadinessItemSchema = z.object({
  label: z.string().min(1),
  complete: z.boolean().default(false),
  detail: z.string().optional()
});

export const AgentBlueprintSchema = z.object({
  category: z.string().min(1),
  templateSlug: z.string().min(1),
  agentName: z.string().min(1),
  agentDescription: z.string().min(1),
  businessGoal: z.string().min(1),
  primaryChannel: z.string().min(1),
  supportedChannels: z.array(z.string()).min(1),
  systemInstructions: z.string().min(20),
  tone: z.string().min(1),
  allowedActions: z.array(z.string()).default([]),
  restrictedActions: z.array(z.string()).default([]),
  approvalRequiredFor: z.array(z.string()).default([]),
  tools: z.array(BlueprintToolSchema).default([]),
  knowledgeRequirements: z.array(z.string()).default([]),
  requiredUserFields: z.array(z.string()).default([]),
  escalationRules: z.array(z.string()).default([]),
  complianceRules: z.array(z.string()).default([]),
  testCases: z.array(BlueprintTestCaseSchema).default([]),
  deploymentRecommendations: z.array(z.string()).default([]),
  visualWorkflowNodes: z.array(BlueprintWorkflowNodeSchema).default([]),
  visualWorkflowEdges: z.array(BlueprintWorkflowEdgeSchema).default([]),
  estimatedSetupScore: z.number().min(0).max(100).default(70),
  readinessChecklist: z.array(BlueprintReadinessItemSchema).default([])
});

export function validateBlueprint(input: unknown) {
  return AgentBlueprintSchema.parse(input);
}
