import { NextRequest, NextResponse } from "next/server";
import { getAdminHost, getAppUrl } from "@/lib/utils/url";

const ADMIN_ALIASES = [
  "users",
  "organizations",
  "agents",
  "conversations",
  "categories",
  "templates",
  "tools",
  "integrations",
  "pricing",
  "subscriptions",
  "approvals",
  "contact-leads",
  "audit-logs",
  "system",
  "content"
];

const PUBLIC_ADMIN_PATHS = ["/login", "/signup", "/forgot-password"];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const adminHost = getAdminHost().toLowerCase();
  if (!host || host !== adminHost) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (isPassthroughPath(pathname)) return NextResponse.next();

  if (pathname === "/") {
    return rewriteTo(request, "/admin");
  }

  const adminAlias = ADMIN_ALIASES.find((alias) => pathname === `/${alias}` || pathname.startsWith(`/${alias}/`));
  if (adminAlias) {
    return rewriteTo(request, `/admin${pathname}`);
  }

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next();

  return NextResponse.redirect(getAppUrl(pathname));
}

function isPassthroughPath(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

function rewriteTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
