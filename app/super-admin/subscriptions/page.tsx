import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSubscriptions } from "@/lib/server/super-admin";
import { formatDate, formatKES } from "@/lib/format";

export default async function SuperAdminSubscriptionsPage() {
  const subscriptions = await getSubscriptions();

  return (
    <>
      <PageHeader
        title="Subscriptions"
        subtitle="School subscription plans and renewal dates."
      />
      <div className="p-lg">
        {subscriptions.length === 0 ? (
          <EmptyState
            icon="subscriptions"
            title="No subscriptions"
            description="Subscriptions are created when schools are onboarded."
          />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["School", "Plan", "Status", "Monthly", "Renewal"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-t border-outline-variant hover:bg-surface-container-low"
                  >
                    <td className="px-md py-md text-label-md font-semibold">
                      {sub.school.name}
                    </td>
                    <td className="px-md py-md">
                      <StatusBadge label={sub.plan} variant="info" />
                    </td>
                    <td className="px-md py-md">
                      <StatusBadge
                        label={sub.status.replace("_", " ")}
                        variant={statusVariant(sub.status)}
                      />
                    </td>
                    <td className="px-md py-md font-semibold">
                      {formatKES(sub.monthlyAmount)}
                    </td>
                    <td className="px-md py-md text-secondary">
                      {sub.renewalDate ? formatDate(sub.renewalDate) : "—"}
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
