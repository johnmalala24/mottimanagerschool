import type { NavItem } from "@/components/portal/PortalShell";

export const transportNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/transport"
  },
  {
    label: "Vehicles",
    icon: "directions_bus",
    href: "/transport/vehicles"
  },
  {
    label: "Routes",
    icon: "route",
    href: "/transport/routes"
  },
  {
    label: "Drivers",
    icon: "person",
    href: "/transport/drivers"
  },
  {
    label: "Student Allocation",
    icon: "groups",
    href: "/transport/allocation"
  },
  {
    label: "Transport Fees",
    icon: "payments",
    href: "/transport/fees"
  },
  {
    label: "Route Reports",
    icon: "bar_chart",
    href: "/transport/reports"
  }
];

export const transportBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/transport/settings"
  },
  {
    label: "Support",
    icon: "help",
    href: "/transport/support"
  }
];
