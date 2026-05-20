import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getCategory } from "@/lib/categories/catalog";

export default function CategoryTemplatePage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();
  return <div><h1 className="text-3xl font-semibold">{category.name}</h1><p className="mt-2 text-muted-foreground">Choose an agent template.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{category.templates.map(([slug, name, description]) => <Link key={slug} href={`/dashboard/create-agent/${category.slug}/${slug}`} className="no-underline"><Card className="h-full transition hover:border-primary"><h2 className="font-semibold text-foreground">{name}</h2><p className="mt-2 text-sm text-muted-foreground">{description}</p></Card></Link>)}</div></div>;
}
