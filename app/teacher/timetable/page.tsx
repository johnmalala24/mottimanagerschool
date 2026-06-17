import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getTeacherRecord, getTeacherTimetable } from "@/lib/server/teacher";

export default async function TeacherTimetablePage() {
  const teacher = await getTeacherRecord();
  if (!teacher) {
    return (
      <>
        <PageHeader title="Timetable" />
        <div className="p-lg"><EmptyState icon="calendar_month" title="Teacher not found" /></div>
      </>
    );
  }
  const timetable = await getTeacherTimetable(teacher.id);
  return (
    <>
      <PageHeader title="Timetable" subtitle="Your weekly teaching schedule." />
      <div className="p-lg">
        {timetable.length === 0 ? (
          <EmptyState icon="calendar_month" title="No timetable entries" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Day", "Time", "Class", "Subject", "Room"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map((t) => (
                  <tr key={t.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{t.dayOfWeek}</td>
                    <td className="px-md py-md">{t.startTime} – {t.endTime}</td>
                    <td className="px-md py-md">{t.class.name}</td>
                    <td className="px-md py-md">{t.subject.name}</td>
                    <td className="px-md py-md text-secondary">{t.room ?? "—"}</td>
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
