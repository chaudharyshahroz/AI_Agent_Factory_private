export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.categoryPack.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { templates: true, questions: true } } } });
  return (
    <AdminResourcePage
      title="Category packs"
      text="Manage the industry playbooks that make Categent faster than blank-screen agent builders."
      stats={[{ label: "Active categories", value: categories.filter((category) => category.status === "active").length }, { label: "Templates", value: categories.reduce((sum, category) => sum + category._count.templates, 0) }, { label: "Setup questions", value: categories.reduce((sum, category) => sum + category._count.questions, 0) }]}
      searchPlaceholder="Search category packs by slug, name, template count, tools, or setup question"
      filters={["Status", "Templates", "Sort order"]}
      createLabel="Create category pack"
      formFields={[
        { label: "Name", name: "name", required: true },
        { label: "Slug", name: "slug", required: true },
        { label: "Status", name: "status", type: "select", options: ["active", "coming_soon", "hidden"], required: true },
        { label: "Setup questions", name: "questions", type: "textarea", placeholder: "One question per line" },
        { label: "Description", name: "description", type: "textarea", required: true }
      ]}
      columns={["Category", "Slug", "Status", "Templates", "Questions", "SEO", "Actions"]}
      rows={categories.map((category) => [
        <span key="name" className="font-semibold text-white">{category.name}</span>,
        category.slug,
        <span key="status" className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/20">{category.status}</span>,
        category._count.templates,
        category._count.questions,
        category.seoTitle ?? "Generated from defaults",
        <AdminRowActions key="actions" label={category.name} fields={[
          { label: "Name", name: "name", placeholder: category.name, required: true },
          { label: "Slug", name: "slug", placeholder: category.slug, required: true },
          { label: "Status", name: "status", type: "select", options: ["active", "coming_soon", "hidden"] },
          { label: "Setup questions", name: "questions", type: "textarea", placeholder: "Edit category setup prompts" },
          { label: "SEO title", name: "seoTitle", placeholder: category.seoTitle ?? "SEO title" }
        ]} />
      ])}
    />
  );
}
