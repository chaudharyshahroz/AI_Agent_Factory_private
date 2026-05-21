import Link from "next/link";
import type { ReactNode } from "react";
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileUp,
  GitBranch,
  LayoutTemplate,
  ListChecks,
  MessageSquare,
  PlugZap,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/dashboard/primitives";
import { buildProgress, categories, templates, tools, workflowSteps } from "@/lib/categent/content";

const creationModes = [
  {
    href: "/dashboard/create-agent/ai-guided",
    title: "AI Guided Build",
    badge: "Recommended",
    icon: Sparkles,
    text: "Chat with Categent. Describe what you want and we will recommend the category, template, tools, and approval rules.",
    points: ["Start with one description", "Live Agent Plan", "Minimal questions"]
  },
  {
    href: "/dashboard/create-agent/template",
    title: "Template Build",
    badge: "Fast",
    icon: LayoutTemplate,
    text: "Start from a proven agent template for your business category.",
    points: ["Choose category", "Pick template", "Generate quickly"]
  },
  {
    href: "/dashboard/create-agent/advanced",
    title: "Advanced Build",
    badge: "Power",
    icon: SlidersHorizontal,
    text: "Edit blueprint, tools, workflow, approval rules, and deployment settings manually.",
    points: ["Blueprint editor", "Tool permissions", "Workflow canvas"]
  }
];

export function BuildModeSelector() {
  return <AiGuidedBuilder />;
}

export function QuickLaunchFlow() {
  return <AiGuidedBuilder compactHero />;
}

