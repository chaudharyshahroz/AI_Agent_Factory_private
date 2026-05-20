import { NextResponse } from "next/server";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { stripe } from "@/lib/billing/stripe";

export async function POST() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  if (!org || !stripe) return NextResponse.json({ error: "Billing is not configured" }, { status: 503 });
  const sub = await prisma.subscription.findFirst({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" } });
  if (!sub?.stripeCustomerId) return NextResponse.json({ error: "No Stripe customer found" }, { status: 400 });
  const session = await stripe.billingPortal.sessions.create({ customer: sub.stripeCustomerId, return_url: `${process.env.APP_URL}/dashboard/billing` });
  return NextResponse.redirect(session.url, 303);
}
