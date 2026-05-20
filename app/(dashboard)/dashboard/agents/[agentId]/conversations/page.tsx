export const dynamic = "force-dynamic";

import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function ConversationsPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const conversations = await prisma.conversation.findMany({ where: { agentId: agent.id }, include: { messages: { take: 2, orderBy: { createdAt: "desc" } }, approvals: true, toolCalls: true }, orderBy: { updatedAt: "desc" } });
  return (
    <div>
      <PageHeader title="Agent conversations" text="Inspect visitor sessions, dashboard tests, sources, tool activity, approvals, citations, and handoff signals." />
      <div className="mb-5 grid gap-3 md:grid-cols-4">
        {["All sources", "Website widget", "Dashboard test", "Has approval"].map((filter) => <div key={filter} className="rounded-md border bg-white px-4 py-3 text-sm text-slate-500">{filter}</div>)}
      </div>
      <div className="grid gap-3">
        {conversations.map((conversation) => <Card key={conversation.id} className="bg-white"><div className="flex flex-col justify-between gap-3 md:flex-row"><div><p className="flex items-center gap-2 font-semibold"><MessageSquare className="h-4 w-4 text-indigo-600" />{conversation.title || conversation.source}</p><p className="mt-2 text-sm text-slate-500">{conversation.messages[0]?.content || "No messages yet"}</p></div><div className="flex flex-wrap gap-2"><StatusBadge>{conversation.source}</StatusBadge><StatusBadge>{conversation.toolCalls.length} tools</StatusBadge><StatusBadge tone={conversation.approvals.length ? "amber" : "slate"}>{conversation.approvals.length} approvals</StatusBadge></div></div></Card>)}
      </div>
    </div>
  );
}
