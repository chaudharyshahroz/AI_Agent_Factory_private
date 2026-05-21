export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminSubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { organization: true } });
  return (
    <AdminResourcePage
      title="Subscriptions"
      text="Track workspace plan state, Stripe identifiers, renewal windows, and billing health."
      stats={[{ label: "Subscriptions", value: subscriptions.length }, { label: "Active paid", value: subscriptions.filter((subscription) => subscription.plan !== "FREE" && subscription.status !== "canceled").length }, { label: "Free", value: subscriptions.filter((subscription) => subscription.plan === "FREE").length }]}
      searchPlaceholder="Search subscriptions by org, plan, Stripe customer, status, or renewal date"
      filters={["Plan", "Status", "Renewal", "Stripe"]}
      columns={["Organization", "Plan", "Status", "Stripe customer", "Period end", "Actions"]}
      rows={subscriptions.map((subscription) => [
        <span key="org" className="font-semibold text-white">{subscription.organization.name}</span>,
        <span key="plan" className="rounded-full bg-indigo-400/10 px-2 py-1 text-xs text-indigo-100 ring-1 ring-indigo-300/20">{subscription.plan}</span>,
        <span key="status" className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 ring-1 ring-cyan-300/20">{subscription.status}</span>,
        subscription.stripeCustomerId ? `${subscription.stripeCustomerId.slice(0, 12)}...` : "Not created",
        subscription.currentPeriodEnd?.toLocaleDateString() ?? "N/A",
        <AdminRowActions key="actions" label={subscription.organization.name} fields={[
          { label: "Plan", name: "plan", type: "select", options: ["FREE", "STARTER", "PRO", "BUSINESS"] },
          { label: "Status", name: "status", placeholder: subscription.status },
          { label: "Stripe customer ID", name: "customer", placeholder: subscription.stripeCustomerId ?? "" },
          { label: "Admin note", name: "note", type: "textarea" }
        ]} />
      ])}
    />
  );
}
