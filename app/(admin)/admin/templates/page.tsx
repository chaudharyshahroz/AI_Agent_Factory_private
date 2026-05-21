export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminTemplatesPage() {
  const templates = await prisma.agentTemplate.findMany({ orderBy: [{ categoryPack: { sortOrder: "asc" } }, { sortOrder: "asc" }], include: { categoryPack: true } });
  return (
    <AdminResourcePage
      title="Agent templates"
      text="Curate template prompts, default goals, required questions, recommended tools, and approval rules."
      stats={[{ label: "Templates", value: templates.length }, { label: "High approval", value: templates.filter((template) => template.approvalLevel === "High").length }, { label: "Categories covered", value: new Set(templates.map((template) => template.categoryPack.slug)).size }]}
      searchPlaceholder="Search templates by category, goal, setup time, tool rule, or approval level"
      filters={["Category", "Goal", "Approval", "Tool rules"]}
      createLabel="Create agent template"
      formFields={[
        { label: "Template name", name: "name", required: true },
        { label: "Slug", name: "slug", required: true },
        { label: "Category", name: "category", required: true },
        { label: "Goal", name: "goal", type: "select", options: ["Support", "Sales", "Bookings", "Follow-up", "Operations", "Knowledge"] },
        { label: "Required tools", name: "tools", type: "textarea" },
        { label: "Default instructions", name: "instructions", type: "textarea" }
      ]}
      columns={["Template", "Category", "Goal", "Setup", "Approval", "Tool rules", "Actions"]}
      rows={templates.map((template) => [
        <span key="name" className="font-semibold text-white">{template.name}</span>,
        template.categoryPack.name,
        template.goal ?? "Operations",
        template.setupTime ?? "6 min",
        <span key="approval" className="rounded-full bg-violet-400/10 px-2 py-1 text-xs text-violet-100 ring-1 ring-violet-300/20">{template.approvalLevel ?? "Medium"}</span>,
        Array.isArray(template.recommendedTools) ? template.recommendedTools.join(", ") : "Category default tools",
        <AdminRowActions key="actions" label={template.name} fields={[
          { label: "Template name", name: "name", placeholder: template.name, required: true },
          { label: "Goal", name: "goal", type: "select", options: ["Support", "Sales", "Bookings", "Follow-up", "Operations", "Knowledge"] },
          { label: "Approval level", name: "approval", type: "select", options: ["Low", "Medium", "High", "Critical"] },
          { label: "Tool rules", name: "tools", type: "textarea" }
        ]} />
      ])}
    />
  );
}
