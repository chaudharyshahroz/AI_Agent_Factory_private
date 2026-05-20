import {
  CategorySection,
  DashboardPreview,
  FinalCta,
  HeroSection,
  HowItWorks,
  KnowledgeSection,
  PricingPreview,
  SecuritySection,
  TemplateGrid,
  ToolsSection,
  WorkflowPreview,
  SectionHeading
} from "@/components/marketing/sections";

export default function HomePage() {
  return (
    <main className="bg-slate-950">
      <HeroSection />
      <HowItWorks />
      <CategorySection />
      <section className="bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Templates" title="Launch from serious business playbooks" text="Support, sales, bookings, follow-up, operations, and knowledge workflows are ready to configure." />
          <div className="mt-10"><TemplateGrid limit={10} /></div>
        </div>
      </section>
      <WorkflowPreview />
      <ToolsSection />
      <KnowledgeSection />
      <SecuritySection />
      <DashboardPreview />
      <PricingPreview />
      <FinalCta />
    </main>
  );
}
