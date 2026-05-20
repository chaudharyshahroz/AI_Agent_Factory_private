export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.categoryPack.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { templates: true, questions: true } } } });
  return (
    <AdminResourcePage
      title="Category packs"
      text="Manage the industry playbooks that make Categent faster than blank-screen agent builders."
      stats={[{ label: "Active categories", value: categories.filter((category) => category.status === "active").length }, { label: "Templates", value: categories.reduce((sum, category) => sum + category._count.templates, 0) }, { label: "Setup questions", value: categories.reduce((sum, category) => sum + category._count.questions, 0) }]}
      columns={["Category", "Slug", "Status", "Templates", "Questions", "SEO"]}
      rows={categories.map((category) => [
        <span key="name" className="font-semibold text-white">{category.name}</span>,
        category.slug,
        category.status,
        category._count.templates,
        category._count.questions,
        category.seoTitle ?? "Generated from defaults"
      ])}
    />
  );
}
