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
      <PageHeader title="Knowledge Studio" text="Teach your agents what your business knows. Upload source files, monitor embedding status, inspect chunks, and verify citation-ready knowledge." />
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Documents" value={documents.length} icon={Database} />
        <StatCard label="Ready" value={documents.filter((doc) => doc.status === "READY").length} icon={Database} tone="emerald" />
        <StatCard label="Processing" value={documents.filter((doc) => doc.status === "PROCESSING").length} icon={Database} tone="cyan" />
        <StatCard label="Chunks" value={documents.reduce((sum, doc) => sum + doc._count.chunks, 0)} icon={Database} tone="violet" />
      </div>
      <Card className="overflow-hidden bg-white p-0">
        {documents.length ? (
          <>
            <div className="grid gap-3 p-3 md:hidden">
              {documents.map((document) => (
                <div key={document.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">{document.fileName}</p>
                      <p className="mt-1 text-xs text-slate-500">{document.agent.name} · {Math.round(document.sizeBytes / 1024)} KB</p>
                    </div>
                    <StatusBadge tone={document.status === "READY" ? "green" : document.status === "FAILED" ? "red" : "blue"}>{document.status}</StatusBadge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Chunks</p>
                      <p className="mt-1 font-black text-slate-950">{document._count.chunks}</p>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Uploaded</p>
                      <p className="mt-1 font-black text-slate-950">{document.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
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
            </div>
          </>
        ) : null}
        {documents.length === 0 ? <div className="p-8 text-center"><h2 className="text-xl font-black">Teach your agent what your business knows.</h2><p className="mt-2 text-sm text-slate-500">Upload policies, catalogs, listings, FAQs, and service docs from an agent knowledge page.</p></div> : null}
      </Card>
    </div>
  );
}
