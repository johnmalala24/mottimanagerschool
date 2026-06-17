import type { NavItem } from "@/components/portal/PortalShell";

export const admissionsNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/admissions"
  },
  {
    label: "Applications",
    icon: "inbox",
    href: "/admissions/applications"
  },
  {
    label: "Student Registration",
    icon: "person_add",
    href: "/admissions/register"
  },
  {
    label: "Approvals",
    icon: "approval",
    href: "/admissions/approvals"
  },
  {
    label: "Document Uploads",
    icon: "upload_file",
    href: "/admissions/documents"
  },
  {
    label: "Admission Letters",
    icon: "mail",
    href: "/admissions/letters"
  },
  {
    label: "Enrollment Reports",
    icon: "bar_chart",
    href: "/admissions/reports"
  }
];

export const admissionsBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/admissions/settings"
  },
  {
    label: "Support",
    icon: "help",
    href: "/admissions/support"
  }
];
