import { prisma } from "../lib/db/prisma";
import { categoryCatalog } from "../lib/categories/catalog";
import { toolRegistry } from "../lib/agents/tools/registry";
import { brand, integrations, pricingPlans, tools } from "../lib/categent/content";

async function main() {
  for (const [sortOrder, category] of categoryCatalog.entries()) {
    const pack = await prisma.categoryPack.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        status: "active",
        sortOrder,
        metadata: { seededBy: "categent", questionCount: category.questions.length }
      },
      create: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        status: "active",
        sortOrder,
        metadata: { seededBy: "categent", questionCount: category.questions.length }
      }
    });
    for (const [templateSortOrder, [slug, name, description]] of category.templates.entries()) {
      const contentTemplate = tools.find((tool) => name.toLowerCase().includes(tool.label.toLowerCase()));
      await prisma.agentTemplate.upsert({
        where: { categoryPackId_slug: { categoryPackId: pack.id, slug } },
        update: {
          name,
          description,
          goal: inferGoal(name),
          setupTime: templateSortOrder > 3 ? "8 min" : "6 min",
          approvalLevel: name.toLowerCase().includes("booking") || name.toLowerCase().includes("refund") ? "High" : "Medium",
          recommendedTools: contentTemplate ? [contentTemplate.name] : ["knowledge_search", "human_handoff"],
          sortOrder: templateSortOrder
        },
        create: {
          categoryPackId: pack.id,
          slug,
          name,
          description,
          goal: inferGoal(name),
          setupTime: templateSortOrder > 3 ? "8 min" : "6 min",
          approvalLevel: name.toLowerCase().includes("booking") || name.toLowerCase().includes("refund") ? "High" : "Medium",
          recommendedTools: contentTemplate ? [contentTemplate.name] : ["knowledge_search", "human_handoff"],
          sortOrder: templateSortOrder
        }
      });
    }
    await prisma.setupQuestion.deleteMany({ where: { categoryPackId: pack.id } });
    await prisma.setupQuestion.createMany({
      data: category.questions.map((prompt, sortOrder) => ({ categoryPackId: pack.id, prompt, sortOrder }))
    });
  }

  for (const tool of toolRegistry.values()) {
    const richTool = tools.find((item) => item.name === tool.name);
    await prisma.toolDefinition.upsert({
      where: { name: tool.name },
      update: {
        description: tool.description,
        category: tool.category,
        riskLevel: tool.riskLevel,
        requiresApproval: Boolean(tool.requiresApproval),
        enabledByDefault: tool.enabledByDefault,
        inputSchema: {},
        outputSchema: {},
        metadata: richTool ? { label: richTool.label, uiDescription: richTool.description } : {}
      },
      create: {
        name: tool.name,
        description: tool.description,
        category: tool.category,
        riskLevel: tool.riskLevel,
        requiresApproval: Boolean(tool.requiresApproval),
        enabledByDefault: tool.enabledByDefault,
        inputSchema: {},
        outputSchema: {},
        metadata: richTool ? { label: richTool.label, uiDescription: richTool.description } : {}
      }
    });
  }

  await prisma.adminContentBlock.upsert({
    where: { key: "homepage.hero" },
    update: { title: brand.headline, content: { announcement: "New: Build category-based AI agents with knowledge, tools, testing, and human approvals.", subheadline: brand.subheadline } },
    create: { key: "homepage.hero", title: brand.headline, content: { announcement: "New: Build category-based AI agents with knowledge, tools, testing, and human approvals.", subheadline: brand.subheadline } }
  });

  await prisma.systemSetting.upsert({
    where: { key: "pricing.plans" },
    update: { value: pricingPlans },
    create: { key: "pricing.plans", value: pricingPlans }
  });

  await prisma.systemSetting.upsert({
    where: { key: "integration.catalog" },
    update: { value: integrations },
    create: { key: "integration.catalog", value: integrations }
  });

  await prisma.featureFlag.upsert({
    where: { key: "visual_agent_builder" },
    update: { name: "Visual agent builder", description: "Enables the polished multi-step builder and workflow preview.", enabled: true },
    create: { key: "visual_agent_builder", name: "Visual agent builder", description: "Enables the polished multi-step builder and workflow preview.", enabled: true }
  });

  if (process.env.INITIAL_SUPER_ADMIN_EMAIL) {
    const superAdmin = await prisma.user.findUnique({ where: { email: process.env.INITIAL_SUPER_ADMIN_EMAIL.toLowerCase() } });
    if (superAdmin) {
      await prisma.organizationMember.updateMany({ where: { userId: superAdmin.id }, data: { role: "SUPER_ADMIN" } });
    }
  }
}

main().finally(() => prisma.$disconnect());

function inferGoal(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("booking") || lower.includes("appointment") || lower.includes("viewing")) return "Bookings";
  if (lower.includes("support") || lower.includes("faq") || lower.includes("refund")) return "Support";
  if (lower.includes("lead") || lower.includes("recommendation")) return "Sales";
  if (lower.includes("follow")) return "Follow-up";
  return "Operations";
}
