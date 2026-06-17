import type { NavItem } from "@/components/portal/PortalShell";

export const ictAdminNav: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/ict-admin" },
  { label: "User Accounts", icon: "manage_accounts", href: "/ict-admin/users" },
  { label: "Branding", icon: "palette", href: "/ict-admin/branding" },
  { label: "Data Exports", icon: "download", href: "/ict-admin/exports" },
  { label: "System Status", icon: "monitor_heart", href: "/ict-admin/status" },
];

export const ictAdminBottomNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "/ict-admin/settings" },
  { label: "Support", icon: "help", href: "/ict-admin/support" },
];
