import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/utils/url";

export function redirectToPath(path: string, status = 303) {
  return NextResponse.redirect(getAppUrl(path), status);
}
