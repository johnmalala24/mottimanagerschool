import PageHeader from "@/components/portal/PageHeader";
import { CreateAnnouncementForm } from "@/components/portal/forms/OperationForms";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAnnouncements } from "@/lib/server/school-admin";
import { formatDate } from "@/lib/format";

export default async function DeputyAnnouncementsPage() {
  const { schoolId } = await getSchoolContext();
  const announcements = schoolId ? await getSchoolAnnouncements(schoolId) : [];

  return (
    <>
      <PageHeader title="Announcements" subtitle="Send messages to parents and staff via email and in-app alerts." />
      <div className="flex flex-col gap-lg">
        <CreateAnnouncementForm />
        <div className="tonal-card rounded-xl p-lg">
          <h3 className="text-title-md font-bold mb-md">Recent Announcements</h3>
          {announcements.length === 0 ? (
            <p className="text-secondary text-sm">No announcements yet.</p>
          ) : (
            announcements.map((a) => (
              <div key={a.id} className="py-sm border-b border-outline-variant last:border-0">
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm text-secondary">{a.message.slice(0, 120)}{a.message.length > 120 ? "…" : ""}</p>
                <p className="text-label-sm text-secondary mt-1">
                  {a.recipientCount} recipients · {a.emailsSent ? `${a.emailsSent} emails sent · ` : ""}{formatDate(a.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
