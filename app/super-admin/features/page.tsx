import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolsWithDetails } from "@/lib/server/super-admin";

export default async function SuperAdminFeaturesPage() {
  const schools = await getSchoolsWithDetails();

  return (
    <>
      <PageHeader
        title="Feature Management"
        subtitle="Per-school feature toggles for CBE, SMS, transport, and library."
      />
      <div className="p-lg flex flex-col gap-lg">
        <div className="bg-tertiary/10 border border-tertiary/20 rounded-xl p-md flex items-start gap-sm">
          <span className="material-symbols-outlined text-tertiary">info</span>
          <p className="text-body-md text-tertiary">
            Feature toggles control which modules appear in each school&apos;s portals.
          </p>
        </div>
        {schools.length === 0 ? (
          <EmptyState icon="tune" title="No schools" description="Register schools to manage features." />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["School", "CBE", "SMS", "Transport", "Library", "Plan"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => {
                  const s = school.settings;
                  const flag = (on: boolean | undefined) =>
                    on ? "ON" : "OFF";
                  return (
                    <tr key={school.id} className="border-t border-outline-variant">
                      <td className="px-md py-md">
                        <p className="text-label-md font-semibold">{school.name}</p>
                      </td>
                      <td className="px-md py-md text-label-md">{flag(s?.cbeEnabled)}</td>
                      <td className="px-md py-md text-label-md">{flag(s?.smsEnabled)}</td>
                      <td className="px-md py-md text-label-md">
                        {flag(s?.transportEnabled)}
                      </td>
                      <td className="px-md py-md text-label-md">{flag(s?.libraryEnabled)}</td>
                      <td className="px-md py-md text-label-sm font-bold text-tertiary">
                        {school.subscription?.plan ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
