import { NextResponse } from "next/server";

export function redirectToPath(path: string, status = 303) {
  const baseUrl = process.env.APP_URL || "http://localhost:3000";
  return NextResponse.redirect(new URL(path, baseUrl), status);
}
