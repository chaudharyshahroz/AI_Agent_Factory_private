import {
  Activity,
  AppWindow,
  BadgeCheck,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Globe2,
  Handshake,
  Home,
  KeyRound,
  Layers3,
  LockKeyhole,
  Mail,
  MessageSquare,
  PackageSearch,
  PlugZap,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TicketCheck,
  UserRoundPlus,
  UsersRound,
  Workflow
} from "lucide-react";

export const brand = {
  name: "Categent",
  tagline: "AI agents for every business category.",
  headline: "Build production-ready AI agents for your business in minutes.",
  subheadline:
    "Choose your industry, describe your workflow, upload your knowledge, connect your tools, and launch AI agents for support, sales, bookings, follow-ups, and operations."
};

export const categories = [
  {
    slug: "e-commerce",
    href: "/categories/ecommerce",
    name: "E-commerce",
    icon: ShoppingCart,
    status: "Active",
    description: "Support, product guidance, order help, refund triage, reviews, and store operations.",
    exampleAgents: ["Customer Support", "Order Tracking", "Product Recommendation", "Refund Escalation"],
    recommendedTools: ["Knowledge Search", "Product Search", "Order Lookup", "Support Ticket"],
    riskControls: ["Refund approvals", "Address-change restrictions", "Escalation for angry customers"],
    knowledgeSources: ["Shipping policy", "Refund policy", "Product catalog", "FAQs"],
    integrations: ["Shopify", "WooCommerce", "Gmail", "Slack"]
  },
  {
    slug: "real-estate",
    href: "/categories/real-estate",
    name: "Real estate",
    icon: Home,
    status: "Active",
    description: "Qualify buyers and sellers, match listings, collect intake, and request viewings safely.",
    exampleAgents: ["Buyer Qualification", "Seller Intake", "Property Matching", "Viewing Requests"],
    recommendedTools: ["Lead Capture", "Appointment Request", "CRM Contact", "Human Handoff"],
    riskControls: ["No legal promises", "Viewing approval", "High-budget lead escalation"],
    knowledgeSources: ["Property listings", "Neighborhood notes", "Viewing rules", "Agency FAQs"],
    integrations: ["HubSpot", "Calendly", "WhatsApp Business", "Google Calendar"]
  },
  {
    slug: "service-business",
    href: "/categories/service-business",
    name: "Service business",
    icon: BriefcaseBusiness,
    status: "Active",
    description: "Qualify leads, book appointments, onboard clients, and answer operational FAQs.",
    exampleAgents: ["Lead Qualification", "Appointment Booking", "Client Onboarding", "FAQ Support"],
    recommendedTools: ["Lead Capture", "Appointment Request", "Internal Notification", "Webhook"],
    riskControls: ["Quote disclaimers", "Booking approval", "Critical requests escalate"],
    knowledgeSources: ["Service pages", "Pricing guide", "Intake forms", "Onboarding documents"],
    integrations: ["Calendly", "Gmail", "Slack", "Webhooks"]
  }
];

export const comingSoonCategories = [
  "Restaurant",
  "Education",
  "Healthcare/wellness",
  "Legal/accounting",
  "SaaS",
  "HR/recruitment",
  "Finance",
  "Travel",
  "Automotive",
  "Fitness/wellness"
];

