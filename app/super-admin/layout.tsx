import { getSessionUser } from "@/lib/server/session";
import { prisma } from "@/lib/prisma";
import PortalShell from "@/components/portal/PortalShell";
import { superAdminNav, superAdminBottomNav } from "@/lib/nav/super-admin";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  const dbUser = user?.id
    ? await prisma.user.findUnique({ where: { id: user.id }, select: { image: true } })
    : null;

  return (
    <PortalShell
      title="MottiManager"
      subtitle="Platform Owner Portal"
      navItems={superAdminNav}
      bottomItems={superAdminBottomNav}
      userName={user?.name ?? "Admin User"}
      userRole="Super Administrator"
      userImage={dbUser?.image ?? null}
    >
      {children}
    </PortalShell>
  );
}
