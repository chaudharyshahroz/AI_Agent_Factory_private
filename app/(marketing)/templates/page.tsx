import { Filter, Search } from "lucide-react";
import { FinalCta, SectionHeading, TemplateGrid } from "@/components/marketing/sections";

export default function TemplatesPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Templates" title="Agent templates for real business outcomes" text="Filter by category, goal, tools, setup time, approval level, and supported channels." />
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-slate-300"><Search className="h-4 w-4" /> Search templates</div>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-slate-300"><Filter className="h-4 w-4" /> Filter by goal</div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl"><TemplateGrid /></div>
      </section>
      <FinalCta />
    </main>
  );
}
