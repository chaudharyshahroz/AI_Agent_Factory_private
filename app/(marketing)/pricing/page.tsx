import { CheckCircle2 } from "lucide-react";
import { FinalCta, PricingPreview, SectionHeading } from "@/components/marketing/sections";

export default function PricingPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Pricing" title="Plans for every stage of agent operations" text="Prototype for free, deploy your first widget, then scale governed agents across teams and categories." />
        <div className="mx-auto mt-8 flex w-fit rounded-md border border-white/10 bg-white/[0.04] p-1 text-sm text-white">
          <span className="rounded bg-white px-4 py-2 font-semibold text-slate-950">Monthly</span>
          <span className="px-4 py-2 text-slate-300">Yearly - save later</span>
        </div>
      </section>
      <PricingPreview />
      <section className="bg-slate-950 px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-lg border border-white/10 bg-white/[0.04] p-8 text-white">
          <h2 className="text-2xl font-bold">Usage limits included</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Monthly messages are counted from dashboard tests, API chats, and website widget conversations.", "Storage limits apply to uploaded knowledge files and generated chunks.", "Public deployment requires an active paid plan and domain allowlist."].map((item) => (
              <p key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-1 h-4 w-4 text-emerald-300" />{item}</p>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
