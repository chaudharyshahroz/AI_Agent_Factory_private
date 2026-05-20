import { NextResponse } from "next/server";
import { requireOwnerOrAdmin, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { executeRegisteredTool } from "@/lib/agents/tools/registry";

export async function POST(request: Request, { params }: { params: Promise<{ approvalId: string }> }) {
  const { approvalId } = await params;
  const user = await requireUser();
  const approval = await prisma.humanApproval.findUniqueOrThrow({ where: { id: approvalId } });
  await requireOwnerOrAdmin(user.id, approval.organizationId);
  const result = await executeRegisteredTool({ organizationId: approval.organizationId, agentId: approval.agentId, conversationId: approval.conversationId || undefined, userId: user.id }, approval.toolName, approval.proposedArguments, [], { bypassApproval: true });
  await prisma.humanApproval.update({ where: { id: approval.id }, data: { status: "APPROVED", approvedByUserId: user.id, decidedAt: new Date() } });
  if (approval.conversationId) await prisma.message.create({ data: { organizationId: approval.organizationId, conversationId: approval.conversationId, role: "ASSISTANT", content: `Approved action completed: ${result.message}` } });
  await prisma.auditLog.create({ data: { organizationId: approval.organizationId, actorUserId: user.id, action: "approval_approved", targetType: "approval", targetId: approval.id } });
  return NextResponse.redirect(new URL("/dashboard/approvals", request.url), 303);
}
