export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { BrainCircuit, CheckCircle2, Database, GitBranch, PlugZap, Rocket, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GenerationSubmitButton } from "@/components/agents/generation-submit";
import { getCategory } from "@/lib/categories/catalog";
import { buildProgress, tools, workflowSteps } from "@/lib/categent/content";

export default async function SetupWizardPage({ params }: { params: Promise<{ category: string; template: string }> }) {
  const { category: categorySlug, template: templateSlug } = await params;
  const category = getCategory(categorySlug);
  const template = category?.templates.find(([slug]) => slug === templateSlug);
  if (!category || !template) notFound();
  const icons = [BrainCircuit, Database, PlugZap, ShieldCheck, GitBranch, Rocket];
  return (
    <div>
      <div className="gradient-border rounded-xl p-8 text-white shadow-glow">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Agent builder</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl"><span className="text-gradient">{template[1]}</span></h1>
        <p className="mt-3 max-w-3xl text-slate-300">{template[2]}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-9">{workflowSteps.map((step, index) => <span key={step} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-center text-xs text-slate-300"><span className="text-cyan-200">{index + 1}.</span> {step}</span>)}</div>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="premium-light-card rounded-xl">
          <form action="/api/agents/create-draft" method="post" className="grid gap-6">
            <input type="hidden" name="category" value={category.slug} />
            <input type="hidden" name="templateSlug" value={template[0]} />
            <section>
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">1</span><h2 className="text-xl font-bold">Describe the workflow</h2></div>
              <Textarea name="answer:workflow" className="mt-3 min-h-32" placeholder="Tell Categent what this agent should do, which customers it helps, what it should collect, and what it must never do." />
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                {["Answer shipping questions", "Qualify high-intent leads", "Book appointments with approval", "Escalate risky requests"].map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1">{item}</span>)}
              </div>
            </section>
            <section>
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-50 text-cyan-700">2</span><h2 className="text-xl font-bold">Setup questions</h2></div>
              <div className="mt-4 grid gap-4">
                {category.questions.map((question) => <label key={question} className="grid gap-2 rounded-lg border border-slate-200 bg-white/80 p-4 text-sm font-medium text-slate-700">{question}<Textarea name={`answer:${question}`} className="bg-white" /></label>)}
              </div>
            </section>
            <section>
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">3</span><h2 className="text-xl font-bold">Tool permissions</h2></div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {tools.slice(0, 8).map((tool) => {
                  const ToolIcon = tool.icon;
                  return <label key={tool.name} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white/80 p-3 text-sm transition hover:border-indigo-200 hover:shadow-soft"><input type="checkbox" name="enabledTools" value={tool.name} defaultChecked={tool.risk !== "CRITICAL"} className="mt-1" /><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-950 text-cyan-200"><ToolIcon className="h-4 w-4" /></span><span><span className="font-semibold">{tool.label}</span><span className="block text-slate-500">{tool.risk} risk · {tool.approval ? "approval required" : "automatic"}</span></span></label>;
                })}
              </div>
            </section>
            <GenerationSubmitButton idleLabel="Generate AI Agent Blueprint" />
          </form>
        </Card>
        <aside className="grid gap-4">
          <Card className="premium-light-card rounded-xl">
            <h2 className="font-bold">Building progress</h2>
            <div className="mt-4 grid gap-3">
              {buildProgress.map((step, index) => {
                const Icon = icons[index % icons.length];
                return <div key={step} className="flex items-center gap-3 rounded-md bg-slate-50 p-3 text-sm text-slate-600"><Icon className="h-4 w-4 text-indigo-600" />{step}</div>;
              })}
            </div>
          </Card>
          <Card className="premium-card rounded-xl text-white">
            <h2 className="font-bold">Readiness checklist</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {["Blueprint generated", "Knowledge uploaded", "Tools selected", "Test passed", "Deployment configured"].map((item) => <p key={item} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{item}</p>)}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
