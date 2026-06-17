import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { hostelmanagerNav, hostelmanagerBottomNav } from "@/lib/nav/hostel-manager";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Hostel Portal" userRole="Hostel Manager" navItems={hostelmanagerNav} bottomItems={hostelmanagerBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
