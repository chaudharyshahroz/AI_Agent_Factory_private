# Categent Admin Dashboard

The super admin dashboard lives at `/admin` and requires the user to have a `SUPER_ADMIN` organization membership.

Set `INITIAL_SUPER_ADMIN_EMAIL` before first signup. When that email signs up, Categent assigns `SUPER_ADMIN` automatically. The seed script also upgrades an existing matching user when rerun.

Admin sections:

- Overview: platform metrics and recent signups.
- Users: user accounts, organization memberships, and roles.
- Organizations: workspace plan, members, agents, and conversations.
- Agents: platform-wide agent inventory and status.
- Conversations: source, agent, message count, and approval context.
- Categories/templates: category packs, setup questions, template metadata, and approval levels.
- Tools/integrations: global tool registry and integration catalog controls.
- Pricing/subscriptions: plan metadata and Stripe subscription state.
- Approvals/contact leads/audit logs: operational review queues.
- System/content: environment checks, feature flags, homepage content, and system settings.

Actions such as account disabling, reset password, impersonation, and export CSV are intentionally represented as professional placeholders until product policy is finalized.
