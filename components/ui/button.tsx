import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";

export function Button({ className, asChild = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; href?: string }) {
  const Comp = (asChild ? Slot : "button") as React.ElementType;
  return <Comp className={cn("inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-50", className)} {...props} />;
}
