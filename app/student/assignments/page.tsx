import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { SubmitAssignmentForm } from "@/components/portal/AssignmentWorkflow";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { formatDate } from "@/lib/format";
import { getSchoolContext } from "@/lib/server/context";
import { getStudentRecord, getStudentDashboardData } from "@/lib/server/student";
import { prisma } from "@/lib/prisma";

export default async function StudentAssignmentsPage() {
  const { schoolId } = await getSchoolContext();
  const student = await getStudentRecord();

  if (!schoolId || !student) {
    return (
      <>
        <PageHeader title="Assignments" />
        <EmptyState icon="assignment" title="Student not found" />
      </>
    );
  }

  const data = await getStudentDashboardData(student.id, schoolId);
  const submissions = await prisma.assignmentSubmission.findMany({
    where: { studentId: student.id, schoolId },
    select: { assignmentId: true, status: true, score: true, feedback: true },
  });
  const subMap = new Map(submissions.map((s) => [s.assignmentId, s]));

  return (
    <>
      <PageHeader title="Assignments" subtitle="View, submit, and track your assignment grades." />
      <div className="flex flex-col gap-lg">
        {data.assignments.length === 0 ? (
          <EmptyState icon="assignment" title="No assignments" description="Your teacher hasn't posted any assignments yet." />
        ) : (
          data.assignments.map((a) => {
            const sub = subMap.get(a.id);
            return (
              <div key={a.id} className="tonal-card rounded-xl p-lg">
                <div className="flex flex-wrap justify-between gap-md mb-sm">
                  <div>
                    <h3 className="text-title-md font-bold">{a.title}</h3>
                    <p className="text-label-sm text-secondary">{a.subject?.name ?? "General"} · Due {a.dueDate ? formatDate(a.dueDate) : "—"}</p>
                    {a.description && <p className="text-body-md text-secondary mt-2">{a.description}</p>}
                  </div>
                  <StatusBadge label={sub?.status ?? a.status} variant={statusVariant(sub?.status ?? a.status)} />
                </div>
                {sub?.score != null && (
                  <p className="text-sm font-bold text-primary mb-sm">Score: {sub.score}/{a.maxScore ?? 100}</p>
                )}
                {sub?.feedback && <p className="text-sm text-secondary mb-sm">Feedback: {sub.feedback}</p>}
                {!sub && a.status === "Open" && (
                  <SubmitAssignmentForm assignmentId={a.id} title={a.title} />
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
