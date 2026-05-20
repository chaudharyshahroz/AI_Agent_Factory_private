import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeFileName, validateUpload } from "@/lib/storage/local";

test("storage sanitizes filenames", () => {
  assert.equal(sanitizeFileName("../secret.txt"), ".._secret.txt");
});

test("storage rejects invalid extensions", () => {
  assert.throws(() => validateUpload("malware.exe", 10), /Unsupported file type/);
});
