import Link from "next/link";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { dashboardNav } from "@/lib/categent/content";
import { getDefaultOrganization, isSuperAdmin, requireUser } from "@/lib/auth/access";
import { getAdminUrl } from "@/lib/utils/url";

export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const superAdmin = await isSuperAdmin(user.id);
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_44%,#f8fafc_100%)] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-slate-950 p-5 text-white shadow-[18px_0_60px_rgba(15,23,42,0.18)] lg:block">
        <Link href="/dashboard" className="flex items-center gap-2 no-underline">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 font-black shadow-glow">C</span>
          <span>
            <span className="block text-xl font-bold leading-none">Categent</span>
            <span className="text-[11px] text-cyan-200">AI Agent OS</span>
          </span>
        </Link>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workspace</p>
          <p className="mt-2 truncate font-semibold">{org?.name ?? "My organization"}</p>
          <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>
        </div>
        <nav className="mt-6 grid gap-1">
          {dashboardNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 no-underline transition hover:bg-white/[0.08] hover:text-white">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          {superAdmin ? <Link href={getAdminUrl("/admin").toString()} className="mt-3 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2.5 text-sm font-semibold text-cyan-100 no-underline">Super admin</Link> : null}
        </nav>
        <form action="/api/auth/logout" method="post" className="absolute bottom-5 left-5 right-5">
          <button className="w-full rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/[0.06]">Log out</button>
        </form>
      </aside>
      <main className="lg:pl-72">
        <Topbar orgName={org?.name ?? "Workspace"} />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:pt-8 lg:pb-8">{children}</div>
        <MobileDashboardNav />
      </main>
    </div>
  );
}

function Topbar({ orgName }: { orgName: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/82 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
          <span>{orgName}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-950">Dashboard</span>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white text-slate-600 lg:hidden"><Menu className="h-4 w-4" /></button>
        <div className="flex flex-1 items-center gap-3 md:max-w-md">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 text-sm text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <Search className="h-4 w-4" />
            Search agents, conversations, documents, tools
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white text-slate-600"><Bell className="h-4 w-4" /></button>
      </div>
    </header>
  );
}

function MobileDashboardNav() {
  const mobileItems = dashboardNav.slice(0, 5);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-18px_50px_rgba(15,23,42,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold text-slate-600 no-underline hover:bg-indigo-50 hover:text-indigo-700">
              <Icon className="h-4 w-4" />
              <span className="max-w-full truncate">{item.label.replace("Create Agent", "Create")}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
