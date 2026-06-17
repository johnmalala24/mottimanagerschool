import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { admissionsNav, admissionsBottomNav } from "@/lib/nav/admissions";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Admissions Portal" userRole="Admissions Officer" navItems={admissionsNav} bottomItems={admissionsBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
