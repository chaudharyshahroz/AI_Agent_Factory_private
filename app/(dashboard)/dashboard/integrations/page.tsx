export const dynamic = "force-dynamic";

import { AppWindow } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui/card";
import { integrations } from "@/lib/categent/content";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function IntegrationsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const connected = org ? await prisma.integration.findMany({ where: { organizationId: org.id } }) : [];
  const connectedProviders = new Set(connected.map((integration) => integration.provider.toLowerCase()));
  return (
    <div>
      <PageHeader title="Integrations" text="Connect knowledge, commerce, CRM, calendar, communication, and automation systems as Categent grows." />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Catalog items" value={integrations.length} icon={AppWindow} />
        <StatCard label="Connected" value={connected.length} icon={AppWindow} tone="emerald" />
        <StatCard label="Available now" value={integrations.filter((item) => item.status === "Available").length} icon={AppWindow} tone="cyan" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {integrations.map((integration) => {
          const isConnected = connectedProviders.has(integration.name.toLowerCase());
          return (
            <Card key={`${integration.group}-${integration.name}`} className="bg-white shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-950 font-black text-white">{integration.name.slice(0, 2).toUpperCase()}</div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold">{integration.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{integration.group}</p>
                </div>
                <StatusBadge tone={isConnected ? "green" : integration.status === "Available" ? "blue" : "slate"}>{isConnected ? "Connected" : integration.status}</StatusBadge>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">{integration.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
