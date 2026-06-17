import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="History" />
      <div className="p-lg">
        <PortalList portal="librarian" page="history" schoolId={schoolId} />
      </div>
    </>
  );
}
