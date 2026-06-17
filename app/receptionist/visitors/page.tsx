import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Visitors" />
      <div className="p-lg">
        <PortalList portal="receptionist" page="visitors" schoolId={schoolId} />
      </div>
    </>
  );
}
