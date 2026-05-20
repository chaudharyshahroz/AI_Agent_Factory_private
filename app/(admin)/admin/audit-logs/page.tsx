export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminAuditLogsPage() {
  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { organization: true } });
  return (
    <AdminResourcePage
      title="Audit logs"
      text="Filter-ready event history for signups, logins, uploads, deployments, tool executions, approvals, and billing actions."
      stats={[{ label: "Visible events", value: logs.length }, { label: "Tool events", value: logs.filter((log) => log.action.includes("tool")).length }, { label: "Organizations", value: new Set(logs.map((log) => log.organizationId)).size }]}
      columns={["Action", "Organization", "Actor", "Target", "Created"]}
      rows={logs.map((log) => [
        <span key="action" className="font-semibold text-white">{log.action}</span>,
        log.organization.name,
        log.actorUserId?.slice(0, 8) ?? "System",
        log.targetType ? `${log.targetType}:${log.targetId ?? ""}` : "N/A",
        log.createdAt.toLocaleString()
      ])}
    />
  );
}
