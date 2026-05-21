"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Database,
  FileText,
  LockKeyhole,
  MessageSquare,
  PlugZap,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, pricingPlans, templates, tools } from "@/lib/categent/content";

const flowSteps = ["Describe", "Plan", "Teach", "Test", "Launch"];
const buildTabs = [
  {
    title: "Describe the work",
    text: "Tell Categent what the agent should do in normal business language.",
    output: "Goal detected: support, order help, refund triage"
  },
  {
    title: "Choose suggested agent",
    text: "Categent recommends the category, template, questions, and knowledge needed.",
    output: "E-commerce · Customer Support Agent · 8 min setup"
  },
  {
    title: "Upload knowledge",
    text: "Add policies, catalogs, listings, FAQs, service docs, or paste business info.",
    output: "Refund Policy.pdf and Product Catalog.csv ready"
  },
  {
    title: "Review tools",
    text: "Approve only the tools and guardrails this agent is allowed to use.",
    output: "Knowledge Search, Support Ticket, Human Handoff"
  },
  {
    title: "Test and deploy",
    text: "Run behavior checks, inspect citations, then publish the widget with one script.",
    output: "Test passed · Widget ready · Domain protected"
  }
];

export function AgentOSHome() {
  return (
    <main className="bg-slate-950">
      <AiHeroSection />
      <AgentOSMetricStrip />
      <OldWayVsCategent />
      <InteractiveBuildSteps />
      <AgentBuilderPreview />
      <CategoryOSSection />
      <TemplateLibraryPreview />
      <ToolStorePreview />
      <KnowledgeStudioPreview />
      <TestLabPreview />
      <WidgetStudioPreview />
      <AdminControlPreview />
      <ModernPricingSection />
      <FinalAgentOSCTA />
    </main>
  );
}

export function AiHeroSection() {
  return (
    <section className="categent-gradient categent-grid relative overflow-hidden px-4 pb-20 pt-12 text-white md:pb-28">
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 xl:grid-cols-[0.86fr_1.14fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-glow">
              <Sparkles className="h-4 w-4" />
              Categent AI Agent OS
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }} className="mt-6 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              <span className="text-gradient">Build AI agents by describing the work.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.55 }} className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Categent turns your business goal into a tested AI agent with knowledge, tools, approvals, and a deployable website widget.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.55 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-6 text-white shadow-glow">
                <Link href="/dashboard/create-agent/ai-guided" className="no-underline">Build your first agent <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild className="h-12 rounded-xl border border-white/15 bg-white/10 px-6 text-white hover:bg-white/15">
                <Link href="#product-tour" className="no-underline">Watch product tour</Link>
              </Button>
            </motion.div>
          </div>
          <AgentCommandCenterMockup />
        </div>
      </div>
    </section>
  );
}

