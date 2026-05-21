import { Filter, Search } from "lucide-react";
import { FinalAgentOSCTA, TemplateLibraryPreview } from "@/components/marketing/agent-os";
import { SectionHeading } from "@/components/marketing/sections";

export default function TemplatesPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Templates" title="Agent templates built around outcomes" text="Every template explains the job it performs, the information it collects, the tools it uses, the approval level, and the knowledge needed before launch." />
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-300 shadow-glow"><Search className="h-4 w-4 text-cyan-200" /> Search by outcome, category, or tool</div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-300"><Filter className="h-4 w-4 text-cyan-200" /> Filter by goal</div>
        </div>
      </section>
      <TemplateLibraryPreview />
      <FinalAgentOSCTA />
    </main>
  );
}
