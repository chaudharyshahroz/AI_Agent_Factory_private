import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function KnowledgePage({ params }: { params: { agentId: string } }) {
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, params.agentId);
  const docs = await prisma.document.findMany({ where: { agentId: agent.id }, orderBy: { createdAt: "desc" } });
  return <div><h1 className="text-3xl font-semibold">Knowledge</h1><Card className="mt-8"><form action="/api/knowledge/upload" method="post" encType="multipart/form-data" className="grid gap-4"><input type="hidden" name="agentId" value={agent.id} /><input type="file" name="file" required /><Button type="submit">Upload document</Button></form></Card><div className="mt-6 grid gap-3">{docs.map((doc) => <Card key={doc.id}><div className="flex justify-between"><span>{doc.fileName}</span><span className="text-sm text-muted-foreground">{doc.status}</span></div></Card>)}</div></div>;
}
