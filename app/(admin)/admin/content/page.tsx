export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminContentPage() {
  const [blocks, flags, settings] = await Promise.all([
    prisma.adminContentBlock.findMany({ orderBy: { key: "asc" } }),
    prisma.featureFlag.findMany({ orderBy: { key: "asc" } }),
    prisma.systemSetting.findMany({ orderBy: { key: "asc" }, take: 20 })
  ]);
  return (
    <AdminResourcePage
      title="Content controls"
      text="CMS-style controls for homepage copy, announcement text, feature flags, FAQs, pricing copy, and system defaults."
      stats={[{ label: "Content blocks", value: blocks.length }, { label: "Feature flags", value: flags.length }, { label: "Settings", value: settings.length }]}
      columns={["Key", "Title / Name", "Status", "Updated"]}
      rows={[
        ...blocks.map((block) => [<span key="key" className="font-semibold text-white">{block.key}</span>, block.title, block.status, block.updatedAt.toLocaleDateString()]),
        ...flags.map((flag) => [<span key="key" className="font-semibold text-white">{flag.key}</span>, flag.name, flag.enabled ? "Enabled" : "Disabled", flag.updatedAt.toLocaleDateString()]),
        ...settings.map((setting) => [<span key="key" className="font-semibold text-white">{setting.key}</span>, setting.isSecret ? "Secret setting" : "JSON setting", "System", setting.updatedAt.toLocaleDateString()])
      ]}
    />
  );
}
