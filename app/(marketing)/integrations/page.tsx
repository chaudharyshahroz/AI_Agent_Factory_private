import { CheckCircle2, PlugZap, ShieldCheck } from "lucide-react";
import { FinalAgentOSCTA, ToolStorePreview } from "@/components/marketing/agent-os";
import { IntegrationGrid, SectionHeading } from "@/components/marketing/sections";

export default function IntegrationsPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Integrations" title="Tool Store and integration readiness" text="Start with internal tools that are useful today, then connect commerce, CRM, calendar, communication, knowledge, and automation systems as workflows mature." />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            ["Available now", "Knowledge Search, Lead Capture, Human Handoff, Support Ticket, Product Search, and Webhook foundations."],
            ["Approval aware", "High-risk actions such as bookings, outbound messages, and CRM changes can require review."],
            ["Ready to extend", "Provider metadata, credential encryption, and integration events are modeled for future OAuth."]
          ].map(([title, text], index) => {
            const Icon = [CheckCircle2, ShieldCheck, PlugZap][index];
            return (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white shadow-glow">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-4 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <ToolStorePreview />
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl"><IntegrationGrid /></div>
      </section>
      <FinalAgentOSCTA />
    </main>
  );
}
