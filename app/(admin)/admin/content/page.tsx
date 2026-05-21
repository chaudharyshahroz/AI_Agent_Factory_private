export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
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
      searchPlaceholder="Search content by key, title, FAQ, announcement, footer, or flag"
      filters={["Type", "Status", "Feature flag", "Updated"]}
      createLabel="Create content block"
      formFields={[
        { label: "Key", name: "key", required: true },
        { label: "Title", name: "title", required: true },
        { label: "Status", name: "status", type: "select", options: ["active", "draft", "hidden"], required: true },
        { label: "Content JSON", name: "content", type: "textarea", required: true }
      ]}
      columns={["Key", "Title / Name", "Type", "Status", "Updated", "Actions"]}
      rows={[
        ...blocks.map((block) => [<span key="key" className="font-semibold text-white">{block.key}</span>, block.title, "Content", block.status, block.updatedAt.toLocaleDateString(), <AdminRowActions key="actions" label={block.key} fields={[{ label: "Title", name: "title", placeholder: block.title }, { label: "Status", name: "status", type: "select", options: ["active", "draft", "hidden"] }, { label: "Content JSON", name: "content", type: "textarea", placeholder: JSON.stringify(block.content, null, 2) }]} />]),
        ...flags.map((flag) => [<span key="key" className="font-semibold text-white">{flag.key}</span>, flag.name, "Feature flag", flag.enabled ? "Enabled" : "Disabled", flag.updatedAt.toLocaleDateString(), <AdminRowActions key="actions" label={flag.key} fields={[{ label: "Name", name: "name", placeholder: flag.name }, { label: "Enabled", name: "enabled", type: "select", options: ["Enabled", "Disabled"] }, { label: "Description", name: "description", type: "textarea", placeholder: flag.description ?? "" }]} />]),
        ...settings.map((setting) => [<span key="key" className="font-semibold text-white">{setting.key}</span>, setting.isSecret ? "Secret setting" : "JSON setting", "System setting", "System", setting.updatedAt.toLocaleDateString(), <AdminRowActions key="actions" label={setting.key} fields={[{ label: "Key", name: "key", placeholder: setting.key }, { label: "Value JSON", name: "value", type: "textarea", placeholder: JSON.stringify(setting.value, null, 2) }]} />])
      ]}
    />
  );
}
