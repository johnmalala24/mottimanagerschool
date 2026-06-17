import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolFeeData } from "@/lib/server/school-admin";
import { formatDate, formatKES } from "@/lib/format";

export default async function FinanceInvoicesPage() {
  const { schoolId } = await getSchoolContext();

  if (!schoolId) {
    return (
      <>
        <PageHeader title="Invoices" />
        <div className="p-lg"><EmptyState icon="receipt" title="No school linked" /></div>
      </>
    );
  }

  const { invoices } = await getSchoolFeeData(schoolId);

  return (
    <>
      <PageHeader title="Invoices" subtitle="Student fee invoices." />
      <div className="p-lg">
        {invoices.length === 0 ? (
          <EmptyState icon="receipt" title="No invoices" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Invoice", "Student", "Class", "Amount", "Paid", "Balance", "Status", "Due"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-mono text-label-sm">{inv.invoiceNumber}</td>
                    <td className="px-md py-md font-semibold">{inv.student.user.name}</td>
                    <td className="px-md py-md text-secondary">{inv.student.class.name}</td>
                    <td className="px-md py-md">{formatKES(inv.amount)}</td>
                    <td className="px-md py-md">{formatKES(inv.paidAmount)}</td>
                    <td className="px-md py-md font-bold">{formatKES(inv.balance)}</td>
                    <td className="px-md py-md">
                      <StatusBadge label={inv.status} variant={statusVariant(inv.status)} />
                    </td>
                    <td className="px-md py-md text-secondary">{formatDate(inv.dueDate)}</td>
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
