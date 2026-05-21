export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { integrations } from "@/lib/categent/content";
import { prisma } from "@/lib/db/prisma";

export default async function AdminIntegrationsPage() {
  const connected = await prisma.integration.count({ where: { status: "connected" } });
  return (
    <AdminResourcePage
      title="Integration catalog"
      text="Manage provider visibility, availability status, setup docs, and future OAuth rollout plans."
      stats={[{ label: "Catalog items", value: integrations.length }, { label: "Connected instances", value: connected }, { label: "Available/internal", value: integrations.filter((integration) => integration.status === "Available").length }]}
      searchPlaceholder="Search providers by group, status, metadata, setup docs, or OAuth readiness"
      filters={["Group", "Status", "Connected", "Coming soon"]}
      createLabel="Add provider"
      formFields={[
        { label: "Provider", name: "provider", required: true },
        { label: "Group", name: "group", type: "select", options: ["E-commerce", "CRM", "Calendar", "Communication", "Knowledge", "Automation"], required: true },
        { label: "Status", name: "status", type: "select", options: ["Available", "Connected", "Coming soon", "Placeholder"], required: true },
        { label: "Metadata JSON", name: "metadata", type: "textarea" }
      ]}
      columns={["Provider", "Group", "Status", "Metadata", "Description", "Actions"]}
      rows={integrations.map((integration) => [
        <span key="name" className="font-semibold text-white">{integration.name}</span>,
        integration.group,
        <span key="status" className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 ring-1 ring-cyan-300/20">{integration.status}</span>,
        `${integration.group.toLowerCase()} provider`,
        integration.description,
        <AdminRowActions key="actions" label={integration.name} fields={[
          { label: "Provider", name: "provider", placeholder: integration.name, required: true },
          { label: "Status", name: "status", type: "select", options: ["Available", "Connected", "Coming soon", "Placeholder"] },
          { label: "Setup notes", name: "notes", type: "textarea", placeholder: integration.description }
        ]} />
      ])}
    />
  );
}
