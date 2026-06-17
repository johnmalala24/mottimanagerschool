import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/server/session";

export async function getStudentRecord() {
  const user = await getSessionUser();
  if (!user?.id) return null;
  return prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      user: { select: { name: true, email: true } },
      class: true,
      parent: { include: { user: { select: { name: true } } } },
    },
  });
}

export async function getStudentDashboardData(studentId: string, schoolId: string) {
  const [attendance, grades, materials, cbe, student] = await Promise.all([
    prisma.attendance.findMany({
      where: { studentId, schoolId },
      orderBy: { date: "desc" },
      take: 30,
    }),
    prisma.grade.findMany({
      where: { studentId, schoolId },
      include: { subject: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.learningMaterial.findMany({
      where: { schoolId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.cbeAssessment.findMany({
      where: { studentId, schoolId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.student.findUnique({
      where: { id: studentId },
      select: { classId: true },
    }),
  ]);

  const classAssignments = student
    ? await prisma.assignment.findMany({
        where: { schoolId, classId: student.classId },
        include: { subject: true },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    : [];

  const classTimetable = student
    ? await prisma.timetable.findMany({
        where: { schoolId, classId: student.classId },
        include: {
          subject: true,
          teacher: { include: { user: { select: { name: true } } } },
        },
        orderBy: { dayOfWeek: "asc" },
      })
    : [];

  return {
    attendance,
    grades,
    assignments: classAssignments,
    timetable: classTimetable,
    materials,
    cbe,
  };
}
