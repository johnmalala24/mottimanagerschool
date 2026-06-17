import type { NavItem } from "@/components/portal/PortalShell";

export const parentNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/parent"
  },
  {
    label: "Student Profile",
    icon: "person",
    href: "/parent/profile"
  },
  {
    label: "Attendance",
    icon: "calendar_today",
    href: "/parent/attendance"
  },
  {
    label: "Exam Results",
    icon: "grade",
    href: "/parent/results"
  },
  {
    label: "Report Cards",
    icon: "summarize",
    href: "/parent/reports"
  },
  {
    label: "Fees",
    icon: "payments",
    href: "/parent/fees"
  },
  {
    label: "Assignments",
    icon: "assignment",
    href: "/parent/assignments"
  },
  {
    label: "Announcements",
    icon: "campaign",
    href: "/parent/announcements"
  },
  {
    label: "CBE Reports",
    icon: "auto_awesome",
    href: "/parent/cbe"
  }
];

export const parentBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/parent/settings"
  },
  {
    label: "Support",
    icon: "help",
    href: "/parent/support"
  }
];
