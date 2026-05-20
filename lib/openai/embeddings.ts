import { openai } from "@/lib/openai/client";

export async function embedText(input: string) {
  if (!process.env.OPENAI_API_KEY) return new Array(1536).fill(0);
  const result = await openai.embeddings.create({
    model: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
    input
  });
  return result.data[0].embedding;
}
