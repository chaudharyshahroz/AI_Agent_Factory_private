import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const Schema = z.object({ agentId: z.string().uuid(), publicKey: z.string() });

export async function POST(request: Request) {
  const input = Schema.parse(await request.json());
  const deployment = await prisma.agentDeployment.findFirst({ where: { agentId: input.agentId, publicKey: input.publicKey, status: "ACTIVE" } });
  if (!deployment) return NextResponse.json({ error: "Invalid deployment" }, { status: 403 });
  return NextResponse.json({ ok: true, widgetSettings: deployment.widgetSettings });
}
