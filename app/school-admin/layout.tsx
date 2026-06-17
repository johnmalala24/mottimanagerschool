import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { schoolAdminNav, schoolAdminBottomNav } from "@/lib/nav/school-admin";

export default async function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolPortalLayout
      userRole="Principal Admin"
      navItems={schoolAdminNav}
      bottomItems={schoolAdminBottomNav}
    >
      {children}
    </SchoolPortalLayout>
  );
}
