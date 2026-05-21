import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/categent/content";

export function HeroAgentBuilderMockup() {
  return (
    <div className="soft-float relative mx-auto w-full max-w-xl rounded-[2rem] border border-white/12 bg-white/[0.07] p-3 shadow-[0_30px_100px_rgba(2,6,23,0.45)] backdrop-blur-xl">
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/88 p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Builder preview</p>
            <h3 className="mt-1 font-bold text-white">Customer Support Agent</h3>
          </div>
          <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">Test passed</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <PreviewTile label="Category selected" value="E-commerce" />
          <PreviewTile label="Template selected" value="Customer Support" />
          <PreviewTile label="Knowledge uploaded" value="Refund Policy.pdf" detail="Product Catalog.csv" />
          <PreviewTile label="Tools enabled" value="Knowledge Search" detail="Lead Capture, Handoff" />
        </div>
        <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-50">Blueprint readiness</span>
            <span className="font-black text-white">92%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300" /></div>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-4 text-slate-950">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black">Website widget ready</p>
            <Globe2 className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-600">Hi, I can help with orders, policies, and support questions.</p>
        </div>
      </div>
    </div>
  );
}

export function ProblemComparison() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">The shift</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Most AI agent builders start with a blank canvas.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">Business owners do not want to design prompts, tools, workflows, and guardrails from zero. Categent starts with the category and gives them the right structure immediately.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ComparisonCard title="Old way" tone="red" items={["Blank prompt", "Manual setup", "No business category", "No testing", "No approval rules"]} />
            <ComparisonCard title="Categent way" tone="green" items={["Choose category", "Select template", "Upload knowledge", "Generate blueprint", "Deploy safely"]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function InteractiveBuilderPreview() {
  return (
    <section className="mesh-band px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Builder experience</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">A real builder screen, not a form dump.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">The setup stays guided: steps on the left, clear questions in the center, and a live agent preview on the right.</p>
        </div>
        <div className="premium-card mt-10 grid gap-4 rounded-[2rem] p-4 lg:grid-cols-[240px_1fr_300px]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white">
            {["Category", "Template", "Workflow", "Knowledge", "Tools", "Blueprint", "Test", "Deploy"].map((step, index) => (
              <div key={step} className={`mb-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${index === 3 ? "bg-cyan-300/10 text-cyan-100" : "text-slate-400"}`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs">{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Knowledge</p>
                <h3 className="mt-1 text-2xl font-black">Upload what your agent should trust</h3>
              </div>
              <UploadCloud className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 p-8 text-center">
              <p className="font-black">Drop policies, catalogs, FAQs, listings, or onboarding docs</p>
              <p className="mt-2 text-sm text-slate-600">PDF, DOCX, CSV, TXT, and MD supported.</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Refund Policy.pdf", "Product Catalog.csv", "Shipping FAQ.md"].map((file) => <div key={file} className="rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">{file}</div>)}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-white">
            <p className="font-black">Live agent preview</p>
            <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm text-slate-300">I can answer from your uploaded policy and escalate refunds for approval.</p>
            <div className="mt-4 grid gap-2 text-sm">
              {["Tools: 4 enabled", "Approval: high risk", "Citations: on", "Deploy: ready"].map((item) => <span key={item} className="rounded-xl bg-white/[0.06] p-3 text-slate-300">{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestLabMockup() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Testing</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Test behavior before visitors see it.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Run suggested cases, inspect citations, see tool calls, and verify approvals before publishing the widget.</p>
        </div>
        <div className="premium-card rounded-[2rem] p-4">
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between"><h3 className="text-xl font-black">Refund escalation test</h3><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Passed</span></div>
            <div className="mt-4 rounded-xl bg-slate-100 p-3 text-sm">Customer asks for a refund on an opened item.</div>
            <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-sm text-indigo-950">I can explain the policy and collect details, but refunds need human approval.</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Tool: support_ticket", "Citation: Refund Policy.pdf", "Approval: required"].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-600">{item}</div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeploymentMockup() {
  return (
    <section className="bg-slate-950 px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="premium-card rounded-[2rem] p-4">
          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between"><h3 className="text-xl font-black">Deployment center</h3><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">Widget ready</span></div>
            <div className="mt-5 rounded-xl bg-black/50 p-4 text-xs leading-6 text-cyan-100">{`<script src="https://categent.com/api/widget.js" data-agent-id="AGENT_ID" data-public-key="PUBLIC_KEY"></script>`}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Domain allowlist", "Brand color", "Welcome message"].map((item) => <div key={item} className="rounded-xl bg-white/[0.06] p-3 text-sm text-slate-300">{item}</div>)}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Deployment</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Deploy to your website with one script.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Copy the widget script, restrict it to approved domains, customize the message and color, then monitor every conversation from the dashboard.</p>
        </div>
      </div>
    </section>
  );
}

export function AdminControlPreview() {
  return (
    <section className="mesh-band px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Control center</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Monitor every conversation, approval, tool, and deployment.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">Categent gives owners and admins the controls they need: logs, approvals, tools, knowledge, usage, billing, and team roles.</p>
          </div>
          <div className="premium-card rounded-[2rem] p-4">
            <div className="grid gap-3 md:grid-cols-2">
              {["Conversations", "Logs", "Approvals", "Tools", "Knowledge", "Usage", "Billing", "Team roles"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-white">
                  <p className="text-sm text-slate-400">{item}</p>
                  <p className="mt-3 text-2xl font-black">{[284, 916, 7, 12, "1.2k", "68%", "Pro", 4][index]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompactTemplateShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {templates.slice(0, 9).map((template) => (
        <div key={template.name} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-100 ring-1 ring-indigo-300/20">{template.category}</span>
            <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">{template.setupTime}</span>
          </div>
          <h3 className="mt-4 text-lg font-black">{template.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{template.goal} workflow using {template.tools.join(", ")}.</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-cyan-200">{template.approval} approval</span>
            <Button asChild className="h-9 bg-white px-3 text-sm text-slate-950 hover:bg-cyan-100"><Link href="/dashboard/create-agent/guided" className="no-underline">Use</Link></Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewTile({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">{value}</p>
      {detail ? <p className="mt-1 text-xs text-cyan-200">{detail}</p> : null}
    </div>
  );
}

function ComparisonCard({ title, items, tone }: { title: string; items: string[]; tone: "red" | "green" }) {
  return (
    <div className={`rounded-3xl border p-6 ${tone === "green" ? "border-emerald-300/20 bg-emerald-300/10" : "border-red-300/20 bg-red-300/10"}`}>
      <h3 className="text-2xl font-black text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="flex items-center gap-3 text-sm text-slate-200">
            {tone === "green" ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <ArrowRight className="h-4 w-4 text-red-200" />}
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
