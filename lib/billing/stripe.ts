import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export function priceForPlan(plan: string) {
  const map: Record<string, string | undefined> = {
    STARTER: process.env.STRIPE_STARTER_PRICE_ID,
    PRO: process.env.STRIPE_PRO_PRICE_ID,
    BUSINESS: process.env.STRIPE_BUSINESS_PRICE_ID
  };
  return map[plan];
}
