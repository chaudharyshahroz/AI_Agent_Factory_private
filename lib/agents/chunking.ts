export type TextChunk = { content: string; tokenCount: number; metadata: Record<string, unknown> };

export function chunkText(text: string, metadata: Record<string, unknown> = {}, maxChars = 1800, overlap = 180): TextChunk[] {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!normalized) return [];
  const paragraphs = normalized.split(/\n\s*\n/);
  const chunks: TextChunk[] = [];
  let buffer = "";

  for (const paragraph of paragraphs) {
    const next = buffer ? `${buffer}\n\n${paragraph}` : paragraph;
    if (next.length <= maxChars) {
      buffer = next;
      continue;
    }
    if (buffer) chunks.push(toChunk(buffer, chunks.length, metadata));
    buffer = paragraph.length > maxChars ? paragraph.slice(-overlap) : paragraph;
  }
  if (buffer) chunks.push(toChunk(buffer, chunks.length, metadata));
  return chunks;
}

function toChunk(content: string, index: number, metadata: Record<string, unknown>): TextChunk {
  return {
    content,
    tokenCount: Math.ceil(content.length / 4),
    metadata: { ...metadata, chunkIndex: index }
  };
}
