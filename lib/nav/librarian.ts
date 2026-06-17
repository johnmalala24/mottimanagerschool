import type { NavItem } from "@/components/portal/PortalShell";

export const librarianNav: NavItem[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/librarian"
  },
  {
    label: "Book Catalog",
    icon: "menu_book",
    href: "/librarian/catalog"
  },
  {
    label: "Issue Book",
    icon: "outbox",
    href: "/librarian/issue"
  },
  {
    label: "Returns",
    icon: "move_to_inbox",
    href: "/librarian/returns"
  },
  {
    label: "Fine Management",
    icon: "payments",
    href: "/librarian/fines"
  },
  {
    label: "Borrowing History",
    icon: "history",
    href: "/librarian/history"
  },
  {
    label: "Library Reports",
    icon: "bar_chart",
    href: "/librarian/reports"
  }
];

export const librarianBottomNav: NavItem[] = [
  {
    label: "Settings",
    icon: "settings",
    href: "/librarian/settings"
  },
  {
    label: "Support",
    icon: "help",
    href: "/librarian/support"
  }
];
