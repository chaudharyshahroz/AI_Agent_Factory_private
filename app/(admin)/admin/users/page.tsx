export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
import { AdminRowActions } from "@/components/admin/control-center";
import { prisma } from "@/lib/db/prisma";

export default async function AdminUsersPage() {
  const [users, total, superAdmins] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { memberships: { include: { organization: true } } } }),
    prisma.user.count(),
    prisma.organizationMember.count({ where: { role: "SUPER_ADMIN" } })
  ]);
  return (
    <AdminResourcePage
      title="Users"
      text="Search, review, and govern every Categent account. Destructive account actions remain intentionally staged as admin placeholders."
      stats={[{ label: "Total users", value: total }, { label: "Super admins", value: superAdmins }, { label: "Visible now", value: users.length }]}
      searchPlaceholder="Search users by email, name, organization, role, or signup date"
      filters={["Role", "Status", "Created date"]}
      createLabel="Invite admin user"
      formFields={[
        { label: "Name", name: "name", required: true },
        { label: "Email", name: "email", type: "email", required: true },
        { label: "Role", name: "role", type: "select", options: ["SUPER_ADMIN", "OWNER", "ADMIN", "MEMBER", "VIEWER"], required: true },
        { label: "Organization", name: "organization", placeholder: "Optional workspace" }
      ]}
      columns={["User", "Organizations", "Roles", "Status", "Created", "Actions"]}
      rows={users.map((user) => [
        <span key="email" className="font-semibold text-white">{user.name ?? user.email}<span className="block text-xs font-normal text-slate-500">{user.email}</span></span>,
        user.memberships.map((member) => member.organization.name).join(", ") || "None",
        <span key="roles" className="flex flex-wrap gap-1">{user.memberships.map((member) => <span key={member.id} className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 ring-1 ring-cyan-300/20">{member.role}</span>)}</span>,
        <span key="status" className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/20">Active</span>,
        user.createdAt.toLocaleDateString(),
        <AdminRowActions key="actions" label={user.email} fields={[
          { label: "Name", name: "name", placeholder: user.name ?? "Name" },
          { label: "Email", name: "email", type: "email", placeholder: user.email, required: true },
          { label: "Role", name: "role", type: "select", options: ["SUPER_ADMIN", "OWNER", "ADMIN", "MEMBER", "VIEWER"] },
          { label: "Admin note", name: "note", type: "textarea" }
        ]} />
      ])}
    />
  );
}
