import { getSessionUser } from "@/lib/server/session";
import PortalShell from "@/components/portal/PortalShell";
import { superAdminNav, superAdminBottomNav } from "@/lib/nav/super-admin";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <PortalShell
      title="MottiManager"
      subtitle="Platform Owner Portal"
      navItems={superAdminNav}
      bottomItems={superAdminBottomNav}
      userName={user?.name ?? "Admin User"}
      userRole="Super Administrator"
    >
      {children}
    </PortalShell>
  );
}
