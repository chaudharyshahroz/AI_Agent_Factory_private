import { CheckCircle2 } from "lucide-react";
import { FinalCta, PricingPreview, SectionHeading } from "@/components/marketing/sections";

export default function PricingPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Pricing" title="Plans for every stage of agent operations" text="Prototype for free, deploy your first widget, then scale governed agents across teams and categories." />
        <div className="mx-auto mt-8 flex w-fit rounded-lg border border-white/10 bg-white/[0.06] p-1 text-sm text-white shadow-glow">
          <span className="rounded bg-white px-4 py-2 font-semibold text-slate-950">Monthly</span>
          <span className="px-4 py-2 text-slate-300">Yearly - save later</span>
        </div>
      </section>
      <PricingPreview />
      <section className="bg-slate-950 px-4 py-16">
        <div className="premium-card mx-auto max-w-5xl rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold">Usage limits included</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Monthly messages are counted from dashboard tests, API chats, and website widget conversations.", "Storage limits apply to uploaded knowledge files and generated chunks.", "Public deployment requires an active paid plan and domain allowlist."].map((item) => (
              <p key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-1 h-4 w-4 text-emerald-300" />{item}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-950 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeading align="center" eyebrow="FAQ" title="Plan details without the fine-print maze" text="Categent is built for self-hosted business agent operations, so billing, limits, and deployment stay predictable." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["Can I use Categent without deploying a public widget?", "Yes. The Free plan supports draft agents and test conversations so you can validate a blueprint before going live."],
              ["Do risky actions run automatically?", "No. High-risk actions such as bookings, outbound notifications, refunds, and CRM updates create human approval requests first."],
              ["Are OpenAI and Stripe keys exposed to the browser?", "No. Secrets stay server-side in your VPS or Dokploy environment variables. The widget only receives a public deployment key."],
              ["Can I self-host this on Hostinger?", "Yes. The production setup uses Docker, Next.js standalone output, Postgres with pgvector, Redis, and local Docker volume storage."],
              ["What happens if I exceed message limits?", "Plan-limit enforcement is server-side. The current MVP tracks usage and has the structure for stricter enforcement as billing rules mature."],
              ["Can external integrations be added later?", "Yes. The integration framework, encrypted credential storage, and marketplace UI are in place for Shopify, HubSpot, Calendly, Gmail, Slack, WhatsApp, and webhooks."]
            ].map(([question, answer]) => (
              <div key={question} className="premium-card rounded-xl p-5 text-white">
                <h3 className="font-bold">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