export const templates = [
  { name: "Customer Support Agent", category: "E-commerce", goal: "Support", tools: ["Knowledge Search", "Support Ticket"], setupTime: "7 min", approval: "Medium" },
  { name: "Order Tracking Agent", category: "E-commerce", goal: "Operations", tools: ["Order Lookup", "Human Handoff"], setupTime: "6 min", approval: "Medium" },
  { name: "Product Recommendation Agent", category: "E-commerce", goal: "Sales", tools: ["Product Search", "Lead Capture"], setupTime: "8 min", approval: "Low" },
  { name: "Refund Escalation Agent", category: "E-commerce", goal: "Support", tools: ["Support Ticket", "Human Approval"], setupTime: "9 min", approval: "High" },
  { name: "Review Reply Agent", category: "E-commerce", goal: "Follow-up", tools: ["Email Draft", "Human Approval"], setupTime: "5 min", approval: "High" },
  { name: "Buyer Lead Qualification Agent", category: "Real estate", goal: "Sales", tools: ["Lead Capture", "CRM Contact"], setupTime: "8 min", approval: "Medium" },
  { name: "Seller Intake Agent", category: "Real estate", goal: "Operations", tools: ["Lead Capture", "Human Handoff"], setupTime: "8 min", approval: "Medium" },
  { name: "Property Matching Agent", category: "Real estate", goal: "Knowledge", tools: ["Knowledge Search", "CRM Contact"], setupTime: "10 min", approval: "Low" },
  { name: "Viewing Appointment Agent", category: "Real estate", goal: "Bookings", tools: ["Appointment Request", "Human Approval"], setupTime: "9 min", approval: "High" },
  { name: "Lead Qualification Agent", category: "Service business", goal: "Sales", tools: ["Lead Capture", "Notification"], setupTime: "6 min", approval: "Low" },
  { name: "Appointment Booking Agent", category: "Service business", goal: "Bookings", tools: ["Appointment Request", "Human Approval"], setupTime: "7 min", approval: "High" },
  { name: "Client Onboarding Agent", category: "Service business", goal: "Operations", tools: ["Knowledge Search", "Support Ticket"], setupTime: "9 min", approval: "Medium" },
  { name: "FAQ Support Agent", category: "Service business", goal: "Support", tools: ["Knowledge Search"], setupTime: "5 min", approval: "Low" }
];

export const workflowSteps = [
  "Category",
  "Template",
  "Requirements",
  "Knowledge",
  "Tools",
  "Blueprint",
  "Test",
  "Deploy",
  "Monitor"
];

export const buildProgress = [
  "Reading requirements",
  "Selecting category pattern",
  "Designing instructions",
  "Selecting tools",
  "Creating approval rules",
  "Generating test cases",
  "Preparing deployment plan"
];

export const tools = [
  { name: "knowledge_search", label: "Knowledge Search", icon: Search, category: "Knowledge", risk: "LOW", approval: false, description: "Searches embedded documents and returns source citations." },
  { name: "human_handoff", label: "Human Handoff", icon: Handshake, category: "Support", risk: "MEDIUM", approval: false, description: "Creates a handoff request when the agent needs a person." },
  { name: "create_internal_lead", label: "Lead Capture", icon: UserRoundPlus, category: "Sales", risk: "LOW", approval: false, description: "Stores qualified visitor details as a lead." },
  { name: "appointment_request", label: "Appointment Request", icon: CalendarClock, category: "Booking", risk: "HIGH", approval: true, description: "Collects booking information and creates a pending approval." },
  { name: "create_support_ticket", label: "Support Ticket", icon: TicketCheck, category: "Support", risk: "LOW", approval: false, description: "Creates an internal support ticket record for the team queue." },
  { name: "product_search_from_knowledge", label: "Product Search", icon: PackageSearch, category: "E-commerce", risk: "LOW", approval: false, description: "Finds product details from uploaded catalogs and docs." },
  { name: "collect_customer_info", label: "Collect Customer Info", icon: ClipboardCheck, category: "CRM", risk: "LOW", approval: false, description: "Structures name, email, phone, intent, and notes." },
  { name: "send_internal_notification", label: "Internal Notification", icon: Bell, category: "Notification", risk: "HIGH", approval: true, description: "Prepares Slack/email notifications with review controls." },
  { name: "webhook_stub", label: "Webhook", icon: PlugZap, category: "Automation", risk: "HIGH", approval: true, description: "Sends a server-side webhook when configured." },
  { name: "order_lookup_stub", label: "Order Lookup", icon: Database, category: "E-commerce", risk: "MEDIUM", approval: false, description: "Prepared order lookup stub for future Shopify/WooCommerce sync." },
  { name: "email_draft", label: "Email Draft", icon: Mail, category: "Communication", risk: "HIGH", approval: true, description: "Drafts email copy for human review before sending." },
  { name: "whatsapp_placeholder", label: "WhatsApp Workflow", icon: MessageSquare, category: "Communication", risk: "HIGH", approval: true, description: "Prepares guarded WhatsApp business workflows for support, lead follow-up, and appointment reminders." },
  { name: "quote_request", label: "Quote Request", icon: FileText, category: "Sales", risk: "MEDIUM", approval: true, description: "Collects scope, timeline, and budget so a human can prepare a quote." },
  { name: "feedback_collector", label: "Feedback Collector", icon: ClipboardCheck, category: "Support", risk: "LOW", approval: false, description: "Collects structured feedback, ratings, and improvement notes." },
  { name: "faq_answer", label: "FAQ Answer", icon: MessageSquare, category: "Knowledge", risk: "LOW", approval: false, description: "Answers common questions from approved FAQs and source documents." },
  { name: "property_matching_stub", label: "Property Matching", icon: Home, category: "Real estate", risk: "MEDIUM", approval: false, description: "Matches buyer needs with uploaded listings and area notes." },
  { name: "availability_request", label: "Availability Request", icon: CalendarClock, category: "Booking", risk: "MEDIUM", approval: true, description: "Collects preferred dates and times before a booking is approved." },
  { name: "crm_contact_stub", label: "CRM Contact", icon: UserRoundPlus, category: "CRM", risk: "HIGH", approval: true, description: "Prepares a contact record for future CRM sync or internal review." },
  { name: "complaint_escalation", label: "Complaint Escalation", icon: ShieldCheck, category: "Support", risk: "HIGH", approval: true, description: "Escalates sensitive complaints with context and conversation history." },
  { name: "review_reply_draft", label: "Review Reply Draft", icon: Mail, category: "Follow-up", risk: "HIGH", approval: true, description: "Drafts review replies for human approval before publishing." },
  { name: "follow_up_reminder", label: "Follow-up Reminder", icon: Bell, category: "Notification", risk: "MEDIUM", approval: true, description: "Creates a reminder for a human to follow up with a lead or customer." }
];