export function AgentCreationHub() {
  return (
    <div>
      <BuilderHero
        eyebrow="Agent Creation Hub"
        title="Start with the work, then choose your level of control."
        text="Use the AI-guided path for a plain-language build, launch from a proven category template, or open the advanced builder when you want full blueprint control."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {creationModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Link key={mode.title} href={mode.href} className="group no-underline">
              <Card className={`h-full rounded-3xl border p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)] ${mode.badge === "Recommended" ? "border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-cyan-50" : "border-slate-200 bg-white"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-200 shadow-glow"><Icon className="h-6 w-6" /></span>
                  <StatusBadge tone={mode.badge === "Recommended" ? "blue" : "slate"}>{mode.badge}</StatusBadge>
                </div>
                <h2 className="mt-6 text-2xl font-black text-slate-950">{mode.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{mode.text}</p>
                <div className="mt-5 grid gap-2">
                  {mode.points.map((point) => (
                    <span key={point} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">Start build <ArrowLinkIcon /></div>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm leading-6 text-slate-600 shadow-soft">
        Default recommendation: <span className="font-semibold text-slate-950">AI Guided Build</span>. Normal users can describe the work and let Categent recommend the category, template, tools, questions, and guardrails.
      </div>
    </div>
  );
}

export function AiGuidedBuilder({ compactHero = false }: { compactHero?: boolean }) {
  return (
    <div>
      {!compactHero ? (
        <BuilderHero
          eyebrow="AI Guided Build"
          title="What do you want your AI agent to do?"
          text="Describe the work. Categent recommends the category, template, tools, approval rules, knowledge needed, and test cases before you generate the agent."
        />
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[260px_1fr_360px]">
        <BuilderProgressRail />
        <div className="grid gap-6">
          <BuilderStep number="01" icon={MessageSquare} title="Describe the work in one sentence.">
            <Textarea className="min-h-32 bg-white text-base" placeholder="Example: I want an agent for my online store that answers product questions, explains refunds, and creates support tickets." />
            <div className="mt-4 flex flex-wrap gap-2">
              {["Answer customer questions", "Capture leads", "Book appointments", "Recommend products", "Handle support", "Help with orders", "Qualify real estate buyers", "Onboard clients"].map((chip) => (
                <span key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-soft">{chip}</span>
              ))}
            </div>
          </BuilderStep>

          <BuilderStep number="02" icon={BrainCircuit} title="Categent recommends an Agent Plan.">
            <GeneratedAgentPlan />
          </BuilderStep>

          <BuilderStep number="03" icon={ClipboardCheck} title="Answer only the missing questions.">
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                What do you sell or provide?
                <Input className="h-12 bg-white text-base" placeholder="Example: skincare products, property listings, marketing services" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                What policy or rule should the agent know first?
                <Textarea className="min-h-24 bg-white text-base" placeholder="Example: refunds require order number, photo, and human approval before confirmation." />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                What should it never do?
                <Textarea className="min-h-24 bg-white text-base" placeholder="Example: Do not promise refunds, change orders, give legal advice, or make guarantees." />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                What information should it collect?
                <Input className="h-12 bg-white text-base" placeholder="Example: Name, email, order number, issue, budget, location, phone" />
              </label>
              <div>
                <p className="mb-3 text-sm font-semibold text-slate-700">What should require human approval?</p>
                <CheckboxGrid items={["Refunds", "Bookings", "Sending messages", "Price quotes", "CRM updates", "Anything risky"]} />
              </div>
            </div>
          </BuilderStep>

          <BuilderStep number="04" icon={FileUp} title="Upload knowledge or paste business info.">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
              <UploadDropzone />
              <div className="grid gap-3">
                <Textarea className="min-h-36 bg-white text-base" placeholder="Paste FAQs, policies, services, product details, pricing notes, locations, booking rules, or anything the agent should know." />
                <Input className="h-12 bg-white text-base" placeholder="Add website URL for later import, e.g. https://example.com/help" />
                <Button variant="outline" className="h-12 bg-white">Skip for now</Button>
              </div>
            </div>
          </BuilderStep>

          <BuilderStep number="05" icon={PlugZap} title="Review recommended tools and guardrails.">
            <ToolRecommendationCards />
            <ApprovalPolicySelector />
          </BuilderStep>

          <BuilderStep number="06" icon={Database} title="Generate the agent blueprint.">
            <BlueprintGenerationAnimation />
          </BuilderStep>

          <BuilderStep number="07" icon={ListChecks} title="Review Agent Plan.">
            <AgentPlanReview />
          </BuilderStep>

          <details className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Optional</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">Advanced settings</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">Tools, approval rules, blueprint instructions, test cases, and deployment settings are available when you need more control.</p>
              </div>
              <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-cyan-200 transition group-open:bg-indigo-600">Open</span>
            </summary>
            <div className="mt-5 grid gap-5">
              <ToolSelectionStep advanced />
              <ApprovalRulesStep />
              <BlueprintReviewStep advanced />
              <AgentTestStep advanced />
              <DeployStep advanced />
            </div>
          </details>
        </div>
        <BeginnerSummary />
      </div>
      <MobileBuilderFooter href="/dashboard/create-agent/advanced" label="Advanced" primaryLabel="Generate agent" />
    </div>
  );
}

function ArrowLinkIcon() {
  return <span className="transition group-hover:translate-x-1">→</span>;
}

export function GuidedBuilderFlow() {
  return (
    <div>
      <BuilderHero eyebrow="Guided Builder" title="Build a production-ready agent one clear step at a time." text="Choose the category, select a template, describe the workflow, upload knowledge, choose tools, generate the blueprint, test it, then deploy." />
      <div className="grid gap-6 xl:grid-cols-[280px_1fr_340px]">
        <BuilderProgress />
        <div className="grid gap-6">
          <CategorySelector />
          <TemplateSelector />
          <WorkflowDescriptionStep />
          <DynamicQuestionsStep />
          <KnowledgeUploadStep />
          <ToolSelectionStep />
          <ApprovalRulesStep />
          <BlueprintGenerationStep />
          <BlueprintReviewStep />
          <VisualWorkflowPreview />
          <AgentTestStep />
          <DeployStep />
        </div>
        <LiveAgentPreview />
      </div>
      <MobileBuilderFooter href="/dashboard/create-agent/quick" label="Back to build modes" />
    </div>
  );
}

export function TemplateBuilderFlow() {
  return (
    <div>
      <BuilderHero
        eyebrow="Template Build"
        title="Start from a proven agent template."
        text="Choose a category, pick a real business playbook, answer five focused questions, upload knowledge, then generate, test, and deploy."
      />
      <div className="grid gap-6 xl:grid-cols-[280px_1fr_340px]">
        <BuilderProgress />
        <div className="grid gap-6">
          <CategorySelector />
          <TemplateSelector />
          <BuilderStep number="03" icon={ClipboardCheck} title="Answer five focused setup questions.">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "What should this agent accomplish?",
                "What business information should it collect?",
                "What knowledge should it rely on?",
                "What should require human approval?",
                "What should the agent never promise?"
              ].map((question) => (
                <label key={question} className="grid gap-2 text-sm font-semibold text-slate-700">
                  {question}
                  <Input className="h-12 bg-white" placeholder="Type a short answer" />
                </label>
              ))}
            </div>
          </BuilderStep>
          <KnowledgeUploadStep />
          <BlueprintGenerationStep />
          <AgentTestStep />
          <DeployStep />
        </div>
        <LiveAgentPreview />
      </div>
      <MobileBuilderFooter href="/dashboard/create-agent/ai-guided" label="AI guided" primaryLabel="Generate" />
    </div>
  );
}

export function AdvancedBuilderFlow() {
  return (
    <div>
      <BuilderHero eyebrow="Advanced Builder" title="Tune the blueprint, tools, approvals, workflow, tests, and deployment settings directly." text="For operators who want complete control over instructions, tool permissions, risk rules, visual flow, test coverage, and widget deployment." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <BlueprintReviewStep advanced />
        <ToolSelectionStep advanced />
        <VisualWorkflowPreview advanced />
        <AgentTestStep advanced />
        <DeployStep advanced />
      </div>
      <MobileBuilderFooter href="/dashboard/create-agent/guided" label="Use guided builder" />
    </div>
  );
}

function BuilderHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="mb-8 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-[0_26px_90px_rgba(15,23,42,0.22)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">{text}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Blueprint readiness</span>
            <span className="font-bold text-cyan-200">92%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" /></div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
            {["Knowledge ready", "Tools selected", "Tests prepared", "Widget ready"].map((item) => <span key={item} className="rounded-lg bg-white/[0.06] px-2 py-2">{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuilderProgress() {
  const steps = ["Category", "Template", "Workflow", "Questions", "Knowledge", "Tools", "Approvals", "Blueprint", "Test", "Deploy"];
  return (
    <aside className="sticky top-24 hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft xl:block">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Progress</p>
      <div className="mt-4 grid gap-2">
        {steps.map((step, index) => (
          <a key={step} href={`#builder-${index + 1}`} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 no-underline hover:bg-indigo-50">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-cyan-200">{index + 1}</span>
            {step}
          </a>
        ))}
      </div>
    </aside>
  );
}

