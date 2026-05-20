# Architecture

AgentFactory AI runs five production services: Caddy, Next.js app, BullMQ worker, PostgreSQL 16 with pgvector, and Redis.

The app owns dashboard pages, route handlers, auth, billing, widget APIs, and the agent runtime. The worker processes uploads, extracts text, chunks documents, generates embeddings, and can run queued tests or usage rollups.

Tenant isolation is enforced by `organizationId` on owned tables plus access helpers before route logic touches tenant data.

The widget uses a public deployment key and domain allowlist. Chat requests create conversations and messages, retrieve relevant chunks through pgvector, moderate input, build a private system prompt, run the model, log usage, and create approvals for risky actions.
