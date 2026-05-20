import path from "path";
import { mkdir, writeFile, rm } from "fs/promises";

const allowedExtensions = new Set([".txt", ".md", ".pdf", ".docx", ".csv"]);

export function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 160);
}

export function validateUpload(fileName: string, sizeBytes: number) {
  const ext = path.extname(fileName).toLowerCase();
  const max = Number(process.env.MAX_UPLOAD_MB || 25) * 1024 * 1024;
  if (!allowedExtensions.has(ext)) throw new Error("Unsupported file type");
  if (sizeBytes > max) throw new Error("File is too large");
}

export function documentPath(organizationId: string, agentId: string, documentId: string, fileName: string) {
  const root = path.resolve(process.env.LOCAL_STORAGE_PATH || "./storage");
  return path.join(root, "organizations", organizationId, "agents", agentId, "documents", documentId, sanitizeFileName(fileName));
}

export async function saveDocumentFile(storagePath: string, bytes: Buffer) {
  await mkdir(path.dirname(storagePath), { recursive: true });
  await writeFile(storagePath, bytes);
}

export async function deleteDocumentFolder(storagePath: string) {
  await rm(path.dirname(storagePath), { recursive: true, force: true });
}
