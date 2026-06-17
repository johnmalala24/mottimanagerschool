import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import type { UserRole } from "@prisma/client";

export type SessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: UserRole;
  schoolId?: string | null;
  isClassTeacher?: boolean;
  setupCompleted?: boolean;
};

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  return session?.user as SessionUser | undefined;
}

export async function requireSessionUser() {
  const user = await getSessionUser();
  if (!user?.id) {
    throw new Error("Unauthorized");
  }
  return user;
}
