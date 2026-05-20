export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminAgentsPage() {
  const agents = await prisma.agent.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { organization: true, template: true, _count: { select: { conversations: true, documents: true } } } });
  return (
    <AdminResourcePage
      title="Agents"
      text="Inspect every agent, its category, template, deployment status, knowledge state, and conversation volume."
      stats={[{ label: "Visible agents", value: agents.length }, { label: "Deployed", value: agents.filter((agent) => agent.status === "DEPLOYED").length }, { label: "Draft/testing", value: agents.filter((agent) => agent.status !== "DEPLOYED").length }]}
      columns={["Agent", "Organization", "Category", "Template", "Status", "Conversations", "Knowledge"]}
      rows={agents.map((agent) => [
        <span key="agent" className="font-semibold text-white">{agent.name}</span>,
        agent.organization.name,
        agent.categorySlug,
        agent.template?.name ?? "Custom",
        agent.status,
        agent._count.conversations,
        `${agent._count.documents} docs`
      ])}
    />
  );
}
