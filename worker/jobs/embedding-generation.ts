import { prisma } from "@/lib/db/prisma";
import { embedText } from "@/lib/openai/embeddings";

export async function embedDocument(documentId: string) {
  const chunks = await prisma.documentChunk.findMany({ where: { documentId } });
  for (const chunk of chunks) {
    const embedding = await embedText(chunk.content);
    const vector = `[${embedding.join(",")}]`;
    await prisma.$executeRaw`UPDATE "DocumentChunk" SET embedding = ${vector}::vector WHERE id = ${chunk.id}::uuid`;
  }
}
