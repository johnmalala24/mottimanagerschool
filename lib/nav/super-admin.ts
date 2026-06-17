import type { NavItem } from "@/components/portal/PortalShell";

export const superAdminNav: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/super-admin" },
  { label: "Schools", icon: "school", href: "/super-admin/schools" },
  { label: "Subscriptions", icon: "subscriptions", href: "/super-admin/subscriptions" },
  { label: "Billing", icon: "payments", href: "/super-admin/billing" },
  { label: "Features", icon: "tune", href: "/super-admin/features" },
  { label: "Support Tickets", icon: "support_agent", href: "/super-admin/tickets" },
  { label: "Audit Logs", icon: "receipt_long", href: "/super-admin/audit" },
  { label: "Analytics", icon: "analytics", href: "/super-admin/analytics" },
  { label: "Database", icon: "storage", href: "/super-admin/database" },
];

export const superAdminBottomNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "/super-admin/settings" },
  { label: "Support", icon: "help", href: "/super-admin/support" },
];
