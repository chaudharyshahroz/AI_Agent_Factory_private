import { prisma } from "@/lib/db/prisma";
import { embedText } from "@/lib/openai/embeddings";

export async function embedDocument(documentId: string) {
  try {
    const chunks = await prisma.documentChunk.findMany({ where: { documentId } });
    for (const chunk of chunks) {
      const embedding = await embedText(chunk.content);
      const vector = `[${embedding.join(",")}]`;
      await prisma.$executeRaw`UPDATE "DocumentChunk" SET embedding = ${vector}::vector WHERE id = ${chunk.id}::uuid`;
    }
    await prisma.document.update({ where: { id: documentId }, data: { status: "READY" } });
  } catch (error) {
    await prisma.document.update({ where: { id: documentId }, data: { status: "FAILED", error: error instanceof Error ? error.message : "Embedding failed" } });
    throw error;
  }
}
