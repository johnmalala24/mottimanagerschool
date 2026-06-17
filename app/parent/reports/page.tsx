import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Reports" />
      <div className="p-lg">
        <PortalList portal="parent" page="reports" schoolId={schoolId} />
      </div>
    </>
  );
}
