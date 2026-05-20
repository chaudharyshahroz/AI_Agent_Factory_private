import Link from "next/link";
import { Bot, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <main className="categent-gradient grid min-h-screen items-center px-4 py-10 lg:grid-cols-[1fr_520px]">
      <section className="mx-auto max-w-3xl text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"><Sparkles className="h-4 w-4" /> Start with a category pack</div>
        <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">Create your first production-ready agent.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">Categent guides you from business category to blueprint, tests, approvals, tools, and deployable widget.</p>
        <div className="mt-8 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
          {[[Bot, "Agent builder"], [ShieldCheck, "Human approvals"], [CheckCircle2, "Knowledge citations"]].map(([Icon, label]) => <div key={label as string} className="rounded-md border border-white/10 bg-white/[0.04] p-4"><Icon className="mb-3 h-5 w-5 text-cyan-300" />{label as string}</div>)}
        </div>
      </section>
      <Card className="mx-auto w-full max-w-xl border-white/10 bg-white/[0.08] text-white shadow-glow">
        <h2 className="text-2xl font-bold">Create your Categent account</h2>
        <p className="mt-2 text-sm text-slate-300">Your organization will be created automatically and you will be guided into onboarding.</p>
        <form action="/api/auth/signup" method="post" className="mt-6 grid gap-4">
          <Input name="name" placeholder="Full name" required className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
          <Input name="organizationName" placeholder="Company or organization" required className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
          <select name="businessCategory" className="h-10 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white">
            <option value="e-commerce">E-commerce</option>
            <option value="real-estate">Real estate</option>
            <option value="service-business">Service business</option>
            <option value="other">Other</option>
          </select>
          <Input name="email" type="email" placeholder="Work email" required className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
          <Input name="password" type="password" placeholder="Password" minLength={8} required className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
          <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-cyan-400">Create account</Button>
        </form>
        <p className="mt-4 text-sm text-slate-300">Already have an account? <Link href="/login" className="text-cyan-200">Log in</Link></p>
      </Card>
    </main>
  );
}
