import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getFinanceBalances } from "@/lib/server/finance";
import { formatKES } from "@/lib/format";

export default async function FinanceBalancesPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Balances" />
        <div className="p-lg"><EmptyState icon="account_balance" title="No school linked" /></div>
      </>
    );
  }

  const balances = await getFinanceBalances(schoolId);

  return (
    <>
      <PageHeader title="Outstanding Balances" subtitle="Students with unpaid fee balances." />
      <div className="p-lg">
        {balances.length === 0 ? (
          <EmptyState icon="account_balance" title="No outstanding balances" description="All students are fully paid." />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Class", "Balance", "Status"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {balances.map((inv) => (
                  <tr key={inv.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{inv.student.user.name}</td>
                    <td className="px-md py-md text-secondary">{inv.student.class.name}</td>
                    <td className="px-md py-md font-bold text-error">{formatKES(inv.balance)}</td>
                    <td className="px-md py-md"><StatusBadge label={inv.status} variant={statusVariant(inv.status)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
