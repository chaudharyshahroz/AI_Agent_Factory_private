import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return <main className="mx-auto max-w-3xl px-4 py-16"><h1 className="text-4xl font-semibold">Contact</h1><Card className="mt-8"><form className="grid gap-4"><Input name="email" type="email" placeholder="Work email" /><Textarea name="message" placeholder="Tell us what kind of agent you want to build" /><Button type="submit">Join waitlist</Button></form></Card></main>;
}
