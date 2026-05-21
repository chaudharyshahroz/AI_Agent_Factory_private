import { LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";
import { AdminControlPreview, FinalAgentOSCTA } from "@/components/marketing/agent-os";
import { SectionHeading, SecuritySection } from "@/components/marketing/sections";

export default function SecurityPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Security" title="Agents that act inside your rules" text="Categent is built around private server-side secrets, role-based access, tenant isolation, safe tool execution, domain allowlists, audit logs, and human approval before risky actions." />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            [LockKeyhole, "Private by default", "OpenAI, Stripe, database, and integration secrets stay server-side."],
            [ShieldCheck, "Approval before risk", "Refunds, bookings, outbound messages, and high-impact actions pause for review."],
            [UserCheck, "Role-aware controls", "Owners/admins approve actions while members and viewers stay limited."]
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white shadow-glow">
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 font-black">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text as string}</p>
            </div>
          ))}
        </div>
      </section>
      <SecuritySection />
      <AdminControlPreview />
      <FinalAgentOSCTA />
    </main>
  );
}
