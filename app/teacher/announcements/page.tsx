import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { formatDate } from "@/lib/format";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAnnouncements } from "@/lib/server/teacher";

export default async function TeacherAnnouncementsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Announcements" />
        <div className="p-lg"><EmptyState icon="campaign" title="No school linked" /></div>
      </>
    );
  }
  const announcements = await getSchoolAnnouncements(schoolId);
  return (
    <>
      <PageHeader title="Announcements" />
      <div className="p-lg">
        {announcements.length === 0 ? (
          <EmptyState icon="campaign" title="No announcements" />
        ) : (
          <div className="tonal-card rounded-xl divide-y divide-outline-variant">
            {announcements.map((a) => (
              <div key={a.id} className="p-md">
                <p className="font-semibold">{a.title}</p>
                <p className="text-secondary mt-xs">{a.message}</p>
                <p className="text-label-sm text-secondary mt-sm">{formatDate(a.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
