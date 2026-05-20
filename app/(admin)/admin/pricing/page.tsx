export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { pricingPlans } from "@/lib/categent/content";
import { prisma } from "@/lib/db/prisma";

export default async function AdminPricingPage() {
  const subscriptions = await prisma.subscription.groupBy({ by: ["plan"], _count: { plan: true } });
  const planCounts = new Map(subscriptions.map((item) => [item.plan, item._count.plan]));
  return (
    <AdminResourcePage
      title="Pricing metadata"
      text="Review plan limits and Stripe price mapping. Live price IDs stay in environment variables, not client-side code."
      stats={[{ label: "Plans", value: pricingPlans.length }, { label: "Paid subscribers", value: subscriptions.filter((item) => item.plan !== "FREE").reduce((sum, item) => sum + item._count.plan, 0) }, { label: "Free workspaces", value: planCounts.get("FREE") ?? 0 }]}
      columns={["Plan", "Price", "Subscribers", "Features"]}
      rows={pricingPlans.map((plan) => [
        <span key="plan" className="font-semibold text-white">{plan.name}</span>,
        `${plan.price}/mo`,
        planCounts.get(plan.name.toUpperCase() as "FREE" | "STARTER" | "PRO" | "BUSINESS") ?? 0,
        plan.features.join(", ")
      ])}
    />
  );
}
