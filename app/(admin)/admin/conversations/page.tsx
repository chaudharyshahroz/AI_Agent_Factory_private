export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminConversationsPage() {
  const conversations = await prisma.conversation.findMany({ orderBy: { updatedAt: "desc" }, take: 50, include: { organization: true, agent: true, _count: { select: { messages: true, approvals: true } } } });
  return (
    <AdminResourcePage
      title="Conversations"
      text="Review platform-wide conversation traffic, source channels, message counts, and approval involvement."
      stats={[{ label: "Visible conversations", value: conversations.length }, { label: "Widget conversations", value: conversations.filter((item) => item.source === "WEBSITE_WIDGET").length }, { label: "Approvals involved", value: conversations.reduce((sum, item) => sum + item._count.approvals, 0) }]}
      searchPlaceholder="Search conversations by agent, organization, source, visitor, approval, or date"
      filters={["Agent", "Source", "Approvals", "Date"]}
      columns={["Conversation", "Org", "Agent", "Source", "Messages", "Approvals", "Updated", "Details"]}
      rows={conversations.map((conversation) => [
        conversation.title ?? conversation.visitorId ?? conversation.id.slice(0, 8),
        conversation.organization.name,
        conversation.agent.name,
        <span key="source" className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 ring-1 ring-cyan-300/20">{conversation.source}</span>,
        conversation._count.messages,
        conversation._count.approvals,
        conversation.updatedAt.toLocaleDateString(),
        <AdminRowActions key="actions" label={conversation.title ?? conversation.id.slice(0, 8)} fields={[
          { label: "Conversation ID", name: "id", placeholder: conversation.id },
          { label: "Visitor", name: "visitor", placeholder: conversation.visitorId ?? "" },
          { label: "Internal note", name: "note", type: "textarea" }
        ]} />
      ])}
    />
  );
}
