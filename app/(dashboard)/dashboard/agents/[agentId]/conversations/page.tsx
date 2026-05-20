import { Card } from "@/components/ui/card";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function ConversationsPage({ params }: { params: { agentId: string } }) {
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, params.agentId);
  const conversations = await prisma.conversation.findMany({ where: { agentId: agent.id }, include: { messages: { take: 1, orderBy: { createdAt: "desc" } } }, orderBy: { updatedAt: "desc" } });
  return <div><h1 className="text-3xl font-semibold">Conversations</h1><div className="mt-8 grid gap-3">{conversations.map((conversation) => <Card key={conversation.id}><p className="font-medium">{conversation.title || conversation.source}</p><p className="mt-2 text-sm text-muted-foreground">{conversation.messages[0]?.content || "No messages yet"}</p></Card>)}</div></div>;
}
