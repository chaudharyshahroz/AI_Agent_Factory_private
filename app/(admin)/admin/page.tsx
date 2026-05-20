export const dynamic = "force-dynamic";

import { AdminPageHeader, AdminStatCard, AdminTable } from "@/components/admin/shell";
import { MessageAreaChart } from "@/components/dashboard/charts";
import { prisma } from "@/lib/db/prisma";

export default async function AdminOverviewPage() {
  const [users, organizations, agents, deployedAgents, conversations, messages, approvals, failedDocs, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.organization.count(),
    prisma.agent.count(),
    prisma.agent.count({ where: { status: "DEPLOYED" } }),
    prisma.conversation.count(),
    prisma.message.count(),
    prisma.humanApproval.count({ where: { status: "PENDING" } }),
    prisma.document.count({ where: { status: "FAILED" } }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { memberships: { include: { organization: true } } } })
  ]);

  const stats = [
    ["Total users", users],
    ["Organizations", organizations],
    ["Agents", agents],
    ["Deployed agents", deployedAgents],
    ["Conversations", conversations],
    ["Messages", messages],
    ["Pending approvals", approvals],
    ["Failed documents", failedDocs]
  ];

  return (
    <div>
      <AdminPageHeader title="Platform overview" text="Monitor Categent users, organizations, agent activity, approvals, jobs, and system readiness from one control room." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => <AdminStatCard key={label as string} label={label as string} value={value as number} />)}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-bold">Platform activity</h2>
          <MessageAreaChart />
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold">Recent signups</h2>
          <AdminTable
            columns={["User", "Organization", "Role", "Joined"]}
            rows={recentUsers.map((user) => [
              <span key="u" className="font-semibold text-white">{user.email}</span>,
              user.memberships[0]?.organization.name ?? "No organization",
              user.memberships[0]?.role ?? "None",
              user.createdAt.toLocaleDateString()
            ])}
          />
        </div>
      </div>
    </div>
  );
}
