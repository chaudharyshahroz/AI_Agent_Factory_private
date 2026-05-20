import { NextResponse } from "next/server";
import { requireAgentAccess, requireUser } from "@/lib/auth/access";
import { prisma } from "@/lib/db/prisma";
import { rateLimit } from "@/lib/rate-limit/redis";
import { ChatInputSchema, runAgentChat } from "@/lib/agents/runtime";

export async function POST(request: Request, { params }: { params: { agentId: string } }) {
  const input = ChatInputSchema.parse(await request.json());
  if (input.source === "WEBSITE_WIDGET") {
    const deployment = await prisma.agentDeployment.findFirst({ where: { agentId: params.agentId, publicKey: input.deploymentKey, status: "ACTIVE" } });
    if (!deployment) return NextResponse.json({ error: "Invalid deployment" }, { status: 403 });
    const origin = request.headers.get("origin") || "";
    if (deployment.allowedDomains.length && !deployment.allowedDomains.some((domain) => origin.includes(domain))) return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
    const limited = await rateLimit(`widget:${deployment.publicKey}:${request.headers.get("x-forwarded-for") || "local"}`, 60, 60);
    if (!limited.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    return NextResponse.json(await runAgentChat(params.agentId, input));
  }
  const user = await requireUser();
  await requireAgentAccess(user.id, params.agentId);
  const limited = await rateLimit(`chat:${user.id}`, 120, 60);
  if (!limited.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  return NextResponse.json(await runAgentChat(params.agentId, input, user.id));
}
