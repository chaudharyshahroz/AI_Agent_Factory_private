import { prisma } from "../lib/db/prisma";
import { categoryCatalog } from "../lib/categories/catalog";
import { toolRegistry } from "../lib/agents/tools/registry";

async function main() {
  for (const category of categoryCatalog) {
    const pack = await prisma.categoryPack.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description },
      create: { slug: category.slug, name: category.name, description: category.description }
    });
    for (const [slug, name, description] of category.templates) {
      await prisma.agentTemplate.upsert({
        where: { categoryPackId_slug: { categoryPackId: pack.id, slug } },
        update: { name, description },
        create: { categoryPackId: pack.id, slug, name, description }
      });
    }
    await prisma.setupQuestion.deleteMany({ where: { categoryPackId: pack.id } });
    await prisma.setupQuestion.createMany({
      data: category.questions.map((prompt, sortOrder) => ({ categoryPackId: pack.id, prompt, sortOrder }))
    });
  }

  for (const tool of toolRegistry.values()) {
    await prisma.toolDefinition.upsert({
      where: { name: tool.name },
      update: { description: tool.description, category: tool.category, riskLevel: tool.riskLevel, requiresApproval: Boolean(tool.requiresApproval), enabledByDefault: tool.enabledByDefault, inputSchema: {} },
      create: { name: tool.name, description: tool.description, category: tool.category, riskLevel: tool.riskLevel, requiresApproval: Boolean(tool.requiresApproval), enabledByDefault: tool.enabledByDefault, inputSchema: {} }
    });
  }
}

main().finally(() => prisma.$disconnect());
