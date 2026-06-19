import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import WeeklyTimetable from "@/components/portal/WeeklyTimetable";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord, getTeacherTimetable, getSchoolAnnouncements } from "@/lib/server/teacher";
import { formatDate } from "@/lib/format";

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

  const [timetable, announcements] = await Promise.all([
    getTeacherTimetable(teacher.id),
    getSchoolAnnouncements(schoolId),
  ]);

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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md mt-md">
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
        <PortalStatCard 
          label="Employee ID" 
          value={teacher.employeeId} 
          icon="badge" 
        />
      </div>

      {/* Schedule and Announcements */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-lg mt-lg">
        {/* Schedule Grid */}
        <div className="xl:col-span-2 space-y-md">
          <WeeklyTimetable data={timetable} />
        </div>

        {/* Announcements Side Block */}
        <div className="tonal-card rounded-2xl p-lg border border-outline-variant shadow-sm bg-surface space-y-md h-fit">
          <h3 className="text-title-md font-bold flex items-center gap-xs text-secondary border-b border-outline-variant pb-xs">
            <span className="material-symbols-outlined text-primary">campaign</span>
            Latest Announcements
          </h3>
          {announcements.length === 0 ? (
            <p className="text-sm text-secondary italic text-center py-md">No announcements yet.</p>
          ) : (
            <div className="space-y-md max-h-[420px] overflow-y-auto pr-xs divide-y divide-outline-variant">
              {announcements.map((a, i) => (
                <div key={a.id} className={i > 0 ? "pt-md" : ""}>
                  <h4 className="font-semibold text-body-large text-primary">{a.title}</h4>
                  <p className="text-sm text-secondary mt-xs whitespace-pre-wrap">{a.message}</p>
                  <p className="text-label-sm text-secondary/60 mt-sm flex items-center gap-[2px]">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {formatDate(a.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
