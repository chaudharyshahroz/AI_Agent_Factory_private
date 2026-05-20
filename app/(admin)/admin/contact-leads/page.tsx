export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { prisma } from "@/lib/db/prisma";

export default async function AdminContactLeadsPage() {
  const leads = await prisma.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return (
    <AdminResourcePage
      title="Contact leads"
      text="Review demo requests and category-interest submissions from the public website."
      stats={[{ label: "Contact leads", value: leads.length }, { label: "New", value: leads.filter((lead) => lead.status === "new").length }, { label: "Categories", value: new Set(leads.map((lead) => lead.categoryInterest).filter(Boolean)).size }]}
      columns={["Name", "Email", "Company", "Category", "Size", "Message", "Created"]}
      rows={leads.map((lead) => [
        <span key="name" className="font-semibold text-white">{lead.name}</span>,
        lead.email,
        lead.company ?? "N/A",
        lead.categoryInterest ?? "N/A",
        lead.companySize ?? "N/A",
        <span key="message" className="line-clamp-2">{lead.message}</span>,
        lead.createdAt.toLocaleDateString()
      ])}
    />
  );
}
