import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";
import {
  ALL_PORTAL_PREFIXES,
  getAdminOrigin,
  getHostType,
  getMainOrigin,
  isAdminHost,
  MAIN_SITE_PORTAL_PREFIXES,
  SUPER_ADMIN_PREFIX,
} from "@/lib/domain";
import { ROLE_HOME } from "@/lib/roles";
import type { UserRole } from "@prisma/client";

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

function roleHome(role: string, token: Record<string, unknown>) {
  if (role === "TEACHER" && token.isClassTeacher) {
    return "/teacher";
  }
  return ROLE_HOME[role as UserRole] ?? "/";
}

function isRoleDisabled(role: string, token: Record<string, unknown>): boolean {
  const disabled = (token.disabledRoles as string[] | undefined) ?? [];
  return disabled.includes(role);
}

function canAccessPath(
  pathname: string,
  role: string | undefined,
  token: Record<string, unknown>
): boolean {
  if (!role) return false;

  if (pathname.startsWith(SUPER_ADMIN_PREFIX)) {
    return role === "SUPER_ADMIN";
  }

  if (pathname.startsWith("/school-admin")) {
    return role === "SCHOOL_ADMIN";
  }

  if (pathname.startsWith("/deputy-admin")) {
    return role === "DEPUTY_ADMIN";
  }

  if (pathname.startsWith("/ict-admin")) {
    return role === "ICT_ADMIN";
  }

  if (pathname.startsWith("/teacher")) {
    return role === "TEACHER" || role === "CLASS_TEACHER";
  }

  if (pathname.startsWith("/class-teacher")) {
    return (
      role === "CLASS_TEACHER" ||
      (role === "TEACHER" && Boolean(token.isClassTeacher))
    );
  }

  const prefixRoleMap: Record<string, UserRole> = {
    "/finance": "FINANCE",
    "/parent": "PARENT",
    "/student": "STUDENT",
    "/admissions": "ADMISSIONS_OFFICER",
    "/receptionist": "RECEPTIONIST",
    "/librarian": "LIBRARIAN",
    "/transport": "TRANSPORT_MANAGER",
    "/hostel-manager": "HOSTEL_MANAGER",
  };

  for (const [prefix, allowed] of Object.entries(prefixRoleMap)) {
    if (pathname.startsWith(prefix)) return role === allowed;
  }

  return true;
}

function handleHostRouting(req: NextRequestWithAuth) {
  const host = req.headers.get("host");
  const { pathname } = req.nextUrl;
  const hostType = getHostType(host);
  const role = req.nextauth.token?.role as string | undefined;
  const token = (req.nextauth.token ?? {}) as Record<string, unknown>;

  // --- Admin subdomain (admin.mottimanager.com) ---
  if (hostType === "admin") {
    if (pathname === "/") {
      return NextResponse.redirect(new URL(SUPER_ADMIN_PREFIX, req.url));
    }

    if (
      matchesPrefix(pathname, MAIN_SITE_PORTAL_PREFIXES) ||
      pathname === "/auth/signup"
    ) {
      return NextResponse.redirect(new URL(getMainOrigin(host), req.url));
    }

    if (matchesPrefix(pathname, [SUPER_ADMIN_PREFIX])) {
      if (role && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL(getMainOrigin(host), req.url));
      }
    }

    if (role && role !== "SUPER_ADMIN" && pathname.startsWith(SUPER_ADMIN_PREFIX)) {
      return NextResponse.redirect(new URL(getMainOrigin(host), req.url));
    }

    if (role === "SUPER_ADMIN" && pathname === "/auth/signin") {
      return NextResponse.redirect(new URL(SUPER_ADMIN_PREFIX, req.url));
    }

    return null;
  }

  // --- Main site (mottimanager.com) ---
  if (matchesPrefix(pathname, [SUPER_ADMIN_PREFIX])) {
    return NextResponse.redirect(new URL(getAdminOrigin(host), req.url));
  }

  if (role === "SUPER_ADMIN" && !pathname.startsWith("/api/")) {
    if (pathname.startsWith("/auth/signin") || pathname === "/") {
      return NextResponse.redirect(new URL(getAdminOrigin(host), req.url));
    }
  }

  if (
    role === "SCHOOL_ADMIN" &&
    token.setupCompleted === false &&
    !pathname.startsWith("/setup") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/auth/")
  ) {
    return NextResponse.redirect(new URL("/setup", req.url));
  }

  if (matchesPrefix(pathname, ALL_PORTAL_PREFIXES) && role) {
    if (isRoleDisabled(role, token) && role !== "SCHOOL_ADMIN") {
      return NextResponse.redirect(new URL("/role-disabled", req.url));
    }
    if (!canAccessPath(pathname, role, token)) {
      const home = roleHome(role, token);
      return NextResponse.redirect(new URL(home, req.url));
    }
  }

  if (role && pathname === "/") {
    const dest = roleHome(role, token);
    if (dest !== "/") {
      return NextResponse.redirect(new URL(dest, req.url));
    }
  }

  return null;
}

export default withAuth(
  function middleware(req) {
    const hostResponse = handleHostRouting(req);
    if (hostResponse) return hostResponse;
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const hostType = getHostType(req.headers.get("host"));

        if (pathname.startsWith("/api/")) return true;
        if (pathname.startsWith("/auth/")) return true;

        if (hostType === "admin") {
          if (pathname === "/") return true;
          if (pathname.startsWith(SUPER_ADMIN_PREFIX)) return !!token;
          return true;
        }

        const isPortal = matchesPrefix(pathname, MAIN_SITE_PORTAL_PREFIXES);
        if (!isPortal) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
