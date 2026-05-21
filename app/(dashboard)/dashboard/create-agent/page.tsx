export const dynamic = "force-dynamic";

import Link from "next/link";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { categories, comingSoonCategories } from "@/lib/categent/content";

export default function CreateAgentPage() {
  return (
    <div>
      <PageHeader title="Create an AI agent" text="Choose a business category, then Categent will guide you through templates, workflow description, setup questions, knowledge, tools, blueprint generation, testing, and deployment." />
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-500 shadow-soft"><Search className="h-4 w-4 text-indigo-500" /> Search categories and use cases</div>
      <div className="grid gap-4 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.slug} href={`/dashboard/create-agent/${category.slug}`} className="no-underline">
              <Card className="premium-light-card group h-full rounded-xl transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-glow"><Icon className="h-6 w-6" /></span>
                  <StatusBadge tone="green">Active</StatusBadge>
                </div>
                <h2 className="mt-5 text-xl font-bold">{category.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{category.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{category.exampleAgents.slice(0, 3).map((agent) => <span key={agent} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">{agent}</span>)}</div>
                <div className="mt-5 rounded-md bg-slate-950 p-3 text-xs text-slate-300">
                  <span className="font-semibold text-cyan-200">Guardrail:</span> {category.riskControls[0]}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      <h2 className="mt-10 text-2xl font-bold">Coming soon</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">{comingSoonCategories.map((category) => <div key={category} className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm text-slate-500 shadow-soft">{category}</div>)}</div>
    </div>
  );
}
