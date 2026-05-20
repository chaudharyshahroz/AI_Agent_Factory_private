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
                <td className="px-4 py-3">{deployment.allowedDomains.join(", ") || "Any configured later"}</td>
                <td className="px-4 py-3">{deployment.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-3"><Link href={`/dashboard/agents/${deployment.agentId}/deploy`} className="font-semibold text-indigo-600 no-underline">Open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
