export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminToolsPage() {
  const tools = await prisma.toolDefinition.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
  return (
    <AdminResourcePage
      title="Global tools"
      text="Control the server-side tool registry, risk levels, approval defaults, schemas, and documentation."
      stats={[{ label: "Tools", value: tools.length }, { label: "Approval required", value: tools.filter((tool) => tool.requiresApproval).length }, { label: "Enabled by default", value: tools.filter((tool) => tool.enabledByDefault).length }]}
      searchPlaceholder="Search tools by name, risk level, approval default, schema, or category"
      filters={["Risk level", "Approval", "Enabled", "Category"]}
      createLabel="Create global tool"
      formFields={[
        { label: "Tool name", name: "name", required: true },
        { label: "Category", name: "category", required: true },
        { label: "Risk level", name: "risk", type: "select", options: ["low", "medium", "high", "critical"], required: true },
        { label: "Input schema JSON", name: "inputSchema", type: "textarea", required: true },
        { label: "Documentation", name: "documentation", type: "textarea" }
      ]}
      columns={["Tool", "Category", "Risk", "Approval", "Default", "Input schema", "Actions"]}
      rows={tools.map((tool) => [
        <span key="name" className="font-semibold text-white">{tool.name}</span>,
        tool.category,
        <span key="risk" className="rounded-full bg-amber-400/10 px-2 py-1 text-xs text-amber-200 ring-1 ring-amber-300/20">{tool.riskLevel}</span>,
        tool.requiresApproval ? "Required" : "Automatic",
        tool.enabledByDefault ? "Enabled" : "Off",
        <code key="schema" className="line-clamp-1 text-xs text-cyan-100">{JSON.stringify(tool.inputSchema)}</code>,
        <AdminRowActions key="actions" label={tool.name} fields={[
          { label: "Tool name", name: "name", placeholder: tool.name, required: true },
          { label: "Risk level", name: "risk", type: "select", options: ["low", "medium", "high", "critical"] },
          { label: "Approval default", name: "approval", type: "select", options: ["Automatic", "Requires approval"] },
          { label: "Input schema JSON", name: "schema", type: "textarea", placeholder: JSON.stringify(tool.inputSchema, null, 2) }
        ]} />
      ])}
    />
  );
}
