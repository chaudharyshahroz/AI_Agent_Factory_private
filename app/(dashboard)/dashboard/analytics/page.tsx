export const dynamic = "force-dynamic";

import { BarChart3 } from "lucide-react";
import { MessageAreaChart, ToolBarChart } from "@/components/dashboard/charts";
import { PageHeader, StatCard } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui/card";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function AnalyticsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const [conversations, messages, leads, toolCalls, approvals] = org ? await Promise.all([
    prisma.conversation.count({ where: { organizationId: org.id } }),
    prisma.message.count({ where: { organizationId: org.id } }),
    prisma.lead.count({ where: { organizationId: org.id } }),
    prisma.toolCall.count({ where: { organizationId: org.id } }),
    prisma.humanApproval.count({ where: { organizationId: org.id } })
  ]) : [0, 0, 0, 0, 0];
  return (
    <div>
      <PageHeader title="Analytics" text="Track conversation volume, tool usage, leads, handoffs, approvals, citations, and cost estimates across the workspace." />
      <div className="mb-8 grid gap-4 md:grid-cols-5">
        <StatCard label="Conversations" value={conversations} icon={BarChart3} />
        <StatCard label="Messages" value={messages} icon={BarChart3} tone="cyan" />
        <StatCard label="Leads" value={leads} icon={BarChart3} tone="emerald" />
        <StatCard label="Tool calls" value={toolCalls} icon={BarChart3} tone="violet" />
        <StatCard label="Approvals" value={approvals} icon={BarChart3} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
        <Card className="bg-white">
          <h2 className="text-xl font-black">Messages and conversations</h2>
          <MessageAreaChart />
        </Card>
        <Card className="bg-white">
          <h2 className="text-xl font-black">Tool and approval mix</h2>
          <ToolBarChart />
        </Card>
        <Card className="bg-white xl:col-span-2">
          <h2 className="text-xl font-black">Top questions placeholder</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            {["Pricing and plans", "Shipping or service area", "Booking availability", "Refund or cancellation rules"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-md border p-3">
                <span>{item}</span>
                <span className="font-semibold">{index + 3} mentions</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
