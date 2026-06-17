import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { ictAdminNav, ictAdminBottomNav } from "@/lib/nav/ict-admin";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="ICT Admin Portal" userRole="ICT Admin" navItems={ictAdminNav} bottomItems={ictAdminBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
