export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminApprovalsPage() {
  const approvals = await prisma.humanApproval.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { organization: true } });
  return (
    <AdminResourcePage
      title="Approval queue"
      text="See every risky action request across the platform with status, risk level, and tenant context."
      stats={[{ label: "Pending", value: approvals.filter((approval) => approval.status === "PENDING").length }, { label: "Approved", value: approvals.filter((approval) => approval.status === "APPROVED").length }, { label: "Rejected", value: approvals.filter((approval) => approval.status === "REJECTED").length }]}
      columns={["Action", "Organization", "Tool", "Risk", "Status", "Created"]}
      rows={approvals.map((approval) => [
        <span key="action" className="font-semibold text-white">{approval.requestedAction}</span>,
        approval.organization.name,
        approval.toolName,
        approval.riskLevel,
        approval.status,
        approval.createdAt.toLocaleString()
      ])}
    />
  );
}
