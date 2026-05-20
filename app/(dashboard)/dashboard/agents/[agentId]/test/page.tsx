import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function TestPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const runs = await prisma.agentTestRun.findMany({ where: { agentId: agent.id }, orderBy: { createdAt: "desc" }, take: 10 });
  return <div><h1 className="text-3xl font-semibold">Test playground</h1><Card className="mt-8"><form action={`/api/agents/${agent.id}/test`} method="post" className="grid gap-4"><Textarea name="message" placeholder="Ask the agent a test question" /><Button type="submit">Run test</Button></form></Card><div className="mt-6 grid gap-3">{runs.map((run) => <Card key={run.id}><p className="font-medium">{run.input}</p><pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-xs">{JSON.stringify(run.output, null, 2)}</pre></Card>)}</div></div>;
}
