import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord, getTeacherCbe } from "@/lib/server/teacher";

export default async function TeacherCbePage() {
  const { schoolId } = await getSchoolContext();
  const teacher = await getTeacherRecord();
  if (!schoolId || !teacher) {
    return (
      <>
        <PageHeader title="CBE Assessment" />
        <div className="p-lg"><EmptyState icon="auto_awesome" title="Teacher not found" /></div>
      </>
    );
  }
  const assessments = await getTeacherCbe(schoolId, teacher.id);
  return (
    <>
      <PageHeader title="CBE Assessment" subtitle="Competency-based evaluations." />
      <div className="p-lg">
        {assessments.length === 0 ? (
          <EmptyState icon="auto_awesome" title="No CBE assessments" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Learning Area", "Level", "Term", "Year"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{a.student.user.name}</td>
                    <td className="px-md py-md">{a.learningArea}</td>
                    <td className="px-md py-md font-bold text-primary">{a.level}</td>
                    <td className="px-md py-md">{a.term}</td>
                    <td className="px-md py-md text-secondary">{a.academicYear}</td>
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
