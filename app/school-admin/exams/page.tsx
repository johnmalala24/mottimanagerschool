import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolGrades } from "@/lib/server/school-admin";

export default async function SchoolAdminExamsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Exams & CBE" />
        <div className="p-lg"><EmptyState icon="analytics" title="No school linked" /></div>
      </>
    );
  }

  const grades = await getSchoolGrades(schoolId);

  return (
    <>
      <PageHeader title="Exams & CBE" subtitle="Exam marks and assessment records." />
      <div className="p-lg">
        {grades.length === 0 ? (
          <EmptyState icon="grade" title="No exam records" description="Teachers enter marks from the teacher portal." />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Class", "Subject", "Exam", "Marks", "Grade", "Term"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grades.map((g) => (
                  <tr key={g.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{g.student.user.name}</td>
                    <td className="px-md py-md text-secondary">{g.class.name}</td>
                    <td className="px-md py-md text-secondary">{g.subject.name}</td>
                    <td className="px-md py-md">{g.examName}</td>
                    <td className="px-md py-md font-bold">{g.marks ?? "—"}</td>
                    <td className="px-md py-md">{g.gradePoint ?? "—"}</td>
                    <td className="px-md py-md text-secondary">{g.term}</td>
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
