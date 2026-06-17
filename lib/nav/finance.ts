import type { NavItem } from "@/components/portal/PortalShell";

export const financeNav: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/finance" },
  { label: "Fee Structure", icon: "account_balance_wallet", href: "/finance/fee-structure" },
  { label: "Invoices", icon: "receipt", href: "/finance/invoices" },
  { label: "M-Pesa Tracking", icon: "smartphone", href: "/finance/mpesa" },
  { label: "Receipts", icon: "receipt_long", href: "/finance/receipts" },
  { label: "Balances", icon: "account_balance", href: "/finance/balances" },
  { label: "Expenses", icon: "shopping_cart", href: "/finance/expenses" },
  { label: "Reports", icon: "bar_chart", href: "/finance/reports" },
];

export const financeBottomNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "/finance/settings" },
  { label: "Support", icon: "help", href: "/finance/support" },
];
