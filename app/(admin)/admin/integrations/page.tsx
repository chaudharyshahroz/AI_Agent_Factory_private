export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { integrations } from "@/lib/categent/content";
import { prisma } from "@/lib/db/prisma";

export default async function AdminIntegrationsPage() {
  const connected = await prisma.integration.count({ where: { status: "connected" } });
  return (
    <AdminResourcePage
      title="Integration catalog"
      text="Manage provider visibility, availability status, setup docs, and future OAuth rollout plans."
      stats={[{ label: "Catalog items", value: integrations.length }, { label: "Connected instances", value: connected }, { label: "Available/internal", value: integrations.filter((integration) => integration.status === "Available").length }]}
      columns={["Provider", "Group", "Status", "Description"]}
      rows={integrations.map((integration) => [
        <span key="name" className="font-semibold text-white">{integration.name}</span>,
        integration.group,
        integration.status,
        integration.description
      ])}
    />
  );
}
