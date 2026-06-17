import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { MarkAttendanceForm } from "@/components/portal/forms/OperationForms";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord, getTeacherAttendance } from "@/lib/server/teacher";
import { prisma } from "@/lib/prisma";

export default async function TeacherAttendancePage() {
  const { schoolId } = await getSchoolContext();
  const teacher = await getTeacherRecord();
  if (!schoolId || !teacher) {
    return (
      <>
        <PageHeader title="Attendance" />
        <div className="p-lg"><EmptyState icon="fact_check" title="Teacher not found" /></div>
      </>
    );
  }

  const classes = await prisma.class.findMany({
    where: {
      schoolId,
      OR: [{ classTeacherId: teacher.id }, { id: { in: teacher.classesTeaching.map((c) => c.id) } }],
    },
    select: { id: true, name: true, section: true },
  });

  const records = await getTeacherAttendance(schoolId, teacher.id);

  return (
    <>
      <PageHeader title="Mark Attendance" subtitle="Today's attendance records." />
      <div className="p-lg">
        <MarkAttendanceForm classes={classes} />
        {records.length === 0 ? (
          <EmptyState icon="fact_check" title="No attendance marked today" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Class", "Status"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{r.student.user.name}</td>
                    <td className="px-md py-md text-secondary">{r.class.name}</td>
                    <td className="px-md py-md"><StatusBadge label={r.status} variant={statusVariant(r.status)} /></td>
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
