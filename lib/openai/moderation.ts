import { openai } from "@/lib/openai/client";

export async function moderateText(input: string) {
  if (!process.env.OPENAI_API_KEY) return { allowed: true, flagged: false };
  const result = await openai.moderations.create({
    model: process.env.OPENAI_MODERATION_MODEL || "omni-moderation-latest",
    input
  });
  const flagged = result.results.some((item) => item.flagged);
  return { allowed: !flagged, flagged };
}
