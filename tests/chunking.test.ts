import test from "node:test";
import assert from "node:assert/strict";
import { chunkText } from "@/lib/agents/chunking";

test("chunkText splits text with metadata", () => {
  const chunks = chunkText("Heading\n\n" + "A".repeat(2200), { fileName: "faq.md" }, 1000, 100);
  assert.ok(chunks.length > 0);
  assert.equal(chunks[0].metadata.fileName, "faq.md");
});

test("chunkText returns no chunks for blank input", () => {
  assert.deepEqual(chunkText("   "), []);
});
