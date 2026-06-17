import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { deputyAdminNav, deputyAdminBottomNav } from "@/lib/nav/deputy-admin";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Deputy Admin Portal" userRole="Deputy Admin" navItems={deputyAdminNav} bottomItems={deputyAdminBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
