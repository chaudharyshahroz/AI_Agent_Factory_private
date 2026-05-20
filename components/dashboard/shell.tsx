import Link from "next/link";
import { requireUser } from "@/lib/auth/access";

const links = [
  ["/dashboard", "Overview"],
  ["/dashboard/create-agent", "Create Agent"],
  ["/dashboard/agents", "Agents"],
  ["/dashboard/approvals", "Approvals"],
  ["/dashboard/billing", "Billing"],
  ["/dashboard/settings", "Settings"]
];

export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-6 md:block">
        <Link href="/dashboard" className="text-lg font-semibold text-foreground no-underline">AgentFactory AI</Link>
        <nav className="mt-8 grid gap-2">
          {links.map(([href, label]) => <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-slate-700 no-underline hover:bg-slate-100">{label}</Link>)}
        </nav>
        <form action="/api/auth/logout" method="post" className="absolute bottom-6">
          <button className="text-sm text-slate-500">Log out {user.email}</button>
        </form>
      </aside>
      <main className="md:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
