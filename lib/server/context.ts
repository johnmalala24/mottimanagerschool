import { getSessionUser } from "@/lib/server/session";
import { prisma } from "@/lib/prisma";
import { DEFAULT_BRANDING, type SchoolBranding } from "@/lib/school-branding";

export async function getUserSchoolId(): Promise<string | null> {
  const user = await getSessionUser();
  if (!user?.schoolId) return null;
  return user.schoolId;
}

export async function requireSchoolId(): Promise<string> {
  const schoolId = await getUserSchoolId();
  if (!schoolId) {
    throw new Error("No school associated with your account");
  }
  return schoolId;
}

export async function getSchoolBranding(schoolId: string): Promise<SchoolBranding> {
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: {
      name: true,
      logo: true,
      settings: {
        select: {
          themeColor: true,
          accentColor: true,
          dashboardBgColor: true,
          favicon: true,
          motto: true,
        },
      },
    },
  });

  if (!school) return { ...DEFAULT_BRANDING };

  return {
    themeColor: school.settings?.themeColor ?? DEFAULT_BRANDING.themeColor,
    accentColor: school.settings?.accentColor ?? DEFAULT_BRANDING.accentColor,
    dashboardBgColor: school.settings?.dashboardBgColor ?? DEFAULT_BRANDING.dashboardBgColor,
    favicon: school.settings?.favicon ?? null,
    motto: school.settings?.motto ?? null,
    logo: school.logo ?? null,
    schoolName: school.name,
  };
}

export async function getSchoolContext() {
  const user = await getSessionUser();
  const schoolId = user?.schoolId;

  if (!schoolId) {
    return { user, school: null, schoolId: null, branding: null as SchoolBranding | null };
  }

  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: { id: true, name: true, logo: true },
  });

  const branding = await getSchoolBranding(schoolId);

  return { user, school, schoolId, branding };
}
