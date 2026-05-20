# Security

- Passwords are hashed with Argon2id.
- Sessions use random tokens stored as hashes and sent through HTTP-only cookies.
- Dashboard pages require server-side session validation.
- API routes validate inputs with Zod and check organization or agent access.
- Integration credentials use AES-256-GCM encryption.
- Redis rate limits protect login, signup, chat, widget, upload, and generation paths.
- Uploaded files are type and size checked, stored under organization and agent folders, and never executed.
- Widget access requires public deployment keys and optional domain allowlists.
- Risky tool actions create human approval records.
- Caddy adds HTTPS and security headers.
