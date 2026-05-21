export const dynamic = "force-dynamic";

import Link from "next/link";
import { Globe2 } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui/card";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function DeploymentsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const deployments = org ? await prisma.agentDeployment.findMany({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" }, include: { agent: true } }) : [];
  return (
    <div>
      <PageHeader title="Deployments" text="Manage public widget keys, allowed domains, script tags, deployment status, and widget customization." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Deployments" value={deployments.length} icon={Globe2} />
        <StatCard label="Active" value={deployments.filter((deployment) => deployment.status === "ACTIVE").length} icon={Globe2} tone="emerald" />
        <StatCard label="Allowed domains" value={deployments.reduce((sum, deployment) => sum + deployment.allowedDomains.length, 0)} icon={Globe2} tone="cyan" />
      </div>
      <Card className="overflow-hidden bg-white p-0">
        {deployments.length ? (
          <>
            <div className="grid gap-3 p-3 md:hidden">
              {deployments.map((deployment) => (
                <Link key={deployment.id} href={`/dashboard/agents/${deployment.agentId}/deploy`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 no-underline">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">{deployment.agent.name}</p>
                      <p className="mt-1 text-xs text-slate-500">Created {deployment.createdAt.toLocaleDateString()}</p>
                    </div>
                    <StatusBadge tone={deployment.status === "ACTIVE" ? "green" : "amber"}>{deployment.status}</StatusBadge>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Public key</p>
                      <p className="mt-1 font-black text-slate-950">{deployment.publicKey.slice(0, 14)}••••</p>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Allowed domains</p>
                      <p className="mt-1 font-semibold text-slate-700">{deployment.allowedDomains.join(", ") || "Configure before launch"}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                  <tr>{["Agent", "Status", "Public key", "Domains", "Created", "Action"].map((column) => <th key={column} className="px-4 py-3">{column}</th>)}</tr>
                </thead>
                <tbody className="divide-y">
                  {deployments.map((deployment) => (
                    <tr key={deployment.id}>
                      <td className="px-4 py-3 font-semibold">{deployment.agent.name}</td>
                      <td className="px-4 py-3"><StatusBadge tone={deployment.status === "ACTIVE" ? "green" : "amber"}>{deployment.status}</StatusBadge></td>
                      <td className="px-4 py-3">{deployment.publicKey.slice(0, 14)}••••</td>
                      <td className="px-4 py-3">{deployment.allowedDomains.join(", ") || "Configure before launch"}</td>
                      <td className="px-4 py-3">{deployment.createdAt.toLocaleDateString()}</td>
                      <td className="px-4 py-3"><Link href={`/dashboard/agents/${deployment.agentId}/deploy`} className="font-semibold text-indigo-600 no-underline">Open</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-8 text-center"><h2 className="text-xl font-black">No deployments yet.</h2><p className="mt-2 text-sm text-slate-500">Generate an agent, configure the widget, and publish it from the agent deployment page.</p></div>
        )}
      </Card>
    </div>
  );
}
