import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import SchoolSettingsForm from "@/components/portal/SchoolSettingsForm";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAcademicYears, getSchoolSettings } from "@/lib/server/school-admin";
import { formatDate } from "@/lib/format";

export default async function SchoolAdminSettingsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Settings" />
        <div className="p-lg"><EmptyState icon="settings" title="No school linked" /></div>
      </>
    );
  }

  const [settings, years] = await Promise.all([
    getSchoolSettings(schoolId),
    getSchoolAcademicYears(schoolId),
  ]);

  const formInitial = settings
    ? {
        themeColor: settings.themeColor,
        accentColor: settings.accentColor,
        dashboardBgColor: settings.dashboardBgColor,
        favicon: settings.favicon,
        motto: settings.motto,
        logo: settings.logo,
        disabledRoles: settings.disabledRoles,
        cbeEnabled: settings.cbeEnabled,
        smsEnabled: settings.smsEnabled,
        whatsappEnabled: settings.whatsappEnabled,
        transportEnabled: settings.transportEnabled,
        libraryEnabled: settings.libraryEnabled,
        hostelEnabled: settings.hostelEnabled,
        payrollEnabled: settings.payrollEnabled,
        mpesaPaybill: settings.mpesaPaybill,
      }
    : null;

  return (
    <>
      <PageHeader
        title="School Settings"
        subtitle="Customize branding, portal roles, and feature modules for your school."
      />
      <div className="p-lg flex flex-col gap-lg">
        {formInitial ? (
          <SchoolSettingsForm initial={formInitial} />
        ) : (
          <EmptyState icon="settings" title="No settings configured" description="Complete setup first." />
        )}

        <div className="tonal-card rounded-xl p-lg">
          <h3 className="text-title-md font-bold mb-md">Academic Years</h3>
          {years.length === 0 ? (
            <p className="text-secondary">No academic years defined.</p>
          ) : (
            years.map((y) => (
              <div key={y.id} className="py-sm border-b border-outline-variant last:border-0">
                <p className="font-semibold">{y.name} {y.isCurrent ? "(Current)" : ""}</p>
                <p className="text-label-sm text-secondary">
                  {formatDate(y.startDate)} – {formatDate(y.endDate)} · {y.terms.length} terms
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
