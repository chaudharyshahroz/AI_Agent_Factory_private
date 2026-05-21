import Link from "next/link";
import { ChevronRight, Database, Filter, Loader2, Menu, Search, ShieldCheck } from "lucide-react";
import { adminNav } from "@/lib/categent/content";
import { requireSuperAdmin } from "@/lib/auth/access";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await requireSuperAdmin();
  return (
    <div className="mesh-band min-h-screen text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-black/50 p-5 shadow-[18px_0_70px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:block">
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
        <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-100">Platform health</span>
            <span className="font-semibold text-emerald-200">Protected</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-1.5 w-[88%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" /></div>
        </div>
        <nav className="mt-6 grid gap-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 no-underline transition hover:bg-white/[0.08] hover:text-white">
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
            <button className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-slate-300 lg:hidden"><Menu className="h-4 w-4" /></button>
            <div className="flex flex-1 items-center gap-3 md:max-w-md">
              <div className="flex h-10 flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 text-sm text-slate-500">
                <Search className="h-4 w-4" />
                Search users, orgs, agents, logs
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              SUPER_ADMIN
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:pt-8 lg:pb-8">{children}</div>
        <MobileAdminNav />
      </main>
    </div>
  );
}

function MobileAdminNav() {
  const mobileItems = adminNav.slice(0, 5);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-2 py-2 shadow-[0_-18px_50px_rgba(0,0,0,0.28)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold text-slate-400 no-underline hover:bg-white/[0.08] hover:text-white">
              <Icon className="h-4 w-4" />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AdminPageHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-glow md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Super admin control center</p>
      <h1 className="mt-2 max-w-4xl text-3xl font-black tracking-tight md:text-5xl"><span className="text-gradient">{title}</span></h1>
      <p className="mt-3 max-w-3xl text-slate-400">{text}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100 ring-1 ring-cyan-300/20">Search</span>
        <span className="rounded-full bg-violet-300/10 px-3 py-1 text-violet-100 ring-1 ring-violet-300/20">Filters</span>
        <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-emerald-100 ring-1 ring-emerald-300/20">Audit context</span>
      </div>
    </div>
  );
}

export function AdminStatCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="premium-card rounded-2xl p-5 shadow-glow transition hover:-translate-y-0.5 hover:border-cyan-300/35">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-400">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20"><Database className="h-4 w-4" /></span>
      </div>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      {detail ? <p className="mt-2 text-xs text-slate-500">{detail}</p> : null}
    </div>
  );
}

export function AdminTable({ columns, rows }: { columns: string[]; rows: Array<Array<React.ReactNode>> }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-glow">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.035] p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-h-11 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-slate-500">
          <Search className="h-4 w-4 text-cyan-300" />
          Search this table
        </div>
        <div className="flex flex-wrap gap-2">
          {["Status", "Date", "Owner"].map((filter) => (
            <span key={filter} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-slate-300">
              <Filter className="h-3.5 w-3.5 text-cyan-300" />
              {filter}
            </span>
          ))}
          <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 text-xs font-semibold text-cyan-100">
            <Loader2 className="h-3.5 w-3.5" />
            Loading state ready
          </span>
        </div>
      </div>
      <div className="grid gap-3 p-3 md:hidden">
        {rows.length ? rows.map((row, index) => (
          <div key={index} className="rounded-xl border border-white/10 bg-slate-950/55 p-4">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="border-b border-white/10 py-3 last:border-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{columns[cellIndex]}</p>
                <div className="mt-1 text-sm text-slate-200">{cell}</div>
              </div>
            ))}
          </div>
        )) : (
          <div className="px-4 py-12 text-center text-slate-500"><span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/[0.06] text-cyan-200"><ShieldCheck className="h-5 w-5" /></span>No matching records yet. Adjust filters or add a new item.</div>
        )}
      </div>
      <div className="hidden overflow-x-auto md:block">
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
            <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500"><span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/[0.06] text-cyan-200"><ShieldCheck className="h-5 w-5" /></span>No matching records yet. Adjust filters or add a new item.</td></tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
