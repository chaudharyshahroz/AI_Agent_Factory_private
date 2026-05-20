export const dynamic = "force-dynamic";

import { Database } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui/card";
import { getDefaultOrganization, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function KnowledgePage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  const documents = org ? await prisma.document.findMany({ where: { organizationId: org.id }, orderBy: { createdAt: "desc" }, take: 80, include: { agent: true, _count: { select: { chunks: true } } } }) : [];
  return (
    <div>
      <PageHeader title="Knowledge" text="Manage source files across agents, monitor processing, and verify citation-ready chunks." />
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Documents" value={documents.length} icon={Database} />
        <StatCard label="Ready" value={documents.filter((doc) => doc.status === "READY").length} icon={Database} tone="emerald" />
        <StatCard label="Processing" value={documents.filter((doc) => doc.status === "PROCESSING").length} icon={Database} tone="cyan" />
        <StatCard label="Chunks" value={documents.reduce((sum, doc) => sum + doc._count.chunks, 0)} icon={Database} tone="violet" />
      </div>
      <Card className="overflow-hidden bg-white p-0">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>{["Document", "Agent", "Status", "Chunks", "Size", "Uploaded"].map((column) => <th key={column} className="px-4 py-3">{column}</th>)}</tr>
          </thead>
          <tbody className="divide-y">
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="px-4 py-3 font-semibold">{document.fileName}</td>
                <td className="px-4 py-3">{document.agent.name}</td>
                <td className="px-4 py-3"><StatusBadge tone={document.status === "READY" ? "green" : document.status === "FAILED" ? "red" : "blue"}>{document.status}</StatusBadge></td>
                <td className="px-4 py-3">{document._count.chunks}</td>
                <td className="px-4 py-3">{Math.round(document.sizeBytes / 1024)} KB</td>
                <td className="px-4 py-3">{document.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
