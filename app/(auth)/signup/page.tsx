import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><Card className="w-full max-w-md"><h1 className="text-2xl font-semibold">Create your account</h1><form action="/api/auth/signup" method="post" className="mt-6 grid gap-4"><Input name="name" placeholder="Name" /><Input name="email" type="email" placeholder="Email" required /><Input name="password" type="password" placeholder="Password" minLength={8} required /><Button type="submit">Create account</Button></form><p className="mt-4 text-sm text-muted-foreground">Already have an account? <Link href="/login">Log in</Link></p></Card></main>;
}
