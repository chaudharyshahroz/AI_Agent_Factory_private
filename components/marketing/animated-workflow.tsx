"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle2, Database, Globe2, MessageSquare, PlugZap, ShieldCheck, Sparkles, Workflow } from "lucide-react";

const stages = [
  { label: "Category", detail: "E-commerce support", icon: Sparkles, tone: "from-indigo-400 to-violet-300" },
  { label: "Blueprint", detail: "Instructions and rules", icon: Bot, tone: "from-cyan-300 to-blue-300" },
  { label: "Knowledge", detail: "Policies embedded", icon: Database, tone: "from-emerald-300 to-cyan-300" },
  { label: "Tools", detail: "6 controls enabled", icon: PlugZap, tone: "from-fuchsia-300 to-indigo-300" },
  { label: "Test", detail: "Approval trigger passed", icon: ShieldCheck, tone: "from-amber-200 to-emerald-300" },
  { label: "Deploy", detail: "Widget live", icon: Globe2, tone: "from-cyan-300 to-emerald-300" }
];

export function AnimatedWorkflow() {
  return (
    <div className="soft-float relative">
      <div className="premium-card subtle-scan rounded-xl p-3 shadow-glow">
        <div className="rounded-lg border border-white/10 bg-slate-950/72">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
            </div>
            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium text-cyan-100">Categent canvas</div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-[0.82fr_1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Build sequence</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">Category to deployed agent</h3>
                </div>
                <Workflow className="h-5 w-5 text-cyan-200" />
              </div>
              <div className="grid gap-2">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  return (
                    <motion.div
                      key={stage.label}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.45 }}
                      className="group relative overflow-hidden rounded-md border border-white/10 bg-slate-900/80 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br ${stage.tone} text-slate-950 shadow-glow`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{stage.label}</p>
                          <p className="truncate text-xs text-slate-400">{stage.detail}</p>
                        </div>
                      </div>
                      <motion.div
                        className={`mt-3 h-1 rounded-full bg-gradient-to-r ${stage.tone}`}
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4">
              <div className="gradient-border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Blueprint preview</p>
                    <h3 className="mt-2 text-xl font-bold text-white">Customer Support Agent</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">Answers policy questions, cites sources, captures support tickets, and routes refunds to approval.</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/30">92% ready</span>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {["7 test cases", "4 tools", "3 approval rules"].map((item) => (
                    <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-200">{item}</div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white"><MessageSquare className="h-4 w-4 text-cyan-300" /> Test chat</div>
                  <div className="mt-4 grid gap-2 text-xs">
                    <div className="rounded-md bg-white/[0.06] p-3 text-slate-300">Can I return a damaged item?</div>
                    <div className="rounded-md bg-cyan-300/10 p-3 text-cyan-50">Yes. Your return policy says damaged items can be escalated with photos and order details.</div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Guardrails</div>
                  <div className="mt-4 grid gap-2 text-xs text-slate-300">
                    {["Refunds require approval", "No secret exposure", "Domain allowlist active"].map((rule) => (
                      <p key={rule} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{rule}</p>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col gap-3 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>Website widget deployed to allowed domain</span>
                <span className="inline-flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4" /> Live</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        aria-hidden
        className="absolute -bottom-5 left-8 right-8 h-10 rounded-full bg-cyan-400/16 blur-2xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scaleX: [0.95, 1, 0.95] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}
