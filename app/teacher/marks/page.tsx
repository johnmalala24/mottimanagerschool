import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { EnterGradeForm } from "@/components/portal/forms/OperationForms";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord, getTeacherGrades } from "@/lib/server/teacher";
import { prisma } from "@/lib/prisma";

export default async function TeacherMarksPage() {
  const { schoolId } = await getSchoolContext();
  const teacher = await getTeacherRecord();
  if (!schoolId || !teacher) {
    return (
      <>
        <PageHeader title="Exam Marks" />
        <div className="p-lg"><EmptyState icon="grade" title="Teacher not found" /></div>
      </>
    );
  }

  const [grades, classes, subjects, students] = await Promise.all([
    getTeacherGrades(schoolId, teacher.id),
    prisma.class.findMany({
      where: { schoolId, classTeacherId: teacher.id },
      select: { id: true, name: true, section: true },
    }),
    prisma.subject.findMany({ where: { schoolId }, select: { id: true, name: true } }),
    prisma.student.findMany({
      where: { schoolId, status: "ACTIVE" },
      include: { user: { select: { name: true } } },
    }),
  ]);

  return (
    <>
      <PageHeader title="Exam Marks" subtitle="Enter and view marks for your classes." />
      <div className="p-lg">
        <EnterGradeForm
          classes={classes}
          subjects={subjects}
          students={students.map((s) => ({
            id: s.id,
            name: s.user.name ?? "Student",
            classId: s.classId,
          }))}
        />
        {grades.length === 0 ? (
          <EmptyState icon="grade" title="No marks entered" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Class", "Subject", "Exam", "Marks", "Grade"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grades.map((g) => (
                  <tr key={g.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{g.student.user.name}</td>
                    <td className="px-md py-md text-secondary">{g.class.name}</td>
                    <td className="px-md py-md">{g.subject.name}</td>
                    <td className="px-md py-md">{g.examName}</td>
                    <td className="px-md py-md font-bold">{g.marks ?? "—"}</td>
                    <td className="px-md py-md">{g.gradePoint ?? "—"}</td>
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
