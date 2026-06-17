import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getTeacherRecord } from "@/lib/server/teacher";

export default async function TeacherSubjectsPage() {
  const teacher = await getTeacherRecord();
  return (
    <>
      <PageHeader title="My Subjects" />
      <div className="p-lg">
        {!teacher ? (
          <EmptyState icon="book" title="Teacher not found" />
        ) : teacher.subject ? (
          <div className="tonal-card rounded-xl p-lg max-w-md">
            <h3 className="text-title-md font-bold">{teacher.subject.name}</h3>
            <p className="text-secondary mt-xs">Code: {teacher.subject.code} · Max marks: {teacher.subject.maxMarks}</p>
          </div>
        ) : (
          <EmptyState icon="book" title="No subject assigned" />
        )}
      </div>
    </>
  );
}
