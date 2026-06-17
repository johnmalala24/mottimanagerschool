import PageHeader from "@/components/portal/PageHeader";
import { getDatabaseTableCounts } from "@/lib/server/super-admin";

export default async function SuperAdminDatabasePage() {
  const counts = await getDatabaseTableCounts();

  return (
    <>
      <PageHeader
        title="Database Overview"
        subtitle="Record counts across core platform tables."
      />
      <div className="p-lg">
        <div className="tonal-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">
                  Table
                </th>
                <th className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">
                  Records
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(counts).map(([table, count]) => (
                <tr key={table} className="border-t border-outline-variant">
                  <td className="px-md py-md font-mono text-label-md">{table}</td>
                  <td className="px-md py-md font-bold">{count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
