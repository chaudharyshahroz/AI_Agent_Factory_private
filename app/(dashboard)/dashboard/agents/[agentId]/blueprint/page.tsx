import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function BlueprintPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const blueprint = await prisma.agentBlueprint.findFirst({ where: { agentId: agent.id }, orderBy: { version: "desc" } });
  const setupAnswers = agent.setupAnswers && typeof agent.setupAnswers === "object" && !Array.isArray(agent.setupAnswers) ? agent.setupAnswers as Record<string, unknown> : {};
  return <div><h1 className="text-3xl font-semibold">Blueprint</h1><Card className="mt-8"><form action={blueprint ? `/api/blueprints/${blueprint.id}` : "/api/blueprints/generate"} method="post" className="grid gap-4"><input type="hidden" name="agentId" value={agent.id} /><input type="hidden" name="organizationId" value={agent.organizationId} /><input type="hidden" name="category" value={agent.categorySlug} /><input type="hidden" name="templateSlug" value={typeof setupAnswers.templateSlug === "string" ? setupAnswers.templateSlug : "customer-support-agent"} /><Textarea name="content" className="min-h-96 font-mono text-xs" defaultValue={blueprint ? JSON.stringify(blueprint.content, null, 2) : ""} /><Button type="submit">{blueprint ? "Save blueprint" : "Generate blueprint"}</Button></form></Card></div>;
}
