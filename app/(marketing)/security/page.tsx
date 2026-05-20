import { FinalCta, SectionHeading, SecuritySection } from "@/components/marketing/sections";

export default function SecurityPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Security" title="Agents that act with guardrails" text="Categent is built for role-based access, auditability, tenant isolation, domain controls, safe tool execution, and human approval." />
      </section>
      <SecuritySection />
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-lg border border-white/10 bg-white/[0.04] p-8 text-white">
          <h2 className="text-2xl font-bold">Governance model</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {["LOW tools can run automatically.", "MEDIUM tools are configurable by the organization.", "HIGH tools require approval by default.", "CRITICAL actions always require human approval."].map((rule) => <p key={rule} className="rounded-md bg-slate-900 p-4 text-sm text-slate-300">{rule}</p>)}
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
