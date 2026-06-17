import type { SchoolBranding } from "@/lib/school-branding";
import PrintReportButton from "@/components/portal/PrintReportButton";

type SchoolReportLayoutProps = {
  branding: SchoolBranding | null;
  reportTitle: string;
  reportSubtitle?: string;
  generatedAt?: string;
  children: React.ReactNode;
};

export default function SchoolReportLayout({
  branding,
  reportTitle,
  reportSubtitle,
  generatedAt,
  children,
}: SchoolReportLayoutProps) {
  const schoolName = branding?.schoolName ?? "School";
  const themeColor = branding?.themeColor ?? "#006b2c";

  return (
    <div className="school-report-layout">
      <div className="flex justify-end mb-md no-print">
        <PrintReportButton />
      </div>
      <article className="school-report-document tonal-card rounded-xl overflow-hidden">
        <header
          className="report-letterhead px-lg py-lg border-b border-outline-variant flex flex-col sm:flex-row sm:items-center gap-md"
          style={{ borderTopWidth: 4, borderTopColor: themeColor, borderTopStyle: "solid" }}
        >
          <div className="flex items-center gap-md min-w-0">
            <div className="w-16 h-16 rounded-lg border border-outline-variant bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
              {branding?.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={branding.logo} alt="" className="w-full h-full object-contain" />
              ) : (
                <span
                  className="material-symbols-outlined text-[32px]"
                  style={{ color: themeColor }}
                >
                  school
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-headline-sm font-bold text-on-surface truncate">{schoolName}</h2>
              {branding?.motto && (
                <p className="text-label-md text-secondary italic truncate">{branding.motto}</p>
              )}
            </div>
          </div>
          <div className="sm:ml-auto text-left sm:text-right">
            <p className="text-title-md font-bold text-on-surface">{reportTitle}</p>
            {reportSubtitle && <p className="text-label-md text-secondary">{reportSubtitle}</p>}
            {generatedAt && (
              <p className="text-label-sm text-outline mt-xs">Generated {generatedAt}</p>
            )}
          </div>
        </header>
        <div className="report-body p-lg">{children}</div>
        <footer className="report-footer px-lg py-md border-t border-outline-variant bg-surface-container-low text-center">
          <p className="text-label-sm text-secondary">
            {schoolName} · Official Report · Confidential
          </p>
        </footer>
      </article>
    </div>
  );
}
