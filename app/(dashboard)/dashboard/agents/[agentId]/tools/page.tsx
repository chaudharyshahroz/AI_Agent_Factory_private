export const dynamic = "force-dynamic";

import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { tools } from "@/lib/categent/content";

export default async function AgentToolsPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  await requireAgentAccess(user.id, agentId);
  return (
    <div>
      <PageHeader title="Agent tools" text="Manage enabled tools, permissions, approval requirements, risk levels, input schemas, and usage status." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => { const Icon = tool.icon; return <Card key={tool.name} className="bg-white"><div className="flex items-start justify-between"><Icon className="h-6 w-6 text-indigo-600" /><StatusBadge tone={tool.approval ? "amber" : "green"}>{tool.approval ? "Approval required" : "Automatic"}</StatusBadge></div><h2 className="mt-4 text-lg font-bold">{tool.label}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{tool.description}</p><div className="mt-4 flex gap-2"><StatusBadge>{tool.category}</StatusBadge><StatusBadge>{tool.risk}</StatusBadge></div></Card>; })}
      </div>
    </div>
  );
}
