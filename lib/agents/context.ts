import { AgentBlueprintSchema } from "@/lib/agents/blueprint-schema";
import type { AgentBlueprintContent } from "@/lib/agents/blueprint-types";
import { prisma } from "@/lib/db/prisma";

export async function loadAgentContext(agentId: string) {
  const agent = await prisma.agent.findUnique({ where: { id: agentId }, include: { organization: true } });
  if (!agent) throw new Error("Agent not found");
  const blueprintRecord = await prisma.agentBlueprint.findFirst({ where: { agentId }, orderBy: { version: "desc" } });
  if (!blueprintRecord) throw new Error("Agent blueprint not found");
  const blueprint = AgentBlueprintSchema.parse(blueprintRecord.content);
  return { agent, organization: agent.organization, blueprint };
}

export function buildSystemPrompt(input: { blueprint: AgentBlueprintContent; knowledgeContext: string }) {
  return [
    input.blueprint.systemInstructions,
    `Tone: ${input.blueprint.tone}`,
    `Allowed actions: ${input.blueprint.allowedActions.join(", ")}`,
    `Restricted actions: ${input.blueprint.restrictedActions.join(", ")}`,
    `Approval required for: ${input.blueprint.approvalRequiredFor.join(", ")}`,
    `Escalation rules: ${input.blueprint.escalationRules.join("; ")}`,
    `Compliance rules: ${input.blueprint.complianceRules.join("; ")}`,
    input.knowledgeContext ? `Relevant knowledge:\n${input.knowledgeContext}` : "No matching knowledge was found."
  ].join("\n\n");
}
