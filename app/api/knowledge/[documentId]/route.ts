import { NextResponse } from "next/server";
import { requireOrganizationAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { deleteDocumentFolder } from "@/lib/storage/local";

export async function DELETE(_request: Request, { params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const user = await requireUser();
  const doc = await prisma.document.findUniqueOrThrow({ where: { id: documentId } });
  await requireOrganizationAccess(user.id, doc.organizationId);
  await prisma.documentChunk.deleteMany({ where: { documentId: doc.id, organizationId: doc.organizationId } });
  await prisma.document.delete({ where: { id: doc.id } });
  await deleteDocumentFolder(doc.storagePath);
  await prisma.auditLog.create({ data: { organizationId: doc.organizationId, actorUserId: user.id, action: "document_delete", targetType: "document", targetId: doc.id } });
  return NextResponse.json({ ok: true });
}
