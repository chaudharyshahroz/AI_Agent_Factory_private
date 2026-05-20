import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { stripe } from "@/lib/billing/stripe";

export async function POST(request: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.client_reference_id) {
      await prisma.subscription.upsert({
        where: { id: session.client_reference_id },
        update: {},
        create: { organizationId: session.client_reference_id, plan: "STARTER", status: "active", stripeCustomerId: String(session.customer || ""), stripeSubscriptionId: String(session.subscription || "") }
      }).catch(async () => {
        await prisma.subscription.updateMany({ where: { organizationId: session.client_reference_id || "" }, data: { status: "active", stripeCustomerId: String(session.customer || ""), stripeSubscriptionId: String(session.subscription || "") } });
      });
    }
  }
  if (event.type.startsWith("customer.subscription.")) {
    const subscription = event.data.object;
    await prisma.subscription.updateMany({ where: { stripeSubscriptionId: subscription.id }, data: { status: subscription.status } });
  }
  return NextResponse.json({ received: true });
}
