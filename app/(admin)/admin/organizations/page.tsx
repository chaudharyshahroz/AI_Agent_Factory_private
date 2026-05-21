export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
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
      searchPlaceholder="Search organizations by name, plan, status, member, or usage"
      filters={["Plan", "Usage", "Status", "Created"]}
      createLabel="Create organization"
      formFields={[
        { label: "Organization name", name: "name", required: true },
        { label: "Plan", name: "plan", type: "select", options: ["FREE", "STARTER", "PRO", "BUSINESS"], required: true },
        { label: "Owner email", name: "ownerEmail", type: "email" },
        { label: "Admin note", name: "note", type: "textarea" }
      ]}
      columns={["Organization", "Plan", "Usage", "Members", "Agents", "Status", "Created", "Actions"]}
      rows={organizations.map((org) => [
        <span key="org" className="font-semibold text-white">{org.name}</span>,
        <span key="plan" className="rounded-full bg-indigo-400/10 px-2 py-1 text-xs text-indigo-100 ring-1 ring-indigo-300/20">{org.subscriptions[0]?.plan ?? "FREE"}</span>,
        `${org._count.conversations} conversations`,
        org._count.members,
        org._count.agents,
        <span key="status" className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/20">Active</span>,
        org.createdAt.toLocaleDateString(),
        <AdminRowActions key="actions" label={org.name} fields={[
          { label: "Organization name", name: "name", placeholder: org.name, required: true },
          { label: "Plan", name: "plan", type: "select", options: ["FREE", "STARTER", "PRO", "BUSINESS"] },
          { label: "Usage limit override", name: "usageLimit", type: "number" },
          { label: "Admin note", name: "note", type: "textarea" }
        ]} />
      ])}
    />
  );
}
