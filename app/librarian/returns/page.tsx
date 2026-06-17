import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Returns" />
      <div className="p-lg">
        <PortalList portal="librarian" page="returns" schoolId={schoolId} />
      </div>
    </>
  );
}
