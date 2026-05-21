"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["/product", "Product"],
  ["/dashboard/create-agent", "Agent Builder"],
  ["/templates", "Templates"],
  ["/integrations", "Integrations"],
  ["/security", "Security"],
  ["/pricing", "Pricing"]
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/88 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-black shadow-glow">C</span>
          <span>
            <span className="block text-lg font-black leading-none">Categent</span>
            <span className="hidden text-[11px] text-cyan-200 sm:block">AI Agent OS</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {links.map(([href, label]) => <Link key={href} href={href} className="no-underline transition hover:text-white">{label}</Link>)}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="text-sm text-slate-300 no-underline transition hover:text-white">Log in</Link>
          <Button asChild className="h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 text-white shadow-glow">
            <Link href="/dashboard/create-agent/ai-guided" className="no-underline"><Sparkles className="h-4 w-4" /> Build an agent</Link>
          </Button>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/96 p-4 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 no-underline">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-black">C</span>
              <span className="text-lg font-black">Categent</span>
            </Link>
            <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]" aria-label="Close menu"><X className="h-5 w-5" /></button>
          </div>
          <div className="mt-8 grid gap-3">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-lg font-semibold no-underline">
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-8 grid gap-3">
            <Button asChild className="h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-base text-white">
              <Link href="/dashboard/create-agent/ai-guided" onClick={() => setOpen(false)} className="no-underline">Build an agent</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-2xl border-white/10 bg-white/[0.05] text-base text-white hover:bg-white/[0.08]">
              <Link href="/login" onClick={() => setOpen(false)} className="no-underline">Log in</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
