export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminToolsPage() {
  const tools = await prisma.toolDefinition.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
  return (
    <AdminResourcePage
      title="Global tools"
      text="Control the server-side tool registry, risk levels, approval defaults, schemas, and documentation."
      stats={[{ label: "Tools", value: tools.length }, { label: "Approval required", value: tools.filter((tool) => tool.requiresApproval).length }, { label: "Enabled by default", value: tools.filter((tool) => tool.enabledByDefault).length }]}
      columns={["Tool", "Category", "Risk", "Approval", "Default", "Updated"]}
      rows={tools.map((tool) => [
        <span key="name" className="font-semibold text-white">{tool.name}</span>,
        tool.category,
        tool.riskLevel,
        tool.requiresApproval ? "Required" : "Automatic",
        tool.enabledByDefault ? "Enabled" : "Off",
        tool.updatedAt.toLocaleDateString()
      ])}
    />
  );
}
