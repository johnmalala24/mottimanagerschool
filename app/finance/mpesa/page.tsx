import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolFeeData } from "@/lib/server/school-admin";
import { formatDate, formatKES } from "@/lib/format";

export default async function FinanceMpesaPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="M-Pesa Tracking" />
        <div className="p-lg"><EmptyState icon="smartphone" title="No school linked" /></div>
      </>
    );
  }

  const { mpesa } = await getSchoolFeeData(schoolId);

  return (
    <>
      <PageHeader title="M-Pesa Tracking" subtitle="STK Push, C2B, and manual reconciliation." />
      <div className="p-lg">
        {mpesa.length === 0 ? (
          <EmptyState icon="smartphone" title="No M-Pesa transactions" />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Student", "Phone", "Amount", "Type", "Status", "Reference", "Date"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mpesa.map((m) => (
                  <tr key={m.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{m.student?.user.name ?? "—"}</td>
                    <td className="px-md py-md text-secondary">{m.phone ?? "—"}</td>
                    <td className="px-md py-md font-bold text-primary">{formatKES(m.amount)}</td>
                    <td className="px-md py-md">{m.type.replace("_", " ")}</td>
                    <td className="px-md py-md"><StatusBadge label={m.status} variant={statusVariant(m.status)} /></td>
                    <td className="px-md py-md font-mono text-label-sm">{m.transactionId ?? "—"}</td>
                    <td className="px-md py-md text-secondary">{formatDate(m.createdAt)}</td>
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
