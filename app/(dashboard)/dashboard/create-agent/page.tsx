export const dynamic = "force-dynamic";

import Link from "next/link";
import { Bot, Database, FileUp, GitBranch, MessageSquare, PlugZap, Rocket, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, StatusBadge } from "@/components/dashboard/primitives";
import { buildProgress, categories, comingSoonCategories, templates, tools, workflowSteps } from "@/lib/categent/content";

export default function CreateAgentPage() {
  return (
    <div>
      <PageHeader title="Create an AI agent" text="Choose a business category, then Categent will guide you through templates, workflow description, setup questions, knowledge, tools, blueprint generation, testing, and deployment." />
      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_220px_220px]">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-500 shadow-soft"><Search className="h-4 w-4 text-indigo-500" /> Search categories and use cases</div>
        <div className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-500 shadow-soft">Goal: Support / Sales</div>
        <div className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-500 shadow-soft">Risk: Approval aware</div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.slug} href={`/dashboard/create-agent/${category.slug}`} className="no-underline">
              <Card className="premium-light-card group h-full rounded-xl transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-glow"><Icon className="h-6 w-6" /></span>
                  <StatusBadge tone="green">Active</StatusBadge>
                </div>
                <h2 className="mt-5 text-xl font-bold">{category.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{category.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{category.exampleAgents.slice(0, 3).map((agent) => <span key={agent} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">{agent}</span>)}</div>
                <div className="mt-5 rounded-md bg-slate-950 p-3 text-xs text-slate-300">
                  <span className="font-semibold text-cyan-200">Guardrail:</span> {category.riskControls[0]}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      <h2 className="mt-10 text-2xl font-bold">Coming soon</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">{comingSoonCategories.map((category) => <div key={category} className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm text-slate-500 shadow-soft">{category}</div>)}</div>
      <section className="mt-10 grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="premium-card sticky top-24 hidden h-fit rounded-xl p-5 text-white xl:block">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Builder stages</p>
          <div className="mt-5 grid gap-2">
            {["Category", "Template", "Workflow", "Questions", "Knowledge", "Tools", "Blueprint", "Flow", "Test", "Deploy"].map((step, index) => (
              <a key={step} href={`#builder-${index + 1}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300 no-underline hover:bg-white/[0.08]">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-300/10 text-xs text-cyan-200">{index + 1}</span>
                {step}
              </a>
            ))}
          </div>
        </aside>
        <div className="grid gap-6">
          <BuilderPanel id="builder-2" icon={Bot} eyebrow="Step 2" title="Template selection with filters">
            <div className="grid gap-4 lg:grid-cols-3">
              {templates.slice(0, 6).map((template) => (
                <div key={template.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
                  <div className="flex items-center justify-between gap-2"><StatusBadge tone="blue">{template.goal}</StatusBadge><StatusBadge>{template.approval}</StatusBadge></div>
                  <h3 className="mt-4 font-bold">{template.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{template.setupTime} setup · {template.tools.join(", ")}</p>
                </div>
              ))}
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-3" icon={Sparkles} eyebrow="Step 3" title="Natural-language workflow description">
            <Textarea className="min-h-36 bg-white" placeholder="Tell Categent what the agent should do, what information it should collect, which tools it may use, and what must require approval." />
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {["Qualify leads, collect budget and timeline, then create a CRM contact.", "Answer refund policy questions and escalate refund requests to a human.", "Match buyers to uploaded listings and request approved viewings.", "Book service consultations only after owner approval."].map((prompt) => (
                <button key={prompt} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-left text-sm text-slate-600 hover:border-indigo-200">{prompt}</button>
              ))}
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-4" icon={MessageSquare} eyebrow="Step 4" title="Dynamic setup questions">
            <div className="grid gap-3 md:grid-cols-2">
              {["What should this agent never promise?", "Which actions require human approval?", "What lead/contact fields are required?", "What tone should the agent use?"].map((question) => (
                <label key={question} className="grid gap-2 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700">{question}<Input placeholder="Answer" /></label>
              ))}
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-5" icon={FileUp} eyebrow="Step 5" title="Knowledge upload and processing">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
              <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/70 p-8 text-center">
                <FileUp className="mx-auto h-10 w-10 text-indigo-600" />
                <h3 className="mt-3 font-bold">Drop PDFs, DOCX, CSV, TXT, or MD files</h3>
                <p className="mt-2 text-sm text-slate-500">Upload policies, catalogs, listings, FAQs, and onboarding docs.</p>
              </div>
              <div className="grid gap-3">
                {["refund-policy.pdf · embedded", "shipping-faq.md · ready", "product-catalog.csv · processing"].map((file) => (
                  <div key={file} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">{file}</div>
                ))}
              </div>
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-6" icon={PlugZap} eyebrow="Step 6" title="Tool marketplace and permissions">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {tools.slice(0, 9).map((tool) => {
                const Icon = tool.icon;
                return (
                  <label key={tool.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-cyan-200"><Icon className="h-5 w-5" /></span>
                      <input type="checkbox" defaultChecked={tool.risk !== "CRITICAL"} />
                    </div>
                    <h3 className="mt-3 font-bold">{tool.label}</h3>
                    <p className="mt-1 text-xs text-slate-500">{tool.risk} risk · {tool.approval ? "approval required" : "automatic"}</p>
                  </label>
                );
              })}
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-7" icon={Database} eyebrow="Step 7-8" title="Blueprint generation, preview, and editor">
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1fr]">
              <div className="premium-card rounded-xl p-5 text-white">
                <p className="font-bold">Animated generation</p>
                <div className="mt-4 grid gap-2">
                  {buildProgress.map((step) => <div key={step} className="rounded-md bg-white/[0.05] px-3 py-2 text-sm text-slate-300">{step}</div>)}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-cyan-100 shadow-soft">
                <pre className="overflow-auto text-xs leading-6">{`{
  "agentName": "Customer Support Agent",
  "tone": "Helpful, concise, policy-aware",
  "allowedActions": ["answer_questions", "create_ticket"],
  "approvalRequiredFor": ["refund", "send_email"],
  "testCases": 7
}`}</pre>
              </div>
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-8" icon={GitBranch} eyebrow="Step 9" title="Visual workflow preview">
            <div className="grid gap-3 md:grid-cols-5">
              {workflowSteps.map((node, index) => (
                <div key={node} className="relative rounded-xl border border-indigo-200 bg-white p-4 text-center text-sm font-semibold shadow-soft">
                  {node}
                  {index < workflowSteps.length - 1 ? <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-indigo-300 md:block" /> : null}
                </div>
              ))}
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-9" icon={ShieldCheck} eyebrow="Step 10" title="Test playground with citations and approvals">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-bold">Chat test</p>
                <div className="mt-3 rounded-lg bg-slate-100 p-3 text-sm">Can I get a refund?</div>
                <div className="mt-3 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">I can collect details, but refunds need human approval first. Citation: refund-policy.pdf</div>
              </div>
              <div className="grid gap-3">
                {["Return policy test · passed", "High-risk refund · approval triggered", "Tool call log · recorded"].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">{item}</div>)}
              </div>
            </div>
          </BuilderPanel>
          <BuilderPanel id="builder-10" icon={Rocket} eyebrow="Step 11" title="Deployment with widget customization">
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <div className="rounded-xl bg-slate-950 p-4 text-xs leading-6 text-cyan-100 shadow-soft">{`<script src="https://categent.com/api/widget.js" data-agent-id="AGENT_ID" data-public-key="PUBLIC_KEY"></script>`}</div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
                <p className="font-bold">Widget preview</p>
                <div className="mt-3 rounded-lg bg-slate-100 p-3 text-sm">Hi, I can help with support, bookings, and next steps.</div>
                <Button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">Copy deploy script</Button>
              </div>
            </div>
          </BuilderPanel>
        </div>
      </section>
    </div>
  );
}

function BuilderPanel({ id, icon: Icon, eyebrow, title, children }: { id: string; icon: React.ComponentType<{ className?: string }>; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <Card id={id} className="premium-light-card rounded-xl">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-glow"><Icon className="h-5 w-5" /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</p>
          <h2 className="mt-1 text-2xl font-black">{title}</h2>
        </div>
      </div>
      {children}
    </Card>
  );
}
