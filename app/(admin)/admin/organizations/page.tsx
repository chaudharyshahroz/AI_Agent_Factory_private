export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminOrganizationsPage() {
  const organizations = await prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { _count: { select: { members: true, agents: true, conversations: true } }, subscriptions: true }
  });
  return (
    <AdminResourcePage
      title="Organizations"
      text="View workspace plan state, members, agent counts, and usage health across the platform."
      stats={[{ label: "Organizations", value: organizations.length }, { label: "Agents", value: organizations.reduce((sum, org) => sum + org._count.agents, 0) }, { label: "Conversations", value: organizations.reduce((sum, org) => sum + org._count.conversations, 0) }]}
      columns={["Organization", "Plan", "Members", "Agents", "Conversations", "Created"]}
      rows={organizations.map((org) => [
        <span key="org" className="font-semibold text-white">{org.name}</span>,
        org.subscriptions[0]?.plan ?? "FREE",
        org._count.members,
        org._count.agents,
        org._count.conversations,
        org.createdAt.toLocaleDateString()
      ])}
    />
  );
}
