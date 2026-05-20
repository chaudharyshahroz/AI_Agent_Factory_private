import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <main className="categent-gradient flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md border-white/10 bg-white/[0.08] text-white">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">Email delivery is ready to connect through SMTP. This placeholder keeps the flow visible while production reset emails are configured.</p>
        <form className="mt-6 grid gap-4">
          <Input name="email" type="email" placeholder="Email" className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
          <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-cyan-400">Send reset link</Button>
        </form>
        <Button asChild className="mt-4 bg-white text-slate-950"><Link href="/login" className="no-underline">Back to login</Link></Button>
      </Card>
    </main>
  );
}
