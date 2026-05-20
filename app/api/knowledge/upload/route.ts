import { NextResponse } from "next/server";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { documentPath, saveDocumentFile, validateUpload } from "@/lib/storage/local";
import { fileProcessingQueue } from "@/lib/queue/queues";

export async function POST(request: Request) {
  const user = await requireUser();
  const form = await request.formData();
  const agentId = String(form.get("agentId") || "");
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "File is required" }, { status: 400 });
  const agent = await requireAgentAccess(user.id, agentId);
  validateUpload(file.name, file.size);
  const doc = await prisma.document.create({ data: { organizationId: agent.organizationId, agentId: agent.id, fileName: file.name, mimeType: file.type || "application/octet-stream", storagePath: "pending", sizeBytes: file.size } });
  const storagePath = documentPath(agent.organizationId, agent.id, doc.id, file.name);
  await saveDocumentFile(storagePath, Buffer.from(await file.arrayBuffer()));
  await prisma.document.update({ where: { id: doc.id }, data: { storagePath } });
  await fileProcessingQueue.add("process-document", { documentId: doc.id });
  await prisma.auditLog.create({ data: { organizationId: agent.organizationId, actorUserId: user.id, action: "document_upload", targetType: "document", targetId: doc.id } });
  return NextResponse.redirect(new URL(`/dashboard/agents/${agent.id}/knowledge`, request.url), 303);
}
