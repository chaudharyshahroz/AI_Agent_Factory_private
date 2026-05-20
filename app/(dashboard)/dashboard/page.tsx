import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const [agents, conversations, messages, approvals] = org ? await Promise.all([
    prisma.agent.count({ where: { organizationId: org.id } }),
    prisma.conversation.count({ where: { organizationId: org.id, createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
    prisma.message.count({ where: { organizationId: org.id, createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
    prisma.humanApproval.count({ where: { organizationId: org.id, status: "PENDING" } })
  ]) : [0, 0, 0, 0];
  return <div><div className="flex items-center justify-between"><div><h1 className="text-3xl font-semibold">Welcome back</h1><p className="text-muted-foreground">{org?.name || "Your workspace"}</p></div><Button asChild><Link href="/dashboard/create-agent" className="text-primary-foreground no-underline">Create Agent</Link></Button></div><div className="mt-8 grid gap-4 md:grid-cols-4">{[["Total agents", agents], ["Conversations this month", conversations], ["Messages this month", messages], ["Approvals pending", approvals]].map(([label, value]) => <Card key={label as string}><p className="text-sm text-muted-foreground">{label as string}</p><p className="mt-2 text-3xl font-semibold">{value as number}</p></Card>)}</div><Card className="mt-8"><h2 className="font-semibold">Usage</h2><p className="mt-2 text-sm text-muted-foreground">Plan limits and estimated AI cost rollups are tracked through usage events.</p></Card></div>;
}
