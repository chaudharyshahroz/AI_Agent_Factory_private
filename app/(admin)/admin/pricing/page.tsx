export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
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
      searchPlaceholder="Search plans by limit, Stripe price ID, feature, subscriber count, or status"
      filters={["Plan", "Stripe price", "Subscriber count", "Status"]}
      createLabel="Create pricing plan"
      formFields={[
        { label: "Plan name", name: "name", required: true },
        { label: "Monthly price", name: "price", type: "number", required: true },
        { label: "Stripe price ID", name: "stripePriceId", required: true },
        { label: "Limits JSON", name: "limits", type: "textarea", required: true },
        { label: "Features", name: "features", type: "textarea" }
      ]}
      columns={["Plan", "Price", "Subscribers", "Limits", "Stripe price IDs", "Actions"]}
      rows={pricingPlans.map((plan) => [
        <span key="plan" className="font-semibold text-white">{plan.name}</span>,
        `${plan.price}/mo`,
        planCounts.get(plan.name.toUpperCase() as "FREE" | "STARTER" | "PRO" | "BUSINESS") ?? 0,
        plan.features.slice(0, 3).join(", "),
        plan.name === "Starter" ? "STRIPE_STARTER_PRICE_ID" : plan.name === "Pro" ? "STRIPE_PRO_PRICE_ID" : plan.name === "Business" ? "STRIPE_BUSINESS_PRICE_ID" : "No paid price",
        <AdminRowActions key="actions" label={plan.name} fields={[
          { label: "Plan name", name: "name", placeholder: plan.name, required: true },
          { label: "Stripe price ID", name: "stripePriceId", placeholder: `${plan.name.toUpperCase()}_PRICE_ID` },
          { label: "Message limit", name: "messageLimit", type: "number" },
          { label: "Plan features", name: "features", type: "textarea", placeholder: plan.features.join("\n") }
        ]} />
      ])}
    />
  );
}
