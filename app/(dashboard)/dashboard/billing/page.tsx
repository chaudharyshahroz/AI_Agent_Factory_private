import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  return <div><h1 className="text-3xl font-semibold">Billing</h1><div className="mt-8 grid gap-4 md:grid-cols-3">{["STARTER", "PRO", "BUSINESS"].map((plan) => <Card key={plan}><h2 className="font-semibold">{plan}</h2><form action="/api/billing/checkout" method="post" className="mt-6"><input type="hidden" name="plan" value={plan} /><Button type="submit">Checkout</Button></form></Card>)}</div><Card className="mt-6"><form action="/api/billing/portal" method="post"><Button type="submit">Open customer portal</Button></form></Card></div>;
}
