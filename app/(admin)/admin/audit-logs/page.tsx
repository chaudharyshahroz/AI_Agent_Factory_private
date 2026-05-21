export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminAuditLogsPage() {
  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { organization: true } });
  return (
    <AdminResourcePage
      title="Audit logs"
      text="Filter-ready event history for signups, logins, uploads, deployments, tool executions, approvals, and billing actions."
      stats={[{ label: "Visible events", value: logs.length }, { label: "Tool events", value: logs.filter((log) => log.action.includes("tool")).length }, { label: "Organizations", value: new Set(logs.map((log) => log.organizationId)).size }]}
      searchPlaceholder="Search audit logs by action, organization, actor, target, or metadata"
      filters={["Action", "Organization", "Actor", "Date"]}
      columns={["Action", "Organization", "Actor", "Target", "Metadata", "Created", "Details"]}
      rows={logs.map((log) => [
        <span key="action" className="font-semibold text-white">{log.action}</span>,
        log.organization.name,
        log.actorUserId?.slice(0, 8) ?? "System",
        log.targetType ? `${log.targetType}:${log.targetId ?? ""}` : "N/A",
        <code key="metadata" className="line-clamp-1 text-xs text-cyan-100">{log.metadata ? JSON.stringify(log.metadata) : "{}"}</code>,
        log.createdAt.toLocaleString(),
        <AdminRowActions key="actions" label={log.action} fields={[
          { label: "Action", name: "action", placeholder: log.action },
          { label: "Target", name: "target", placeholder: log.targetId ?? "N/A" },
          { label: "Metadata", name: "metadata", type: "textarea", placeholder: log.metadata ? JSON.stringify(log.metadata, null, 2) : "{}" }
        ]} />
      ])}
    />
  );
}
