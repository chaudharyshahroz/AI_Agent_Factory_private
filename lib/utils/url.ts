const LOCALHOST_RE = /^(localhost|127\.0\.0\.1)(:\d+)?$/i;

export function getAppBaseUrl() {
  const appUrl = cleanUrl(process.env.APP_URL);
  if (appUrl && !appUrl.includes("0.0.0.0")) return appUrl;

  const domain = getAppHost();
  return `${LOCALHOST_RE.test(domain) ? "http" : "https"}://${domain}`;
}

export function getAdminBaseUrl() {
  const adminDomain = getAdminHost();
  return `${LOCALHOST_RE.test(adminDomain) ? "http" : "https"}://${adminDomain}`;
}

export function getAppHost() {
  return cleanDomain(process.env.APP_DOMAIN) || "localhost:3000";
}

export function getAdminHost() {
  return cleanDomain(process.env.ADMIN_DOMAIN) || (process.env.APP_DOMAIN ? `admin.${cleanDomain(process.env.APP_DOMAIN)}` : "admin.categent.com");
}

export function getAppUrl(path = "/") {
  return new URL(path, getAppBaseUrl());
}

export function getAdminUrl(path = "/admin") {
  return new URL(path, getAdminBaseUrl());
}

function cleanUrl(value?: string) {
  return value?.trim().replace(/\/+$/, "");
}

function cleanDomain(value?: string) {
  return value?.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\/+$/, "");
}