export const integrations = [
  { name: "Shopify", group: "E-commerce", status: "Coming soon", description: "Connect product, order, and customer workflows." },
  { name: "WooCommerce", group: "E-commerce", status: "Coming soon", description: "Bring store catalog and order context into agents." },
  { name: "HubSpot", group: "CRM", status: "Coming soon", description: "Create contacts and sync qualified leads." },
  { name: "Salesforce", group: "CRM", status: "Placeholder", description: "Enterprise CRM workflow planning." },
  { name: "Calendly", group: "Calendar", status: "Coming soon", description: "Request and approve meetings." },
  { name: "Google Calendar", group: "Calendar", status: "Coming soon", description: "Booking availability and event creation." },
  { name: "Gmail", group: "Communication", status: "Coming soon", description: "Draft follow-ups and support emails." },
  { name: "Slack", group: "Communication", status: "Coming soon", description: "Notify teams about hot leads and approvals." },
  { name: "WhatsApp Business", group: "Communication", status: "Placeholder", description: "Support, lead qualification, reminders, and order tracking only." },
  { name: "PDF", group: "Knowledge", status: "Available", description: "Upload policies, listings, guides, and catalogs." },
  { name: "DOCX", group: "Knowledge", status: "Available", description: "Use documents as source-grounded knowledge." },
  { name: "CSV", group: "Knowledge", status: "Available", description: "Upload catalogs, listings, and structured FAQs." },
  { name: "Webhooks", group: "Automation", status: "Available", description: "Server-side automation stub for custom workflows." },
  { name: "Zapier", group: "Automation", status: "Placeholder", description: "Connect to no-code automation later." },
  { name: "Make", group: "Automation", status: "Placeholder", description: "Visual automation workflows later." },
  { name: "n8n", group: "Automation", status: "Placeholder", description: "Self-hosted automation integration plan." }
];

export const pricingPlans = [
  { name: "Free", price: "$0", description: "Prototype your first category agent.", features: ["1 draft agent", "50 test messages/month", "Knowledge upload trial", "No public deployment"], cta: "Start free" },
  { name: "Starter", price: "$29", description: "Launch one production website agent.", features: ["1 deployed agent", "1 category", "500 messages/month", "Website widget", "Basic knowledge base", "Email support"], cta: "Choose Starter" },
  { name: "Pro", price: "$79", description: "Operate a small agent workforce.", features: ["3 deployed agents", "3 categories", "5,000 messages/month", "Human approvals", "Testing playground", "Analytics", "Integration marketplace"], cta: "Choose Pro", featured: true },
  { name: "Business", price: "$199", description: "Scale governed agents across teams.", features: ["10 deployed agents", "Unlimited categories", "25,000 messages/month", "Advanced analytics", "Admin controls", "Audit logs", "Higher limits"], cta: "Talk to sales" }
];

