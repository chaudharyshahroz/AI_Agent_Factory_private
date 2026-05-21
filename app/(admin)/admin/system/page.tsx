export const dynamic = "force-dynamic";

import { CheckCircle2, XCircle } from "lucide-react";
import { AdminPageHeader, AdminStatCard, AdminTable } from "@/components/admin/shell";
import { prisma } from "@/lib/db/prisma";
import { getRedis } from "@/lib/rate-limit/redis";

export default async function AdminSystemPage() {
  let dbReady = false;
  let redisReady = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbReady = true;
  } catch {
    dbReady = false;
  }
  try {
    await getRedis().ping();
    redisReady = true;
  } catch {
    redisReady = false;
  }
  const [processingDocs, failedDocs, pendingApprovals, recentUsage] = await Promise.all([
    prisma.document.count({ where: { status: "PROCESSING" } }),
    prisma.document.count({ where: { status: "FAILED" } }),
    prisma.humanApproval.count({ where: { status: "PENDING" } }),
    prisma.usageEvent.count()
  ]);
  const envChecks = [
    ["Database", dbReady],
    ["Redis", redisReady],
    ["OpenAI key configured", Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_key")],
    ["Stripe secret configured", Boolean(process.env.STRIPE_SECRET_KEY)],
    ["Webhook secret configured", Boolean(process.env.STRIPE_WEBHOOK_SECRET)],
    ["Initial super admin", Boolean(process.env.INITIAL_SUPER_ADMIN_EMAIL)],
    ["Redis URL configured", Boolean(process.env.REDIS_URL)]
  ] as const;
  return (
    <div>
      <AdminPageHeader title="System health" text="Operational readiness for database, Redis, OpenAI, Stripe, queues, and deployment configuration." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Database" value={dbReady ? "Ready" : "Down"} />
        <AdminStatCard label="Redis" value={redisReady ? "Ready" : "Needs check"} detail="Rate limits and BullMQ connection." />
        <AdminStatCard label="Environment" value={process.env.NODE_ENV ?? "unknown"} detail={process.env.APP_URL ?? "APP_URL missing"} />
        <AdminStatCard label="Processing docs" value={processingDocs} detail="File processing queue backlog signal." />
        <AdminStatCard label="Failed docs" value={failedDocs} detail="Worker failures needing review." />
        <AdminStatCard label="Pending approvals" value={pendingApprovals} detail={`${recentUsage} usage events recorded.`} />
      </div>
      <AdminTable
        columns={["Check", "Status", "Notes"]}
        rows={envChecks.map(([label, ready]) => [
          <span key="label" className="font-semibold text-white">{label}</span>,
          ready ? <span key="ok" className="inline-flex items-center gap-2 text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Ready</span> : <span key="bad" className="inline-flex items-center gap-2 text-amber-300"><XCircle className="h-4 w-4" /> Needs setup</span>,
          label === "Redis URL configured" ? "Rate limits and BullMQ use this connection." : "Safe to update in Dokploy environment."
        ])}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ["file-processing", processingDocs],
          ["embedding-generation", failedDocs],
          ["agent-test-run", pendingApprovals],
          ["usage-rollup", recentUsage]
        ].map(([name, value]) => (
          <div key={name} className="premium-card rounded-xl p-5">
            <p className="text-sm text-slate-400">{name}</p>
            <p className="mt-3 text-3xl font-black text-white">{value}</p>
            <p className="mt-2 text-xs text-slate-500">Queue stats placeholder backed by current database signals.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
