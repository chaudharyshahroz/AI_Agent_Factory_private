import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const bookAppointmentStubTool: ToolDefinition = {
  name: "book_appointment_stub",
  description: "Create a pending appointment request.",
  parametersSchema: z.object({ requestedTime: z.string(), service: z.string(), name: z.string().optional(), email: z.string().email().optional() }),
  requiresApproval: true,
  category: "booking",
  riskLevel: "high",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    const booking = await prisma.booking.create({ data: { organizationId: context.organizationId, agentId: context.agentId, status: "PENDING_APPROVAL", metadata: input } });
    return { ok: true, message: "Appointment request created for approval.", data: { bookingId: booking.id } };
  }
};
