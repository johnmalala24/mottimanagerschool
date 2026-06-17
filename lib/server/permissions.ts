import { getSessionUser } from "@/lib/server/session";
import type { UserRole } from "@prisma/client";

export async function requireRole(allowed: UserRole[]) {
  const user = await getSessionUser();
  if (!user?.id || !user.role || !allowed.includes(user.role)) {
    throw new Error("Forbidden");
  }
  return user;
}

export async function requireSchoolAdmin() {
  const user = await requireRole(["SCHOOL_ADMIN"]);
  if (!user.schoolId) throw new Error("No school linked");
  return user;
}

export async function requireSchoolStaffManager() {
  const user = await requireRole(["SCHOOL_ADMIN", "DEPUTY_ADMIN"]);
  if (!user.schoolId) throw new Error("No school linked");
  return user;
}

export async function requireAdmissionsStaff() {
  const user = await requireRole([
    "SCHOOL_ADMIN",
    "DEPUTY_ADMIN",
    "ADMISSIONS_OFFICER",
    "RECEPTIONIST",
  ]);
  if (!user.schoolId) throw new Error("No school linked");
  return user;
}

export async function requireTeacherStaff() {
  const user = await requireRole(["TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "DEPUTY_ADMIN"]);
  if (!user.schoolId) throw new Error("No school linked");
  return user;
}

export async function requireFinanceStaff() {
  const user = await requireRole(["FINANCE", "SCHOOL_ADMIN", "DEPUTY_ADMIN"]);
  if (!user.schoolId) throw new Error("No school linked");
  return user;
}

export async function requireSchoolOpsStaff() {
  const user = await requireRole([
    "SCHOOL_ADMIN",
    "DEPUTY_ADMIN",
    "RECEPTIONIST",
    "LIBRARIAN",
    "TRANSPORT_MANAGER",
    "HOSTEL_MANAGER",
    "FINANCE",
    "ICT_ADMIN",
  ]);
  if (!user.schoolId) throw new Error("No school linked");
  return user;
}

export async function requireProfileManager() {
  const user = await requireRole(["SCHOOL_ADMIN", "DEPUTY_ADMIN", "ICT_ADMIN"]);
  if (!user.schoolId) throw new Error("No school linked");
  return user;
}
