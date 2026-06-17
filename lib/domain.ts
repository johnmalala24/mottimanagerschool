/**
 * Host-based routing for admin.mottimanager.com vs mottimanager.com
 */

const ADMIN_HOST =
  process.env.NEXT_PUBLIC_ADMIN_HOST ?? "admin.mottimanager.com";
const MAIN_HOST = process.env.NEXT_PUBLIC_MAIN_HOST ?? "mottimanager.com";

export type HostType = "admin" | "main";

function normalizeHostname(host: string): string {
  return host.split(":")[0].toLowerCase();
}

export function getHostType(host: string | null): HostType {
  if (!host) return "main";
  const hostname = normalizeHostname(host);
  const adminHostname = normalizeHostname(ADMIN_HOST);

  if (hostname === adminHostname) return "admin";
  if (hostname.startsWith("admin.")) return "admin";
  if (hostname === "admin.localhost") return "admin";

  return "main";
}

export function isAdminHost(host: string | null): boolean {
  return getHostType(host) === "admin";
}

export function getAdminOrigin(requestHost?: string | null): string {
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";
  if (process.env.NODE_ENV !== "production") {
    const port = requestHost?.includes(":") ? `:${requestHost.split(":")[1]}` : ":3000";
    return `${protocol}://admin.localhost${port}`;
  }
  return `${protocol}://${ADMIN_HOST}`;
}

export function getMainOrigin(requestHost?: string | null): string {
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";
  if (process.env.NODE_ENV !== "production") {
    const port = requestHost?.includes(":") ? `:${requestHost.split(":")[1]}` : ":3000";
    return `${protocol}://localhost${port}`;
  }
  return `${protocol}://${MAIN_HOST}`;
}

export const SUPER_ADMIN_PREFIX = "/super-admin";

export const MAIN_SITE_PORTAL_PREFIXES = [
  "/school-admin",
  "/deputy-admin",
  "/ict-admin",
  "/finance",
  "/teacher",
  "/class-teacher",
  "/parent",
  "/student",
  "/admissions",
  "/receptionist",
  "/librarian",
  "/transport",
  "/hostel-manager",
];

export const ALL_PORTAL_PREFIXES = [
  SUPER_ADMIN_PREFIX,
  ...MAIN_SITE_PORTAL_PREFIXES,
];