function BuilderProgressRail() {
  const steps = ["Describe", "Plan", "Questions", "Knowledge", "Tools", "Generate", "Review", "Test", "Launch"];
  return (
    <aside className="sticky top-24 hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft xl:block">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">AI Guided Build</p>
      <div className="mt-4 grid gap-2">
        {steps.map((step, index) => (
          <div key={step} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${index < 2 ? "bg-indigo-50 text-indigo-800" : "text-slate-600"}`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-cyan-200">{index + 1}</span>
            {step}
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500 ring-1 ring-slate-200">Mobile users see this as a simplified one-column wizard with sticky actions.</p>
    </aside>
  );
}

function BuilderStep({ id, number, icon: Icon, title, children }: { id?: string; number: string; icon: React.ComponentType<{ className?: string }>; title: string; children: ReactNode }) {
  return (
    <Card id={id} className="premium-light-card rounded-2xl p-5 md:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-glow"><Icon className="h-5 w-5" /></span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Step {number}</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{title}</h2>
        </div>
      </div>
      {children}
    </Card>
  );
}

function GeneratedAgentPlan() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Recommended plan</p>
        <h3 className="mt-2 text-2xl font-black text-slate-950">E-commerce Customer Support Agent</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Answers product and policy questions, creates support tickets, and escalates refunds or order changes for approval.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Category", "E-commerce"],
            ["Template", "Customer Support Agent"],
            ["Knowledge", "Refund policy, shipping policy, product catalog"],
            ["Approvals", "Refunds and order changes"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-white p-3 text-sm ring-1 ring-indigo-100">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
              <p className="mt-1 font-bold text-slate-950">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">What happens next</p>
        <div className="mt-4 grid gap-3">
          {["Ask only missing questions", "Upload knowledge or paste info", "Review recommended tools", "Generate blueprint and tests"].map((item) => (
            <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 ring-1 ring-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolRecommendationCards() {
  const recommended = tools.slice(0, 7);
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {recommended.map((tool) => {
        const Icon = tool.icon;
        return (
          <label key={tool.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-cyan-200"><Icon className="h-5 w-5" /></span>
              <input className="mt-1 h-5 w-5 accent-indigo-600" type="checkbox" defaultChecked />
            </div>
            <h3 className="mt-3 font-black text-slate-950">{tool.label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
            <p className="mt-3 text-xs font-semibold text-indigo-600">{tool.risk} risk · {tool.approval ? "Approval required" : "Safe to run"}</p>
          </label>
        );
      })}
    </div>
  );
}

function ApprovalPolicySelector() {
  return (
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {[
        ["Safe", "More approvals", "Best for refunds, bookings, outbound messages, and sensitive workflows."],
        ["Balanced", "Recommended", "Lets low-risk tools run while pausing high-risk actions for review."],
        ["Aggressive", "Fewer approvals", "For experienced operators with tight playbooks and lower-risk tasks."]
      ].map(([name, badge, text], index) => (
        <label key={name} className={`rounded-2xl border p-4 shadow-soft ${index === 1 ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white"}`}>
          <input className="sr-only" type="radio" name="approvalPolicy" defaultChecked={index === 1} />
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black text-slate-950">{name}</h3>
            <StatusBadge tone={index === 1 ? "blue" : "slate"}>{badge}</StatusBadge>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </label>
      ))}
    </div>
  );
}

function BlueprintGenerationAnimation() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {buildProgress.map((step, index) => (
        <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-soft">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-700">{index + 1}</span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

function AgentPlanReview() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Agent identity</p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">Store Support Agent</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Resolves common support questions, cites business knowledge, creates tickets, and pauses risky requests for approval.</p>
          </div>
          <StatusBadge tone="green">Readiness 86%</StatusBadge>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Can answer product and policy questions",
            "Will never promise refunds or legal/financial advice",
            "Collects name, email, order number, issue, and urgency",
            "Uses Knowledge Search, Support Ticket, Human Handoff",
            "Requires approval for refunds and order changes",
            "Includes suggested tests and deployment checklist"
          ].map((item) => (
            <div key={item} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700 ring-1 ring-slate-200">{item}</div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Next actions</p>
        <div className="mt-4 grid gap-3">
          <Button className="h-11 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">Test this agent</Button>
          <Button variant="outline" className="h-11 bg-white">Edit plan</Button>
          <Button variant="outline" className="h-11 bg-white">Save draft</Button>
        </div>
      </div>
    </div>
  );
}

function CategorySelector() {
  return (
    <BuilderStep id="builder-1" number="01" icon={Bot} title="Pick the business type so Categent loads the right templates, tools, questions, and safety rules.">
      <div className="grid gap-4 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-cyan-200"><Icon className="h-5 w-5" /></span>
                <StatusBadge tone="green">Active</StatusBadge>
              </div>
              <h3 className="mt-4 font-black">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <p className="mt-3 text-xs font-semibold text-indigo-600">Best for: {category.exampleAgents.slice(0, 2).join(", ")}</p>
            </div>
          );
        })}
      </div>
    </BuilderStep>
  );
}

