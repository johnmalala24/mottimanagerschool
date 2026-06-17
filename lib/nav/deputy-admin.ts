import type { NavItem } from "@/components/portal/PortalShell";

export const deputyAdminNav: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/deputy-admin" },
  { label: "Teachers", icon: "person_book", href: "/deputy-admin/teachers" },
  { label: "Attendance", icon: "fact_check", href: "/deputy-admin/attendance" },
  { label: "Discipline", icon: "gavel", href: "/deputy-admin/discipline" },
  { label: "Reports", icon: "summarize", href: "/deputy-admin/reports" },
  { label: "Announcements", icon: "campaign", href: "/deputy-admin/announcements" },
];

export const deputyAdminBottomNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "/deputy-admin/settings" },
  { label: "Support", icon: "help", href: "/deputy-admin/support" },
];
