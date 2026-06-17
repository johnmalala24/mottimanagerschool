import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { OperationsQuickForm } from "@/components/portal/forms/OperationForms";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Catalog" />
      <div className="p-lg">
        <OperationsQuickForm action="library-book" />
        <PortalList portal="librarian" page="catalog" schoolId={schoolId} />
      </div>
    </>
  );
}
