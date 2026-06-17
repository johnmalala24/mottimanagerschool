import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { classteacherNav, classteacherBottomNav } from "@/lib/nav/class-teacher";
import type { NavItem } from "@/components/portal/PortalShell";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const navItems: NavItem[] = [
    { label: "Teacher Portal", icon: "person_book", href: "/teacher" },
    ...classteacherNav,
  ];

  return (
    <SchoolPortalLayout
      subtitle="Class Teacher Portal"
      userRole="Class Teacher"
      navItems={navItems}
      bottomItems={classteacherBottomNav}
    >
      {children}
    </SchoolPortalLayout>
  );
}
