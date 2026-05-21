import Link from "next/link";
import { ChevronRight, Search, ShieldCheck } from "lucide-react";
import { adminNav } from "@/lib/categent/content";
import { requireSuperAdmin } from "@/lib/auth/access";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await requireSuperAdmin();
  return (
    <div className="mesh-band min-h-screen text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-black/45 p-5 shadow-[18px_0_70px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:block">
        <Link href="/admin" className="flex items-center gap-2 no-underline">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 font-black shadow-glow">C</span>
          <span>
            <span className="block text-xl font-bold">Categent</span>
            <span className="block text-xs text-cyan-200">Super admin</span>
          </span>
        </Link>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Operator</p>
          <p className="mt-2 truncate font-semibold">{user.name ?? "Super admin"}</p>
          <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>
        </div>
        <nav className="mt-6 grid gap-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 no-underline transition hover:bg-white/[0.08] hover:text-white">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/dashboard" className="absolute bottom-5 left-5 right-5 rounded-md border border-white/10 px-3 py-2 text-center text-sm text-slate-300 no-underline hover:bg-white/[0.06]">
          Back to workspace
        </Link>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/82 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div className="hidden items-center gap-2 text-sm text-slate-400 md:flex">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              <span>Platform control</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-white">Admin</span>
            </div>
            <div className="flex flex-1 items-center gap-3 md:max-w-md">
              <div className="flex h-10 flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 text-sm text-slate-500">
                <Search className="h-4 w-4" />
                Search users, orgs, agents, logs
              </div>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
      </main>
    </div>
  );
}

export function AdminPageHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Super admin</p>
      <h1 className="mt-2 max-w-4xl text-3xl font-black tracking-tight md:text-5xl"><span className="text-gradient">{title}</span></h1>
      <p className="mt-3 max-w-3xl text-slate-400">{text}</p>
    </div>
  );
}

export function AdminStatCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="premium-card rounded-xl p-5 shadow-glow">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
      {detail ? <p className="mt-2 text-xs text-slate-500">{detail}</p> : null}
    </div>
  );
}

export function AdminTable({ columns, rows }: { columns: string[]; rows: Array<Array<React.ReactNode>> }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] shadow-glow">
      <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.055] text-xs uppercase tracking-[0.12em] text-slate-400">
          <tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-slate-300">
          {rows.length ? rows.map((row, index) => (
            <tr key={index} className="transition hover:bg-cyan-300/[0.045]">
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 align-top">{cell}</td>)}
            </tr>
          )) : (
            <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500"><span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/[0.06] text-cyan-200"><ShieldCheck className="h-5 w-5" /></span>No records yet.</td></tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
