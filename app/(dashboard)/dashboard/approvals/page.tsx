import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function ApprovalsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const approvals = org ? await prisma.humanApproval.findMany({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" }, take: 50 }) : [];
  return <div><h1 className="text-3xl font-semibold">Approvals</h1><div className="mt-8 grid gap-4">{approvals.map((approval) => <Card key={approval.id}><div className="flex flex-col justify-between gap-4 md:flex-row"><div><p className="font-semibold">{approval.requestedAction}</p><p className="text-sm text-muted-foreground">{approval.toolName} · {approval.riskLevel} · {approval.status}</p><pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-xs">{JSON.stringify(approval.proposedArguments, null, 2)}</pre></div>{approval.status === "PENDING" && <div className="flex gap-2"><form action={`/api/approvals/${approval.id}/approve`} method="post"><Button type="submit">Approve</Button></form><form action={`/api/approvals/${approval.id}/reject`} method="post"><Button type="submit" className="bg-destructive">Reject</Button></form></div>}</div></Card>)}</div></div>;
}
