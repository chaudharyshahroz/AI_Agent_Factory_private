export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminSubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { organization: true } });
  return (
    <AdminResourcePage
      title="Subscriptions"
      text="Track workspace plan state, Stripe identifiers, renewal windows, and billing health."
      stats={[{ label: "Subscriptions", value: subscriptions.length }, { label: "Active paid", value: subscriptions.filter((subscription) => subscription.plan !== "FREE" && subscription.status !== "canceled").length }, { label: "Free", value: subscriptions.filter((subscription) => subscription.plan === "FREE").length }]}
      columns={["Organization", "Plan", "Status", "Stripe customer", "Period end"]}
      rows={subscriptions.map((subscription) => [
        <span key="org" className="font-semibold text-white">{subscription.organization.name}</span>,
        subscription.plan,
        subscription.status,
        subscription.stripeCustomerId ? `${subscription.stripeCustomerId.slice(0, 12)}...` : "Not created",
        subscription.currentPeriodEnd?.toLocaleDateString() ?? "N/A"
      ])}
    />
  );
}
