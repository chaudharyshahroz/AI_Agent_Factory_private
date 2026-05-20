export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminConversationsPage() {
  const conversations = await prisma.conversation.findMany({ orderBy: { updatedAt: "desc" }, take: 50, include: { organization: true, agent: true, _count: { select: { messages: true, approvals: true } } } });
  return (
    <AdminResourcePage
      title="Conversations"
      text="Review platform-wide conversation traffic, source channels, message counts, and approval involvement."
      stats={[{ label: "Visible conversations", value: conversations.length }, { label: "Widget conversations", value: conversations.filter((item) => item.source === "WEBSITE_WIDGET").length }, { label: "Approvals involved", value: conversations.reduce((sum, item) => sum + item._count.approvals, 0) }]}
      columns={["Conversation", "Org", "Agent", "Source", "Messages", "Approvals", "Updated"]}
      rows={conversations.map((conversation) => [
        conversation.title ?? conversation.visitorId ?? conversation.id.slice(0, 8),
        conversation.organization.name,
        conversation.agent.name,
        conversation.source,
        conversation._count.messages,
        conversation._count.approvals,
        conversation.updatedAt.toLocaleDateString()
      ])}
    />
  );
}
