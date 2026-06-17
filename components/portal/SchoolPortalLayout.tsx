import { getSchoolContext } from "@/lib/server/context";
import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
import SchoolThemeProvider from "@/components/portal/SchoolThemeProvider";
import { DEFAULT_BRANDING } from "@/lib/school-branding";

type SchoolPortalLayoutProps = {
  subtitle?: string;
  navItems: NavItem[];
  bottomItems?: NavItem[];
  userRole: string;
  children: React.ReactNode;
};

export default async function SchoolPortalLayout({
  subtitle,
  navItems,
  bottomItems,
  userRole,
  children,
}: SchoolPortalLayoutProps) {
  const { user, school, branding } = await getSchoolContext();
  const theme = branding ?? DEFAULT_BRANDING;

  return (
    <SchoolThemeProvider branding={theme}>
      <PortalShell
        title={theme.schoolName !== "School" ? theme.schoolName : "MottiManager"}
        subtitle={subtitle ?? theme.motto ?? school?.name ?? "Portal"}
        navItems={navItems}
        bottomItems={bottomItems}
        userName={user?.name ?? "User"}
        userRole={userRole}
        branding={theme}
      >
        {children}
      </PortalShell>
    </SchoolThemeProvider>
  );
}
