import { exampleBlueprints } from "@/lib/agents/default-blueprints";
import { validateBlueprint } from "@/lib/agents/blueprint-schema";
import type { AgentBlueprintContent } from "@/lib/agents/blueprint-types";

export function createDefaultBlueprintFromTemplate(category: string, templateSlug: string): AgentBlueprintContent {
  const exact = exampleBlueprints.find((blueprint) => blueprint.category === category && blueprint.templateSlug === templateSlug);
  const fallback = exampleBlueprints.find((blueprint) => blueprint.category === category) ?? exampleBlueprints[0];
  return validateBlueprint({ ...fallback, category, templateSlug, agentName: exact?.agentName ?? fallback.agentName });
}

export function summarizeBlueprint(blueprint: AgentBlueprintContent) {
  return `${blueprint.agentName}: ${blueprint.businessGoal} Tools: ${blueprint.tools.map((tool) => tool.name).join(", ")}.`;
}

export function getRiskyActionsFromBlueprint(blueprint: AgentBlueprintContent) {
  return Array.from(new Set([...blueprint.approvalRequiredFor, ...blueprint.restrictedActions.filter((action) => /refund|cancel|book|send|legal|medical|financial|contract/i.test(action))]));
}
