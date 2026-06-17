type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between gap-md">
      <div>
        <h1 className="text-headline-sm font-bold text-on-surface">{title}</h1>
        {subtitle && <p className="text-body-md text-secondary">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-sm flex-shrink-0">{actions}</div>}
    </div>
  );
}
