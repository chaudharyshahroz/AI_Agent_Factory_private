import { CapabilityGrid, DashboardPreview, FinalCta, KnowledgeSection, SectionHeading, ToolsSection, WorkflowPreview } from "@/components/marketing/sections";

export default function ProductPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Product" title="The operating system for category-based AI agents" text="Categent combines category packs, blueprint generation, knowledge retrieval, tool controls, testing, deployment, analytics, and admin governance." />
      </section>
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl"><CapabilityGrid /></div>
      </section>
      <WorkflowPreview />
      <KnowledgeSection />
      <ToolsSection />
      <DashboardPreview />
      <FinalCta />
    </main>
  );
}
