import type { NavItem } from "@/components/portal/PortalShell";

export const teacherNav: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/teacher" },
  { label: "My Classes", icon: "class", href: "/teacher/classes" },
  { label: "My Subjects", icon: "book", href: "/teacher/subjects" },
  { label: "Attendance", icon: "fact_check", href: "/teacher/attendance" },
  { label: "Exams", icon: "quiz", href: "/teacher/exams" },
  { label: "Exam Marks", icon: "grade", href: "/teacher/marks" },
  { label: "Assignments", icon: "assignment", href: "/teacher/assignments" },
  { label: "CBE Assessment", icon: "auto_awesome", href: "/teacher/cbe" },
  { label: "Timetable", icon: "calendar_month", href: "/teacher/timetable" },
  { label: "Announcements", icon: "campaign", href: "/teacher/announcements" },
];

export const teacherBottomNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "/teacher/settings" },
  { label: "Support", icon: "help", href: "/teacher/support" },
];
