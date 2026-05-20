import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader({ title, text, actionHref, actionLabel }: { title: string; text?: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Categent</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
        {text ? <p className="mt-3 max-w-2xl text-slate-600">{text}</p> : null}
      </div>
      {actionHref && actionLabel ? <Button asChild><Link href={actionHref} className="no-underline">{actionLabel}<ArrowRight className="h-4 w-4" /></Link></Button> : null}
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, tone = "indigo" }: { label: string; value: string | number; icon: LucideIcon; tone?: "indigo" | "cyan" | "emerald" | "violet" }) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-600",
    cyan: "bg-cyan-50 text-cyan-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600"
  };
  return (
    <div className="rounded-lg border bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`flex h-10 w-10 items-center justify-center rounded-md ${tones[tone]}`}><Icon className="h-5 w-5" /></span>
      </div>
      <p className="mt-4 text-3xl font-black">{value}</p>
    </div>
  );
}

export function StatusBadge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "green" | "amber" | "red" | "blue" | "slate" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-red-50 text-red-700 ring-red-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200"
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>{children}</span>;
}

export function EmptyState({ title, text, actionHref, actionLabel }: { title: string; text: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="rounded-lg border border-dashed bg-white p-10 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">{text}</p>
      {actionHref && actionLabel ? <Button asChild className="mt-5"><Link href={actionHref} className="no-underline">{actionLabel}</Link></Button> : null}
    </div>
  );
}
