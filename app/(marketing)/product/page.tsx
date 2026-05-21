import {
  AdminControlPreview,
  AgentBuilderPreview,
  FinalAgentOSCTA,
  InteractiveBuildSteps,
  KnowledgeStudioPreview,
  TestLabPreview,
  ToolStorePreview,
  WidgetStudioPreview
} from "@/components/marketing/agent-os";
import { SectionHeading } from "@/components/marketing/sections";

export default function ProductPage() {
  return (
    <main className="bg-slate-950">
      <section className="categent-gradient px-4 py-20">
        <SectionHeading align="center" eyebrow="Product" title="Categent AI Agent OS" text="Agent Builder, Agent Blueprint, Knowledge Studio, Tool Store, Test Lab, Widget Studio, Human Approvals, Agent Inbox, Analytics, and Admin Control Center in one self-hosted platform." />
      </section>
      <InteractiveBuildSteps />
      <AgentBuilderPreview />
      <KnowledgeStudioPreview />
      <ToolStorePreview />
      <TestLabPreview />
      <WidgetStudioPreview />
      <AdminControlPreview />
      <FinalAgentOSCTA />
    </main>
  );
}
