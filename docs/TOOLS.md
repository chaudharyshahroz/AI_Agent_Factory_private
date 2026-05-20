# Categent Tools

Categent tools are server-side only. The model can request only tools that exist in the registry, and arguments are validated with Zod before execution.

Core internal tools:

- `knowledge_search`
- `human_handoff`
- `create_internal_lead`
- `appointment_request`
- `create_support_ticket`
- `product_search_from_knowledge`
- `collect_customer_info`
- `send_internal_notification`
- `webhook_stub`
- `order_lookup_stub`

Risk levels:

- LOW: can run automatically.
- MEDIUM: configurable, often safe with logging.
- HIGH: requires human approval by default.

Approval-required tools create `HumanApproval` records instead of executing the final action. Owners and admins approve or reject from `/dashboard/approvals`; super admins can review all approvals from `/admin/approvals`.
