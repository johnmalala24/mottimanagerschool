import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAttendance } from "@/lib/server/school-admin";

export default async function SchoolAdminAttendancePage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Attendance" />
        <div className="p-lg"><EmptyState icon="calendar_today" title="No school linked" /></div>
      </>
    );
  }

  const records = await getSchoolAttendance(schoolId);

  return (
    <>
      <PageHeader title="Attendance" subtitle="Today's attendance records." />
      <div className="p-lg">
        {records.length === 0 ? (
          <EmptyState icon="fact_check" title="No attendance marked today" description="Teachers mark attendance from their portal." />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Class", "Status", "Remarks"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{r.student.user.name}</td>
                    <td className="px-md py-md text-secondary">{r.student.class.name}</td>
                    <td className="px-md py-md">
                      <StatusBadge label={r.status} variant={statusVariant(r.status)} />
                    </td>
                    <td className="px-md py-md text-secondary">{r.remarks ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
