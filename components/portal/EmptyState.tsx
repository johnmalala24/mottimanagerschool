type EmptyStateProps = {
  icon?: string;
  title: string;
  description?: string;
};

export default function EmptyState({
  icon = "inbox",
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="tonal-card rounded-xl p-2xl text-center">
      <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-md">
        <span className="material-symbols-outlined text-secondary text-[28px]">{icon}</span>
      </div>
      <h3 className="text-title-md font-bold text-on-surface mb-xs">{title}</h3>
      {description && (
        <p className="text-body-md text-secondary max-w-md mx-auto">{description}</p>
      )}
    </div>
  );
}
