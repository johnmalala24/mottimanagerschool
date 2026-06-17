import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getBillingTransactions } from "@/lib/server/super-admin";
import { formatDate, formatKES } from "@/lib/format";

export default async function SuperAdminBillingPage() {
  const transactions = await getBillingTransactions();

  return (
    <>
      <PageHeader
        title="Billing"
        subtitle="Platform billing transactions from school subscriptions."
      />
      <div className="p-lg">
        {transactions.length === 0 ? (
          <EmptyState
            icon="payments"
            title="No billing transactions"
            description="Subscription payments will appear here when schools are billed."
          />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["School", "Amount", "Description", "Status", "Date", "Reference"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-t border-outline-variant hover:bg-surface-container-low"
                  >
                    <td className="px-md py-md font-semibold">{tx.school.name}</td>
                    <td className="px-md py-md font-bold text-primary">
                      {formatKES(tx.amount)}
                    </td>
                    <td className="px-md py-md text-secondary">
                      {tx.description ?? "—"}
                    </td>
                    <td className="px-md py-md">
                      <StatusBadge
                        label={tx.status}
                        variant={statusVariant(tx.status)}
                      />
                    </td>
                    <td className="px-md py-md text-secondary whitespace-nowrap">
                      {formatDate(tx.paymentDate)}
                    </td>
                    <td className="px-md py-md text-label-sm font-mono text-secondary">
                      {tx.transactionId ?? "—"}
                    </td>
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
