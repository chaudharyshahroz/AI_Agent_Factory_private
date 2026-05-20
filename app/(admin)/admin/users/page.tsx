export const dynamic = "force-dynamic";

import { AdminResourcePage } from "@/components/admin/resource-page";
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
      columns={["User", "Organizations", "Roles", "Joined"]}
      rows={users.map((user) => [
        <span key="email" className="font-semibold text-white">{user.email}</span>,
        user.memberships.map((member) => member.organization.name).join(", ") || "None",
        user.memberships.map((member) => member.role).join(", ") || "None",
        user.createdAt.toLocaleDateString()
      ])}
    />
  );
}
