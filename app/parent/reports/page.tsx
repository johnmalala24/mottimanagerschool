import PageHeader from "@/components/portal/PageHeader";
import ReportCard from "@/components/portal/ReportCard";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getParentRecord } from "@/lib/server/parent";
import { getStudentReportCard } from "@/lib/server/exams";

export default async function ParentReportsPage() {
  const { schoolId, branding } = await getSchoolContext();
  const parent = await getParentRecord();

  if (!schoolId || !parent) {
    return (
      <>
        <PageHeader title="Report Cards" />
        <EmptyState icon="family_restroom" title="Parent profile not found" />
      </>
    );
  }

  const child = parent.students[0];
  if (!child) {
    return (
      <>
        <PageHeader title="Report Cards" />
        <EmptyState icon="person" title="No linked students" />
      </>
    );
  }

  const report = await getStudentReportCard(
    schoolId,
    child.id,
    "Term 1",
    new Date().getFullYear().toString()
  );

  if (!report || report.grades.length === 0) {
    return (
      <>
        <PageHeader title="Report Cards" subtitle="Download and print official report cards." />
        <EmptyState
          icon="description"
          title="No published results yet"
          description="Report cards appear here once the school publishes exam results."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Report Cards" subtitle={`${child.user.name} — official academic report`} />
      <ReportCard
        branding={branding}
        studentName={child.user.name ?? "Student"}
        admissionNumber={child.registrationNumber}
        className={child.class.name}
        term={report.term}
        academicYear={report.academicYear}
        grades={report.grades.map((g) => ({
          subject: g.subject,
          marks: g.marks,
          gradePoint: g.gradePoint,
          examName: g.examName,
        }))}
        cbe={report.cbe.map((c) => ({ learningArea: c.learningArea, level: c.level }))}
        attendanceRate={report.attendanceRate}
        totalMarks={report.totalMarks}
        position={report.position}
        principalName={report.student.school.principalName}
      />
    </>
  );
}
