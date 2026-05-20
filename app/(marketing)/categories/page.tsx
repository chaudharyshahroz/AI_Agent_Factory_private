import { Card } from "@/components/ui/card";

const categories = ["E-commerce", "Real estate", "Service business", "Restaurant coming soon", "Education coming soon", "Healthcare/wellness coming soon", "Legal/accounting coming soon"];

export default function CategoriesPage() {
  return <main className="mx-auto max-w-6xl px-4 py-16"><h1 className="text-4xl font-semibold">Categories</h1><div className="mt-8 grid gap-4 md:grid-cols-3">{categories.map((category) => <Card key={category}><h2 className="font-semibold">{category}</h2><p className="mt-2 text-sm text-muted-foreground">Category packs define templates, setup questions, tools, and safety rules.</p></Card>)}</div></main>;
}
