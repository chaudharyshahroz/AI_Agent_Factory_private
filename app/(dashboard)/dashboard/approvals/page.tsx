export const dynamic = "force-dynamic";

import { ShieldCheck } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function ApprovalsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const approvals = org ? await prisma.humanApproval.findMany({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" }, take: 50 }) : [];
  return (
    <div>
      <PageHeader title="Approval center" text="Review high-risk tool requests before the agent books appointments, sends outbound messages, or changes business records." />
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Pending" value={approvals.filter((approval) => approval.status === "PENDING").length} icon={ShieldCheck} />
        <StatCard label="Approved" value={approvals.filter((approval) => approval.status === "APPROVED").length} icon={ShieldCheck} tone="emerald" />
        <StatCard label="Rejected" value={approvals.filter((approval) => approval.status === "REJECTED").length} icon={ShieldCheck} tone="violet" />
        <StatCard label="Total" value={approvals.length} icon={ShieldCheck} tone="cyan" />
      </div>
      <div className="grid gap-4">
        {approvals.map((approval) => (
          <Card key={approval.id} className="bg-white shadow-soft">
            <div className="flex flex-col justify-between gap-4 lg:flex-row">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold">{approval.requestedAction}</h2>
                  <StatusBadge tone={approval.status === "PENDING" ? "amber" : approval.status === "APPROVED" ? "green" : "red"}>{approval.status}</StatusBadge>
                  <StatusBadge>{approval.riskLevel}</StatusBadge>
                </div>
                <p className="mt-2 text-sm text-slate-500">Tool: {approval.toolName} · requested {approval.createdAt.toLocaleString()}</p>
                <pre className="mt-4 max-h-48 overflow-auto rounded-md bg-slate-950 p-4 text-xs text-cyan-50">{JSON.stringify(approval.proposedArguments, null, 2)}</pre>
              </div>
              {approval.status === "PENDING" ? (
                <div className="flex gap-2">
                  <form action={`/api/approvals/${approval.id}/approve`} method="post"><Button type="submit">Approve</Button></form>
                  <form action={`/api/approvals/${approval.id}/reject`} method="post"><Button type="submit" variant="destructive">Reject</Button></form>
                </div>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
