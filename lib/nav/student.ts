import type { NavItem } from "@/components/portal/PortalShell";

export const studentNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/student"
  },
  {
    label: "Timetable",
    icon: "calendar_month",
    href: "/student/timetable"
  },
  {
    label: "Attendance",
    icon: "fact_check",
    href: "/student/attendance"
  },
  {
    label: "Exam Results",
    icon: "grade",
    href: "/student/results"
  },
  {
    label: "Assignments",
    icon: "assignment",
    href: "/student/assignments"
  },
  {
    label: "Learning Materials",
    icon: "folder_open",
    href: "/student/materials"
  },
  {
    label: "Announcements",
    icon: "campaign",
    href: "/student/announcements"
  },
  {
    label: "Report Cards",
    icon: "summarize",
    href: "/student/reports"
  },
  {
    label: "CBE Portfolio",
    icon: "auto_awesome",
    href: "/student/cbe"
  }
];

export const studentBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/student/settings"
  },
  {
    label: "Help",
    icon: "help",
    href: "/student/help"
  }
];
