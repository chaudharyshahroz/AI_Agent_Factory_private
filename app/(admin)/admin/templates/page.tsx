export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminTemplatesPage() {
  const templates = await prisma.agentTemplate.findMany({ orderBy: [{ categoryPack: { sortOrder: "asc" } }, { sortOrder: "asc" }], include: { categoryPack: true } });
  return (
    <AdminResourcePage
      title="Agent templates"
      text="Curate template prompts, default goals, required questions, recommended tools, and approval rules."
      stats={[{ label: "Templates", value: templates.length }, { label: "High approval", value: templates.filter((template) => template.approvalLevel === "High").length }, { label: "Categories covered", value: new Set(templates.map((template) => template.categoryPack.slug)).size }]}
      columns={["Template", "Category", "Goal", "Setup", "Approval", "Slug"]}
      rows={templates.map((template) => [
        <span key="name" className="font-semibold text-white">{template.name}</span>,
        template.categoryPack.name,
        template.goal ?? "Operations",
        template.setupTime ?? "6 min",
        template.approvalLevel ?? "Medium",
        template.slug
      ])}
    />
  );
}
