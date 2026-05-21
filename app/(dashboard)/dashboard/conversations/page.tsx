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
      <PageHeader title="Agent Inbox" text="Review visitor messages, dashboard tests, tool calls, approvals, handoffs, citations, internal notes, and captured lead context across agents." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Conversations" value={conversations.length} icon={MessageSquare} />
        <StatCard label="Website widget" value={conversations.filter((item) => item.source === "WEBSITE_WIDGET").length} icon={MessageSquare} tone="cyan" />
        <StatCard label="Approvals involved" value={conversations.reduce((sum, item) => sum + item._count.approvals, 0)} icon={MessageSquare} tone="violet" />
      </div>
      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
        {["All agents", "Website widget", "Needs approval", "Lead captured", "Human handoff"].map((filter) => <span key={filter} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 ring-1 ring-slate-200">{filter}</span>)}
      </div>
      <Card className="overflow-hidden bg-white p-0">
        {conversations.length ? (
          <>
            <div className="grid gap-3 p-3 md:hidden">
              {conversations.map((conversation) => (
                <Link key={conversation.id} href={`/dashboard/agents/${conversation.agentId}/conversations`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 no-underline">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">{conversation.title ?? conversation.visitorId ?? conversation.id.slice(0, 8)}</p>
                      <p className="mt-1 text-xs text-slate-500">{conversation.agent.name} · Updated {conversation.updatedAt.toLocaleDateString()}</p>
                    </div>
                    <StatusBadge>{conversation.source}</StatusBadge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Messages</p>
                      <p className="mt-1 font-black text-slate-950">{conversation._count.messages}</p>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Approvals</p>
                      <p className="mt-1 font-black text-slate-950">{conversation._count.approvals}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
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
            </div>
          </>
        ) : null}
        {conversations.length === 0 ? <div className="p-8 text-center"><h2 className="text-xl font-black">No conversations yet.</h2><p className="mt-2 text-sm text-slate-500">Test an agent or deploy the widget to start collecting customer conversations.</p></div> : null}
      </Card>
    </div>
  );
}
