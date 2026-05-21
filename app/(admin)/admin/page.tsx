export const dynamic = "force-dynamic";

import { Activity, AlertTriangle, Clock, CreditCard, Database, ShieldCheck, Zap } from "lucide-react";
import { AdminPageHeader, AdminStatCard, AdminTable } from "@/components/admin/shell";
import { MessageAreaChart, ToolBarChart } from "@/components/dashboard/charts";
import { prisma } from "@/lib/db/prisma";

export default async function AdminOverviewPage() {
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const [
    users,
    organizations,
    agents,
    deployedAgents,
    conversations,
    messages,
    subscriptions,
    approvals,
    failedDocs,
    recentUsers,
    recentAudits,
    recentSubscriptions,
    contactLeads
  ] = await Promise.all([
    prisma.user.count(),
    prisma.organization.count(),
    prisma.agent.count(),
    prisma.agent.count({ where: { status: "DEPLOYED" } }),
    prisma.conversation.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.message.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.subscription.count({ where: { status: { not: "free" } } }),
    prisma.humanApproval.count({ where: { status: "PENDING" } }),
    prisma.document.count({ where: { status: "FAILED" } }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { memberships: { include: { organization: true } } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { organization: true } }),
    prisma.subscription.findMany({ orderBy: { updatedAt: "desc" }, take: 6, include: { organization: true } }),
    prisma.contactLead.count({ where: { status: "new" } })
  ]);

  const stats = [
    { label: "Platform health", value: failedDocs === 0 ? "Healthy" : "Review", detail: `${failedDocs} failed jobs` },
    { label: "Users", value: users, detail: "All registered accounts" },
    { label: "Organizations", value: organizations, detail: "Workspaces managed" },
    { label: "Agents", value: agents, detail: `${deployedAgents} deployed` },
    { label: "Messages", value: messages, detail: "This month" },
    { label: "Conversations", value: conversations, detail: "This month" },
    { label: "Subscriptions", value: subscriptions, detail: "Paid or active billing states" },
    { label: "Pending approvals", value: approvals, detail: "Need owner/admin review" }
  ];

  const health = [
    ["Database", "Ready", "Prisma reads are available"],
    ["Redis", process.env.REDIS_URL ? "Configured" : "Needs setup", "Rate limits and queues"],
    ["OpenAI", process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_key" ? "Configured" : "Needs key", "Blueprints, chat, embeddings"],
    ["Stripe", process.env.STRIPE_SECRET_KEY ? "Configured" : "Needs key", "Checkout, portal, webhooks"],
    ["Worker", failedDocs === 0 ? "Stable" : "Review", `${failedDocs} failed document jobs`],
    ["Contact leads", contactLeads ? `${contactLeads} new` : "Clear", "Demo and contact submissions"]
  ];

  return (
    <div>
      <AdminPageHeader title="Platform command center" text="A full operating cockpit for Categent: platform health, users, organizations, agents, billing signals, approvals, failed jobs, recent signups, recent activity, and growth charts." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <AdminStatCard key={stat.label} {...stat} />)}
      </div>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="premium-card rounded-2xl p-5">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Activity</p>
              <h2 className="mt-1 text-2xl font-black text-white">Messages and conversations</h2>
            </div>
            <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/20">This month</span>
          </div>
          <MessageAreaChart />
        </div>
        <div className="premium-card rounded-2xl p-5">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Control signals</p>
              <h2 className="mt-1 text-2xl font-black text-white">Tools and approvals</h2>
            </div>
            <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-300/20">Governed actions</span>
          </div>
          <ToolBarChart />
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="premium-card rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Platform health</p>
              <h2 className="mt-1 text-2xl font-black text-white">System readiness</h2>
            </div>
            <ShieldCheck className="h-8 w-8 text-cyan-300" />
          </div>
          <div className="mt-5 grid gap-3">
            {health.map(([label, status, detail]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-white">{label}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${status.includes("Need") || status === "Review" ? "bg-amber-300/10 text-amber-200 ring-amber-300/20" : "bg-emerald-300/10 text-emerald-200 ring-emerald-300/20"}`}>{status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <AdminPulseCard icon={Database} title="Data layer" value={`${organizations} orgs`} text="Tenant records, document chunks, conversations, messages, and usage events are isolated by organization." />
          <AdminPulseCard icon={CreditCard} title="Billing layer" value={`${subscriptions} subscriptions`} text="Plan metadata, Stripe customer IDs, subscription status, and webhook updates are managed server-side." />
          <AdminPulseCard icon={Zap} title="Queue layer" value={`${failedDocs} failed jobs`} text="Document extraction, embeddings, test runs, and usage rollups are worker-backed for production deployment." />
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <div className="premium-card rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-white">Recent signups</h2>
            <Clock className="h-5 w-5 text-cyan-300" />
          </div>
          <AdminTable
            columns={["User", "Organization", "Role", "Joined"]}
            rows={recentUsers.map((user) => [
              <span key="u" className="font-semibold text-white">{user.email}</span>,
              user.memberships[0]?.organization.name ?? "No organization yet",
              <span key="role" className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 ring-1 ring-cyan-300/20">{user.memberships[0]?.role ?? "Pending"}</span>,
              user.createdAt.toLocaleDateString()
            ])}
          />
        </div>
        <div className="premium-card rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-white">Recent activity</h2>
            <Activity className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="grid gap-3">
            {recentAudits.length ? recentAudits.map((log) => (
              <div key={log.id} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{log.action}</p>
                    <p className="mt-1 text-xs text-slate-500">{log.organization.name} · {log.createdAt.toLocaleString()}</p>
                  </div>
                  <span className="rounded-full bg-white/[0.06] px-2 py-1 text-xs text-slate-300 ring-1 ring-white/10">{log.targetType ?? "event"}</span>
                </div>
              </div>
            )) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.035] p-6 text-center text-sm text-slate-500">No audit events yet. Platform activity will appear here after users create agents, upload knowledge, and deploy widgets.</div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1fr]">
        <div className="premium-card rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-white">Subscriptions</h2>
            <CreditCard className="h-5 w-5 text-cyan-300" />
          </div>
          <AdminTable
            columns={["Organization", "Plan", "Status", "Updated"]}
            rows={recentSubscriptions.map((subscription) => [
              <span key="org" className="font-semibold text-white">{subscription.organization.name}</span>,
              <span key="plan" className="rounded-full bg-indigo-300/10 px-2 py-1 text-xs text-indigo-100 ring-1 ring-indigo-300/20">{subscription.plan}</span>,
              subscription.status,
              subscription.updatedAt.toLocaleDateString()
            ])}
          />
        </div>
        <div className="premium-card rounded-2xl p-5">
          <div className="mb-5 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-300" />
            <h2 className="text-xl font-black text-white">Operations watchlist</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Failed jobs", failedDocs, "Review worker logs and failed documents."],
              ["Pending approvals", approvals, "Risky tool requests waiting for human review."],
              ["New contact leads", contactLeads, "Demo or contact submissions needing follow-up."]
            ].map(([label, value, text]) => (
              <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-sm text-slate-400">{label as string}</p>
                <p className="mt-3 text-3xl font-black text-white">{value as number}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{text as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminPulseCard({ icon: Icon, title, value, text }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string; text: string }) {
  return (
    <div className="premium-card rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-black text-white">{value}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20"><Icon className="h-5 w-5" /></span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}
