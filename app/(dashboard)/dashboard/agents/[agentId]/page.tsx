import Link from "next/link";
import { Card } from "@/components/ui/card";
import { requireUser, requireAgentAccess } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function AgentPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const [conversations, approvals] = await Promise.all([
    prisma.conversation.count({ where: { agentId: agent.id } }),
    prisma.humanApproval.count({ where: { agentId: agent.id, status: "PENDING" } })
  ]);
  const tabs = ["knowledge", "blueprint", "test", "deploy", "conversations", "logs"];
  return <div><h1 className="text-3xl font-semibold">{agent.name}</h1><p className="mt-2 text-muted-foreground">{agent.status} · {agent.categorySlug}</p><div className="mt-6 flex flex-wrap gap-2">{tabs.map((tab) => <Link key={tab} href={`/dashboard/agents/${agent.id}/${tab}`} className="rounded-md border bg-white px-3 py-2 text-sm no-underline">{tab}</Link>)}</div><div className="mt-8 grid gap-4 md:grid-cols-3"><Card><p className="text-sm text-muted-foreground">Conversations</p><p className="text-3xl font-semibold">{conversations}</p></Card><Card><p className="text-sm text-muted-foreground">Pending approvals</p><p className="text-3xl font-semibold">{approvals}</p></Card><Card><p className="text-sm text-muted-foreground">Deployment</p><p className="text-3xl font-semibold">Ready</p></Card></div></div>;
}
