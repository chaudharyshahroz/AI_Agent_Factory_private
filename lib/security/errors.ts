import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function safeError(error: unknown, fallback = "Something went wrong") {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: "Invalid input", issues: error.flatten() }, { status: 400 });
  }
  const message = error instanceof Error && process.env.NODE_ENV === "development" ? error.message : fallback;
  return NextResponse.json({ error: message }, { status: 500 });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
