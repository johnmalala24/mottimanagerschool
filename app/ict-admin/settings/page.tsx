import PageHeader from "@/components/portal/PageHeader";
import SchoolSettingsForm from "@/components/portal/SchoolSettingsForm";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolSettings } from "@/lib/server/school-admin";

export default async function IctSettingsPage() {
  const { schoolId } = await getSchoolContext();
  const settings = schoolId ? await getSchoolSettings(schoolId) : null;

  return (
    <>
      <PageHeader title="School Settings" subtitle="Branding, modules, and email notification preferences." />
      {settings && (
        <SchoolSettingsForm
          initial={{
            themeColor: settings.themeColor,
            accentColor: settings.accentColor,
            dashboardBgColor: settings.dashboardBgColor,
            favicon: settings.favicon,
            motto: settings.motto,
            logo: settings.logo,
            cbeEnabled: settings.cbeEnabled,
            smsEnabled: settings.smsEnabled,
            emailEnabled: settings.emailEnabled ?? true,
            whatsappEnabled: settings.whatsappEnabled,
            transportEnabled: settings.transportEnabled,
            libraryEnabled: settings.libraryEnabled,
            hostelEnabled: settings.hostelEnabled,
            payrollEnabled: settings.payrollEnabled,
            mpesaPaybill: settings.mpesaPaybill,
            disabledRoles: settings.disabledRoles,
          }}
        />
      )}
    </>
  );
}
