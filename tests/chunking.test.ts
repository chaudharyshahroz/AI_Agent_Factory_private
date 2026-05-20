import { describe, expect, it } from "vitest";
import { chunkText } from "@/lib/agents/chunking";

describe("chunkText", () => {
  it("splits text with metadata", () => {
    const chunks = chunkText("Heading\n\n" + "A".repeat(2200), { fileName: "faq.md" }, 1000, 100);
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks[0].metadata.fileName).toBe("faq.md");
  });

  it("returns no chunks for blank input", () => {
    expect(chunkText("   ")).toEqual([]);
  });
});
