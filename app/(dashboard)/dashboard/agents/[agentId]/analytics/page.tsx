export const dynamic = "force-dynamic";

import { BarChart3, Bot, MessageSquare, ShieldCheck, UserRoundPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MessageAreaChart, ToolBarChart } from "@/components/dashboard/charts";
import { PageHeader, StatCard } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function AgentAnalyticsPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const [conversations, messages, leads, approvals] = await Promise.all([
    prisma.conversation.count({ where: { agentId: agent.id } }),
    prisma.message.count({ where: { organizationId: agent.organizationId, conversation: { agentId: agent.id } } }),
    prisma.lead.count({ where: { agentId: agent.id } }),
    prisma.humanApproval.count({ where: { agentId: agent.id } })
  ]);
  return (
    <div>
      <PageHeader title="Agent analytics" text="Measure conversations, messages, leads, handoffs, tool usage, failure rate, top questions, and citation usage." />
      <div className="grid gap-4 md:grid-cols-4"><StatCard label="Conversations" value={conversations} icon={MessageSquare} /><StatCard label="Messages" value={messages} icon={Bot} tone="cyan" /><StatCard label="Leads" value={leads} icon={UserRoundPlus} tone="emerald" /><StatCard label="Approvals" value={approvals} icon={ShieldCheck} tone="violet" /></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2"><Card className="bg-white"><h2 className="mb-5 flex items-center gap-2 text-xl font-bold"><BarChart3 className="h-5 w-5" /> Messages</h2><MessageAreaChart /></Card><Card className="bg-white"><h2 className="mb-5 text-xl font-bold">Tools and approvals</h2><ToolBarChart /></Card></div>
    </div>
  );
}
