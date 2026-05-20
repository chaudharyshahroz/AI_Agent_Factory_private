# Category Packs

Category packs define a slug, name, description, templates, setup questions, and recommended safety defaults.

To add a category:

1. Add it to `lib/categories/catalog.ts`.
2. Add a default blueprint in `lib/agents/default-blueprints.ts`.
3. Run `npm run db:seed`.
4. Add category-specific tools only through the registry.

Setup questions are stored in Prisma and shown by the create-agent wizard.
