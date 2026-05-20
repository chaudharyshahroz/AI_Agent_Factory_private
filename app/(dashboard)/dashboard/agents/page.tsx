export const dynamic = "force-dynamic";

import Link from "next/link";
import { Bot, MessageSquare, ShieldCheck } from "lucide-react";
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
      {agents.length === 0 ? <EmptyState title="No agents yet" text="Create your first category agent from a template and generate its blueprint." actionHref="/dashboard/create-agent" actionLabel="Create agent" /> : null}
      <div className="grid gap-4">
        {agents.map((agent) => (
          <Link key={agent.id} href={`/dashboard/agents/${agent.id}`} className="no-underline">
            <Card className="bg-white transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-50 text-indigo-600"><Bot className="h-6 w-6" /></span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">{agent.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{agent.categorySlug} · {agent.description || "Category agent"}</p>
                    <div className="mt-3 flex flex-wrap gap-2"><StatusBadge tone={agent.status === "DEPLOYED" ? "green" : "blue"}>{agent.status}</StatusBadge><StatusBadge>{agent.deployments[0]?.status || "No deployment"}</StatusBadge></div>
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
