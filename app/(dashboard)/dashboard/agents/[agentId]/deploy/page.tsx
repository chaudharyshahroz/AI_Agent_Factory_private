export const dynamic = "force-dynamic";

import { Copy, Globe2, KeyRound, Palette, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function DeployPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const deployment = await prisma.agentDeployment.findFirst({ where: { agentId: agent.id } });
  const script = deployment ? `<script
  src="${process.env.APP_URL || "https://YOUR_DOMAIN"}/api/widget.js"
  data-agent-id="${agent.id}"
  data-public-key="${deployment.publicKey}"
  data-agent-name="${agent.name}"
  data-brand-color="#4f46e5"
  data-welcome="Hi, I can help with questions, bookings, support, and next steps.">
</script>` : "";
  return (
    <div>
      <PageHeader title="Deployment center" text="Deploy the website widget, manage public keys, allowed domains, branding, welcome message, and live status." />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="bg-white">
          {deployment ? (
            <>
              <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Website widget script</h2><StatusBadge tone="green">{deployment.status}</StatusBadge></div>
              <pre className="mt-4 overflow-auto rounded-md bg-slate-950 p-4 text-xs text-cyan-100">{script}</pre>
              <Button type="button" className="mt-4"><Copy className="h-4 w-4" /> Copy script</Button>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">Allowed domains<Input defaultValue={deployment.allowedDomains.join(", ") || process.env.APP_DOMAIN || ""} /></label>
                <label className="grid gap-2 text-sm font-medium">Brand color<Input defaultValue="#6366f1" /></label>
                <label className="grid gap-2 text-sm font-medium">Welcome message<Input defaultValue="Hello. How can I help?" /></label>
                <label className="grid gap-2 text-sm font-medium">Assistant name<Input defaultValue={agent.name} /></label>
              </div>
            </>
          ) : (
            <form action={`/api/agents/${agent.id}/deploy`} method="post" className="rounded-lg border border-dashed p-10 text-center">
              <Rocket className="mx-auto h-10 w-10 text-indigo-600" />
              <h2 className="mt-4 text-xl font-bold">Create deployment</h2>
              <p className="mt-2 text-sm text-slate-500">Generate a public key and widget settings for this agent.</p>
              <Button type="submit" className="mt-5">Create deployment</Button>
            </form>
          )}
        </Card>
        <Card className="bg-slate-950 text-white">
          <h2 className="text-xl font-bold">Widget preview</h2>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="ml-auto w-72 rounded-lg bg-white p-4 text-slate-950">
              <p className="font-semibold">{agent.name}</p>
              <p className="mt-2 rounded-md bg-slate-100 p-3 text-sm">Hello. How can I help?</p>
              <div className="mt-3 rounded-md border px-3 py-2 text-sm text-slate-400">Type a message</div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <p className="flex gap-2"><Globe2 className="h-4 w-4 text-cyan-300" /> Domain allowlist</p>
            <p className="flex gap-2"><KeyRound className="h-4 w-4 text-cyan-300" /> Public deployment key</p>
            <p className="flex gap-2"><Palette className="h-4 w-4 text-cyan-300" /> Brand styling</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
