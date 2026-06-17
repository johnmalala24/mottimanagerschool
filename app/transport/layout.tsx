import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { transportNav, transportBottomNav } from "@/lib/nav/transport";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Transport Portal" userRole="Transport Manager" navItems={transportNav} bottomItems={transportBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
