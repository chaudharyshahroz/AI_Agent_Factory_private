import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><Card className="w-full max-w-md"><h1 className="text-2xl font-semibold">Log in</h1><form action="/api/auth/login" method="post" className="mt-6 grid gap-4"><Input name="email" type="email" placeholder="Email" required /><Input name="password" type="password" placeholder="Password" required /><Button type="submit">Log in</Button></form><p className="mt-4 text-sm text-muted-foreground">No account? <Link href="/signup">Sign up</Link></p><Link className="mt-2 block text-sm" href="/forgot-password">Forgot password?</Link></Card></main>;
}
