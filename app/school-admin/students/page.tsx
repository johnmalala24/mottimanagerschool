import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolStudents } from "@/lib/server/school-admin";

export default async function SchoolAdminStudentsPage() {
  const { schoolId } = await getSchoolContext();

  if (!schoolId) {
    return (
      <>
        <PageHeader title="Student Management" />
        <div className="p-lg">
          <EmptyState icon="groups" title="No school linked" />
        </div>
      </>
    );
  }

  const students = await getSchoolStudents(schoolId);

  return (
    <>
      <PageHeader title="Student Management" subtitle="All enrolled students." />
      <div className="p-lg">
        {students.length === 0 ? (
          <EmptyState
            icon="groups"
            title="No students enrolled"
            description="Register students through admissions or student registration."
          />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Adm No.", "Name", "Class", "Parent", "Phone", "Fee Status", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const feeStatus = s.feeInvoices[0]?.status;
                  return (
                    <tr
                      key={s.id}
                      className="border-t border-outline-variant hover:bg-surface-container-low"
                    >
                      <td className="px-md py-md text-label-sm font-mono text-secondary">
                        {s.registrationNumber}
                      </td>
                      <td className="px-md py-md font-semibold">{s.user.name}</td>
                      <td className="px-md py-md text-secondary">
                        {s.class.name} {s.class.section}
                      </td>
                      <td className="px-md py-md text-secondary">
                        {s.parent?.user.name ?? s.guardianName ?? "—"}
                      </td>
                      <td className="px-md py-md text-secondary">
                        {s.parent?.user.phone ?? s.guardianPhone ?? "—"}
                      </td>
                      <td className="px-md py-md">
                        {feeStatus ? (
                          <StatusBadge
                            label={feeStatus}
                            variant={statusVariant(feeStatus)}
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-md py-md">
                        <StatusBadge label={s.status} variant={statusVariant(s.status)} />
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
