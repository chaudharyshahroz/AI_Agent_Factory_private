import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentFactory AI",
  description: "Build category-based AI agents for support, sales, bookings, follow-ups, and operations."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
