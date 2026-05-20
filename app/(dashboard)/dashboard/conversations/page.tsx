export const dynamic = "force-dynamic";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui/card";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function ConversationsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const conversations = org ? await prisma.conversation.findMany({ where: { organizationId: org.id }, orderBy: { updatedAt: "desc" }, take: 60, include: { agent: true, _count: { select: { messages: true, approvals: true } } } }) : [];
  return (
    <div>
      <PageHeader title="Conversations" text="Review visitor messages, dashboard tests, tool calls, approvals, handoffs, and captured lead context across agents." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Conversations" value={conversations.length} icon={MessageSquare} />
        <StatCard label="Website widget" value={conversations.filter((item) => item.source === "WEBSITE_WIDGET").length} icon={MessageSquare} tone="cyan" />
        <StatCard label="Approvals involved" value={conversations.reduce((sum, item) => sum + item._count.approvals, 0)} icon={MessageSquare} tone="violet" />
      </div>
      <Card className="overflow-hidden bg-white p-0">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>{["Conversation", "Agent", "Source", "Messages", "Approvals", "Updated"].map((column) => <th key={column} className="px-4 py-3">{column}</th>)}</tr>
          </thead>
          <tbody className="divide-y">
            {conversations.map((conversation) => (
              <tr key={conversation.id}>
                <td className="px-4 py-3"><Link href={`/dashboard/agents/${conversation.agentId}/conversations`} className="font-semibold text-slate-950 no-underline">{conversation.title ?? conversation.visitorId ?? conversation.id.slice(0, 8)}</Link></td>
                <td className="px-4 py-3">{conversation.agent.name}</td>
                <td className="px-4 py-3"><StatusBadge>{conversation.source}</StatusBadge></td>
                <td className="px-4 py-3">{conversation._count.messages}</td>
                <td className="px-4 py-3">{conversation._count.approvals}</td>
                <td className="px-4 py-3">{conversation.updatedAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
