import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><Card className="w-full max-w-md"><h1 className="text-2xl font-semibold">Reset password</h1><p className="mt-2 text-sm text-muted-foreground">Email delivery is ready to connect through SMTP.</p><form className="mt-6 grid gap-4"><Input name="email" type="email" placeholder="Email" /><Button type="submit">Send reset link</Button></form></Card></main>;
}
