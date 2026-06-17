import PageHeader from "@/components/portal/PageHeader";
import UserProfileSettings from "@/components/portal/UserProfileSettings";

export default function SuperAdminSettingsPage() {
  return (
    <>
      <PageHeader title="Platform Settings" subtitle="Global MottiManager configuration." />
      <div className="p-lg flex flex-col gap-lg">
        <UserProfileSettings />
        <div className="tonal-card rounded-xl p-lg max-w-2xl">
          <h3 className="text-title-md font-bold mb-md">System Configuration</h3>
          <div className="flex flex-col gap-md">
            <div>
              <label className="text-label-md font-semibold block mb-xs">Platform Name</label>
              <input className="input-premium" value="MottiManager" readOnly />
            </div>
            <div>
              <label className="text-label-md font-semibold block mb-xs">Base Currency</label>
              <input className="input-premium" value={process.env.NEXT_PUBLIC_BASE_CURRENCY ?? "KSH"} readOnly />
            </div>
            <div>
              <label className="text-label-md font-semibold block mb-xs">Support Email</label>
              <input className="input-premium" value={process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"} readOnly />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
