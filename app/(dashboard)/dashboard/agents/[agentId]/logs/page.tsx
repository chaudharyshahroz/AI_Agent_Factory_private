export const dynamic = "force-dynamic";

import { Activity, AlertTriangle, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function LogsPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const [logs, toolCalls] = await Promise.all([
    prisma.auditLog.findMany({ where: { organizationId: agent.organizationId, OR: [{ targetId: agent.id }, { targetType: "tool" }] }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.toolCall.findMany({ where: { organizationId: agent.organizationId }, orderBy: { createdAt: "desc" }, take: 25 })
  ]);
  return (
    <div>
      <PageHeader title="Agent logs" text="Review model events, tool calls, failures, approvals, deployments, and audit records." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="bg-white"><h2 className="flex items-center gap-2 text-xl font-bold"><FileText className="h-5 w-5" /> Audit events</h2><div className="mt-4 grid gap-3">{logs.map((log) => <div key={log.id} className="rounded-md border p-3"><p className="font-medium">{log.action}</p><p className="text-sm text-slate-500">{log.createdAt.toLocaleString()}</p></div>)}</div></Card>
        <Card className="bg-white"><h2 className="flex items-center gap-2 text-xl font-bold"><Activity className="h-5 w-5" /> Tool calls</h2><div className="mt-4 grid gap-3">{toolCalls.map((call) => <div key={call.id} className="rounded-md border p-3"><div className="flex items-center justify-between"><p className="font-medium">{call.toolName}</p><StatusBadge tone={call.status === "failed" ? "red" : "green"}>{call.status}</StatusBadge></div><p className="mt-1 text-sm text-slate-500">{call.createdAt.toLocaleString()}</p></div>)}{toolCalls.length === 0 ? <p className="flex items-center gap-2 text-sm text-slate-500"><AlertTriangle className="h-4 w-4" /> No tool calls yet.</p> : null}</div></Card>
      </div>
    </div>
  );
}
