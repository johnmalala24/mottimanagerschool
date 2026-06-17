import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { ManualMpesaForm, SendRemindersButton } from "@/components/portal/FinanceWorkflow";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolFeeData } from "@/lib/server/school-admin";
import { prisma } from "@/lib/prisma";
import { formatDate, formatKES } from "@/lib/format";

export default async function FinanceMpesaPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="M-Pesa & Payments" />
        <div className="p-lg"><EmptyState icon="smartphone" title="No school linked" /></div>
      </>
    );
  }

  const { mpesa, invoices } = await getSchoolFeeData(schoolId);
  const students = await prisma.student.findMany({
    where: { schoolId, status: "ACTIVE" },
    include: { user: { select: { name: true } } },
    orderBy: { registrationNumber: "asc" },
  });

  return (
    <>
      <PageHeader
        title="M-Pesa & Manual Payments"
        subtitle="Record payments manually until M-Pesa API is connected. Parents receive email receipts."
        actions={<SendRemindersButton />}
      />
      <div className="flex flex-col gap-lg">
        <ManualMpesaForm
          students={students.map((s) => ({ id: s.id, name: s.user.name ?? "Student" }))}
          invoices={invoices.map((i) => ({
            id: i.id,
            studentId: i.studentId,
            invoiceNumber: i.invoiceNumber,
            balance: i.balance,
            academicYear: i.academicYear,
          }))}
        />

        {mpesa.length === 0 ? (
          <EmptyState icon="smartphone" title="No transactions yet" description="Record your first payment above." />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <h3 className="text-title-md font-bold p-lg border-b border-outline-variant">Transaction History</h3>
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