export function AgentCommandCenterMockup() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.65 }} className="soft-float relative rounded-[2rem] border border-white/12 bg-white/[0.06] p-3 shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur-xl">
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-4">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Agent Command Center</p>
            <h2 className="mt-1 text-xl font-black text-white">Describe the work. Categent builds the agent.</h2>
          </div>
          <span className="w-fit rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/20">Readiness 86%</span>
        </div>
        <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
            <p className="text-sm leading-6 text-cyan-50">I run an online store. I need an agent to answer product questions, explain refunds, and escalate order issues.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <AIOutputCard label="Category detected" value="E-commerce" icon={BadgeCheck} />
          <AIOutputCard label="Recommended template" value="Customer Support Agent" icon={Bot} />
          <AIOutputCard label="Knowledge needed" value="Refund policy, shipping policy, product catalog" icon={Database} />
          <AIOutputCard label="Tools suggested" value="Knowledge Search, Product Search, Support Ticket, Human Handoff" icon={PlugZap} />
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <div className="flex flex-wrap items-center gap-2">
            {flowSteps.map((step, index) => (
              <motion.div key={step} initial={{ opacity: 0.5 }} animate={{ opacity: [0.55, 1, 0.55] }} transition={{ delay: index * 0.22, duration: 2.8, repeat: Infinity }} className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-2 text-xs font-semibold text-slate-200 ring-1 ring-white/10">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                {step}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AIOutputCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function AgentOSMetricStrip() {
  const items = ["Category-first setup", "Blueprint generation", "Knowledge-grounded answers", "Tool permissions", "Human approvals", "Website widget"];
  return (
    <section className="border-y border-white/10 bg-slate-950 px-4 py-6">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-200">
            <CheckCircle2 className="mb-2 h-4 w-4 text-cyan-300" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function OldWayVsCategent() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">A better starting point</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Most agent builders start with a blank canvas. Categent starts with your business.</h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <WayPanel title="Old way" tone="red" items={["Write prompts manually", "Choose tools without guidance", "No category context", "Hard to test behavior", "Risky actions unclear", "Deployment is technical"]} />
          <WayPanel title="Categent way" tone="green" items={["Describe the work", "Get a recommended agent plan", "Upload business knowledge", "Tools and guardrails are suggested", "Test before launch", "Deploy with one script"]} />
        </div>
      </div>
    </section>
  );
}

function WayPanel({ title, items, tone }: { title: string; items: string[]; tone: "red" | "green" }) {
  return (
    <div className={`rounded-[2rem] border p-6 ${tone === "green" ? "border-emerald-300/20 bg-emerald-300/10" : "border-red-300/20 bg-red-300/10"}`}>
      <h3 className="text-2xl font-black text-white">{title}</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-slate-950/60 p-4 text-sm leading-6 text-slate-200 ring-1 ring-white/10">
            {tone === "green" ? <CheckCircle2 className="mb-2 h-4 w-4 text-emerald-300" /> : <ArrowRight className="mb-2 h-4 w-4 text-red-200" />}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function InteractiveBuildSteps() {
  const [active, setActive] = useState(0);
  const current = buildTabs[active];
  return (
    <section id="product-tour" className="mesh-band px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Build in 5 minutes</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">A guided product flow that feels like working with an operator.</h2>
          <div className="mt-8 grid gap-3">
            {buildTabs.map((tab, index) => (
              <button key={tab.title} type="button" onClick={() => setActive(index)} className={`rounded-2xl border p-4 text-left transition ${index === active ? "border-cyan-300/35 bg-cyan-300/10 text-white shadow-glow" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]"}`}>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Step {index + 1}</span>
                <span className="mt-1 block text-lg font-black">{tab.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-400">{tab.text}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="premium-card rounded-[2rem] p-4">
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Live product mockup</p>
                <h3 className="mt-1 text-2xl font-black">{current.title}</h3>
              </div>
              <BrainCircuit className="h-8 w-8 text-indigo-600" />
            </div>
            <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">{current.text}</p>
            <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-700">Categent output</p>
              <p className="mt-2 text-lg font-black text-slate-950">{current.output}</p>
            </div>
            <AgentFlowCanvas className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AgentBuilderPreview() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">AI Builder preview</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Chat with Categent, then review the live agent plan.</h2>
        </div>
        <div className="premium-card mt-10 grid gap-4 rounded-[2rem] p-4 lg:grid-cols-[0.9fr_1fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Builder chat</p>
            <ChatBubble role="user">I need a real estate agent that qualifies buyers and books viewing requests.</ChatBubble>
            <ChatBubble role="ai">Great. I will collect budget, location, property type, timeline, financing status, and contact details. Should viewing requests require approval?</ChatBubble>
          </div>
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Generated Agent Plan</p>
            <h3 className="mt-2 text-2xl font-black">Buyer Qualification Agent</h3>
            <div className="mt-5 grid gap-3">
              {["Ask budget, location, property type, and timeline", "Search uploaded listings and area notes", "Create lead with urgency and contact details", "Request viewing approval before booking", "Escalate high-budget leads"].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 ring-1 ring-slate-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Readiness checklist</p>
            {["Blueprint generated", "Knowledge needed", "Tools suggested", "Approval rules ready", "Tests prepared"].map((item, index) => (
              <div key={item} className="mt-3 rounded-xl bg-white/[0.06] p-3 text-sm text-slate-300 ring-1 ring-white/10">
                <span className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${index === 1 ? "bg-amber-300/20 text-amber-100" : "bg-emerald-300/20 text-emerald-100"}`}>{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ role, children }: { role: "user" | "ai"; children: React.ReactNode }) {
  return (
    <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${role === "user" ? "bg-cyan-300/10 text-cyan-50" : "bg-white/[0.07] text-slate-300"}`}>
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{role === "user" ? "You" : "Categent"}</p>
      {children}
    </div>
  );
}

export function CategoryOSSection() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Category OS</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Every category comes with templates, tools, questions, and safety rules.</h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={category.href} className="premium-card rounded-[1.5rem] p-5 text-white no-underline transition hover:-translate-y-1 hover:border-cyan-300/45">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400"><Icon className="h-6 w-6" /></span>
                  <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/20">Active</span>
                </div>
                <h3 className="mt-5 text-2xl font-black">{category.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{category.description}</p>
                <InfoLine label="Agents" value={category.exampleAgents.slice(0, 3).join(", ")} />
                <InfoLine label="Knowledge" value={category.knowledgeSources.slice(0, 3).join(", ")} />
                <InfoLine label="Guardrail" value={category.riskControls[0]} />
              </Link>
            );
          })}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {["Restaurant", "Education", "Healthcare", "Legal/accounting", "SaaS"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-400">{item} coming soon</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return <p className="mt-3 rounded-xl bg-white/[0.055] p-3 text-xs leading-5 text-slate-300 ring-1 ring-white/10"><span className="font-bold text-white">{label}:</span> {value}</p>;
}

export function TemplateLibraryPreview() {
  const blurbs: Record<string, string> = {
    "Customer Support Agent": "Answers FAQs, searches policies, captures support details, and escalates refunds.",
    "Buyer Lead Qualification Agent": "Collects budget, location, timeline, financing status, and contact details.",
    "Appointment Booking Agent": "Collects service needs and creates appointment requests for approval."
  };
  return (
    <section className="mesh-band px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Template library</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Templates that explain the business outcome.</h2>
          </div>
          <Button asChild className="h-11 rounded-xl bg-white text-slate-950 hover:bg-cyan-100">
            <Link href="/templates" className="no-underline">Browse templates</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.slice(0, 6).map((template) => (
            <div key={template.name} className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-100 ring-1 ring-indigo-300/20">{template.category}</span>
                <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">{template.setupTime}</span>
              </div>
              <h3 className="mt-4 text-lg font-black">{template.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{blurbs[template.name] ?? `Designed for ${template.goal.toLowerCase()} workflows with ${template.approval.toLowerCase()} approval controls.`}</p>
              <div className="mt-4 grid gap-2">
                <InfoLine label="Collects" value={template.name.includes("Buyer") ? "Budget, area, timeline, contact details" : template.name.includes("Support") ? "Issue, order number, email, urgency" : "Need, timing, contact details"} />
                <InfoLine label="Tools" value={template.tools.join(", ")} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ToolStorePreview() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Tool Store</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Give agents tools without giving up control.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">Agents can only use tools you enable. Every action is typed, logged, and governed by risk level.</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              {["Tool", "Agent can use", "Requires approval", "Logged"].map((head) => <span key={head} className="mr-3 inline-flex rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-slate-200">{head}</span>)}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {tools.slice(0, 10).map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-white">
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="h-5 w-5 text-cyan-300" />
                    <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-slate-300 ring-1 ring-white/10">{tool.risk}</span>
                  </div>
                  <h3 className="mt-3 font-black">{tool.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{tool.description}</p>
                  <p className="mt-3 text-xs text-cyan-200">{tool.approval ? "Approval required" : "Can run automatically"} · Logged</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function KnowledgeStudioPreview() {
  const files = [
    ["Refund Policy.pdf", "Ready"],
    ["Product Catalog.csv", "Embedded"],
    ["Listings.xlsx", "Processing"],
    ["Service FAQ.docx", "Uploaded"],
    ["Shipping Rules.md", "Cited in answer"]
  ];
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="premium-card rounded-[2rem] p-4">
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">Knowledge Studio</h3>
              <UploadCloud className="h-7 w-7 text-indigo-600" />
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 p-8 text-center">
              <p className="font-black">Drop PDFs, docs, CSVs, policies, catalogs, and FAQs</p>
              <p className="mt-2 text-sm text-slate-600">Categent chunks, embeds, searches, and cites trusted sources.</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {files.map(([file, status]) => (
                <div key={file} className="rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200">
                  <p className="font-semibold">{file}</p>
                  <p className="mt-1 text-xs text-indigo-600">{status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Knowledge-grounded answers</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Teach your agent what your business knows.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Upload PDFs, policies, product catalogs, property listings, service documents, and FAQs. Categent turns them into searchable knowledge and returns citations in answers.</p>
        </div>
      </div>
    </section>
  );
}

export function TestLabPreview() {
  return (
    <section className="mesh-band px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Test Lab</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Run agent evals before launch.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Check normal requests, missing information, risky asks, knowledge citations, tool calls, handoffs, and prompt injection attempts.</p>
        </div>
        <div className="premium-card rounded-[2rem] p-4">
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between"><h3 className="text-xl font-black">Refund escalation test</h3><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Passed</span></div>
            <div className="mt-4 rounded-xl bg-slate-100 p-3 text-sm">Can I get a refund if the product arrived damaged?</div>
            <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-sm leading-6 text-indigo-950">I can help. Please share your order number and a photo. I found the damaged-item policy and will create a support ticket. Refund approval is required before any refund is confirmed.</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {["Tool: support ticket", "Citation: refund policy", "Guardrail passed", "Approval required"].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-600">{item}</div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WidgetStudioPreview() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="premium-card rounded-[2rem] p-4">
          <div className="grid gap-4 rounded-2xl bg-slate-950 p-5 text-white md:grid-cols-[1fr_280px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Widget Studio</p>
              <h3 className="mt-2 text-2xl font-black">Deploy with one script</h3>
              <div className="mt-5 rounded-xl bg-black/50 p-4 text-xs leading-6 text-cyan-100">{`<script src="https://categent.com/api/widget.js" data-agent-id="AGENT_ID" data-public-key="PUBLIC_KEY"></script>`}</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Brand color", "Assistant name", "Welcome message", "Allowed domains"].map((item) => <div key={item} className="rounded-xl bg-white/[0.06] p-3 text-sm text-slate-300 ring-1 ring-white/10">{item}</div>)}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 text-slate-950">
              <p className="font-black">Website preview</p>
              <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-sm font-bold">Categent assistant</p>
                <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm text-slate-200">Hi, I can help with support, orders, and next steps.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Website widget</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Launch the agent where customers already are.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Customize the assistant, restrict domains, rotate keys, preview mobile and desktop, and monitor deployment health.</p>
        </div>
      </div>
    </section>
  );
}

export function AdminControlPreview() {
  const cards = ["Conversations", "Approvals", "Tool logs", "Knowledge sources", "Analytics", "Billing", "Team roles", "Audit logs"];
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Agent OS control</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Control every agent from one operating system.</h2>
        </div>
        <div className="premium-card mt-10 rounded-[2rem] p-4">
          <div className="grid gap-3 md:grid-cols-4">
            {cards.map((card, index) => (
              <div key={card} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-white">
                <p className="text-sm text-slate-400">{card}</p>
                <p className="mt-3 text-2xl font-black">{[284, 7, 916, "1.2k", "98%", "Pro", 4, "24h"][index]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ModernPricingSection() {
  return (
    <section className="mesh-band px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Pricing</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Start with one agent. Scale into an operating system.</h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`rounded-[1.5rem] border p-5 text-white ${plan.featured ? "border-cyan-300/40 bg-cyan-300/10 shadow-glow" : "border-white/10 bg-white/[0.045]"}`}>
              <p className="font-black">{plan.name}</p>
              <p className="mt-3 text-4xl font-black">{plan.price}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{plan.description}</p>
              <div className="mt-5 grid gap-2">
                {plan.features.slice(0, 5).map((feature) => <p key={feature} className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{feature}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalAgentOSCTA() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center text-white shadow-glow md:p-12">
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">Your first business agent is one description away.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">Describe the work, review the plan, upload knowledge, test behavior, and deploy with confidence.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-12 rounded-xl bg-white px-6 text-slate-950 hover:bg-cyan-100"><Link href="/dashboard/create-agent/ai-guided" className="no-underline">Build an agent</Link></Button>
          <Button asChild className="h-12 rounded-xl border border-white/15 bg-white/10 px-6 text-white hover:bg-white/15"><Link href="/templates" className="no-underline">Explore templates</Link></Button>
        </div>
      </div>
    </section>
  );
}

export function AgentFlowCanvas({ className = "" }: { className?: string }) {
  const nodes = [
    [MessageSquare, "Visitor message"],
    [ShieldCheck, "Moderation"],
    [Search, "Knowledge search"],
    [Workflow, "Intent classifier"],
    [PlugZap, "Tool decision"],
    [LockKeyhole, "Human approval"],
    [Bot, "Agent response"],
    [FileText, "Log event"]
  ];
  return (
    <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {nodes.map(([Icon, label], index) => (
        <div key={label as string} className="relative rounded-2xl border border-slate-200 bg-white p-3 text-center text-xs font-bold text-slate-700 shadow-soft">
          <Icon className="mx-auto mb-2 h-4 w-4 text-indigo-600" />
          {label as string}
          {index < nodes.length - 1 ? <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-indigo-300 lg:block" /> : null}
        </div>
      ))}
    </div>
  );
}
