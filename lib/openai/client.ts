import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "missing-key" });

export function getChatModel() {
  const model = process.env.OPENAI_MODEL;
  if (!model) throw new Error("OPENAI_MODEL is not configured");
  return model;
}
