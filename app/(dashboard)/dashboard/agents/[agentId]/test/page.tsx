export const dynamic = "force-dynamic";

import { Bot, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function TestPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const [runs, testCases] = await Promise.all([
    prisma.agentTestRun.findMany({ where: { agentId: agent.id }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.agentTestCase.findMany({ where: { agentId: agent.id }, orderBy: { createdAt: "asc" }, take: 8 })
  ]);
  return (
    <div>
      <PageHeader title="Test Lab" text="Run AI evals before launch: normal requests, missing information, risky asks, out-of-scope questions, tool calls, knowledge citations, handoffs, and prompt injection attempts." />
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card className="bg-white">
          <form action={`/api/agents/${agent.id}/test`} method="post" className="grid gap-4">
            <Textarea name="message" className="min-h-40" placeholder="Ask the agent a test question. Try refund, booking, lead qualification, or product guidance scenarios." />
            <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-cyan-400">Run custom test</Button>
          </form>
        </Card>
        <Card className="bg-slate-950 text-white">
          <h2 className="text-xl font-bold">Generated test cases</h2>
          <div className="mt-4 grid gap-3">
            {testCases.map((testCase) => <div key={testCase.id} className="rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm"><p className="font-semibold">{testCase.name}</p><p className="mt-1 text-slate-400">{testCase.input}</p></div>)}
            {testCases.length === 0 ? <p className="text-sm text-slate-400">Generate a blueprint to create default test cases.</p> : null}
          </div>
        </Card>
      </div>
      <div className="mt-6 grid gap-3">
        {runs.map((run) => <Card key={run.id} className="bg-white"><div className="flex items-center justify-between"><p className="font-medium">{run.input}</p><StatusBadge tone={run.passed ? "green" : "slate"}>{run.passed ? "Passed" : "Manual review"}</StatusBadge></div><pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-xs">{JSON.stringify(run.output, null, 2)}</pre></Card>)}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">{[[MessageSquare, "User message"], [Bot, "Agent response"], [CheckCircle2, "Citations"], [ShieldCheck, "Approval triggers"]].map(([Icon, label]) => <Card key={label as string} className="bg-white"><Icon className="h-5 w-5 text-indigo-600" /><p className="mt-3 font-semibold">{label as string}</p></Card>)}</div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {["Normal request", "Missing information", "Risky request", "Prompt injection attempt"].map((item) => <Card key={item} className="premium-light-card rounded-xl"><p className="text-sm font-semibold text-slate-700">{item}</p><p className="mt-2 text-xs leading-5 text-slate-500">Suggested eval category</p></Card>)}
      </div>
    </div>
  );
}
