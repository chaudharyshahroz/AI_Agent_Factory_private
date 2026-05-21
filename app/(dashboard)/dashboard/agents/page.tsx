export const dynamic = "force-dynamic";

import Link from "next/link";
import { Bot, MessageSquare, Search, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState, PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function AgentsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const agents = org ? await prisma.agent.findMany({ where: { organizationId: org.id }, include: { _count: { select: { conversations: true, documents: true } }, deployments: true }, orderBy: { createdAt: "desc" } }) : [];
  return (
    <div>
      <PageHeader title="Agents" text="Manage every category agent, deployment status, knowledge base, conversations, approvals, and recent activity." actionHref="/dashboard/create-agent" actionLabel="Create agent" />
      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_180px_180px]">
        <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-500 shadow-soft"><Search className="h-4 w-4 text-indigo-600" /> Search agents by name, category, status, or use case</div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-soft">Status: all</div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-soft">Category: all</div>
      </div>
      {agents.length === 0 ? <EmptyState title="No agents yet" text="Start with Quick Launch if you want Categent to ask simple questions, or use Guided Builder for templates, knowledge, tools, testing, and deployment." actionHref="/dashboard/create-agent" actionLabel="Create agent" /> : null}
      <div className="grid gap-4">
        {agents.map((agent) => (
          <Link key={agent.id} href={`/dashboard/agents/${agent.id}`} className="no-underline">
            <Card className="premium-light-card rounded-2xl transition hover:-translate-y-0.5 hover:shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-cyan-200 shadow-glow"><Bot className="h-6 w-6" /></span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">{agent.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{agent.categorySlug} · {agent.description || "Category agent"}</p>
                    <div className="mt-3 flex flex-wrap gap-2"><StatusBadge tone={agent.status === "DEPLOYED" ? "green" : "blue"}>{agent.status}</StatusBadge><StatusBadge>{agent.deployments[0]?.status || "No deployment"}</StatusBadge></div>
                    <div className="mt-4 h-2 max-w-xs rounded-full bg-slate-100"><div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500" /></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm text-slate-500">
                  <div><MessageSquare className="mx-auto h-4 w-4" /><p className="mt-1 font-semibold text-slate-950">{agent._count.conversations}</p><p>Conversations</p></div>
                  <div><ShieldCheck className="mx-auto h-4 w-4" /><p className="mt-1 font-semibold text-slate-950">{agent._count.documents}</p><p>Docs</p></div>
                  <div><Bot className="mx-auto h-4 w-4" /><p className="mt-1 font-semibold text-slate-950">{agent.createdAt.toLocaleDateString()}</p><p>Created</p></div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
