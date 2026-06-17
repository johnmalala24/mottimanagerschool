import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getFinanceReceipts } from "@/lib/server/finance";
import { formatDate, formatKES } from "@/lib/format";

export default async function FinanceReceiptsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Receipts" />
        <div className="p-lg"><EmptyState icon="receipt_long" title="No school linked" /></div>
      </>
    );
  }

  const receipts = await getFinanceReceipts(schoolId);

  return (
    <>
      <PageHeader title="Receipts" subtitle="Completed fee payment receipts." />
      <div className="p-lg">
        {receipts.length === 0 ? (
          <EmptyState icon="receipt_long" title="No receipts" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Class", "Amount", "Mode", "Date", "Reference"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => (
                  <tr key={r.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{r.student.user.name}</td>
                    <td className="px-md py-md text-secondary">{r.student.class.name}</td>
                    <td className="px-md py-md font-bold text-primary">{formatKES(r.amount)}</td>
                    <td className="px-md py-md">{r.mode}</td>
                    <td className="px-md py-md text-secondary">{formatDate(r.paymentDate)}</td>
                    <td className="px-md py-md font-mono text-label-sm">{r.transactionId ?? "—"}</td>
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
