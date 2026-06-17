import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolFeeData } from "@/lib/server/school-admin";
import { formatKES } from "@/lib/format";

async function FeeStructureContent() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <EmptyState icon="account_balance_wallet" title="No school linked" />;
  const { structures } = await getSchoolFeeData(schoolId);
  if (structures.length === 0) return <EmptyState icon="account_balance_wallet" title="No fee structures" description="Define fee structures per class." />;
  return (
    <div className="tonal-card rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-surface-container-low">
          <tr>
            {["Class", "Tuition", "Development", "Transport", "Total", "Year"].map((h) => (
              <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {structures.map((s) => (
            <tr key={s.id} className="border-t border-outline-variant">
              <td className="px-md py-md font-semibold">{s.className}</td>
              <td className="px-md py-md">{formatKES(s.tuitionFee)}</td>
              <td className="px-md py-md">{formatKES(s.developmentFee)}</td>
              <td className="px-md py-md">{formatKES(s.transportFee)}</td>
              <td className="px-md py-md font-bold text-primary">{formatKES(s.totalFee)}</td>
              <td className="px-md py-md text-secondary">{s.academicYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function FinanceFeeStructurePage() {
  return (
    <>
      <PageHeader title="Fee Structure" subtitle="Fee breakdown per class and academic year." />
      <div className="p-lg"><FeeStructureContent /></div>
    </>
  );
}
