export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { getCategory } from "@/lib/categories/catalog";
import { templates } from "@/lib/categent/content";

export default async function CategoryTemplatePage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();
  const visibleTemplates = templates.filter((template) => template.category.toLowerCase().includes(category.name.split(" ")[0].toLowerCase()) || category.templates.some(([, name]) => name === template.name));
  return (
    <div>
      <PageHeader title={`Choose a ${category.name} template`} text="Select a playbook with recommended tools, setup time, approval level, and category-specific questions." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleTemplates.map((template) => {
          const slug = category.templates.find(([, name]) => name === template.name)?.[0] || template.name.toLowerCase().replaceAll(" ", "-");
          return (
            <Link key={template.name} href={`/dashboard/create-agent/${category.slug}/${slug}`} className="no-underline">
              <Card className="h-full bg-white transition hover:-translate-y-1 hover:border-indigo-300">
                <div className="flex items-center justify-between"><StatusBadge tone="blue">{template.goal}</StatusBadge><StatusBadge>{template.approval} approval</StatusBadge></div>
                <h2 className="mt-5 text-xl font-bold">{template.name}</h2>
                <div className="mt-4 flex gap-4 text-sm text-slate-500"><span className="flex items-center gap-1"><Clock className="h-4 w-4" />{template.setupTime}</span><span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" />Guarded</span></div>
                <div className="mt-5 flex flex-wrap gap-2">{template.tools.map((tool) => <span key={tool} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{tool}</span>)}</div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
