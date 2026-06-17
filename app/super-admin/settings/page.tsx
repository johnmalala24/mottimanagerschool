import PageHeader from "@/components/portal/PageHeader";

export default function SuperAdminSettingsPage() {
  return (
    <>
      <PageHeader title="Platform Settings" subtitle="Global MottiManager configuration." />
      <div className="p-lg">
        <div className="tonal-card rounded-xl p-lg max-w-2xl">
          <h3 className="text-title-md font-bold mb-md">System Configuration</h3>
          <div className="flex flex-col gap-md">
            <div>
              <label className="text-label-md font-semibold block mb-xs">Platform Name</label>
              <input
                className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary bg-white"
                value="MottiManager"
                readOnly
              />
            </div>
            <div>
              <label className="text-label-md font-semibold block mb-xs">Base Currency</label>
              <input
                className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white"
                value={process.env.NEXT_PUBLIC_BASE_CURRENCY ?? "KSH"}
                readOnly
              />
            </div>
            <div>
              <label className="text-label-md font-semibold block mb-xs">Support Email</label>
              <input
                className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white"
                value={process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
