import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { GradeSubmissionForm } from "@/components/portal/AssignmentWorkflow";
import { formatDate } from "@/lib/format";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord, getTeacherAssignments } from "@/lib/server/teacher";
import { prisma } from "@/lib/prisma";

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

  const allSubmissions = await prisma.assignmentSubmission.findMany({
    where: { schoolId, assignment: { teacherId: teacher.id } },
    include: {
      student: { include: { user: { select: { name: true } } } },
      assignment: true,
    },
    orderBy: { submittedAt: "desc" },
  });

  return (
    <>
      <PageHeader title="Assignments" subtitle="Manage assignments and grade student submissions." />
      <div className="flex flex-col gap-lg">
        {assignments.length === 0 ? (
          <EmptyState icon="assignment" title="No assignments" description="Create assignments from the marks page or operations form." />
        ) : (
          assignments.map((a) => {
            const subs = allSubmissions.filter((s) => s.assignmentId === a.id);
            return (
              <div key={a.id} className="tonal-card rounded-xl p-lg">
                <div className="flex justify-between items-start mb-md">
                  <div>
                    <h3 className="font-bold text-title-md">{a.title}</h3>
                    <p className="text-label-sm text-secondary">{a.class.name} · {a.subject?.name ?? "—"} · Due {a.dueDate ? formatDate(a.dueDate) : "—"}</p>
                  </div>
                  <span className="text-label-sm text-secondary">{subs.length} submission(s)</span>
                </div>
                {subs.length === 0 ? (
                  <p className="text-sm text-secondary">No submissions yet.</p>
                ) : (
                  subs.map((s) => (
                    <div key={s.id} className="border-t border-outline-variant pt-md mt-md">
                      <p className="text-sm mb-1">{s.content ?? "(No content)"}</p>
                      {s.status === "GRADED" ? (
                        <p className="text-sm font-bold text-primary">Graded: {s.score}/{a.maxScore}</p>
                      ) : (
                        <GradeSubmissionForm submissionId={s.id} maxScore={a.maxScore} studentName={s.student.user.name ?? "Student"} />
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
