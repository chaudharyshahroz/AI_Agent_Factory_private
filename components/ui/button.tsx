import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "outline" | "destructive" | "ghost";
};

export function Button({ className, asChild = false, variant = "default", ...props }: ButtonProps) {
  const Comp = (asChild ? Slot : "button") as React.ElementType;
  const variants = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-slate-200 bg-white text-slate-900",
    destructive: "bg-red-600 text-white",
    ghost: "bg-transparent text-slate-700 shadow-none"
  };
  return <Comp className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:opacity-95 disabled:translate-y-0 disabled:opacity-50", variants[variant], className)} {...props} />;
}
