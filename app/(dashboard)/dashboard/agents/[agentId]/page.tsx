export const dynamic = "force-dynamic";

import Link from "next/link";
import { BarChart3, Bot, Database, GitBranch, MessageSquare, Rocket, ShieldCheck, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { requireUser, requireAgentAccess } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function AgentPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const [conversations, messages, approvals, documents, deployment, latestRuns] = await Promise.all([
    prisma.conversation.count({ where: { agentId: agent.id } }),
    prisma.message.count({ where: { organizationId: agent.organizationId, conversation: { agentId: agent.id } } }),
    prisma.humanApproval.count({ where: { agentId: agent.id, status: "PENDING" } }),
    prisma.document.count({ where: { agentId: agent.id } }),
    prisma.agentDeployment.findFirst({ where: { agentId: agent.id } }),
    prisma.agentTestRun.findMany({ where: { agentId: agent.id }, take: 3, orderBy: { createdAt: "desc" } })
  ]);
  const tabs = [
    ["blueprint", "Blueprint", GitBranch],
    ["knowledge", "Knowledge", Database],
    ["tools", "Tools", Wrench],
    ["test", "Test", ShieldCheck],
    ["deploy", "Deploy", Rocket],
    ["conversations", "Conversations", MessageSquare],
    ["logs", "Logs", Bot],
    ["analytics", "Analytics", BarChart3]
  ];
  return (
    <div>
      <PageHeader title={agent.name} text={`${agent.categorySlug} agent · ${agent.description || "Configured from a Categent category template."}`} actionHref={`/dashboard/agents/${agent.id}/test`} actionLabel="Test agent" />
      <div className="mb-6 flex flex-wrap gap-2"><StatusBadge tone={agent.status === "DEPLOYED" ? "green" : "blue"}>{agent.status}</StatusBadge><StatusBadge>{deployment?.status || "Deployment not created"}</StatusBadge></div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Conversations" value={conversations} icon={MessageSquare} />
        <StatCard label="Messages" value={messages} icon={Bot} tone="cyan" />
        <StatCard label="Pending approvals" value={approvals} icon={ShieldCheck} tone="violet" />
        <StatCard label="Knowledge docs" value={documents} icon={Database} tone="emerald" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {tabs.map(([slug, label, Icon]) => <Link key={slug as string} href={`/dashboard/agents/${agent.id}/${slug}`} className="rounded-lg border bg-white p-4 text-slate-700 no-underline transition hover:border-indigo-300 hover:shadow-soft"><Icon className="h-5 w-5 text-indigo-600" /><p className="mt-3 font-semibold">{label as string}</p></Link>)}
      </div>
      <Card className="mt-6 bg-white">
        <h2 className="text-xl font-bold">Recent test runs</h2>
        <div className="mt-4 grid gap-3">{latestRuns.map((run) => <div key={run.id} className="rounded-md border p-3 text-sm"><p className="font-medium">{run.input}</p><p className="mt-1 text-slate-500">{run.createdAt.toLocaleString()}</p></div>)}</div>
      </Card>
    </div>
  );
}
