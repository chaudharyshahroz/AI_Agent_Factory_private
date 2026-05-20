import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { readSession } from "@/lib/auth/session";

export async function getCurrentUser() {
  const session = await readSession();
  if (!session) return null;
  const { passwordHash: _passwordHash, ...user } = session.user;
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireOrganizationAccess(userId: string, organizationId: string) {
  const member = await prisma.organizationMember.findUnique({ where: { organizationId_userId: { organizationId, userId } } });
  if (!member) throw new Error("Organization access denied");
  return member;
}

export async function requireOwnerOrAdmin(userId: string, organizationId: string) {
  const member = await requireOrganizationAccess(userId, organizationId);
  if (!["OWNER", "ADMIN"].includes(member.role)) throw new Error("Owner or admin role required");
  return member;
}

export async function requireAgentAccess(userId: string, agentId: string) {
  const agent = await prisma.agent.findUnique({ where: { id: agentId } });
  if (!agent) throw new Error("Agent not found");
  await requireOrganizationAccess(userId, agent.organizationId);
  return agent;
}

export async function getDefaultOrganization(userId: string) {
  const member = await prisma.organizationMember.findFirst({ where: { userId }, include: { organization: true }, orderBy: { createdAt: "asc" } });
  return member?.organization ?? null;
}
