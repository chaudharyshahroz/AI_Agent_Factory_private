import { Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-glow md:p-8">
        <div className="flex items-center gap-3 text-cyan-200">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">Loading admin control center</span>
        </div>
        <div className="mt-5 h-10 max-w-xl rounded-xl bg-white/[0.07]" />
        <div className="mt-3 h-4 max-w-3xl rounded bg-white/[0.05]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="premium-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-white/[0.08]" />
              <ShieldCheck className="h-5 w-5 text-cyan-300/60" />
            </div>
            <div className="mt-5 h-8 w-20 rounded bg-white/[0.1]" />
            <div className="mt-3 h-3 w-32 rounded bg-white/[0.06]" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-glow">
        <div className="mb-4 flex gap-2">
          <div className="h-11 flex-1 rounded-xl bg-white/[0.06]" />
          <div className="h-11 w-28 rounded-xl bg-white/[0.06]" />
        </div>
        <div className="grid gap-3">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-14 rounded-xl bg-white/[0.045]" />)}
        </div>
      </div>
    </div>
  );
}
