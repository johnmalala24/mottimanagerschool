import PageHeader from "@/components/portal/PageHeader";
import PromotionWizard from "@/components/portal/PromotionWizard";
import { getSchoolContext } from "@/lib/server/context";
import { getPromotionHistory } from "@/lib/server/promotion";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export default async function PromotionPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <PageHeader title="Promotion" subtitle="No school linked" />;

  const [classes, currentYear, history] = await Promise.all([
    prisma.class.findMany({ where: { schoolId }, select: { id: true, name: true, section: true }, orderBy: { name: "asc" } }),
    prisma.academicYear.findFirst({ where: { schoolId, isCurrent: true }, select: { name: true } }),
    getPromotionHistory(schoolId),
  ]);

  return (
    <>
      <PageHeader title="End-of-Year Promotion" subtitle="Promote, repeat, or graduate students for the new academic year." />
      <div className="flex flex-col gap-lg">
        <PromotionWizard classes={classes} currentYear={currentYear?.name ?? String(new Date().getFullYear())} />
        {history.length > 0 && (
          <div className="tonal-card rounded-xl p-lg">
            <h3 className="text-title-md font-bold mb-md">Promotion History</h3>
            {history.map((h) => (
              <div key={h.id} className="flex justify-between py-sm border-b border-outline-variant last:border-0 text-sm">
                <span>{h.fromAcademicYear} → {h.toAcademicYear}</span>
                <span className="text-secondary">
                  {h.promotedCount} promoted · {h.repeatedCount} repeated · {h.graduatedCount} graduated · {formatDate(h.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
