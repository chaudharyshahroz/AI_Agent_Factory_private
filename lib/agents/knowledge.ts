import { prisma } from "@/lib/db/prisma";
import { embedText } from "@/lib/openai/embeddings";

export async function searchKnowledge({ organizationId, agentId, query, limit = 5 }: { organizationId: string; agentId: string; query: string; limit?: number }) {
  const embedding = await embedText(query);
  const vector = `[${embedding.join(",")}]`;
  return prisma.$queryRaw<
    Array<{ id: string; document_id: string; content: string; metadata: unknown; similarity: number }>
  >`SELECT * FROM match_document_chunks(${vector}::vector, ${limit}, ${organizationId}::uuid, ${agentId}::uuid)`;
}
