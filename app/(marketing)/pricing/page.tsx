import { CheckCircle2 } from "lucide-react";
import { FinalAgentOSCTA, ModernPricingSection } from "@/components/marketing/agent-os";
import { SectionHeading } from "@/components/marketing/sections";

export default function PricingPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Pricing" title="Plans for every stage of Agent OS rollout" text="Prototype for free, deploy your first widget, then scale governed agents across categories, tools, teams, and approvals." />
        <div className="mx-auto mt-8 flex w-fit rounded-2xl border border-white/10 bg-white/[0.06] p-1 text-sm text-white shadow-glow">
          <span className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-950">Monthly</span>
          <span className="px-4 py-2 text-slate-300">Yearly - save later</span>
        </div>
      </section>
      <ModernPricingSection />
      <section className="bg-slate-950 px-4 py-16">
        <div className="premium-card mx-auto max-w-5xl rounded-[2rem] p-8 text-white">
          <h2 className="text-2xl font-black">Usage limits are tied to real agent operations</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Messages include tests, API chat, and website widget conversations.", "Storage covers uploaded knowledge files and generated searchable chunks.", "Public deployment requires an active plan, widget key, and domain allowlist."].map((item) => (
              <p key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-1 h-4 w-4 text-emerald-300" />{item}</p>
            ))}
          </div>
        </div>
      </section>
      <FinalAgentOSCTA />
    </main>
  );
}
