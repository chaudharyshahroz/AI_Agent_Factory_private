import { openai, getChatModel } from "@/lib/openai/client";

export async function runAgentModel(systemPrompt: string, message: string) {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
    return "I can help with that. The live model is not configured yet, so this MVP response confirms the agent runtime, memory, and approval flow are wired.";
  }
  if (process.env.USE_OPENAI_AGENTS_SDK === "true") {
    const sdk = await import("@openai/agents");
    const Agent = (sdk as unknown as { Agent?: new (config: Record<string, unknown>) => unknown }).Agent;
    const run = (sdk as unknown as { run?: (agent: unknown, input: string) => Promise<unknown> }).run;
    if (Agent && run) {
      const agent = new Agent({ name: "AgentFactoryRuntime", instructions: systemPrompt, model: getChatModel() });
      const result = await run(agent, message);
      if (typeof result === "object" && result && "finalOutput" in result) return String((result as { finalOutput: unknown }).finalOutput);
    }
  }
  const result = await openai.chat.completions.create({
    model: getChatModel(),
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ],
    temperature: 0.3
  });
  return result.choices[0]?.message.content || "I could not generate a response.";
}
