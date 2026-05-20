import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Categent | AI agents for every business category",
  description: "Build production-ready AI agents for support, sales, bookings, follow-ups, and operations."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
