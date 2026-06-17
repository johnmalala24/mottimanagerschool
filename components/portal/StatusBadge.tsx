import clsx from "clsx";

type StatusBadgeProps = {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
};

const variants = {
  success: "bg-primary/10 text-primary",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-error/10 text-error",
  info: "bg-tertiary/10 text-tertiary",
  neutral: "bg-surface-container text-secondary",
};

export default function StatusBadge({ label, variant = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap",
        variants[variant]
      )}
    >
      {label}
    </span>
  );
}

export function statusVariant(
  status: string
): StatusBadgeProps["variant"] {
  const s = status.toLowerCase();
  if (["active", "paid", "completed", "success", "resolved", "open"].includes(s))
    return "success";
  if (["pending", "partial", "in progress", "in_progress", "approaching"].includes(s))
    return "warning";
  if (["suspended", "overdue", "failed", "rejected", "cancelled", "absent"].includes(s))
    return "error";
  if (["premium", "enterprise", "scheduled"].includes(s))
    return "info";
  return "neutral";
}
