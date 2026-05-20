import { Card } from "@/components/ui/card";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function LogsPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const logs = await prisma.auditLog.findMany({ where: { organizationId: agent.organizationId, targetId: agent.id }, orderBy: { createdAt: "desc" }, take: 50 });
  return <div><h1 className="text-3xl font-semibold">Logs</h1><div className="mt-8 grid gap-3">{logs.map((log) => <Card key={log.id}><p className="font-medium">{log.action}</p><p className="text-sm text-muted-foreground">{log.createdAt.toISOString()}</p></Card>)}</div></div>;
}
