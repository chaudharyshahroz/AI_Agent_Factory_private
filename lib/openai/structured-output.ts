import { z } from "zod";
import { openai, getChatModel } from "@/lib/openai/client";

export async function createStructuredOutput<T>(schema: z.ZodType<T>, prompt: string, name: string) {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
  const result = await openai.chat.completions.create({
    model: getChatModel(),
    messages: [{ role: "user", content: `${prompt}\nReturn a JSON object for ${name}.` }],
    response_format: { type: "json_object" }
  });
  const content = result.choices[0]?.message.content || "{}";
  return schema.parse(JSON.parse(content));
}
