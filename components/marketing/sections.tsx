import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedWorkflow } from "@/components/marketing/animated-workflow";
import {
  brand,
  categories,
  comingSoonCategories,
  integrations,
  pricingPlans,
  productCapabilities,
  securityControls,
  templates,
  tools,
  workflowSteps
} from "@/lib/categent/content";

export function GradientButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild className="h-12 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-6 text-white shadow-glow">
      <Link href={href} className="no-underline">
        {children}
      </Link>
    </Button>
  );
}

export function MarketingHeader() {
  const links = [
    ["/product", "Product"],
    ["/categories", "Categories"],
    ["/templates", "Templates"],
    ["/integrations", "Integrations"],
    ["/security", "Security"],
    ["/pricing", "Pricing"]
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-white no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-black">C</span>
          <span className="text-lg font-semibold">Categent</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {links.map(([href, label]) => <Link key={href} href={href} className="no-underline hover:text-white">{label}</Link>)}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm text-slate-300 no-underline hover:text-white sm:block">Log in</Link>
          <GradientButton href="/signup">Create agent</GradientButton>
        </div>
      </nav>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-10 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-black">C</span>
            <span className="text-lg font-semibold">Categent</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6">{brand.tagline} Built for self-hosted, knowledge-grounded, tool-controlled business agents.</p>
        </div>
        {[
          ["Product", ["/product", "/templates", "/integrations", "/security"]],
          ["Company", ["/pricing", "/contact", "/categories", "/dashboard"]],
          ["Platform", ["/login", "/signup", "/api/health", "/admin"]]
        ].map(([title, links]) => (
          <div key={title as string}>
            <p className="font-semibold text-white">{title as string}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {(links as string[]).map((href) => <Link key={href} href={href} className="capitalize no-underline hover:text-white">{href.replace("/", "") || "home"}</Link>)}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title, text, align = "left" }: { eyebrow?: string; title: string; text?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{text}</p> : null}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="categent-gradient categent-grid overflow-hidden px-4 pb-20 pt-10 text-white md:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
          <Sparkles className="h-4 w-4" />
          New: Build category-based AI agents with knowledge, tools, testing, and human approvals.
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <h1 className="max-w-5xl text-5xl font-black tracking-tight md:text-7xl">{brand.headline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">{brand.subheadline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GradientButton href="/signup">Create your first agent <ArrowRight className="h-4 w-4" /></GradientButton>
              <Button asChild className="h-12 border border-white/15 bg-white/10 px-6 text-white hover:bg-white/15">
                <Link href="/templates" className="no-underline">Explore templates</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {["Designed for support, sales, bookings, and operations", "Category packs for faster setup", "Human approvals for risky actions", "Knowledge-grounded answers"].map((metric) => (
                <div key={metric} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {metric}
                </div>
              ))}
            </div>
          </div>
          <AnimatedWorkflow />
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading align="center" eyebrow="How it works" title="From requirement to deployed agent" text="Categent turns business context into a governed AI agent system with testing, tools, and monitoring built in." />
        <div className="mt-12 grid gap-3 md:grid-cols-4">
          {workflowSteps.slice(0, 8).map((step, index) => (
            <div key={step} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white">
              <span className="text-sm font-semibold text-cyan-300">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Configure the {step.toLowerCase()} stage with guardrails and visibility.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoryCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link key={category.slug} href={category.href} className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white no-underline transition hover:-translate-y-1 hover:border-cyan-300/40">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500/15 text-cyan-200"><Icon className="h-6 w-6" /></div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">{category.status}</span>
            </div>
            <h3 className="mt-5 text-2xl font-bold">{category.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{category.description}</p>
            <div className="mt-5 grid gap-2 text-xs text-slate-300">
              <p><span className="text-white">Agents:</span> {category.exampleAgents.join(", ")}</p>
              <p><span className="text-white">Tools:</span> {category.recommendedTools.join(", ")}</p>
              <p><span className="text-white">Controls:</span> {category.riskControls[0]}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function CategorySection() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Category builder" title="Start with the business pattern, not a blank prompt" text="Every category carries templates, setup questions, recommended tools, knowledge requirements, and approval rules." />
        <div className="mt-10"><CategoryCards /></div>
        <div className="mt-5 flex flex-wrap gap-2">
          {comingSoonCategories.slice(0, 7).map((category) => <span key={category} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-400">{category} coming soon</span>)}
        </div>
      </div>
    </section>
  );
}

export function TemplateGrid({ limit }: { limit?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {templates.slice(0, limit).map((template) => (
        <div key={`${template.category}-${template.name}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs text-indigo-100">{template.category}</span>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300">{template.setupTime}</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold">{template.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{template.goal} workflow with {template.approval.toLowerCase()} approval level.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {template.tools.map((tool) => <span key={tool} className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">{tool}</span>)}
          </div>
          <Button asChild className="mt-5 w-full bg-white text-slate-950 hover:bg-cyan-100">
            <Link href="/dashboard/create-agent" className="no-underline">Use this template</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}

export function WorkflowPreview() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading align="center" eyebrow="Workflow visibility" title="Every agent run follows a visible control path" />
        <div className="mt-10 grid gap-3 md:grid-cols-4 lg:grid-cols-8">
          {["Start", "User Message", "Moderation", "Knowledge Search", "Tool Decision", "Human Approval", "Response", "Log Event"].map((node, index) => (
            <div key={node} className="relative rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-center text-sm font-semibold text-cyan-50">
              {node}
              {index < 7 ? <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-cyan-300/50 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ToolsSection() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Tool marketplace" title="Agents that act with guardrails" text="Tools are server-side, typed, logged, permissioned, and approval-aware." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-400/15 text-violet-100"><Icon className="h-5 w-5" /></div>
                  <span className="rounded-full bg-slate-900 px-2 py-1 text-xs text-slate-300">{tool.risk}</span>
                </div>
                <h3 className="mt-4 font-semibold">{tool.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{tool.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function KnowledgeSection() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1fr]">
        <SectionHeading eyebrow="Knowledge base" title="Knowledge-grounded answers with citations" text="Upload PDFs, docs, CSVs, policies, property listings, product catalogs, and FAQs. Categent chunks, embeds, retrieves, and cites source context for every relevant answer." />
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white">
          {["Upload files", "Extract text", "Chunk by sections", "Generate embeddings", "Search with pgvector", "Return citations"].map((item, index) => (
            <div key={item} className="flex items-center gap-4 border-b border-white/10 py-4 last:border-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-300/10 text-sm font-semibold text-cyan-200">{index + 1}</span>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Security and governance" title="Built for real business workflows" text="Categent is designed around tenant isolation, tool restrictions, approval flows, audit logs, and safe deployment keys." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {securityControls.map((control) => {
            const Icon = control.icon;
            return (
              <div key={control.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white">
                <Icon className="h-6 w-6 text-emerald-300" />
                <h3 className="mt-4 font-semibold">{control.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{control.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DashboardPreview() {
  const metrics = ["Active agents", "Conversations", "Messages", "Approvals", "Usage", "Deployment"];
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading align="center" eyebrow="Dashboard preview" title="Monitor every conversation, tool call, and approval" />
        <div className="mt-10 rounded-lg border border-white/10 bg-slate-900/70 p-4 shadow-glow">
          <div className="grid gap-3 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <div key={metric} className="rounded-md border border-white/10 bg-white/[0.04] p-4 text-white">
                <p className="text-sm text-slate-400">{metric}</p>
                <p className="mt-3 text-3xl font-bold">{[12, 284, 4830, 7, "68%", "Live"][index]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
            <div className="rounded-md border border-white/10 bg-slate-950/80 p-5">
              <p className="font-semibold text-white">Agent performance</p>
              <div className="mt-5 flex h-48 items-end gap-2">
                {[34, 48, 40, 58, 70, 64, 86, 78, 96].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-indigo-500 to-cyan-300" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-md border border-white/10 bg-slate-950/80 p-5 text-white">
              <p className="font-semibold">Recent activity</p>
              {["Tool call completed", "Approval requested", "Lead captured", "Widget deployed"].map((event) => (
                <div key={event} className="mt-4 rounded-md bg-white/[0.04] p-3 text-sm text-slate-300">{event}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingPreview() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading align="center" eyebrow="Pricing" title="Start small, scale with governed agents" />
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`rounded-lg border p-6 text-white ${plan.featured ? "border-cyan-300/50 bg-cyan-300/10 shadow-glow" : "border-white/10 bg-white/[0.04]"}`}>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              <p className="mt-5 text-4xl font-black">{plan.price}<span className="text-sm font-medium text-slate-400">/mo</span></p>
              <div className="mt-6 grid gap-3 text-sm text-slate-300">
                {plan.features.map((feature) => <p key={feature} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {feature}</p>)}
              </div>
              <Button asChild className="mt-6 w-full bg-white text-slate-950 hover:bg-cyan-100"><Link href="/signup" className="no-underline">{plan.cta}</Link></Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-5xl rounded-lg border border-cyan-300/20 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-cyan-400/10 p-10 text-center text-white shadow-glow">
        <h2 className="text-4xl font-black md:text-6xl">Launch your first AI agent today.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">Build the blueprint, test the behavior, approve risky actions, and deploy to your website with one script.</p>
        <div className="mt-8 flex justify-center"><GradientButton href="/signup">Create your first agent</GradientButton></div>
      </div>
    </section>
  );
}

export function CapabilityGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {productCapabilities.map((capability) => {
        const Icon = capability.icon;
        return (
          <div key={capability.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white">
            <Icon className="h-6 w-6 text-cyan-300" />
            <h3 className="mt-4 text-lg font-semibold">{capability.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{capability.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export function IntegrationGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {integrations.map((integration) => (
        <div key={`${integration.group}-${integration.name}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800 font-semibold">{integration.name.slice(0, 1)}</span>
            <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">{integration.status}</span>
          </div>
          <h3 className="mt-4 font-semibold">{integration.name}</h3>
          <p className="text-xs text-cyan-300">{integration.group}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{integration.description}</p>
        </div>
      ))}
    </div>
  );
}