export const securityControls = [
  { title: "Human approval before risky actions", icon: ShieldCheck, text: "Refunds, bookings, outbound messages, contracts, and high-impact updates wait for an owner or admin." },
  { title: "Tool permissioning", icon: KeyRound, text: "Agents can only call registered tools that pass server-side Zod validation and tenant checks." },
  { title: "Audit trails", icon: FileText, text: "Every login, upload, deployment, approval, and tool execution is logged for review." },
  { title: "Domain allowlists", icon: Globe2, text: "Widget deployments are validated against public keys and approved website domains." },
  { title: "Rate limits", icon: Gauge, text: "Login, signup, chat, uploads, test runs, and blueprint generation are protected by Redis-backed limits." },
  { title: "Data isolation", icon: LockKeyhole, text: "Every tenant-owned table is scoped by organization and every route checks access." }
];

export const dashboardNav = [
  { href: "/dashboard", label: "Overview", icon: Activity },
  { href: "/dashboard/create-agent", label: "Agent Builder", icon: Sparkles },
  { href: "/dashboard/agents", label: "Agents", icon: Bot },
  { href: "/dashboard/conversations", label: "Agent Inbox", icon: MessageSquare },
  { href: "/dashboard/knowledge", label: "Knowledge Studio", icon: Database },
  { href: "/dashboard/tools", label: "Tool Store", icon: PlugZap },
  { href: "/dashboard/approvals", label: "Approvals", icon: ShieldCheck },
  { href: "/dashboard/deployments", label: "Deployments", icon: Globe2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/integrations", label: "Integrations", icon: AppWindow },
  { href: "/dashboard/billing", label: "Billing", icon: BadgeCheck },
  { href: "/dashboard/settings", label: "Settings", icon: LockKeyhole }
];

export const adminNav = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: UsersRound },
  { href: "/admin/organizations", label: "Organizations", icon: Building2 },
  { href: "/admin/agents", label: "Agents", icon: Bot },
  { href: "/admin/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/admin/categories", label: "Categories", icon: Layers3 },
  { href: "/admin/templates", label: "Templates", icon: FileText },
  { href: "/admin/tools", label: "Tools", icon: PlugZap },
  { href: "/admin/integrations", label: "Integrations", icon: AppWindow },
  { href: "/admin/pricing", label: "Pricing", icon: BadgeCheck },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CheckCircle2 },
  { href: "/admin/approvals", label: "Approvals", icon: ShieldCheck },
  { href: "/admin/contact-leads", label: "Contact Leads", icon: UserRoundPlus },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: FileText },
  { href: "/admin/system", label: "System", icon: Gauge },
  { href: "/admin/content", label: "Content", icon: Workflow }
];

export const metricSeries = [
  { day: "Mon", messages: 42, conversations: 14, tools: 9, approvals: 2 },
  { day: "Tue", messages: 61, conversations: 19, tools: 13, approvals: 3 },
  { day: "Wed", messages: 73, conversations: 24, tools: 16, approvals: 4 },
  { day: "Thu", messages: 58, conversations: 18, tools: 11, approvals: 2 },
  { day: "Fri", messages: 91, conversations: 31, tools: 20, approvals: 5 },
  { day: "Sat", messages: 66, conversations: 21, tools: 14, approvals: 2 },
  { day: "Sun", messages: 84, conversations: 29, tools: 18, approvals: 4 }
];

export const productCapabilities = [
  { title: "Agent creation engine", icon: BrainCircuit, text: "Turn category context, workflow details, tools, and knowledge into a structured AI Agent Blueprint." },
  { title: "Category packs", icon: Layers3, text: "Start from industry-specific templates, questions, safety rules, and recommended tools." },
  { title: "Testing playground", icon: GitBranch, text: "Run generated test cases, custom conversations, citation checks, and approval triggers before deployment." },
  { title: "Website widget", icon: Globe2, text: "Deploy a branded chat widget with public key validation and domain allowlists." },
  { title: "Analytics and logs", icon: BarChart3, text: "Monitor messages, leads, tool calls, approvals, handoffs, and knowledge citation usage." },
  { title: "Admin controls", icon: ShieldCheck, text: "Manage users, organizations, categories, templates, integrations, pricing, content, and audit logs." }
];
