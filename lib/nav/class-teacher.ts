import type { NavItem } from "@/components/portal/PortalShell";

export const classteacherNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/class-teacher"
  },
  {
    label: "Class Attendance",
    icon: "fact_check",
    href: "/class-teacher/attendance"
  },
  {
    label: "Discipline Records",
    icon: "gavel",
    href: "/class-teacher/discipline"
  },
  {
    label: "Student Profiles",
    icon: "person",
    href: "/class-teacher/students"
  },
  {
    label: "Parent Communication",
    icon: "message",
    href: "/class-teacher/communication"
  },
  {
    label: "Class Performance",
    icon: "bar_chart",
    href: "/class-teacher/performance"
  },
  {
    label: "Report Generation",
    icon: "summarize",
    href: "/class-teacher/reports"
  },
  {
    label: "Announcements",
    icon: "campaign",
    href: "/class-teacher/announcements"
  }
];

export const classteacherBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/class-teacher/settings"
  },
  {
    label: "Support",
    icon: "help",
    href: "/class-teacher/support"
  }
];
