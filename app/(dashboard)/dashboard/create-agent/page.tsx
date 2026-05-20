import Link from "next/link";
import { Card } from "@/components/ui/card";
import { categoryCatalog } from "@/lib/categories/catalog";

export default function CreateAgentPage() {
  return <div><h1 className="text-3xl font-semibold">Create Agent</h1><p className="mt-2 text-muted-foreground">Choose a business category to start from a focused template.</p><div className="mt-8 grid gap-4 md:grid-cols-3">{categoryCatalog.map((category) => <Link key={category.slug} href={`/dashboard/create-agent/${category.slug}`} className="no-underline"><Card className="h-full transition hover:border-primary"><h2 className="font-semibold text-foreground">{category.name}</h2><p className="mt-2 text-sm text-muted-foreground">{category.description}</p></Card></Link>)}</div></div>;
}
