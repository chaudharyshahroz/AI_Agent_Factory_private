import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-foreground no-underline">AgentFactory AI</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/categories">Categories</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
          <Button asChild><Link href="/signup" className="text-primary-foreground no-underline">Start</Link></Button>
        </div>
      </nav>
    </header>
  );
}
