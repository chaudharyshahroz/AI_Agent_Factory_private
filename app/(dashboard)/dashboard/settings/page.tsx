export const dynamic = "force-dynamic";

import { KeyRound, LockKeyhole, Palette, UsersRound } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function SettingsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const members = org ? await prisma.organizationMember.findMany({ where: { organizationId: org.id }, include: { user: true }, orderBy: { createdAt: "asc" } }) : [];
  const apiKeys = org ? await prisma.apiKey.findMany({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" }, take: 5 }) : [];
  return (
    <div>
      <PageHeader title="Settings" text="Configure organization identity, members, roles, API access, security defaults, notifications, and widget branding." />
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Members" value={members.length} icon={UsersRound} />
        <StatCard label="API keys" value={apiKeys.length} icon={KeyRound} tone="cyan" />
        <StatCard label="Security" value="On" icon={LockKeyhole} tone="emerald" />
        <StatCard label="Branding" value="Default" icon={Palette} tone="violet" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="bg-white shadow-soft">
          <h2 className="text-xl font-black">Organization</h2>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-semibold">Organization name<Input defaultValue={org?.name ?? ""} className="mt-2" /></label>
            <label className="text-sm font-semibold">Default timezone<Input defaultValue="UTC" className="mt-2" /></label>
            <Button type="button" className="w-fit">Save organization</Button>
          </div>
        </Card>
        <Card className="bg-white shadow-soft">
          <h2 className="text-xl font-black">Members and roles</h2>
          <div className="mt-5 grid gap-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-semibold">{member.user.email}</p>
                  <p className="text-xs text-slate-500">Joined {member.createdAt.toLocaleDateString()}</p>
                </div>
                <StatusBadge>{member.role}</StatusBadge>
              </div>
            ))}
            <Button type="button" variant="outline" className="w-fit">Invite member placeholder</Button>
          </div>
        </Card>
        <Card className="bg-white shadow-soft">
          <h2 className="text-xl font-black">API keys</h2>
          <p className="mt-2 text-sm text-slate-500">Keys are masked. New key generation is staged for the next admin release.</p>
          <div className="mt-5 grid gap-3">
            {apiKeys.length ? apiKeys.map((key) => (
              <div key={key.id} className="rounded-md border p-3">
                <p className="font-semibold">{key.name}</p>
                <p className="text-xs text-slate-500">{key.prefix}•••••••• · {key.scopes.join(", ") || "default"}</p>
              </div>
            )) : <p className="rounded-md border border-dashed p-4 text-sm text-slate-500">No API keys created yet.</p>}
          </div>
        </Card>
        <Card className="bg-white shadow-soft">
          <h2 className="text-xl font-black">Security and branding</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            {["Require approval for high-risk tools", "Use domain allowlist for widgets", "Keep integration credentials encrypted", "Show powered by Categent in widgets"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-md border p-3">
                <span>{item}</span>
                <StatusBadge tone="green">Enabled</StatusBadge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
