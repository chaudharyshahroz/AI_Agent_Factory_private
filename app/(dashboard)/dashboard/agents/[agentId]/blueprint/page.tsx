export const dynamic = "force-dynamic";

import { CheckCircle2, GitBranch, ShieldCheck, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GenerationSubmitButton } from "@/components/agents/generation-submit";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function BlueprintPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const blueprint = await prisma.agentBlueprint.findFirst({ where: { agentId: agent.id }, orderBy: { version: "desc" } });
  const setupAnswers = agent.setupAnswers && typeof agent.setupAnswers === "object" && !Array.isArray(agent.setupAnswers) ? agent.setupAnswers as Record<string, unknown> : {};
  const content = blueprint?.content as Record<string, unknown> | undefined;
  const asList = (value: unknown, fallback: string[]) => Array.isArray(value) ? value.map(String) : fallback;
  const allowedActions = asList(content?.allowedActions, ["Answer questions", "Search knowledge", "Capture lead details"]);
  const restrictedActions = asList(content?.restrictedActions, ["Do not promise refunds", "Do not change orders", "Do not give legal, medical, or financial advice"]);
  const approvalRules = asList(content?.approvalRequiredFor, ["Refunds", "Bookings", "Outbound messages", "CRM updates"]);
  const requiredFields = asList(content?.requiredUserFields, ["Name", "Email", "Issue or request", "Urgency"]);
  return (
    <div>
      <PageHeader title="Agent Blueprint" text="Review the agent identity, business goal, instructions, data to collect, tools, approval rules, escalation behavior, tests, and deployment checklist. Raw JSON is available in Advanced." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <Card className="premium-light-card rounded-xl">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Agent identity</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">{String(content?.agentName || agent.name)}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{String(content?.agentDescription || agent.description || "Generated plan will appear after blueprint creation.")}</p>
              </div>
              <StatusBadge tone={blueprint ? "green" : "amber"}>{blueprint ? "Blueprint generated" : "Needs generation"}</StatusBadge>
            </div>
          </Card>
          <div className="grid gap-5 lg:grid-cols-2">
            <BlueprintSection title="Business goal" items={[String(content?.businessGoal || "Help visitors get accurate answers, collect the right details, and escalate risky actions safely.")]} />
            <BlueprintSection title="Conversation behavior" items={[String(content?.tone || "Helpful, concise, policy-aware"), "Ask for missing details before using tools", "Cite uploaded knowledge when available"]} />
            <BlueprintSection title="Data to collect" items={requiredFields} />
            <BlueprintSection title="Allowed actions" items={allowedActions} />
            <BlueprintSection title="Restricted actions" items={restrictedActions} />
            <BlueprintSection title="Approval rules" items={approvalRules} />
          </div>
          <Card className="premium-light-card rounded-xl">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-black">Deployment checklist</h2>
                <p className="mt-1 text-sm text-slate-500">This score improves when knowledge, tools, tests, widget settings, and plan limits are ready.</p>
              </div>
              <StatusBadge tone="blue">Readiness 78%</StatusBadge>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {["Blueprint generated", "Knowledge added", "Tools selected", "Tests passed", "Widget configured", "Domain allowed"].map((item, index) => <p key={item} className="rounded-xl bg-white p-3 text-sm text-slate-700 ring-1 ring-slate-200"><CheckCircle2 className={`mb-2 h-4 w-4 ${index === 0 && blueprint ? "text-emerald-500" : "text-slate-300"}`} />{item}</p>)}
            </div>
          </Card>
          <details className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <summary className="cursor-pointer text-sm font-bold text-slate-950">Advanced raw JSON editor</summary>
          <form action={blueprint ? `/api/blueprints/${blueprint.id}` : "/api/blueprints/generate"} method="post" className="grid gap-4">
            <input type="hidden" name="agentId" value={agent.id} />
            <input type="hidden" name="organizationId" value={agent.organizationId} />
            <input type="hidden" name="category" value={agent.categorySlug} />
            <input type="hidden" name="templateSlug" value={typeof setupAnswers.templateSlug === "string" ? setupAnswers.templateSlug : "customer-support-agent"} />
            <Textarea name="content" className="mt-4 min-h-[360px] rounded-lg border-slate-200 bg-slate-950 font-mono text-xs text-cyan-100 shadow-inner placeholder:text-slate-500" defaultValue={blueprint ? JSON.stringify(blueprint.content, null, 2) : ""} />
            <GenerationSubmitButton idleLabel={blueprint ? "Validate and save blueprint" : "Generate blueprint"} pendingLabel={blueprint ? "Validating blueprint..." : "Generating blueprint..."} />
          </form>
          </details>
        </div>
        <aside className="grid gap-4">
          <Card className="premium-card rounded-xl text-white">
            <GitBranch className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-3 text-xl font-bold">{String(content?.agentName || agent.name)}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{String(content?.agentDescription || agent.description || "Blueprint ready to generate.")}</p>
            <div className="mt-4 flex flex-wrap gap-2"><StatusBadge tone="blue">Version {blueprint?.version || 1}</StatusBadge><StatusBadge>{agent.status}</StatusBadge></div>
          </Card>
          <Card className="premium-light-card rounded-xl">
            <h3 className="font-bold">Readiness checklist</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {["Blueprint generated", "Knowledge uploaded", "Tools selected", "Test passed", "Deployment configured", "Billing allows deploy"].map((item, index) => <p key={item} className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-slate-600"><CheckCircle2 className={`h-4 w-4 ${index === 0 && blueprint ? "text-emerald-500" : "text-slate-300"}`} />{item}</p>)}
            </div>
          </Card>
          <Card className="premium-light-card rounded-xl">
            <h3 className="flex items-center gap-2 font-bold"><Wrench className="h-4 w-4" /> Controls</h3>
            <p className="mt-2 text-sm text-slate-500">Restricted actions and approval rules are validated before tool execution.</p>
            <h3 className="mt-5 flex items-center gap-2 font-bold"><ShieldCheck className="h-4 w-4" /> Guardrails</h3>
            <p className="mt-2 text-sm text-slate-500">High-risk tools create human approval records by default.</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function BlueprintSection({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="premium-light-card rounded-xl">
      <h3 className="text-lg font-black">{title}</h3>
      <div className="mt-4 grid gap-2">
        {items.map((item) => <p key={item} className="rounded-xl bg-white p-3 text-sm leading-6 text-slate-700 ring-1 ring-slate-200">{item}</p>)}
      </div>
    </Card>
  );
}
