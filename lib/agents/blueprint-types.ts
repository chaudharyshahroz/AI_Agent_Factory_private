import type { z } from "zod";
import { AgentBlueprintSchema, BlueprintTestCaseSchema, BlueprintToolSchema } from "@/lib/agents/blueprint-schema";

export type AgentBlueprintContent = z.infer<typeof AgentBlueprintSchema>;
export type BlueprintTool = z.infer<typeof BlueprintToolSchema>;
export type BlueprintTestCase = z.infer<typeof BlueprintTestCaseSchema>;
