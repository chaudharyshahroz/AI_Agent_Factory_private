"use client";

import { useFormStatus } from "react-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const progressSteps = [
  "Reading requirements",
  "Selecting category pattern",
  "Designing instructions",
  "Selecting tools",
  "Creating approval rules",
  "Generating test cases",
  "Preparing deployment plan"
];

export function GenerationSubmitButton({ idleLabel, pendingLabel = "Building agent..." }: { idleLabel: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button type="submit" disabled={pending} className="bg-gradient-to-r from-indigo-500 to-cyan-400">
        <Sparkles className="h-4 w-4" />
        {pending ? pendingLabel : idleLabel}
      </Button>
      {pending ? (
        <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-700">Generating with structured validation</p>
          <div className="mt-3 grid gap-2">
            {progressSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-2 text-xs text-indigo-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" style={{ animationDelay: `${index * 120}ms` }} />
                {step}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
