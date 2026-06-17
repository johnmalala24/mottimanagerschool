import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import { getSchoolContext } from "@/lib/server/context";
import { prisma } from "@/lib/prisma";

export default async function IctStatusPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <PageHeader title="System Status" subtitle="No school linked" />;

  const [users, students, emailLogs, settings] = await Promise.all([
    prisma.user.count({ where: { schoolId, active: true } }),
    prisma.student.count({ where: { schoolId, status: "ACTIVE" } }),
    prisma.emailLog.count({ where: { schoolId, createdAt: { gte: new Date(Date.now() - 7 * 86400000) } } }),
    prisma.schoolSettings.findUnique({ where: { schoolId } }),
  ]);

  return (
    <>
      <PageHeader title="System Status" subtitle="Platform health for your school." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Active Users" value={String(users)} icon="group" badgeVariant="success" />
        <PortalStatCard label="Active Students" value={String(students)} icon="school" badgeVariant="info" />
        <PortalStatCard label="Emails (7 days)" value={String(emailLogs)} icon="mail" badgeVariant="neutral" />
        <PortalStatCard label="Email Alerts" value={settings?.emailEnabled ? "ON" : "OFF"} icon="notifications" badgeVariant={settings?.emailEnabled ? "success" : "error"} />
      </div>
    </>
  );
}
