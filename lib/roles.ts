import type { UserRole } from "@prisma/client";

/** Default landing route per role (main site portals only). */
export const ROLE_HOME: Record<UserRole, string> = {
  SUPER_ADMIN: "/super-admin",
  SCHOOL_ADMIN: "/school-admin",
  DEPUTY_ADMIN: "/deputy-admin",
  ICT_ADMIN: "/ict-admin",
  FINANCE: "/finance",
  TEACHER: "/teacher",
  CLASS_TEACHER: "/class-teacher",
  STUDENT: "/student",
  PARENT: "/parent",
  LIBRARIAN: "/librarian",
  RECEPTIONIST: "/receptionist",
  TRANSPORT_MANAGER: "/transport",
  HOSTEL_MANAGER: "/hostel-manager",
  ADMISSIONS_OFFICER: "/admissions",
};

/** Roles a School Admin can enable/disable for their school. */
export const TOGGLEABLE_PORTAL_ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: "DEPUTY_ADMIN", label: "Deputy Admin", description: "Assistant principal portal" },
  { value: "ICT_ADMIN", label: "ICT Admin", description: "IT and user management portal" },
  { value: "FINANCE", label: "Bursar / Finance", description: "Fees, invoices, and M-Pesa portal" },
  { value: "RECEPTIONIST", label: "Receptionist", description: "Front office and visitor management" },
  { value: "ADMISSIONS_OFFICER", label: "Admissions Officer", description: "Student enrollment portal" },
  { value: "LIBRARIAN", label: "Librarian", description: "Library catalog and borrowing" },
  { value: "TRANSPORT_MANAGER", label: "Transport Manager", description: "Buses, routes, and drivers" },
  { value: "HOSTEL_MANAGER", label: "Hostel Manager", description: "Boarding and room allocation" },
];

/** Roles a School Admin can create via staff management. */
export const STAFF_CREATABLE_ROLES: { value: UserRole; label: string }[] = [
  { value: "DEPUTY_ADMIN", label: "Deputy Admin" },
  { value: "ICT_ADMIN", label: "ICT Admin" },
  { value: "TEACHER", label: "Teacher" },
  { value: "FINANCE", label: "Bursar / Finance" },
  { value: "RECEPTIONIST", label: "Receptionist" },
  { value: "ADMISSIONS_OFFICER", label: "Admissions Officer" },
  { value: "LIBRARIAN", label: "Librarian" },
  { value: "TRANSPORT_MANAGER", label: "Transport Manager" },
  { value: "HOSTEL_MANAGER", label: "Hostel Manager" },
];

export const SCHOOL_STAFF_ROLES: UserRole[] = [
  "SCHOOL_ADMIN",
  "DEPUTY_ADMIN",
  "ICT_ADMIN",
  "TEACHER",
  "CLASS_TEACHER",
  "FINANCE",
  "RECEPTIONIST",
  "ADMISSIONS_OFFICER",
  "LIBRARIAN",
  "TRANSPORT_MANAGER",
  "HOSTEL_MANAGER",
];

export function roleLabel(role: UserRole): string {
  const found = STAFF_CREATABLE_ROLES.find((r) => r.value === role);
  if (found) return found.label;
  const toggle = TOGGLEABLE_PORTAL_ROLES.find((r) => r.value === role);
  if (toggle) return toggle.label;
  const map: Partial<Record<UserRole, string>> = {
    SCHOOL_ADMIN: "School Admin",
    TEACHER: "Teacher",
    CLASS_TEACHER: "Class Teacher",
    PARENT: "Parent",
    STUDENT: "Student",
    SUPER_ADMIN: "Super Admin",
  };
  return map[role] ?? role.replace(/_/g, " ");
}

export function getCreatableRoles(disabledRoles: UserRole[] = []) {
  return STAFF_CREATABLE_ROLES.filter((r) => !disabledRoles.includes(r.value));
}

export function getEnabledPortalRoles(disabledRoles: UserRole[] = []) {
  return TOGGLEABLE_PORTAL_ROLES.filter((r) => !disabledRoles.includes(r.value));
}
