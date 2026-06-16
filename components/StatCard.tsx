interface StatCardProps {
  label: string
  value: string
  icon: string
  iconBg?: string
  iconColor?: string
  badge?: string
  badgeColor?: string
  subtext?: string
  className?: string
}

export default function StatCard({ label, value, icon, iconBg = 'bg-primary/10', iconColor = 'text-primary', badge, badgeColor = 'text-primary', subtext, className = '' }: StatCardProps) {
  return (
    <div className={`tonal-card p-lg rounded-xl flex flex-col ${className}`}>
      <div className="flex justify-between items-start mb-md">
        <div className={`p-sm ${iconBg} rounded-lg ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {badge && <span className={`text-label-sm font-bold ${badgeColor}`}>{badge}</span>}
      </div>
      <p className="text-label-md text-secondary mb-1">{label}</p>
      <h3 className="text-headline-lg font-semibold">{value}</h3>
      {subtext && <p className="text-label-sm text-secondary mt-md">{subtext}</p>}
    </div>
  )
}
