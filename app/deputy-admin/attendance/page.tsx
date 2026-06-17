import PageHeader from "@/components/portal/PageHeader";
import { MarkAttendanceForm } from "@/components/portal/forms/OperationForms";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAttendance } from "@/lib/server/school-admin";
import { prisma } from "@/lib/prisma";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";

export default async function DeputyAttendancePage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <PageHeader title="Attendance" subtitle="No school linked" />;

  const [records, classes] = await Promise.all([
    getSchoolAttendance(schoolId),
    prisma.class.findMany({ where: { schoolId }, select: { id: true, name: true, section: true } }),
  ]);

  return (
    <>
      <PageHeader title="Attendance" subtitle="Monitor and mark daily attendance." />
      <MarkAttendanceForm classes={classes} />
      <div className="tonal-card rounded-xl overflow-hidden mt-lg">
        <h3 className="text-title-md font-bold p-lg border-b border-outline-variant">Today&apos;s Records</h3>
        <table className="w-full">
          <thead className="bg-surface-container-low">
            <tr>
              {["Student", "Class", "Status"].map((h) => (
                <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t border-outline-variant">
                <td className="px-md py-md font-medium">{r.student.user.name}</td>
                <td className="px-md py-md">{r.student.class.name}</td>
                <td className="px-md py-md"><StatusBadge label={r.status} variant={statusVariant(r.status)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
