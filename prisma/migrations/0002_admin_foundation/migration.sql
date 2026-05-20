ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'SUPER_ADMIN';

ALTER TABLE "CategoryPack" ADD COLUMN IF NOT EXISTS "icon" text;
ALTER TABLE "CategoryPack" ADD COLUMN IF NOT EXISTS "status" text NOT NULL DEFAULT 'active';
ALTER TABLE "CategoryPack" ADD COLUMN IF NOT EXISTS "seoTitle" text;
ALTER TABLE "CategoryPack" ADD COLUMN IF NOT EXISTS "seoDescription" text;
ALTER TABLE "CategoryPack" ADD COLUMN IF NOT EXISTS "metadata" jsonb;
ALTER TABLE "CategoryPack" ADD COLUMN IF NOT EXISTS "sortOrder" integer NOT NULL DEFAULT 0;
ALTER TABLE "CategoryPack" ADD COLUMN IF NOT EXISTS "updatedAt" timestamptz NOT NULL DEFAULT now();

ALTER TABLE "AgentTemplate" ADD COLUMN IF NOT EXISTS "goal" text;
ALTER TABLE "AgentTemplate" ADD COLUMN IF NOT EXISTS "setupTime" text;
ALTER TABLE "AgentTemplate" ADD COLUMN IF NOT EXISTS "approvalLevel" text;
ALTER TABLE "AgentTemplate" ADD COLUMN IF NOT EXISTS "recommendedTools" jsonb;
ALTER TABLE "AgentTemplate" ADD COLUMN IF NOT EXISTS "metadata" jsonb;
ALTER TABLE "AgentTemplate" ADD COLUMN IF NOT EXISTS "sortOrder" integer NOT NULL DEFAULT 0;
ALTER TABLE "AgentTemplate" ADD COLUMN IF NOT EXISTS "updatedAt" timestamptz NOT NULL DEFAULT now();

ALTER TABLE "ToolDefinition" ADD COLUMN IF NOT EXISTS "outputSchema" jsonb;
ALTER TABLE "ToolDefinition" ADD COLUMN IF NOT EXISTS "icon" text;
ALTER TABLE "ToolDefinition" ADD COLUMN IF NOT EXISTS "documentation" text;
ALTER TABLE "ToolDefinition" ADD COLUMN IF NOT EXISTS "metadata" jsonb;
ALTER TABLE "ToolDefinition" ADD COLUMN IF NOT EXISTS "updatedAt" timestamptz NOT NULL DEFAULT now();

CREATE TABLE IF NOT EXISTS "ContactLead" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "email" text NOT NULL,
  "company" text,
  "companySize" text,
  "categoryInterest" text,
  "useCase" text,
  "message" text,
  "status" text NOT NULL DEFAULT 'new',
  "notes" text,
  "metadata" jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "ContactLead_email_idx" ON "ContactLead"("email");
CREATE INDEX IF NOT EXISTS "ContactLead_status_idx" ON "ContactLead"("status");
CREATE INDEX IF NOT EXISTS "ContactLead_createdAt_idx" ON "ContactLead"("createdAt");

CREATE TABLE IF NOT EXISTS "AdminContentBlock" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "key" text UNIQUE NOT NULL,
  "title" text NOT NULL,
  "content" jsonb NOT NULL,
  "status" text NOT NULL DEFAULT 'active',
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "FeatureFlag" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "key" text UNIQUE NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "enabled" boolean NOT NULL DEFAULT false,
  "metadata" jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "SystemSetting" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "key" text UNIQUE NOT NULL,
  "value" jsonb NOT NULL,
  "isSecret" boolean NOT NULL DEFAULT false,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "ApiKey" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "organizationId" uuid NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "createdByUserId" uuid REFERENCES "User"("id") ON DELETE SET NULL,
  "name" text NOT NULL,
  "keyHash" text NOT NULL,
  "prefix" text NOT NULL,
  "scopes" text[] NOT NULL DEFAULT ARRAY[]::text[],
  "lastUsedAt" timestamptz,
  "revokedAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "ApiKey_organizationId_idx" ON "ApiKey"("organizationId");
CREATE INDEX IF NOT EXISTS "ApiKey_prefix_idx" ON "ApiKey"("prefix");

CREATE TABLE IF NOT EXISTS "Notification" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "organizationId" uuid NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "userId" uuid REFERENCES "User"("id") ON DELETE SET NULL,
  "type" text NOT NULL,
  "title" text NOT NULL,
  "body" text,
  "readAt" timestamptz,
  "metadata" jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "Notification_organizationId_idx" ON "Notification"("organizationId");
CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");
