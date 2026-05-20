"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle2, Database, Globe2, PlugZap, ShieldCheck, Sparkles } from "lucide-react";

const stages = [
  { label: "Category", detail: "E-commerce", icon: Sparkles },
  { label: "Blueprint", detail: "12 rules generated", icon: Bot },
  { label: "Knowledge", detail: "Policies embedded", icon: Database },
  { label: "Tools", detail: "6 controls enabled", icon: PlugZap },
  { label: "Test", detail: "Approvals verified", icon: ShieldCheck },
  { label: "Deploy", detail: "Widget live", icon: Globe2 }
];

export function AnimatedWorkflow() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/80 p-4 shadow-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.28),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,.18),transparent_28%)]" />
      <div className="relative rounded-md border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Agent builder</p>
            <h3 className="mt-1 text-xl font-semibold text-white">From category to deployed agent</h3>
          </div>
          <div className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">Live preview</div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.45 }}
                className="relative rounded-md border border-white/10 bg-slate-900/80 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500/15 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{stage.label}</p>
                    <p className="text-xs text-slate-400">{stage.detail}</p>
                  </div>
                </div>
                <motion.div
                  className="mt-4 h-1 rounded-full bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 + index * 0.12, duration: 0.55 }}
                />
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 flex items-center justify-between rounded-md border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-50"
        >
          <span>Readiness score</span>
          <span className="inline-flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4" /> 92%</span>
        </motion.div>
      </div>
    </div>
  );
}
