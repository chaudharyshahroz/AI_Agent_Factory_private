# Categent Security

Categent is designed as a self-hosted SaaS foundation with server-side secrets, tenant isolation, role checks, human approval, and audited tool execution.

## Roles

- `SUPER_ADMIN`: platform admin, protected by `/admin`.
- `OWNER`: organization owner.
- `ADMIN`: organization admin.
- `MEMBER`: workspace collaborator.
- `VIEWER`: read-only workspace user.

Set `INITIAL_SUPER_ADMIN_EMAIL` before first signup so the first platform admin is created safely.

## Controls

- Passwords are hashed with bcrypt.
- Sessions use random tokens stored as hashes and sent through HTTP-only cookies.
- Dashboard pages require server-side session validation.
- API routes validate inputs with Zod and check organization or agent access.
- Super admin pages call `requireSuperAdmin()`.
- Organization and agent helpers enforce cross-tenant access.
- Integration credentials use AES-256-GCM encryption.
- Redis rate limits protect login, signup, chat, widget, upload, and generation paths where implemented.
- Uploaded files are type and size checked, stored under organization and agent folders, and never executed.
- Widget access requires public deployment keys and optional domain allowlists.
- Risky tool actions create `HumanApproval` records instead of executing immediately.
- Stripe webhooks verify signatures server-side.
- Caddy adds HTTPS and security headers in the Compose deployment.

## Operational Notes

Never expose `DATABASE_URL`, `REDIS_URL`, `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `AUTH_SECRET`, or `ENCRYPTION_KEY` to client components. Update these only in `.env.production` or Dokploy environment settings.
