import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function AgentsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const agents = org ? await prisma.agent.findMany({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" } }) : [];
  return <div><h1 className="text-3xl font-semibold">Agents</h1><div className="mt-8 grid gap-4">{agents.map((agent) => <Link key={agent.id} href={`/dashboard/agents/${agent.id}`} className="no-underline"><Card><div className="flex items-center justify-between"><div><h2 className="font-semibold text-foreground">{agent.name}</h2><p className="text-sm text-muted-foreground">{agent.categorySlug}</p></div><span className="rounded bg-secondary px-2 py-1 text-xs">{agent.status}</span></div></Card></Link>)}</div></div>;
}
