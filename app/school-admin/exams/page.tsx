import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { CreateExamForm, ExamListPanel } from "@/components/portal/ExamWorkflow";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolExams } from "@/lib/server/exams";
import { prisma } from "@/lib/prisma";

export default async function SchoolAdminExamsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Exams & CBE" />
        <div className="p-lg"><EmptyState icon="analytics" title="No school linked" /></div>
      </>
    );
  }

  const [exams, classes, subjects, years] = await Promise.all([
    getSchoolExams(schoolId),
    prisma.class.findMany({ where: { schoolId }, select: { id: true, name: true, section: true } }),
    prisma.subject.findMany({ where: { schoolId }, select: { id: true, name: true, code: true } }),
    prisma.academicYear.findFirst({ where: { schoolId, isCurrent: true }, select: { name: true } }),
  ]);

  return (
    <>
      <PageHeader
        title="Exams & Assessment"
        subtitle="Create exams, enter marks, process results, and publish to parents — Zeraki-style workflow."
      />
      <div className="flex flex-col gap-lg">
        <CreateExamForm
          classes={classes}
          subjects={subjects}
          defaultYear={years?.name ?? String(new Date().getFullYear())}
        />
        <div>
          <h2 className="text-title-md font-bold mb-md">All Exams</h2>
          <ExamListPanel exams={exams} />
        </div>
      </div>
    </>
  );
}
