import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";

export default function Page() {
  return (
    <>
      <PageHeader title="Settings" />
      <div className="p-lg">
        <EmptyState icon="construction" title="Settings" description="This section is available in your role portal." />
      </div>
    </>
  );
}
