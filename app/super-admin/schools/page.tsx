import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolsWithDetails } from "@/lib/server/super-admin";
import { schoolLocation } from "@/lib/format";

export default async function SuperAdminSchoolsPage() {
  const schools = await getSchoolsWithDetails();

  return (
    <>
      <PageHeader
        title="Manage Schools"
        subtitle="All schools registered on the MottiManager platform."
      />
      <div className="p-lg">
        {schools.length === 0 ? (
          <EmptyState
            icon="school"
            title="No schools registered"
            description="Register a school to begin onboarding schools onto the platform."
          />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-container-low">
                  <tr>
                    {[
                      "School",
                      "Location",
                      "Type",
                      "Plan",
                      "Students",
                      "Features",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schools.map((school) => {
                    const admin = school.users[0];
                    const settings = school.settings;
                    return (
                      <tr
                        key={school.id}
                        className="border-t border-outline-variant hover:bg-surface-container-low transition-colors"
                      >
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm flex-shrink-0">
                              {school.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-label-md font-semibold whitespace-nowrap">
                                {school.name}
                              </p>
                              <p className="text-label-sm text-secondary">
                                {admin?.name ?? school.principalName ?? "—"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">
                          {schoolLocation(school)}
                        </td>
                        <td className="px-md py-md text-label-sm whitespace-nowrap">
                          {school.schoolType}
                        </td>
                        <td className="px-md py-md">
                          <StatusBadge
                            label={school.subscription?.plan ?? "—"}
                            variant="info"
                          />
                        </td>
                        <td className="px-md py-md text-body-md font-semibold">
                          {school.students.length.toLocaleString()}
                        </td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs flex-wrap">
                            {settings?.cbeEnabled && (
                              <span className="text-label-sm px-xs py-xs rounded bg-primary/10 text-primary font-bold">
                                CBE
                              </span>
                            )}
                            {settings?.smsEnabled && (
                              <span className="text-label-sm px-xs py-xs rounded bg-tertiary/10 text-tertiary font-bold">
                                SMS
                              </span>
                            )}
                            {settings?.transportEnabled && (
                              <span className="text-label-sm px-xs py-xs rounded bg-secondary/10 text-secondary font-bold">
                                Bus
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-md py-md">
                          <StatusBadge
                            label={school.active ? "Active" : "Suspended"}
                            variant={school.active ? "success" : "error"}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
