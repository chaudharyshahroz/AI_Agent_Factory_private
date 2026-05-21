import type { AgentBlueprintContent } from "@/lib/agents/blueprint-types";

const baseTools = [
  { name: "knowledge_search", description: "Search uploaded business knowledge.", inputSchema: { query: "string" }, requiresApproval: false, category: "knowledge", enabledByDefault: true },
  { name: "human_handoff", description: "Create a human follow-up request.", inputSchema: { reason: "string" }, requiresApproval: false, category: "support", enabledByDefault: true }
];

const baseWorkflow = {
  visualWorkflowNodes: [
    { id: "start", label: "Start", type: "event" },
    { id: "message", label: "User message", type: "input" },
    { id: "moderation", label: "Moderation", type: "guardrail" },
    { id: "knowledge", label: "Knowledge search", type: "retrieval" },
    { id: "tool", label: "Tool decision", type: "action" },
    { id: "approval", label: "Human approval", type: "guardrail" },
    { id: "response", label: "Response", type: "output" },
    { id: "log", label: "Audit log", type: "log" }
  ],
  visualWorkflowEdges: [
    { from: "start", to: "message" },
    { from: "message", to: "moderation" },
    { from: "moderation", to: "knowledge" },
    { from: "knowledge", to: "tool" },
    { from: "tool", to: "approval", label: "if risky" },
    { from: "tool", to: "response", label: "if safe" },
    { from: "approval", to: "response" },
    { from: "response", to: "log" }
  ],
  estimatedSetupScore: 72,
  readinessChecklist: [
    { label: "Blueprint generated", complete: true },
    { label: "Knowledge uploaded", complete: false },
    { label: "Tools selected", complete: true },
    { label: "Test passed", complete: false },
    { label: "Deployment configured", complete: false },
    { label: "Billing plan allows deploy", complete: false }
  ]
};

export const exampleBlueprints: AgentBlueprintContent[] = [
  {
    ...baseWorkflow,
    category: "e-commerce",
    templateSlug: "customer-support-agent",
    agentName: "Store Support Agent",
    agentDescription: "Answers product, shipping, return, and support questions using approved store knowledge.",
    businessGoal: "Resolve customer questions quickly while escalating refunds and sensitive account actions.",
    primaryChannel: "website",
    supportedChannels: ["website", "email", "whatsapp_placeholder"],
    systemInstructions: "Use the uploaded policies and product knowledge first. Be concise, cite knowledge when possible, and escalate refund or account-changing requests.",
    tone: "friendly and clear",
    allowedActions: ["answer FAQs", "explain policies", "collect support details"],
    restrictedActions: ["issue refunds", "cancel orders", "change shipping addresses"],
    approvalRequiredFor: ["refund", "cancel order", "change shipping address", "send email"],
    tools: [...baseTools, { name: "create_support_ticket_stub", description: "Create an internal support ticket placeholder.", inputSchema: { subject: "string", details: "string" }, requiresApproval: false, category: "support", enabledByDefault: true }],
    knowledgeRequirements: ["refund policy", "shipping policy", "product catalog"],
    requiredUserFields: ["name", "email", "order number when relevant"],
    escalationRules: ["Escalate angry customers and refund decisions.", "Escalate if information is missing from knowledge."],
    complianceRules: ["Never promise refunds or delivery dates unless present in knowledge."],
    testCases: [{ name: "Return policy", userMessage: "Can I return a damaged item?", expectedBehavior: "Answer from policy and offer escalation if needed.", shouldCallTools: ["knowledge_search"], shouldEscalate: false, shouldRequireApproval: false }],
    deploymentRecommendations: ["Add widget to product and help pages.", "Upload current policies before deployment."]
  },
  {
    ...baseWorkflow,
    category: "real-estate",
    templateSlug: "buyer-lead-qualification-agent",
    agentName: "Buyer Qualification Agent",
    agentDescription: "Qualifies buyers by budget, location, timeline, and property preferences.",
    businessGoal: "Capture qualified buyer leads and escalate high-intent prospects.",
    primaryChannel: "website",
    supportedChannels: ["website"],
    systemInstructions: "Ask focused questions one at a time, collect buyer criteria, and avoid promising property availability without listings.",
    tone: "professional and helpful",
    allowedActions: ["collect lead details", "match needs with uploaded listings"],
    restrictedActions: ["promise availability", "give legal advice", "give financial advice"],
    approvalRequiredFor: ["book appointment", "send contract"],
    tools: [...baseTools, { name: "create_internal_lead", description: "Create an internal lead record.", inputSchema: { name: "string", email: "string" }, requiresApproval: false, category: "crm", enabledByDefault: true }],
    knowledgeRequirements: ["property listings", "service areas"],
    requiredUserFields: ["name", "email", "budget", "location", "timeline"],
    escalationRules: ["Escalate high-budget or ready-to-view leads."],
    complianceRules: ["Never provide legal or financial advice."],
    testCases: [{ name: "Buyer qualification", userMessage: "I need a villa under 500k next month.", expectedBehavior: "Ask for location and contact details.", shouldCallTools: [], shouldEscalate: false, shouldRequireApproval: false }],
    deploymentRecommendations: ["Place widget on listings and contact pages."]
  },
  {
    ...baseWorkflow,
    category: "service-business",
    templateSlug: "appointment-booking-agent",
    agentName: "Appointment Intake Agent",
    agentDescription: "Collects booking details and creates approval requests for appointments.",
    businessGoal: "Turn visitors into qualified appointment requests.",
    primaryChannel: "website",
    supportedChannels: ["website"],
    systemInstructions: "Collect service need, location, timeline, and contact details. Booking requests must create approvals before confirmation.",
    tone: "warm and efficient",
    allowedActions: ["answer service FAQs", "collect booking preferences"],
    restrictedActions: ["confirm appointments without approval", "send external messages"],
    approvalRequiredFor: ["book appointment", "send email", "send WhatsApp message"],
    tools: [...baseTools, { name: "book_appointment_stub", description: "Create a pending appointment request.", inputSchema: { requestedTime: "string", service: "string" }, requiresApproval: true, category: "booking", enabledByDefault: true }],
    knowledgeRequirements: ["services", "pricing", "availability rules"],
    requiredUserFields: ["name", "email", "phone", "service need"],
    escalationRules: ["Escalate urgent or complex requests."],
    complianceRules: ["Do not guarantee exact availability until approved."],
    testCases: [{ name: "Booking request", userMessage: "Can I book a consultation tomorrow?", expectedBehavior: "Collect details and create approval request.", shouldCallTools: ["book_appointment_stub"], shouldEscalate: false, shouldRequireApproval: true }],
    deploymentRecommendations: ["Use on service pages and booking CTAs."]
  }
];