function TemplateSelector() {
  return (
    <BuilderStep id="builder-2" number="02" icon={Sparkles} title="Choose the closest starting playbook. You can adjust it later.">
      <div className="mb-4 flex flex-wrap gap-2">
        {["Support", "Sales", "Bookings", "Operations", "Knowledge"].map((goal) => <span key={goal} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">{goal}</span>)}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.slice(0, 6).map((template, index) => (
          <div key={template.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between gap-2"><StatusBadge tone={index === 0 ? "blue" : "slate"}>{index === 0 ? "Recommended" : template.goal}</StatusBadge><StatusBadge>{template.approval}</StatusBadge></div>
            <h3 className="mt-4 font-black">{template.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{template.setupTime} setup · Tools: {template.tools.join(", ")}</p>
          </div>
        ))}
      </div>
    </BuilderStep>
  );
}

function WorkflowDescriptionStep() {
  return (
    <BuilderStep id="builder-3" number="03" icon={MessageSquare} title="Describe the workflow in normal language.">
      <Textarea className="min-h-36 bg-white text-base" placeholder="Example: Answer customer questions, search store policies, capture support details, and escalate refund requests for approval." />
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {["Answer customer questions and escalate refund requests", "Qualify real estate buyers and collect budget/location", "Capture leads and book consultation calls", "Recommend products from my uploaded catalog"].map((prompt) => (
          <button key={prompt} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm text-slate-600 hover:border-indigo-300 hover:bg-indigo-50">{prompt}</button>
        ))}
      </div>
    </BuilderStep>
  );
}

function DynamicQuestionsStep() {
  return (
    <BuilderStep id="builder-4" number="04" icon={ClipboardCheck} title="Answer a few business-specific questions.">
      <div className="grid gap-4 md:grid-cols-2">
        {["What products or services do you offer?", "What should the agent never promise?", "Which contact fields should it collect?", "What tone should the agent use?"].map((question) => (
          <label key={question} className="grid gap-2 text-sm font-semibold text-slate-700">
            {question}
            <Input className="h-12 bg-white" placeholder="Type your answer" />
          </label>
        ))}
      </div>
    </BuilderStep>
  );
}

function KnowledgeUploadStep() {
  return (
    <BuilderStep id="builder-5" number="05" icon={FileUp} title="Upload the knowledge your agent should trust.">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
        <UploadDropzone />
        <div className="grid gap-3">
          {[
            ["Refund Policy.pdf", "Ready", "42 chunks"],
            ["Product Catalog.csv", "Processing", "68%"],
            ["Shipping FAQ.md", "Ready", "18 chunks"]
          ].map(([name, status, detail]) => (
            <div key={name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between gap-3"><p className="font-semibold">{name}</p><StatusBadge tone={status === "Ready" ? "green" : "amber"}>{status}</StatusBadge></div>
              <p className="mt-2 text-sm text-slate-500">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </BuilderStep>
  );
}

function ToolSelectionStep({ advanced = false }: { advanced?: boolean }) {
  return (
    <BuilderStep id="builder-6" number="06" icon={PlugZap} title={advanced ? "Manage every tool permission and risk rule." : "Choose what the agent is allowed to do."}>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tools.slice(0, advanced ? 12 : 8).map((tool) => {
          const Icon = tool.icon;
          return (
            <label key={tool.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-cyan-200"><Icon className="h-5 w-5" /></span>
                <input className="mt-1 h-5 w-5 accent-indigo-600" type="checkbox" defaultChecked={tool.risk !== "CRITICAL"} />
              </div>
              <h3 className="mt-3 font-black">{tool.label}</h3>
              <p className="mt-1 text-xs text-slate-500">{tool.risk} risk · {tool.approval ? "Human approval required" : "Can run automatically"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
            </label>
          );
        })}
      </div>
    </BuilderStep>
  );
}

function ApprovalRulesStep() {
  return (
    <BuilderStep id="builder-7" number="07" icon={ShieldCheck} title="Set simple approval rules for anything risky.">
      <CheckboxGrid items={["Require approval for high-risk actions", "Require approval before bookings", "Require approval before outbound messages", "Require approval before refunds", "Require approval before CRM updates"]} />
    </BuilderStep>
  );
}

function BlueprintGenerationStep() {
  return (
    <BuilderStep id="builder-8" number="08" icon={Database} title="Generate the AI Agent Blueprint.">
      <div className="grid gap-4 lg:grid-cols-2">
        {buildProgress.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-700">{index + 1}</span>
            {step}
          </div>
        ))}
      </div>
    </BuilderStep>
  );
}

function BlueprintReviewStep({ advanced = false }: { advanced?: boolean }) {
  return (
    <BuilderStep id="builder-9" number="09" icon={BrainCircuit} title={advanced ? "Advanced blueprint editor" : "Review the generated blueprint before testing."}>
      <div className="mb-4 flex flex-wrap gap-2">{["Overview", "Instructions", "Tools", "Approval rules", "Test cases", "Deployment plan"].map((tab) => <span key={tab} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 ring-1 ring-slate-200">{tab}</span>)}</div>
      <div className="rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-cyan-100 shadow-soft">
        <pre className="max-h-72 overflow-auto">{`{
  "agentName": "Customer Support Agent",
  "businessGoal": "Resolve common support questions and escalate refunds safely",
  "tone": "Helpful, concise, policy-aware",
  "allowedActions": ["answer_questions", "create_ticket", "capture_lead"],
  "restrictedActions": ["issue_refund", "change_order", "send_external_message"],
  "approvalRequiredFor": ["refund", "booking", "outbound_message"],
  "readinessChecklist": ["blueprint", "knowledge", "tools", "tests", "deployment"]
}`}</pre>
      </div>
    </BuilderStep>
  );
}

function VisualWorkflowPreview({ advanced = false }: { advanced?: boolean }) {
  const nodes = advanced ? ["Start", "Moderation", "Knowledge", "Tool router", "Approval", "Response", "Audit log", "End"] : workflowSteps;
  return (
    <BuilderStep id="builder-10" number="10" icon={GitBranch} title="See the workflow before it goes live.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node, index) => (
          <div key={node} className="rounded-2xl border border-indigo-200 bg-white p-4 text-center text-sm font-bold text-slate-800 shadow-soft">
            <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">{index + 1}</span>
            {node}
          </div>
        ))}
      </div>
    </BuilderStep>
  );
}

function AgentTestStep({ advanced = false }: { advanced?: boolean }) {
  return (
    <BuilderStep id="builder-11" number="11" icon={MessageSquare} title="Test the agent with citations, tools, and approval checks.">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="font-black">Chat playground</p>
          <div className="mt-4 rounded-xl bg-slate-100 p-3 text-sm">Can I get a refund on an opened item?</div>
          <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-sm text-indigo-950">I can explain the policy and collect details, but refunds need human approval first. Citation: Refund Policy.pdf</div>
          <Input className="mt-4 h-12 bg-white" placeholder="Type a test message" />
        </div>
        <div className="grid gap-3">
          {(advanced ? ["Tool call: support ticket", "Citation used: refund-policy.pdf", "Approval: refund request", "Manual rating: pass"] : ["Suggested test passed", "Citation returned", "Approval triggered"]).map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-soft">{item}</div>
          ))}
        </div>
      </div>
    </BuilderStep>
  );
}

function DeployStep({ advanced = false }: { advanced?: boolean }) {
  return (
    <BuilderStep id="builder-12" number="12" icon={Rocket} title="Deploy the widget with a public key and approved domain.">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          <div className="rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-cyan-100 shadow-soft">{`<script src="https://categent.com/api/widget.js" data-agent-id="AGENT_ID" data-public-key="PUBLIC_KEY"></script>`}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input className="h-12 bg-white" placeholder="Allowed domain, e.g. example.com" />
            <Input className="h-12 bg-white" placeholder="Welcome message" defaultValue={advanced ? "How can I help today?" : undefined} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="font-black">Widget preview</p>
          <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-sm font-semibold">Categent assistant</p>
            <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm text-slate-200">Hi, I can help with support, bookings, and next steps.</p>
          </div>
          <Button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">Copy script</Button>
        </div>
      </div>
    </BuilderStep>
  );
}

function LiveAgentPreview() {
  return (
    <aside className="sticky top-24 hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft xl:block">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Live preview</p>
      <h3 className="mt-3 text-xl font-black">Customer Support Agent</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">Knowledge-grounded support with lead capture, human handoff, support ticket logging, and refund approvals.</p>
      <div className="mt-4 grid gap-2">
        {["Readiness 92%", "Tools 5 enabled", "Approvals high-risk", "Widget ready"].map((item) => <div key={item} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700 ring-1 ring-slate-200">{item}</div>)}
      </div>
    </aside>
  );
}

function BeginnerSummary() {
  return (
    <aside className="sticky top-24 h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Ready to generate</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Categent will create the first draft for you.</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">The default path keeps only the essentials visible. You can test and edit the blueprint before anything is deployed.</p>
      <div className="mt-5 grid gap-3 text-sm">
        {[
          "Goal: answer questions first",
          "Business type: e-commerce",
          "Tools: auto-selected safely",
          "Approvals: risky actions paused",
          "Output: draft agent, blueprint, tests"
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-slate-700 ring-1 ring-slate-200">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            {item}
          </div>
        ))}
      </div>
      <Button className="mt-5 h-12 w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-glow">Generate my agent</Button>
      <p className="mt-3 text-center text-xs leading-5 text-slate-500">You stay in control: review, test, then deploy when ready.</p>
    </aside>
  );
}

function UploadDropzone() {
  return (
    <div className="rounded-2xl border border-dashed border-indigo-300 bg-indigo-50/70 p-7 text-center">
      <FileUp className="mx-auto h-10 w-10 text-indigo-600" />
      <h3 className="mt-3 font-black text-slate-950">Drop PDFs, DOCX, CSV, TXT, or MD files</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Policies, catalogs, listings, FAQs, service pages, onboarding docs, and support notes all work here.</p>
      <Button className="mt-5 bg-white text-slate-950 hover:bg-indigo-50">Choose files</Button>
    </div>
  );
}

function CheckboxGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <label key={item} className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-soft">
          <input className="h-5 w-5 accent-indigo-600" type="checkbox" defaultChecked={index < 3} />
          {item}
        </label>
      ))}
    </div>
  );
}

function MobileBuilderFooter({ href, label, primaryLabel = "Continue" }: { href: string; label: string; primaryLabel?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-18px_50px_rgba(15,23,42,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl gap-3">
        <Button asChild variant="outline" className="h-12 flex-1 bg-white"><Link href={href} className="no-underline">{label}</Link></Button>
        <Button className="h-12 flex-1 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">{primaryLabel}</Button>
      </div>
    </div>
  );
}
