export const categoryCatalog = [
  {
    slug: "e-commerce",
    name: "E-commerce",
    description: "Support, product guidance, order help, refunds, and store operations.",
    templates: [
      ["customer-support-agent", "Customer Support Agent", "Answers FAQs, shipping, returns, product questions, and support requests."],
      ["order-tracking-agent", "Order Tracking Agent", "Helps customers check order status. Real Shopify/WooCommerce integrations can be added later."],
      ["product-recommendation-agent", "Product Recommendation Agent", "Suggests products based on customer needs using uploaded product knowledge."],
      ["refund-escalation-agent", "Refund Escalation Agent", "Collects refund details and escalates risky refund requests to a human."],
      ["review-reply-agent", "Review Reply Agent", "Drafts thoughtful product review replies and escalates sensitive reviews."],
      ["abandoned-cart-follow-up-agent", "Abandoned Cart Follow-up Agent", "Collects cart context and drafts safe follow-up messages for review."]
    ],
    questions: [
      "Which store platform do you use? Shopify, WooCommerce, Other",
      "What products do you sell?",
      "Upload or describe your refund policy.",
      "Upload or describe your shipping policy.",
      "Which channels should this agent support? Website, WhatsApp, Email",
      "Which actions should require human approval?",
      "What tone should the agent use?",
      "When should the agent escalate to a human?"
    ]
  },
  {
    slug: "real-estate",
    name: "Real estate",
    description: "Lead qualification, seller intake, property matching, and viewing requests.",
    templates: [
      ["buyer-lead-qualification-agent", "Buyer Lead Qualification Agent", "Qualifies property buyers based on budget, location, timeline, and property type."],
      ["seller-intake-agent", "Seller Intake Agent", "Collects information from property owners who want to sell or rent."],
      ["property-matching-agent", "Property Matching Agent", "Matches buyer requirements with uploaded property listings."],
      ["viewing-appointment-agent", "Viewing Appointment Agent", "Collects details for property viewings and creates approval requests for bookings."],
      ["whatsapp-follow-up-agent", "WhatsApp Follow-up Agent", "Prepares compliant business follow-up messages for qualified property leads."],
      ["crm-update-agent", "CRM Update Agent", "Structures lead notes and prepares CRM updates with approval controls."]
    ],
    questions: [
      "Which city or area do you serve?",
      "Do you handle buying, selling, renting, or all?",
      "What property types do you handle?",
      "Where are your listings stored?",
      "Should the agent book viewings?",
      "Should high-budget leads be escalated?",
      "What lead information should be collected?",
      "What should the agent never promise?"
    ]
  },
  {
    slug: "service-business",
    name: "Service business / agency",
    description: "Lead qualification, booking intake, onboarding, and FAQ support.",
    templates: [
      ["lead-qualification-agent", "Lead Qualification Agent", "Qualifies inbound leads based on service need, budget, timeline, and contact information."],
      ["appointment-booking-agent", "Appointment Booking Agent", "Collects booking information and creates approval requests for appointments."],
      ["client-onboarding-agent", "Client Onboarding Agent", "Guides new clients through intake questions and required documents."],
      ["faq-support-agent", "FAQ Support Agent", "Answers common questions using uploaded service knowledge."],
      ["proposal-draft-agent", "Proposal Draft Agent", "Collects project context and drafts proposal outlines for human review."],
      ["follow-up-agent", "Follow-up Agent", "Prepares polite follow-ups for open leads, missed calls, and pending documents."]
    ],
    questions: [
      "What service do you provide?",
      "Which locations do you serve?",
      "What is your pricing model?",
      "Do you want the agent to book calls?",
      "What information should it collect from leads?",
      "Which leads should be escalated?",
      "What tone should the agent use?",
      "What should require human approval?"
    ]
  }
] as const;

export function getCategory(slug: string) {
  return categoryCatalog.find((category) => category.slug === slug);
}
