export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminAgentsPage() {
  const agents = await prisma.agent.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { organization: true, template: true, deployments: true, _count: { select: { conversations: true, documents: true } } } });
  return (
    <AdminResourcePage
      title="Agents"
      text="Inspect every agent, its category, template, deployment status, knowledge state, and conversation volume."
      stats={[{ label: "Visible agents", value: agents.length }, { label: "Deployed", value: agents.filter((agent) => agent.status === "DEPLOYED").length }, { label: "Draft/testing", value: agents.filter((agent) => agent.status !== "DEPLOYED").length }]}
      searchPlaceholder="Search agents by name, org, category, template, deployment, or status"
      filters={["Category", "Status", "Deployment", "Organization"]}
      createLabel="Create admin agent"
      formFields={[
        { label: "Agent name", name: "name", required: true },
        { label: "Organization ID", name: "organizationId", required: true },
        { label: "Category", name: "category", type: "select", options: ["e-commerce", "real-estate", "service-business"], required: true },
        { label: "Description", name: "description", type: "textarea" }
      ]}
      columns={["Agent", "Organization", "Category", "Template", "Status", "Conversations", "Deployment", "Actions"]}
      rows={agents.map((agent) => [
        <span key="agent" className="font-semibold text-white">{agent.name}</span>,
        agent.organization.name,
        agent.categorySlug,
        agent.template?.name ?? "Custom",
        <span key="status" className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 ring-1 ring-cyan-300/20">{agent.status}</span>,
        agent._count.conversations,
        agent.deployments[0]?.status ?? "Not deployed",
        <AdminRowActions key="actions" label={agent.name} fields={[
          { label: "Agent name", name: "name", placeholder: agent.name, required: true },
          { label: "Status", name: "status", type: "select", options: ["DRAFT", "TESTING", "DEPLOYED", "PAUSED", "ARCHIVED"] },
          { label: "Deployment status", name: "deployment", type: "select", options: ["ACTIVE", "PAUSED", "DISABLED"] },
          { label: "Admin note", name: "note", type: "textarea" }
        ]} />
      ])}
    />
  );
}
