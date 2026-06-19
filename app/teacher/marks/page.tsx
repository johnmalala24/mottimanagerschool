import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { EnterGradeForm } from "@/components/portal/forms/OperationForms";
import { TableSearch, Pagination } from "@/components/portal/ListsCommon";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord } from "@/lib/server/teacher";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function TeacherMarksPage(props: {
  searchParams: SearchParams;
}) {
  const { schoolId } = await getSchoolContext();
  const teacher = await getTeacherRecord();
  if (!schoolId || !teacher) {
    return (
      <>
        <PageHeader title="Exam Marks" />
        <div className="p-lg"><EmptyState icon="grade" title="Teacher not found" /></div>
      </>
    );
  }

  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page ?? "1");
  const search = searchParams.search ?? "";
  const classFilter = searchParams.classId ?? "";

  const limit = 10;
  const skip = (page - 1) * limit;

  // Build Prisma query
  const where: any = {
    schoolId,
    classId: { in: teacher.classesTeaching.map((c) => c.id) },
  };

  if (classFilter) {
    where.classId = classFilter;
  }
  if (search) {
    where.student = {
      user: {
        name: { contains: search, mode: "insensitive" },
      },
    };
  }

  const [grades, count, classes, subjects, students] = await Promise.all([
    prisma.grade.findMany({
      where,
      include: {
        student: { include: { user: { select: { name: true } } } },
        subject: { select: { name: true } },
        class: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    }),
    prisma.grade.count({ where }),
    prisma.class.findMany({
      where: { schoolId, classTeacherId: teacher.id },
      select: { id: true, name: true, section: true },
    }),
    prisma.subject.findMany({ where: { schoolId }, select: { id: true, name: true } }),
    prisma.student.findMany({
      where: { schoolId, status: "ACTIVE" },
      include: { user: { select: { name: true } } },
    }),
  ]);

  return (
    <>
      <PageHeader title="Exam Marks" subtitle="Enter and view marks for your classes." />
      
      <div className="space-y-lg mt-md">
        {/* Enter Grade Form */}
        <EnterGradeForm
          classes={classes}
          subjects={subjects}
          students={students.map((s) => ({
            id: s.id,
            name: s.user.name ?? "Student",
            classId: s.classId,
          }))}
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-md bg-surface p-md rounded-xl border border-outline-variant">
          <div className="flex flex-wrap items-center gap-sm w-full">
            <TableSearch />
            <select
              name="classId"
              className="input-premium !w-auto !py-1 text-sm"
              defaultValue={classFilter}
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                if (e.target.value) {
                  params.set("classId", e.target.value);
                } else {
                  params.delete("classId");
                }
                params.set("page", "1");
                window.location.search = params.toString();
              }}
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {grades.length === 0 ? (
          <EmptyState icon="grade" title="No marks entered" />
        ) : (
          <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-container-low">
                  <tr className="border-b border-outline-variant">
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Student</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Class</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Subject</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Exam</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Marks</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {grades.map((g) => (
                    <tr key={g.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-md font-semibold text-body-large">{g.student.user.name}</td>
                      <td className="px-lg py-md text-secondary">{g.class.name}</td>
                      <td className="px-lg py-md text-secondary">{g.subject.name}</td>
                      <td className="px-lg py-md text-secondary">{g.examName}</td>
                      <td className="px-lg py-md font-bold">{g.marks ?? "—"}</td>
                      <td className="px-lg py-md">
                        <span className="text-label-sm bg-surface-container-high px-sm py-xs rounded-full font-semibold">
                          {g.gradePoint ?? "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination page={page} count={count} limit={limit} />
          </div>
        )}
      </div>
    </>
  );
}
