import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getFinanceExpenses } from "@/lib/server/finance";
import { formatDate, formatKES } from "@/lib/format";

export default async function FinanceExpensesPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Expenses" />
        <div className="p-lg"><EmptyState icon="shopping_cart" title="No school linked" /></div>
      </>
    );
  }

  const expenses = await getFinanceExpenses(schoolId);

  return (
    <>
      <PageHeader title="Expenses" subtitle="School expenditure records." />
      <div className="p-lg">
        {expenses.length === 0 ? (
          <EmptyState icon="shopping_cart" title="No expenses recorded" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Category", "Amount", "Description", "Date"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{e.category}</td>
                    <td className="px-md py-md font-bold">{formatKES(e.amount)}</td>
                    <td className="px-md py-md text-secondary">{e.description ?? "—"}</td>
                    <td className="px-md py-md text-secondary">{formatDate(e.date)}</td>
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
