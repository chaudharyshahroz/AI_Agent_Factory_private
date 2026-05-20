import { requireOwnerOrAdmin, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { redirectToPath } from "@/lib/utils/redirect";

export async function POST(_request: Request, { params }: { params: Promise<{ approvalId: string }> }) {
  const { approvalId } = await params;
  const user = await requireUser();
  const approval = await prisma.humanApproval.findUniqueOrThrow({ where: { id: approvalId } });
  await requireOwnerOrAdmin(user.id, approval.organizationId);
  await prisma.humanApproval.update({ where: { id: approval.id }, data: { status: "REJECTED", rejectedByUserId: user.id, decidedAt: new Date() } });
  if (approval.conversationId) await prisma.message.create({ data: { organizationId: approval.organizationId, conversationId: approval.conversationId, role: "ASSISTANT", content: "A human reviewed this request and did not approve the action." } });
  await prisma.auditLog.create({ data: { organizationId: approval.organizationId, actorUserId: user.id, action: "approval_rejected", targetType: "approval", targetId: approval.id } });
  return redirectToPath("/dashboard/approvals");
}
