import Link from "next/link";
import { Bot, ShieldCheck, Upload, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const sections = [
    ["Category-based AI agents", "Start with proven patterns for support, sales, bookings, follow-ups, and operations.", Bot],
    ["Safety and human approval", "Risky actions create approval requests before anything sensitive happens.", ShieldCheck],
    ["Knowledge upload", "Upload policies, listings, product docs, FAQs, and service information.", Upload],
    ["Website widget", "Deploy a secure chat widget with a public key and domain allowlist.", WandSparkles]
  ];
  return (
    <main>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal md:text-6xl">Build AI agents for your business in minutes.</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">Choose your industry, describe your workflow, upload your knowledge, and launch AI agents for support, sales, bookings, follow-ups, and operations.</p>
            <div className="mt-8 flex gap-3">
              <Button asChild><Link href="/signup" className="text-primary-foreground no-underline">Create agent</Link></Button>
              <Button asChild className="bg-white text-slate-950"><Link href="/pricing" className="text-slate-950 no-underline">View pricing</Link></Button>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="grid gap-3">
              {["Choose category", "Answer setup questions", "Generate blueprint", "Test agent", "Deploy widget"].map((item) => <div key={item} className="rounded-md bg-white/10 p-4 text-sm">{item}</div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-16 md:grid-cols-4">
        {sections.map(([title, body, Icon]) => <Card key={title as string}><Icon className="mb-4 h-5 w-5 text-primary" /><h2 className="font-semibold">{title as string}</h2><p className="mt-2 text-sm text-muted-foreground">{body as string}</p></Card>)}
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">Supported categories</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["E-commerce", "Real estate", "Service business / agency"].map((category) => <Card key={category}><h3 className="font-semibold">{category}</h3><p className="mt-2 text-sm text-muted-foreground">Launch from a template built around common business workflows.</p></Card>)}
        </div>
      </section>
    </main>
  );
}
