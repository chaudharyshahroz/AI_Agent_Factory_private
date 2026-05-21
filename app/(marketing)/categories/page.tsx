import { CategoryCards, FinalCta, SectionHeading } from "@/components/marketing/sections";
import { comingSoonCategories } from "@/lib/categent/content";

export default function CategoriesPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Categories" title="Every category starts with a proven operating model" text="Search and choose category packs with templates, knowledge guidance, recommended integrations, and risk controls." />
        <div className="mx-auto mt-8 max-w-xl rounded-xl border border-white/10 bg-white/[0.07] p-4 text-sm text-slate-300 shadow-glow">Search categories, goals, tools, or risk rules</div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <CategoryCards />
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white">Coming soon</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3 lg:grid-cols-5">
              {comingSoonCategories.map((category) => <div key={category} className="premium-card rounded-xl p-4 text-sm font-medium text-slate-300">{category}</div>)}
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
