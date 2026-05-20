import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getCategory } from "@/lib/categories/catalog";

export default async function SetupWizardPage({ params }: { params: Promise<{ category: string; template: string }> }) {
  const { category: categorySlug, template: templateSlug } = await params;
  const category = getCategory(categorySlug);
  const template = category?.templates.find(([slug]) => slug === templateSlug);
  if (!category || !template) notFound();
  return <div><h1 className="text-3xl font-semibold">{template[1]}</h1><p className="mt-2 text-muted-foreground">Wizard: Category, Template, Requirements, Knowledge, Integrations, Blueprint, Test, Deploy.</p><Card className="mt-8"><form action="/api/agents/create-draft" method="post" className="grid gap-4"><input type="hidden" name="category" value={category.slug} /><input type="hidden" name="templateSlug" value={template[0]} />{category.questions.map((question) => <label key={question} className="grid gap-2 text-sm font-medium">{question}<Textarea name={`answer:${question}`} /></label>)}<Button type="submit">Create draft and generate blueprint</Button></form></Card></div>;
}
