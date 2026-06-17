import PageHeader from "@/components/portal/PageHeader";
import { CbeCurriculumPanel } from "@/components/portal/CbeCurriculumPanel";
import { getSchoolContext } from "@/lib/server/context";
import { getCbeCurriculum } from "@/lib/server/cbe-curriculum";
import { prisma } from "@/lib/prisma";

export default async function SchoolAdminCbePage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <PageHeader title="CBE Curriculum" subtitle="No school linked" />;

  const [curriculum, students, year] = await Promise.all([
    getCbeCurriculum(schoolId),
    prisma.student.findMany({
      where: { schoolId, status: "ACTIVE" },
      include: { user: { select: { name: true } } },
      take: 100,
    }),
    prisma.academicYear.findFirst({ where: { schoolId, isCurrent: true }, select: { name: true } }),
  ]);

  return (
    <>
      <PageHeader title="CBE Curriculum" subtitle="Learning areas, strands, competencies, and student assessments." />
      <CbeCurriculumPanel
        curriculum={curriculum}
        students={students.map((s) => ({ id: s.id, name: s.user.name ?? "Student" }))}
        defaultTerm="Term 1"
        defaultYear={year?.name ?? String(new Date().getFullYear())}
      />
    </>
  );
}
