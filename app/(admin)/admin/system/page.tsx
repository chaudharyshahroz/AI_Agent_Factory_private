export const dynamic = "force-dynamic";

import { CheckCircle2, XCircle } from "lucide-react";
import { AdminPageHeader, AdminStatCard, AdminTable } from "@/components/admin/shell";
import { prisma } from "@/lib/db/prisma";

export default async function AdminSystemPage() {
  let dbReady = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbReady = true;
  } catch {
    dbReady = false;
  }
  const envChecks = [
    ["Database", dbReady],
    ["OpenAI key configured", Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_key")],
    ["Stripe secret configured", Boolean(process.env.STRIPE_SECRET_KEY)],
    ["Webhook secret configured", Boolean(process.env.STRIPE_WEBHOOK_SECRET)],
    ["Initial super admin", Boolean(process.env.INITIAL_SUPER_ADMIN_EMAIL)],
    ["Redis URL configured", Boolean(process.env.REDIS_URL)]
  ] as const;
  const queueEvents = await prisma.usageEvent.count({ where: { type: { contains: "queue" } } });
  return (
    <div>
      <AdminPageHeader title="System health" text="Operational readiness for database, Redis, OpenAI, Stripe, queues, and deployment configuration." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Database" value={dbReady ? "Ready" : "Down"} />
        <AdminStatCard label="Queue signals" value={queueEvents} detail="Worker status is checked through Dokploy logs in this MVP." />
        <AdminStatCard label="Environment" value={process.env.NODE_ENV ?? "unknown"} detail={process.env.APP_URL ?? "APP_URL missing"} />
      </div>
      <AdminTable
        columns={["Check", "Status", "Notes"]}
        rows={envChecks.map(([label, ready]) => [
          <span key="label" className="font-semibold text-white">{label}</span>,
          ready ? <span key="ok" className="inline-flex items-center gap-2 text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Ready</span> : <span key="bad" className="inline-flex items-center gap-2 text-amber-300"><XCircle className="h-4 w-4" /> Needs setup</span>,
          label === "Redis URL configured" ? "Rate limits and BullMQ use this connection." : "Safe to update in Dokploy environment."
        ])}
      />
    </div>
  );
}
