import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function DeployPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const deployment = await prisma.agentDeployment.findFirst({ where: { agentId: agent.id } });
  const script = deployment ? `<script src="${process.env.APP_URL || "https://YOUR_DOMAIN"}/api/widget.js" data-agent-id="${agent.id}" data-public-key="${deployment.publicKey}"></script>` : "";
  return <div><h1 className="text-3xl font-semibold">Deploy widget</h1><Card className="mt-8">{deployment ? <><p className="text-sm text-muted-foreground">Embed script</p><pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-xs">{script}</pre><p className="mt-4 text-sm">Allowed domains: {deployment.allowedDomains.join(", ") || "none configured"}</p></> : <form action={`/api/agents/${agent.id}/deploy`} method="post"><Button type="submit">Create deployment</Button></form>}</Card></div>;
}
