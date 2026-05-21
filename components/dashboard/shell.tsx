import Link from "next/link";
import { Bell, ChevronRight, Search } from "lucide-react";
import { dashboardNav } from "@/lib/categent/content";
import { getDefaultOrganization, isSuperAdmin, requireUser } from "@/lib/auth/access";
import { getAdminUrl } from "@/lib/utils/url";

export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const superAdmin = await isSuperAdmin(user.id);
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-slate-950 p-5 text-white lg:block">
        <Link href="/dashboard" className="flex items-center gap-2 no-underline">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 font-black">C</span>
          <span className="text-xl font-bold">Categent</span>
        </Link>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workspace</p>
          <p className="mt-2 truncate font-semibold">{org?.name ?? "My organization"}</p>
          <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>
        </div>
        <nav className="mt-6 grid gap-1">
          {dashboardNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 no-underline transition hover:bg-white/[0.06] hover:text-white">
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
        <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
      </main>
    </div>
  );
}

function Topbar({ orgName }: { orgName: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
          <span>{orgName}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-950">Dashboard</span>
        </div>
        <div className="flex flex-1 items-center gap-3 md:max-w-md">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-md border bg-slate-50 px-3 text-sm text-slate-500">
            <Search className="h-4 w-4" />
            Search agents, conversations, tools
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white text-slate-600"><Bell className="h-4 w-4" /></button>
      </div>
    </header>
  );
}
