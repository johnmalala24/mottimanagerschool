import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { ExamMarksGrid, ExamActions } from "@/components/portal/ExamWorkflow";
import { getSchoolContext } from "@/lib/server/context";
import { getExamMarksGrid } from "@/lib/server/exams";
import Link from "next/link";

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { schoolId } = await getSchoolContext();

  if (!schoolId) {
    return (
      <>
        <PageHeader title="Exam Details" />
        <EmptyState icon="analytics" title="No school linked" />
      </>
    );
  }

  const grid = await getExamMarksGrid(schoolId, id);
  if (!grid) {
    return (
      <>
        <PageHeader title="Exam Not Found" />
        <EmptyState icon="search_off" title="Exam not found" />
        <Link href="/school-admin/exams" className="text-primary font-medium ml-lg">← Back to exams</Link>
      </>
    );
  }

  const { exam, subjects, students } = grid;

  return (
    <>
      <PageHeader
        title={exam.name}
        subtitle={`${exam.class.name} · ${exam.term} · ${exam.academicYear}`}
        actions={<StatusBadge label={exam.status} variant={statusVariant(exam.status)} />}
      />

      <div className="flex flex-col gap-lg">
        <div className="tonal-card rounded-xl p-lg">
          <h3 className="text-label-md font-bold text-secondary uppercase mb-md">Workflow Actions</h3>
          <ExamActions examId={exam.id} status={exam.status} />
          <div className="mt-md flex flex-wrap gap-md text-label-sm text-secondary">
            <span>Max marks: <strong>{exam.maxMarks}</strong></span>
            <span>Subjects: <strong>{subjects.length}</strong></span>
            <span>Students: <strong>{students.length}</strong></span>
            {exam.publishedAt && <span>Published: <strong>{new Date(exam.publishedAt).toLocaleDateString()}</strong></span>}
          </div>
        </div>

        <div>
          <h3 className="text-title-md font-bold mb-md">Marks Entry Grid</h3>
          <ExamMarksGrid
            examId={exam.id}
            examStatus={exam.status}
            maxMarks={exam.maxMarks}
            subjects={subjects}
            students={students}
            initialGrades={grid.gradeMap}
          />
        </div>

        {exam.grades.length > 0 && exam.status !== "DRAFT" && (
          <div className="tonal-card rounded-xl overflow-hidden">
            <h3 className="text-title-md font-bold p-lg border-b border-outline-variant">Results Preview</h3>
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Subject", "Marks", "Grade", "Position"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exam.grades.map((g) => (
                  <tr key={g.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-medium">{g.student.user.name}</td>
                    <td className="px-md py-md">{g.subject.name}</td>
                    <td className="px-md py-md font-bold">{g.marks ?? "—"}</td>
                    <td className="px-md py-md">{g.gradePoint ?? "—"}</td>
                    <td className="px-md py-md">{g.position ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link href="/school-admin/exams" className="text-primary font-medium">← Back to all exams</Link>
      </div>
    </>
  );
}
