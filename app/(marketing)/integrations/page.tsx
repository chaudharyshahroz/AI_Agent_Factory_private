import { FinalCta, IntegrationGrid, SectionHeading } from "@/components/marketing/sections";

export default function IntegrationsPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Integrations" title="A marketplace for tools, knowledge, and business systems" text="Core internal tools are available now. External OAuth integrations are staged behind a clean integration framework." />
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl"><IntegrationGrid /></div>
      </section>
      <FinalCta />
    </main>
  );
}
