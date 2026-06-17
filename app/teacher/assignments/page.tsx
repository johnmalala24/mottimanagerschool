import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { formatDate } from "@/lib/format";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord, getTeacherAssignments } from "@/lib/server/teacher";

export default async function TeacherAssignmentsPage() {
  const { schoolId } = await getSchoolContext();
  const teacher = await getTeacherRecord();
  if (!schoolId || !teacher) {
    return (
      <>
        <PageHeader title="Assignments" />
        <div className="p-lg"><EmptyState icon="assignment" title="Teacher not found" /></div>
      </>
    );
  }
  const assignments = await getTeacherAssignments(schoolId, teacher.id);
  return (
    <>
      <PageHeader title="Assignments" subtitle="Class assignments you created." />
      <div className="p-lg">
        {assignments.length === 0 ? (
          <EmptyState icon="assignment" title="No assignments" />
        ) : (
          <div className="tonal-card rounded-xl divide-y divide-outline-variant">
            {assignments.map((a) => (
              <div key={a.id} className="p-md flex justify-between">
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-label-sm text-secondary">{a.class.name} · {a.subject?.name ?? "—"}</p>
                </div>
                <div className="text-right text-label-sm text-secondary">
                  <p>{a.status}</p>
                  <p>{a.dueDate ? formatDate(a.dueDate) : "—"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
