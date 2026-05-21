import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="categent-gradient flex min-h-screen items-center justify-center px-4 text-white">
      <div className="premium-card rounded-xl p-8 text-center shadow-glow">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-glow">
          <Sparkles className="h-7 w-7 animate-pulse" />
        </div>
        <h1 className="mt-5 text-2xl font-black">Preparing Categent</h1>
        <p className="mt-2 text-sm text-slate-300">Loading agents, controls, and workspace context.</p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" />
        </div>
      </div>
    </main>
  );
}
