export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminApprovalsPage() {
  const approvals = await prisma.humanApproval.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { organization: true } });
  return (
    <AdminResourcePage
      title="Approval queue"
      text="See every risky action request across the platform with status, risk level, and tenant context."
      stats={[{ label: "Pending", value: approvals.filter((approval) => approval.status === "PENDING").length }, { label: "Approved", value: approvals.filter((approval) => approval.status === "APPROVED").length }, { label: "Rejected", value: approvals.filter((approval) => approval.status === "REJECTED").length }]}
      searchPlaceholder="Search approvals by action, organization, tool, risk, status, or date"
      filters={["Status", "Risk", "Tool", "Organization"]}
      columns={["Action", "Organization", "Tool", "Risk", "Status", "Created", "Review"]}
      rows={approvals.map((approval) => [
        <span key="action" className="font-semibold text-white">{approval.requestedAction}</span>,
        approval.organization.name,
        approval.toolName,
        <span key="risk" className="rounded-full bg-amber-400/10 px-2 py-1 text-xs text-amber-200 ring-1 ring-amber-300/20">{approval.riskLevel}</span>,
        <span key="status" className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 ring-1 ring-cyan-300/20">{approval.status}</span>,
        approval.createdAt.toLocaleString(),
        <AdminRowActions key="actions" label={approval.requestedAction} fields={[
          { label: "Tool", name: "tool", placeholder: approval.toolName },
          { label: "Status", name: "status", type: "select", options: ["PENDING", "APPROVED", "REJECTED", "EXPIRED"] },
          { label: "Proposed arguments", name: "args", type: "textarea", placeholder: JSON.stringify(approval.proposedArguments, null, 2) }
        ]} />
      ])}
    />
  );
}
