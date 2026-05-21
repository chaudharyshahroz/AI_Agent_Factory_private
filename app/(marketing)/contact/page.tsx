import { Building2, Mail, MessageSquare, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/marketing/sections";

export default function ContactPage() {
  return (
    <main className="categent-gradient min-h-screen px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Talk through your first category agent" text="Request a demo, describe your workflow, or tell us which category pack you want next." />
          <div className="mt-8 grid gap-3 text-sm text-slate-300">
            {[["Demo request", Building2], ["Use-case review", MessageSquare], ["Team rollout", UsersRound], ["Product questions", Mail]].map(([label, Icon]) => (
              <div key={label as string} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3">
                <Icon className="h-4 w-4 text-cyan-300" />
                {label as string}
              </div>
            ))}
          </div>
        </div>
        <Card className="border-white/10 bg-white/[0.06] text-white">
          <form action="/api/contact" method="post" className="grid gap-4">
            <Input name="name" placeholder="Name" className="h-12 border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
            <Input name="email" type="email" placeholder="Work email" required className="h-12 border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
            <Input name="company" placeholder="Company" className="h-12 border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
            <select name="categoryInterest" className="h-12 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white">
              <option>E-commerce</option>
              <option>Real estate</option>
              <option>Service business</option>
              <option>Other category</option>
            </select>
            <select name="companySize" className="h-12 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white">
              <option>1-5 people</option>
              <option>6-25 people</option>
              <option>26-100 people</option>
              <option>100+ people</option>
            </select>
            <Textarea name="message" required placeholder="Tell us what kind of agent you want to build" className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
            <Button type="submit" className="h-12 bg-gradient-to-r from-indigo-500 to-cyan-400">Request demo</Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
