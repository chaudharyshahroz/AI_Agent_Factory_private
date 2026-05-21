export const dynamic = "force-dynamic";

import Link from "next/link";
import { Activity, Bot, CheckCircle2, MessageSquare, ShieldCheck, UserRoundPlus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageAreaChart, ToolBarChart } from "@/components/dashboard/charts";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const [agents, deployedAgents, conversations, messages, approvals, leads, toolCalls, failedToolCalls, recentConversations] = org ? await Promise.all([
    prisma.agent.count({ where: { organizationId: org.id } }),
    prisma.agent.count({ where: { organizationId: org.id, status: "DEPLOYED" } }),
    prisma.conversation.count({ where: { organizationId: org.id, createdAt: { gte: startOfMonth } } }),
    prisma.message.count({ where: { organizationId: org.id, createdAt: { gte: startOfMonth } } }),
    prisma.humanApproval.count({ where: { organizationId: org.id, status: "PENDING" } }),
    prisma.lead.count({ where: { organizationId: org.id } }),
    prisma.toolCall.count({ where: { organizationId: org.id } }),
    prisma.toolCall.count({ where: { organizationId: org.id, status: "failed" } }),
    prisma.conversation.findMany({ where: { organizationId: org.id }, include: { agent: true, messages: { take: 1, orderBy: { createdAt: "desc" } } }, orderBy: { updatedAt: "desc" }, take: 5 })
  ]) : [0, 0, 0, 0, 0, 0, 0, 0, []];
  return (
    <div>
      <PageHeader title="Agent OS overview" text="Monitor every agent, conversation, citation, tool call, approval, deployment, and usage signal from one operating system." actionHref="/dashboard/create-agent/ai-guided" actionLabel="Build an agent" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Agents" value={agents} icon={Bot} />
        <StatCard label="Deployed agents" value={deployedAgents} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Messages this month" value={messages} icon={MessageSquare} tone="cyan" />
        <StatCard label="Pending approvals" value={approvals} icon={ShieldCheck} tone="violet" />
        <StatCard label="Conversations" value={conversations} icon={Activity} />
        <StatCard label="Leads captured" value={leads} icon={UserRoundPlus} tone="emerald" />
        <StatCard label="Tool calls" value={toolCalls} icon={Zap} tone="cyan" />
        <StatCard label="Failed tool calls" value={failedToolCalls} icon={ShieldCheck} tone="violet" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Card className="premium-light-card rounded-xl">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">Messages over time</h2><StatusBadge tone="blue">Live metrics</StatusBadge></div>
          <MessageAreaChart />
        </Card>
        <Card className="premium-light-card rounded-xl">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">Tools and approvals</h2><StatusBadge>7 days</StatusBadge></div>
          <ToolBarChart />
        </Card>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <Card className="premium-light-card rounded-xl">
          <h2 className="text-xl font-bold">Recent conversations</h2>
          <div className="mt-5 grid gap-3">
            {recentConversations.map((conversation) => (
              <div key={conversation.id} className="rounded-lg border border-slate-200 bg-white/85 p-4 transition hover:border-indigo-200 hover:shadow-soft">
                <div className="flex items-center justify-between gap-3"><p className="font-semibold">{conversation.title || conversation.agent.name}</p><StatusBadge>{conversation.source}</StatusBadge></div>
                <p className="mt-2 line-clamp-1 text-sm text-slate-500">{conversation.messages[0]?.content || "No messages yet"}</p>
              </div>
            ))}
            {recentConversations.length === 0 ? <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">No conversations yet. Create and test your first agent.</div> : null}
          </div>
        </Card>
        <Card className="premium-card rounded-xl text-white">
          <h2 className="text-xl font-bold">Quick actions</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["/dashboard/create-agent/ai-guided", "Describe work and build an agent"],
              ["/dashboard/knowledge", "Open Knowledge Studio"],
              ["/dashboard/tools", "Open Tool Store"],
              ["/dashboard/approvals", "Review human approvals"]
            ].map(([href, label]) => <Button asChild key={href} className="justify-between bg-white/10 text-white hover:bg-white/15"><Link href={href} className="no-underline">{label}</Link></Button>)}
          </div>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="premium-light-card rounded-xl">
          <h2 className="text-xl font-bold">Launch checklist</h2>
          <div className="mt-5 grid gap-3">
            {["Create your first agent", "Upload trusted knowledge", "Run test cases", "Configure widget domain", "Review analytics after launch"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
                <span className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${index < 1 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="premium-light-card rounded-xl">
          <h2 className="text-xl font-bold">Agent health snapshot</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {["Knowledge ready", "Tools governed", "Widget protected"].map((item) => (
              <div key={item} className="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">{item}</div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">Keep agents healthy by reviewing citations, failed tool calls, pending approvals, and test coverage after every blueprint change.</p>
        </Card>
      </div>
    </div>
  );
}
