import PageHeader from "@/components/portal/PageHeader";
import PortalDashboard from "@/components/portal/PortalDashboard";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Class Teacher Portal" />
      <div className="p-lg">
        <PortalDashboard portal="class-teacher" schoolId={schoolId} />
      </div>
    </>
  );
}
