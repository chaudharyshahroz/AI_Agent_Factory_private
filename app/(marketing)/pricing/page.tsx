import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  ["Starter", "1 agent", "1 category", "500 messages/month", "Website widget", "Basic knowledge upload"],
  ["Pro", "3 agents", "3 categories", "5,000 messages/month", "Human approvals", "Basic integrations", "Analytics"],
  ["Business", "10 agents", "Unlimited categories", "25,000 messages/month", "Advanced analytics", "Priority support"]
];

export default function PricingPage() {
  return <main className="mx-auto max-w-6xl px-4 py-16"><h1 className="text-4xl font-semibold">Pricing</h1><div className="mt-8 grid gap-4 md:grid-cols-3">{plans.map(([name, ...features]) => <Card key={name}><h2 className="text-xl font-semibold">{name}</h2><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Button asChild className="mt-6 w-full"><Link href="/signup" className="text-primary-foreground no-underline">Start {name}</Link></Button></Card>)}</div></main>;
}
