import clsx from "clsx";

type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
  icon: string;
  badge?: string;
  badgeVariant?: "success" | "warning" | "error" | "info" | "neutral";
  highlight?: boolean;
};

const badgeClasses = {
  success: "text-primary",
  warning: "text-yellow-700",
  error: "text-error",
  info: "text-tertiary",
  neutral: "text-secondary",
};

const iconBgClasses = {
  success: "bg-primary/10 text-primary",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-error-container/40 text-error",
  info: "bg-tertiary-container/20 text-tertiary",
  neutral: "bg-surface-container text-secondary",
};

export default function PortalStatCard({
  label,
  value,
  sub,
  icon,
  badge,
  badgeVariant = "neutral",
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        "tonal-card rounded-xl p-lg flex flex-col justify-between min-h-[140px]",
        highlight && "bg-primary-container/10 border-primary-container/20"
      )}
    >
      <div className="flex justify-between items-start mb-md">
        <div className={clsx("p-xs rounded-lg", iconBgClasses[badgeVariant])}>
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
        {badge && (
          <span className={clsx("text-label-sm font-bold", badgeClasses[badgeVariant])}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-label-md text-secondary mb-xs">{label}</p>
        <p
          className={clsx(
            "text-headline-lg font-bold leading-tight",
            badgeVariant === "error" ? "text-error" : highlight ? "text-primary" : "text-on-surface"
          )}
        >
          {value}
        </p>
        {sub && <p className="text-label-sm text-secondary mt-xs">{sub}</p>}
      </div>
    </div>
  );
}
