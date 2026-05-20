export const dynamic = "force-dynamic";

import { Database, FileText, Search, UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export default async function KnowledgePage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, agentId);
  const docs = await prisma.document.findMany({ where: { agentId: agent.id }, include: { _count: { select: { chunks: true } } }, orderBy: { createdAt: "desc" } });
  return (
    <div>
      <PageHeader title="Knowledge manager" text="Upload, process, embed, search, cite, reprocess, and remove source knowledge for this agent." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1fr]">
        <Card className="bg-white">
          <div className="rounded-lg border border-dashed border-indigo-300 bg-indigo-50 p-8 text-center">
            <UploadCloud className="mx-auto h-10 w-10 text-indigo-600" />
            <h2 className="mt-4 text-xl font-bold">Upload knowledge</h2>
            <p className="mt-2 text-sm text-slate-500">PDF, DOCX, TXT, MD, and CSV files. Documents are chunked, embedded, and cited.</p>
            <form action="/api/knowledge/upload" method="post" encType="multipart/form-data" className="mt-5 grid gap-3">
              <input type="hidden" name="agentId" value={agent.id} />
              <input type="file" name="file" required className="rounded-md border bg-white p-2 text-sm" />
              <Button type="submit">Upload document</Button>
            </form>
          </div>
        </Card>
        <Card className="bg-white">
          <h2 className="flex items-center gap-2 text-xl font-bold"><Search className="h-5 w-5" /> Search test</h2>
          <div className="mt-4 flex gap-3"><Input placeholder="Search uploaded knowledge for a citation preview" /><Button type="button">Search</Button></div>
          <p className="mt-3 text-sm text-slate-500">Search API is available through `/api/knowledge/search`; this UI is ready for wired previews.</p>
        </Card>
      </div>
      <div className="mt-6 grid gap-3">
        {docs.map((doc) => <Card key={doc.id} className="bg-white"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-indigo-600" /><div><p className="font-semibold">{doc.fileName}</p><p className="text-sm text-slate-500">{doc.sizeBytes} bytes · {doc._count.chunks} chunks</p></div></div><StatusBadge tone={doc.status === "READY" ? "green" : doc.status === "FAILED" ? "red" : "amber"}>{doc.status}</StatusBadge></div></Card>)}
        {docs.length === 0 ? <Card className="bg-white text-center"><Database className="mx-auto h-8 w-8 text-slate-400" /><p className="mt-3 text-sm text-slate-500">No knowledge documents uploaded yet.</p></Card> : null}
      </div>
    </div>
  );
}
