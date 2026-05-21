import { CategoryOSSection, FinalAgentOSCTA } from "@/components/marketing/agent-os";
import { SectionHeading } from "@/components/marketing/sections";

export default function CategoriesPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Categories" title="Category playbooks for real business agents" text="Each category includes use cases, recommended templates, required knowledge, suggested tools, and default guardrails so teams do not start from a blank workflow." />
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm text-slate-300 shadow-glow">Search categories, agent outcomes, tools, knowledge sources, or risk rules</div>
      </section>
      <CategoryOSSection />
      <FinalAgentOSCTA />
    </main>
  );
}
