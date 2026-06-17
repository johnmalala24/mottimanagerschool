import type { NavItem } from "@/components/portal/PortalShell";

export const hostelmanagerNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/hostel-manager"
  },
  {
    label: "Room Management",
    icon: "hotel",
    href: "/hostel-manager/rooms"
  },
  {
    label: "Bed Allocation",
    icon: "bed",
    href: "/hostel-manager/allocations"
  },
  {
    label: "Attendance",
    icon: "how_to_reg",
    href: "/hostel-manager/attendance"
  },
  {
    label: "Fees",
    icon: "payments",
    href: "/hostel-manager/fees"
  },
  {
    label: "Hostel Reports",
    icon: "analytics",
    href: "/hostel-manager/reports"
  }
];

export const hostelmanagerBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/hostel-manager/settings"
  },
  {
    label: "Support",
    icon: "help",
    href: "/hostel-manager/support"
  }
];
