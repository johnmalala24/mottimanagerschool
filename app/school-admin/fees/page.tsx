import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolFeeData } from "@/lib/server/school-admin";
import { formatDate, formatKES } from "@/lib/format";

export default async function SchoolAdminFeesPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Fees & M-Pesa" />
        <div className="p-lg"><EmptyState icon="payments" title="No school linked" /></div>
      </>
    );
  }

  const { structures, payments, invoices, mpesa } = await getSchoolFeeData(schoolId);

  return (
    <>
      <PageHeader title="Fees & M-Pesa" subtitle="Fee structures, payments, and M-Pesa transactions." />
      <div className="p-lg flex flex-col gap-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <div className="tonal-card rounded-xl p-lg">
            <h3 className="text-title-md font-bold mb-md">Fee Structures</h3>
            {structures.length === 0 ? (
              <p className="text-secondary">No fee structures defined.</p>
            ) : (
              structures.map((s) => (
                <div key={s.id} className="py-sm border-b border-outline-variant last:border-0 flex justify-between">
                  <span className="font-semibold">{s.className}</span>
                  <span className="text-primary font-bold">{formatKES(s.totalFee)}</span>
                </div>
              ))
            )}
          </div>
          <div className="tonal-card rounded-xl p-lg">
            <h3 className="text-title-md font-bold mb-md">Recent M-Pesa</h3>
            {mpesa.length === 0 ? (
              <p className="text-secondary">No M-Pesa transactions.</p>
            ) : (
              mpesa.slice(0, 5).map((m) => (
                <div key={m.id} className="py-sm border-b border-outline-variant last:border-0 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{m.student?.user.name ?? m.phone ?? "—"}</p>
                    <p className="text-label-sm text-secondary">{formatDate(m.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatKES(m.amount)}</p>
                    <StatusBadge label={m.status} variant={statusVariant(m.status)} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-md border-b border-outline-variant">
            <h3 className="text-title-md font-bold">Recent Payments</h3>
          </div>
          {payments.length === 0 ? (
            <div className="p-lg"><EmptyState icon="payments" title="No payments recorded" /></div>
          ) : (
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Amount", "Date", "Mode", "Status"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.slice(0, 20).map((p) => (
                  <tr key={p.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{p.student.user.name}</td>
                    <td className="px-md py-md font-bold text-primary">{formatKES(p.amount)}</td>
                    <td className="px-md py-md text-secondary">{formatDate(p.paymentDate)}</td>
                    <td className="px-md py-md text-secondary">{p.mode}</td>
                    <td className="px-md py-md">
                      <StatusBadge label={p.status} variant={statusVariant(p.status)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
