import Link from "next/link";
import { headers } from "next/headers";
import { LockKeyhole, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAdminHost } from "@/lib/utils/url";

export default async function LoginPage() {
  const host = (await headers()).get("host")?.split(":")[0].toLowerCase();
  const adminHost = getAdminHost().toLowerCase();
  const redirectTo = host === adminHost ? "/admin" : "/dashboard";

  return (
    <main className="categent-gradient flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-white/10 bg-white/[0.08] text-white shadow-glow">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-300/10 text-cyan-200"><LockKeyhole className="h-6 w-6" /></div>
        <h1 className="mt-5 text-3xl font-bold">Log in to Categent</h1>
        <p className="mt-2 text-sm text-slate-300">Monitor agents, approvals, knowledge, tests, and deployments.</p>
        <form action="/api/auth/login" method="post" className="mt-6 grid gap-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Input name="email" type="email" placeholder="Email" required className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
          <Input name="password" type="password" placeholder="Password" required className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="remember" className="rounded" /> Remember this device</label>
          <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-cyan-400"><Sparkles className="h-4 w-4" /> Log in</Button>
        </form>
        <p className="mt-4 text-sm text-slate-300">No account? <Link href="/signup" className="text-cyan-200">Sign up</Link></p>
        <Link className="mt-2 block text-sm text-slate-400" href="/forgot-password">Forgot password?</Link>
      </Card>
    </main>
  );
}
