import SchoolPortalLayout from "@/components/portal/SchoolPortalLayout";
import { financeNav, financeBottomNav } from "@/lib/nav/finance";

export default async function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolPortalLayout
      subtitle="Finance Portal"
      userRole="Finance Lead"
      navItems={financeNav}
      bottomItems={financeBottomNav}
    >
      {children}
    </SchoolPortalLayout>
  );
}
