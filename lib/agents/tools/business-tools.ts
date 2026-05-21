import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { searchKnowledge } from "@/lib/agents/knowledge";
import type { ToolDefinition } from "@/lib/agents/tools/types";

export const appointmentRequestTool: ToolDefinition = {
  name: "appointment_request",
  description: "Collect appointment details and create a pending approval booking.",
  parametersSchema: z.object({ requestedTime: z.string(), service: z.string(), name: z.string().optional(), email: z.string().email().optional(), notes: z.string().optional() }),
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

export const createSupportTicketTool: ToolDefinition = {
  name: "create_support_ticket",
  description: "Create an internal support ticket record for the team queue.",
  parametersSchema: z.object({ subject: z.string(), details: z.string(), email: z.string().email().optional(), priority: z.string().optional() }),
  requiresApproval: false,
  category: "support",
  riskLevel: "low",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    await prisma.auditLog.create({ data: { organizationId: context.organizationId, action: "support_ticket_created", targetType: "agent", targetId: context.agentId, metadata: input } });
    return { ok: true, message: "Support ticket recorded for the team queue.", data: input };
  }
};

export const productSearchFromKnowledgeTool: ToolDefinition = {
  name: "product_search_from_knowledge",
  description: "Search uploaded product catalogs and product documentation.",
  parametersSchema: z.object({ query: z.string().min(1) }),
  requiresApproval: false,
  category: "ecommerce",
  riskLevel: "low",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    const chunks = await searchKnowledge({ organizationId: context.organizationId, agentId: context.agentId, query: input.query });
    return { ok: true, message: "Product knowledge searched.", data: { chunks } };
  }
};

export const collectCustomerInfoTool: ToolDefinition = {
  name: "collect_customer_info",
  description: "Structure customer name, contact details, intent, and notes.",
  parametersSchema: z.object({ name: z.string().optional(), email: z.string().email().optional(), phone: z.string().optional(), intent: z.string().optional(), notes: z.string().optional() }),
  requiresApproval: false,
  category: "crm",
  riskLevel: "low",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    const lead = await prisma.lead.create({ data: { organizationId: context.organizationId, agentId: context.agentId, name: input.name, email: input.email, phone: input.phone, metadata: input } });
    return { ok: true, message: "Customer info saved as a lead.", data: { leadId: lead.id } };
  }
};

export const sendInternalNotificationTool: ToolDefinition = {
  name: "send_internal_notification",
  description: "Prepare an internal notification for Slack, email, or operations review.",
  parametersSchema: z.object({ channel: z.string(), recipient: z.string().optional(), message: z.string(), urgency: z.string().optional() }),
  requiresApproval: true,
  category: "notification",
  riskLevel: "high",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    await prisma.notification.create({ data: { organizationId: context.organizationId, type: "internal_notification", title: input.urgency ? `${input.urgency} notification` : "Agent notification", body: input.message, metadata: input } });
    return { ok: true, message: "Internal notification recorded.", data: input };
  }
};

export const webhookStubTool: ToolDefinition = {
  name: "webhook_stub",
  description: "Record a webhook automation request for a configured server-side endpoint.",
  parametersSchema: z.object({ event: z.string(), payload: z.record(z.unknown()).optional() }),
  requiresApproval: true,
  category: "automation",
  riskLevel: "high",
  enabledByDefault: true,
  async execute(context, args) {
    const input = this.parametersSchema.parse(args);
    await prisma.auditLog.create({ data: { organizationId: context.organizationId, action: "webhook_stub", targetType: "agent", targetId: context.agentId, metadata: input } });
    return { ok: true, message: "Webhook automation request recorded.", data: input };
  }
};

export const orderLookupStubTool: ToolDefinition = {
  name: "order_lookup_stub",
  description: "Prepared order lookup stub for future Shopify/WooCommerce integration.",
  parametersSchema: z.object({ orderNumber: z.string() }),
  requiresApproval: false,
  category: "ecommerce",
  riskLevel: "medium",
  enabledByDefault: true,
  async execute() {
    return { ok: false, message: "Order lookup is not connected yet. Connect Shopify or WooCommerce when integrations are enabled." };
  }
};
