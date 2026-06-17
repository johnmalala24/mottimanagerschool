import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord } from "@/lib/server/teacher";

export default async function TeacherDashboardPage() {
  const { schoolId } = await getSchoolContext();
  const teacher = await getTeacherRecord();

  if (!schoolId || !teacher) {
    return (
      <>
        <PageHeader title="Teacher Dashboard" />
        <div className="p-lg">
          <EmptyState
            icon="person_book"
            title="Teacher profile not found"
            description="Your account must be linked to a teacher record at a school."
          />
        </div>
      </>
    );
  }

  const totalStudents = teacher.classesTeaching.reduce(
    (sum, c) => sum + c.students.length,
    0
  );

  return (
    <>
      <PageHeader
        title="Teacher Dashboard"
        subtitle={`Welcome, ${teacher.user.name}`}
      />
      <div className="p-lg grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard
          label="My Classes"
          value={String(teacher.classesTeaching.length)}
          icon="class"
        />
        <PortalStatCard
          label="Students"
          value={String(totalStudents)}
          icon="groups"
        />
        <PortalStatCard
          label="Primary Subject"
          value={teacher.subject?.name ?? "—"}
          icon="book"
        />
        <PortalStatCard label="Employee ID" value={teacher.employeeId} icon="badge" />
      </div>
    </>
  );
}
