import type { NavItem } from "@/components/portal/PortalShell";

export const schoolAdminNav: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/school-admin" },
  { label: "Student Mgmt", icon: "groups", href: "/school-admin/students" },
  { label: "Attendance", icon: "calendar_today", href: "/school-admin/attendance" },
  { label: "Fees & M-Pesa", icon: "payments", href: "/school-admin/fees" },
  { label: "Exams & CBE", icon: "analytics", href: "/school-admin/exams" },
  { label: "Staff", icon: "badge", href: "/school-admin/staff" },
  { label: "Classes", icon: "class", href: "/school-admin/classes" },
  { label: "Communication", icon: "campaign", href: "/school-admin/communication" },
  { label: "Reports", icon: "summarize", href: "/school-admin/reports" },
];

export const schoolAdminBottomNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "/school-admin/settings" },
  { label: "Support", icon: "help", href: "/school-admin/support" },
];
