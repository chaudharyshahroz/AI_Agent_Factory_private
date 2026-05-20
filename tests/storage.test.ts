import { describe, expect, it } from "vitest";
import { sanitizeFileName, validateUpload } from "@/lib/storage/local";

describe("storage validation", () => {
  it("sanitizes filenames", () => {
    expect(sanitizeFileName("../secret.txt")).toBe(".._secret.txt");
  });

  it("rejects invalid extensions", () => {
    expect(() => validateUpload("malware.exe", 10)).toThrow("Unsupported file type");
  });
});
