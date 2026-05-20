export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, Home, ShoppingCart, Sparkles, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/access";

export default async function OnboardingPage() {
  await requireUser();
  const steps = [
    ["Welcome", "Categent builds agents from category patterns, knowledge, tools, and approval rules.", Sparkles],
    ["Business category", "Choose e-commerce, real estate, service business, or prepare another category.", ShoppingCart],
    ["Main goal", "Support, sales, bookings, follow-ups, operations, or knowledge answers.", BriefcaseBusiness],
    ["Team size", "Start solo and invite teammates later with role-based controls.", UsersRound],
    ["First agent", "We recommend starting with a support or lead qualification agent.", Bot]
  ];
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 p-8">
          <h1 className="text-4xl font-black md:text-6xl">Welcome to Categent</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Set your direction, then build your first category agent with guided templates.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map(([title, text, Icon]) => <Card key={title as string} className="border-white/10 bg-white/[0.04] text-white"><Icon className="h-6 w-6 text-cyan-300" /><h2 className="mt-4 font-semibold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{text as string}</p></Card>)}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["/dashboard/create-agent/e-commerce", "E-commerce", ShoppingCart],
            ["/dashboard/create-agent/real-estate", "Real estate", Home],
            ["/dashboard/create-agent/service-business", "Service business", BriefcaseBusiness]
          ].map(([href, label, Icon]) => (
            <Link key={href as string} href={href as string} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white no-underline hover:border-cyan-300/50">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-4 text-xl font-bold">{label as string}</h3>
              <p className="mt-2 text-sm text-slate-400">Create a recommended starter agent.</p>
            </Link>
          ))}
        </div>
        <Button asChild className="mt-8 bg-gradient-to-r from-indigo-500 to-cyan-400"><Link href="/dashboard/create-agent" className="no-underline">Choose category <ArrowRight className="h-4 w-4" /></Link></Button>
      </div>
    </main>
  );
}
