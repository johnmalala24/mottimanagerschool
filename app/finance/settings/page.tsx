import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolSettings } from "@/lib/server/school-admin";

export default async function FinanceSettingsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Settings" />
        <div className="p-lg"><EmptyState icon="settings" title="No school linked" /></div>
      </>
    );
  }

  const settings = await getSchoolSettings(schoolId);

  return (
    <>
      <PageHeader title="Finance Settings" subtitle="Payment configuration." />
      <div className="p-lg max-w-lg tonal-card rounded-xl p-lg">
        <div className="flex flex-col gap-md">
          <div>
            <label className="text-label-md font-semibold block mb-xs">M-Pesa Paybill</label>
            <p className="text-body-lg font-bold">{settings?.mpesaPaybill ?? "Not configured"}</p>
          </div>
          <div>
            <label className="text-label-md font-semibold block mb-xs">Base Currency</label>
            <p className="text-body-lg font-bold">{process.env.NEXT_PUBLIC_BASE_CURRENCY ?? "KSH"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
