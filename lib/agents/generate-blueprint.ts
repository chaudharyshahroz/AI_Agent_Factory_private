import { AgentBlueprintSchema } from "@/lib/agents/blueprint-schema";
import { createDefaultBlueprintFromTemplate } from "@/lib/agents/blueprint-utils";
import { createStructuredOutput } from "@/lib/openai/structured-output";

export type GenerateBlueprintInput = {
  category: string;
  templateSlug: string;
  setupAnswers: unknown;
  uploadedKnowledgeSummary?: string;
  enabledIntegrations?: string[];
  desiredTone?: string;
  approvalPreferences?: string[];
};

export async function generateBlueprint(input: GenerateBlueprintInput) {
  const fallback = createDefaultBlueprintFromTemplate(input.category, input.templateSlug);
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
    return AgentBlueprintSchema.parse({ ...fallback, tone: input.desiredTone || fallback.tone });
  }

  const prompt = [
    "Generate a production-safe AI agent blueprint as strict JSON.",
    "Do not include secrets. Risky actions must require human approval.",
    `Category: ${input.category}`,
    `Template: ${input.templateSlug}`,
    `Setup answers: ${JSON.stringify(input.setupAnswers)}`,
    `Knowledge summary: ${input.uploadedKnowledgeSummary || "none yet"}`,
    `Enabled integrations: ${(input.enabledIntegrations || []).join(", ") || "none"}`,
    `Desired tone: ${input.desiredTone || "use category default"}`,
    `Approval preferences: ${(input.approvalPreferences || []).join(", ") || "use safe defaults"}`
  ].join("\n");

  try {
    return await createStructuredOutput(AgentBlueprintSchema, prompt, "agent_blueprint");
  } catch {
    return createStructuredOutput(AgentBlueprintSchema, `${prompt}\nRetry: output valid JSON matching the schema exactly.`, "agent_blueprint_retry");
  }
}
