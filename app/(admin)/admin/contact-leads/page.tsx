export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminContactLeadsPage() {
  const leads = await prisma.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return (
    <AdminResourcePage
      title="Contact leads"
      text="Review demo requests and category-interest submissions from the public website."
      stats={[{ label: "Contact leads", value: leads.length }, { label: "New", value: leads.filter((lead) => lead.status === "new").length }, { label: "Categories", value: new Set(leads.map((lead) => lead.categoryInterest).filter(Boolean)).size }]}
      searchPlaceholder="Search contact leads by email, company, category interest, status, or note"
      filters={["Status", "Category", "Company size", "Created"]}
      createLabel="Add contact lead"
      formFields={[
        { label: "Name", name: "name", required: true },
        { label: "Email", name: "email", type: "email", required: true },
        { label: "Category interest", name: "categoryInterest", type: "select", options: ["E-commerce", "Real estate", "Service business", "Other"] },
        { label: "Notes", name: "notes", type: "textarea" }
      ]}
      columns={["Name", "Email", "Company", "Category", "Status", "Notes", "Created", "Actions"]}
      rows={leads.map((lead) => [
        <span key="name" className="font-semibold text-white">{lead.name}</span>,
        lead.email,
        lead.company ?? "N/A",
        lead.categoryInterest ?? "N/A",
        <span key="status" className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/20">{lead.status}</span>,
        <span key="message" className="line-clamp-2">{lead.notes || lead.message || "No notes yet"}</span>,
        lead.createdAt.toLocaleDateString(),
        <AdminRowActions key="actions" label={lead.email} fields={[
          { label: "Status", name: "status", type: "select", options: ["new", "contacted", "qualified", "closed"] },
          { label: "Category interest", name: "categoryInterest", placeholder: lead.categoryInterest ?? "" },
          { label: "Internal notes", name: "notes", type: "textarea", placeholder: lead.notes ?? lead.message ?? "" }
        ]} />
      ])}
    />
  );
}
