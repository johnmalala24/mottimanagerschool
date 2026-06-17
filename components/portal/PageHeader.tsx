type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl pt-lg">
      <div>
        <h1 className="text-headline-lg font-bold text-on-background">{title}</h1>
        {subtitle && <p className="text-body-md text-secondary mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-sm flex-shrink-0">{actions}</div>}
    </header>
  );
}
