import { getSchoolContext } from "@/lib/server/context";
import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { teacherNav, teacherBottomNav } from "@/lib/nav/teacher";
import type { NavItem } from "@/components/portal/PortalShell";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSchoolContext();

  const navItems: NavItem[] = [...teacherNav];
  if (user?.isClassTeacher) {
    navItems.push({
      label: "Class Teacher",
      icon: "groups",
      href: "/class-teacher",
    });
  }

  return (
    <SchoolPortalLayout
      subtitle="Teacher Portal"
      userRole="Teacher"
      navItems={navItems}
      bottomItems={teacherBottomNav}
    >
      {children}
    </SchoolPortalLayout>
  );
}
