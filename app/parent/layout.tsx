import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { parentNav, parentBottomNav } from "@/lib/nav/parent";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Parent Portal" userRole="Parent" navItems={parentNav} bottomItems={parentBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
