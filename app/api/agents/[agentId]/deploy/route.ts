import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request, { params }: { params: { agentId: string } }) {
  const user = await requireUser();
  const agent = await requireAgentAccess(user.id, params.agentId);
  const existing = await prisma.agentDeployment.findFirst({ where: { agentId: agent.id } });
  const deployment = existing
    ? await prisma.agentDeployment.update({ where: { id: existing.id }, data: { status: "ACTIVE" } })
    : await prisma.agentDeployment.create({ data: { organizationId: agent.organizationId, agentId: agent.id, publicKey: `af_${randomBytes(18).toString("base64url")}`, allowedDomains: [process.env.APP_DOMAIN || "localhost"], widgetSettings: { agentName: agent.name, welcomeMessage: "Hello. How can I help?", brandColor: "#0d8277", placeholder: "Type a message" } } });
  await prisma.agent.update({ where: { id: agent.id }, data: { status: "DEPLOYED" } });
  await prisma.auditLog.create({ data: { organizationId: agent.organizationId, actorUserId: user.id, action: "deployment_create", targetType: "deployment", targetId: deployment.id } });
  return NextResponse.redirect(new URL(`/dashboard/agents/${agent.id}/deploy`, request.url), 303);
}
