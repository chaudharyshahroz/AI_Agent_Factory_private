export const dynamic = "force-dynamic";

import { BadgeCheck } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pricingPlans } from "@/lib/categent/content";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function BillingPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const subscription = org ? await prisma.subscription.findFirst({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" } }) : null;
  const messages = org ? await prisma.usageEvent.aggregate({ where: { organizationId: org.id, type: "message_sent" }, _sum: { quantity: true } }) : null;
  return (
    <div>
      <PageHeader title="Billing and limits" text="Control plan access, message limits, deployments, knowledge usage, and Stripe customer portal access." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Current plan" value={subscription?.plan ?? "FREE"} icon={BadgeCheck} />
        <StatCard label="Messages used" value={messages?._sum.quantity ?? 0} icon={BadgeCheck} tone="cyan" />
        <StatCard label="Billing status" value={subscription?.status ?? "free"} icon={BadgeCheck} tone="emerald" />
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={`bg-white shadow-soft ${plan.featured ? "border-indigo-300 ring-2 ring-indigo-100" : ""}`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black">{plan.name}</h2>
              {subscription?.plan === plan.name.toUpperCase() ? <StatusBadge tone="green">Current</StatusBadge> : null}
            </div>
            <p className="mt-2 text-3xl font-black">{plan.price}<span className="text-sm font-medium text-slate-500">/mo</span></p>
            <p className="mt-2 min-h-12 text-sm text-slate-500">{plan.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
            </ul>
            {plan.name !== "Free" ? (
              <form action="/api/billing/checkout" method="post" className="mt-6">
                <input type="hidden" name="plan" value={plan.name.toUpperCase()} />
                <Button type="submit" className="w-full">{plan.cta}</Button>
              </form>
            ) : null}
          </Card>
        ))}
      </div>
      <Card className="mt-6 flex flex-col justify-between gap-4 bg-white md:flex-row md:items-center">
        <div>
          <h2 className="font-bold">Customer portal</h2>
          <p className="text-sm text-slate-500">Update payment method, invoices, and subscription details through Stripe.</p>
        </div>
        <form action="/api/billing/portal" method="post"><Button type="submit" variant="outline">Open portal</Button></form>
      </Card>
    </div>
  );
}
