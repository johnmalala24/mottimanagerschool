import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { librarianNav, librarianBottomNav } from "@/lib/nav/librarian";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SchoolPortalLayout subtitle="Library Portal" userRole="Librarian" navItems={librarianNav} bottomItems={librarianBottomNav}>
      {children}
    </SchoolPortalLayout>
  );
}
