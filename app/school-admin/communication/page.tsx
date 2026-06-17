import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import UserProfileSettings from "@/components/portal/UserProfileSettings";
import { CreateAnnouncementForm } from "@/components/portal/forms/OperationForms";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAnnouncements } from "@/lib/server/school-admin";
import { formatDate } from "@/lib/format";

export default async function SchoolAdminCommunicationPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Communication" />
        <div className="p-lg"><EmptyState icon="campaign" title="No school linked" /></div>
      </>
    );
  }

  const announcements = await getSchoolAnnouncements(schoolId);

  return (
    <>
      <PageHeader title="Communication Center" subtitle="Announcements to parents and staff." />
      <div className="p-lg">
        <CreateAnnouncementForm />
        {announcements.length === 0 ? (
          <EmptyState icon="campaign" title="No announcements" description="Send announcements to parents and staff." />
        ) : (
          <div className="tonal-card rounded-xl divide-y divide-outline-variant">
            {announcements.map((a) => (
              <div key={a.id} className="p-md">
                <p className="text-label-md font-semibold">{a.title}</p>
                <p className="text-body-md text-secondary mt-xs">{a.message}</p>
                <p className="text-label-sm text-secondary mt-sm">
                  {formatDate(a.createdAt)} · {a.recipientCount} recipients
                  {a.sendSms ? " · SMS sent" : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
