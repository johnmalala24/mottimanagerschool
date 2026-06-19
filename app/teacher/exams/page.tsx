import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import FormModal from "@/components/portal/FormModal";
import { TableSearch, Pagination } from "@/components/portal/ListsCommon";
import { getSchoolContext } from "@/lib/server/context";
import { getTeacherRecord } from "@/lib/server/teacher";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function TeacherExamsPage(props: {
  searchParams: SearchParams;
}) {
  const { schoolId } = await getSchoolContext();
  const teacher = await getTeacherRecord();

  if (!schoolId || !teacher) {
    return (
      <>
        <PageHeader title="Exams" />
        <div className="p-lg">
          <EmptyState icon="grade" title="Teacher not found" />
        </div>
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
    where.name = { contains: search, mode: "insensitive" };
  }

  const [exams, count, subjects, teacherClasses] = await Promise.all([
    prisma.exam.findMany({
      where,
      include: {
        class: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    }),
    prisma.exam.count({ where }),
    prisma.subject.findMany({
      where: { schoolId },
      select: { id: true, name: true },
    }),
    prisma.class.findMany({
      where: { schoolId, teachers: { some: { id: teacher.id } } },
      select: { id: true, name: true },
    }),
  ]);

  const classesOptions = teacherClasses.map((c) => ({ id: c.id, name: c.name }));
  const subjectsOptions = subjects.map((s) => ({ id: s.id, name: s.name }));

  return (
    <>
      <PageHeader
        title="Exams"
        subtitle="Manage exams, set status, and publish grades."
      />

      <div className="space-y-lg mt-md">
        {/* Actions & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-md bg-surface p-md rounded-xl border border-outline-variant">
          <div className="flex flex-wrap items-center gap-sm">
            <TableSearch />
            <form className="flex items-center gap-xs">
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
                {classesOptions.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </form>
          </div>

          <FormModal
            table="exam"
            type="create"
            classes={classesOptions}
            subjects={subjectsOptions}
          />
        </div>

        {exams.length === 0 ? (
          <EmptyState
            icon="grade"
            title="No exams found"
            description="Create your first exam using the '+' button above."
          />
        ) : (
          <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-container-low">
                  <tr className="border-b border-outline-variant">
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Exam Name</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Class</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Term</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Academic Year</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Max Marks</th>
                    <th className="text-left px-lg py-md text-label-sm font-bold text-secondary uppercase">Status</th>
                    <th className="text-center px-lg py-md text-label-sm font-bold text-secondary uppercase w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {exams.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-md font-semibold text-body-large">{item.name}</td>
                      <td className="px-lg py-md text-secondary">{item.class.name}</td>
                      <td className="px-lg py-md text-secondary">{item.term}</td>
                      <td className="px-lg py-md text-secondary">{item.academicYear}</td>
                      <td className="px-lg py-md font-bold">{item.maxMarks}</td>
                      <td className="px-lg py-md">
                        <span className={`text-label-sm px-sm py-xs rounded-full font-semibold ${
                          item.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : item.status === "OPEN"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-lg py-md">
                        <div className="flex items-center justify-center gap-xs">
                          <FormModal
                            table="exam"
                            type="update"
                            data={item}
                            classes={classesOptions}
                            subjects={subjectsOptions}
                          />
                          <FormModal
                            table="exam"
                            type="delete"
                            data={item}
                            classes={classesOptions}
                            subjects={subjectsOptions}
                          />
                        </div>
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
