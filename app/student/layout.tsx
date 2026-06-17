import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { studentNav, studentBottomNav } from "@/lib/nav/student";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Student Portal" userRole="Student" navItems={studentNav} bottomItems={studentBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
