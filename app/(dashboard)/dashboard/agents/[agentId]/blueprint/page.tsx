export const dynamic = "force-dynamic";

import { CheckCircle2, GitBranch, ShieldCheck, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
  return (
    <div>
      <PageHeader title="AI Agent Blueprint" text="Edit instructions, tone, allowed actions, restricted actions, approval rules, tools, escalation rules, test cases, and versioned behavior." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="bg-white">
          <form action={blueprint ? `/api/blueprints/${blueprint.id}` : "/api/blueprints/generate"} method="post" className="grid gap-4">
            <input type="hidden" name="agentId" value={agent.id} />
            <input type="hidden" name="organizationId" value={agent.organizationId} />
            <input type="hidden" name="category" value={agent.categorySlug} />
            <input type="hidden" name="templateSlug" value={typeof setupAnswers.templateSlug === "string" ? setupAnswers.templateSlug : "customer-support-agent"} />
            <Textarea name="content" className="min-h-[620px] font-mono text-xs" defaultValue={blueprint ? JSON.stringify(blueprint.content, null, 2) : ""} />
            <Button type="submit">{blueprint ? "Save blueprint" : "Generate blueprint"}</Button>
          </form>
        </Card>
        <aside className="grid gap-4">
          <Card className="bg-slate-950 text-white">
            <GitBranch className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-3 text-xl font-bold">{String(content?.agentName || agent.name)}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{String(content?.agentDescription || agent.description || "Blueprint ready to generate.")}</p>
            <div className="mt-4 flex flex-wrap gap-2"><StatusBadge tone="blue">Version {blueprint?.version || 1}</StatusBadge><StatusBadge>{agent.status}</StatusBadge></div>
          </Card>
          <Card className="bg-white">
            <h3 className="font-bold">Readiness checklist</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {["Blueprint generated", "Knowledge uploaded", "Tools selected", "Test passed", "Deployment configured", "Billing allows deploy"].map((item, index) => <p key={item} className="flex items-center gap-2 text-slate-600"><CheckCircle2 className={`h-4 w-4 ${index === 0 && blueprint ? "text-emerald-500" : "text-slate-300"}`} />{item}</p>)}
            </div>
          </Card>
          <Card className="bg-white">
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
