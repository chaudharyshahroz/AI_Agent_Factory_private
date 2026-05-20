import { NextResponse } from "next/server";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { priceForPlan, stripe } from "@/lib/billing/stripe";

export async function POST(request: Request) {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  if (!org) return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  if (!stripe) return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  const form = await request.formData();
  const plan = String(form.get("plan") || "");
  const price = priceForPlan(plan);
  if (!price) return NextResponse.json({ error: "Plan is not configured" }, { status: 400 });
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.APP_URL}/dashboard/billing?success=1`,
    cancel_url: `${process.env.APP_URL}/dashboard/billing?canceled=1`,
    client_reference_id: org.id,
    customer_email: user.email
  });
  return NextResponse.redirect(session.url || "/dashboard/billing", 303);
}
