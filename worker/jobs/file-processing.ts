import { readFile } from "fs/promises";
import path from "path";
import mammoth from "mammoth";
import { parse } from "csv-parse/sync";
import { prisma } from "@/lib/db/prisma";
import { toJson } from "@/lib/db/json";
import { chunkText } from "@/lib/agents/chunking";
import { embeddingQueue } from "@/lib/queue/queues";

export async function extractText(filePath: string, mimeType: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".docx") return (await mammoth.extractRawText({ path: filePath })).value;
  const bytes = await readFile(filePath);
  if (ext === ".pdf") {
    const pdf = (await import("pdf-parse")).default;
    return (await pdf(bytes)).text;
  }
  if (ext === ".csv" || mimeType.includes("csv")) {
    return parse(bytes.toString("utf8"), { relax_column_count: true }).map((row: string[]) => row.join(" | ")).join("\n");
  }
  return bytes.toString("utf8");
}

export async function processDocument(documentId: string) {
  const doc = await prisma.document.findUniqueOrThrow({ where: { id: documentId } });
  try {
    const text = await extractText(doc.storagePath, doc.mimeType);
    const chunks = chunkText(text, { fileName: doc.fileName, sourceType: path.extname(doc.fileName).slice(1) });
    await prisma.documentChunk.createMany({
      data: chunks.map((chunk) => ({ organizationId: doc.organizationId, agentId: doc.agentId, documentId: doc.id, content: chunk.content, tokenCount: chunk.tokenCount, metadata: toJson(chunk.metadata) }))
    });
    if (chunks.length) {
      await embeddingQueue.add("embed-document", { documentId: doc.id });
    } else {
      await prisma.document.update({ where: { id: doc.id }, data: { status: "READY" } });
    }
  } catch (error) {
    await prisma.document.update({ where: { id: doc.id }, data: { status: "FAILED", error: error instanceof Error ? error.message : "Processing failed" } });
  }
}
