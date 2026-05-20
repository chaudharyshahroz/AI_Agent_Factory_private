export const dynamic = "force-dynamic";

import { PlugZap } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui/card";
import { tools } from "@/lib/categent/content";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function ToolsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const usage = org ? await prisma.toolCall.groupBy({ by: ["toolName"], where: { organizationId: org.id }, _count: { toolName: true } }) : [];
  const usageMap = new Map(usage.map((item) => [item.toolName, item._count.toolName]));
  return (
    <div>
      <PageHeader title="Tool registry" text="Choose what agents are allowed to do, understand risk levels, and keep high-impact actions behind approval." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Available tools" value={tools.length} icon={PlugZap} />
        <StatCard label="Approval required" value={tools.filter((tool) => tool.approval).length} icon={PlugZap} tone="violet" />
        <StatCard label="Internal tools" value={tools.length} icon={PlugZap} tone="emerald" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.name} className="bg-white shadow-soft">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-indigo-50 text-indigo-600"><Icon className="h-5 w-5" /></span>
                <div>
                  <h2 className="font-bold">{tool.label}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{tool.description}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <StatusBadge tone={tool.risk === "LOW" ? "green" : tool.risk === "MEDIUM" ? "blue" : "amber"}>{tool.risk}</StatusBadge>
                <StatusBadge>{tool.category}</StatusBadge>
                <StatusBadge tone={tool.approval ? "amber" : "green"}>{tool.approval ? "Approval" : "Automatic"}</StatusBadge>
                <StatusBadge>{usageMap.get(tool.name) ?? 0} uses</StatusBadge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
