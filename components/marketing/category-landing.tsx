import { ArrowRight } from "lucide-react";
import { categories, templates } from "@/lib/categent/content";
import { FinalCta, SectionHeading, ToolsSection, WorkflowPreview, GradientButton } from "@/components/marketing/sections";

export function CategoryLanding({ slug, title, description }: { slug: string; title: string; description: string }) {
  const category = categories.find((item) => item.slug === slug);
  const categoryTemplates = templates.filter((template) => template.category === category?.name || (slug === "service-business" && template.category === "Service business"));
  if (!category) return null;
  const Icon = category.icon;
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200"><Icon className="h-7 w-7" /></div>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
            <div className="mt-8"><GradientButton href="/dashboard/create-agent">Create category agent <ArrowRight className="h-4 w-4" /></GradientButton></div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white">
            <h2 className="text-xl font-bold">Recommended operating model</h2>
            <div className="mt-5 grid gap-4">
              <Info title="Knowledge to upload" items={category.knowledgeSources} />
              <Info title="Recommended tools" items={category.recommendedTools} />
              <Info title="Safety rules" items={category.riskControls} />
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Templates" title={`Launch ${category.name.toLowerCase()} agents from proven playbooks`} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryTemplates.map((template) => (
              <div key={template.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white">
                <h3 className="font-semibold">{template.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{template.goal} agent with {template.tools.join(", ")}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WorkflowPreview />
      <ToolsSection />
      <FinalCta />
    </main>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md bg-slate-950/70 p-4">
      <p className="text-sm font-semibold text-cyan-200">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item}</span>)}
      </div>
    </div>
  );
}
