import clsx from "clsx";

type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
  icon: string;
  badge?: string;
  badgeVariant?: "success" | "warning" | "error" | "info" | "neutral";
};

const badgeClasses = {
  success: "text-primary bg-primary/10",
  warning: "text-yellow-700 bg-yellow-100",
  error: "text-error bg-error/10",
  info: "text-tertiary bg-tertiary/10",
  neutral: "text-secondary bg-surface-container",
};

export default function PortalStatCard({
  label,
  value,
  sub,
  icon,
  badge,
  badgeVariant = "neutral",
}: StatCardProps) {
  return (
    <div className="tonal-card rounded-xl p-md">
      <div className="flex items-start justify-between mb-sm">
        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">{icon}</span>
        </div>
        {badge && (
          <span
            className={clsx(
              "text-label-sm font-bold px-sm py-xs rounded-full",
              badgeClasses[badgeVariant]
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-body-sm text-secondary mb-xs">{label}</p>
      <p className="text-headline-sm font-bold text-on-surface">{value}</p>
      {sub && <p className="text-label-sm text-secondary mt-xs">{sub}</p>}
    </div>
  );
}
