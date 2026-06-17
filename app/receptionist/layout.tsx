import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { receptionistNav, receptionistBottomNav } from "@/lib/nav/receptionist";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Front Office Portal" userRole="Receptionist" navItems={receptionistNav} bottomItems={receptionistBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
