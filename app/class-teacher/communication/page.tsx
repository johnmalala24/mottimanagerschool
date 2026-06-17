import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Communication" />
      <div className="p-lg">
        <PortalList portal="class-teacher" page="communication" schoolId={schoolId} />
      </div>
    </>
  );
}
