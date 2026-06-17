import type { NavItem } from "@/components/portal/PortalShell";

export const receptionistNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/receptionist"
  },
  {
    label: "Visitor Management",
    icon: "badge",
    href: "/receptionist/visitors"
  },
  {
    label: "Student Lookup",
    icon: "person_search",
    href: "/receptionist/students"
  },
  {
    label: "Parent Lookup",
    icon: "family_restroom",
    href: "/receptionist/parents"
  },
  {
    label: "Appointments",
    icon: "event",
    href: "/receptionist/appointments"
  },
  {
    label: "Check-In / Out",
    icon: "login",
    href: "/receptionist/checkin"
  },
  {
    label: "Communication",
    icon: "message",
    href: "/receptionist/communication"
  }
];

export const receptionistBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/receptionist/settings"
  },
  {
    label: "Support",
    icon: "help",
    href: "/receptionist/support"
  }
];
