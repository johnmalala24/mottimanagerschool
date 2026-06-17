import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/server/session";

export async function getTeacherRecord() {
  const user = await getSessionUser();
  if (!user?.id) return null;
  return prisma.teacher.findUnique({
    where: { userId: user.id },
    include: {
      user: { select: { name: true, email: true } },
      subject: true,
      classesTeaching: {
        include: { students: { select: { id: true } } },
      },
    },
  });
}

export async function getTeacherClasses(teacherId: string) {
  return prisma.class.findMany({
    where: { classTeacherId: teacherId },
    include: { students: { select: { id: true } }, subjects: true },
  });
}

export async function getTeacherTimetable(teacherId: string) {
  return prisma.timetable.findMany({
    where: { teacherId },
    include: { class: true, subject: true },
    orderBy: { dayOfWeek: "asc" },
  });
}

export async function getTeacherAssignments(schoolId: string, teacherId: string) {
  return prisma.assignment.findMany({
    where: { schoolId, teacherId },
    include: { class: true, subject: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTeacherGrades(schoolId: string, teacherId: string) {
  const classes = await prisma.class.findMany({
    where: { classTeacherId: teacherId },
    select: { id: true },
  });
  const classIds = classes.map((c) => c.id);
  if (classIds.length === 0) return [];
  return prisma.grade.findMany({
    where: { schoolId, classId: { in: classIds } },
    include: {
      student: { include: { user: { select: { name: true } } } },
      subject: true,
      class: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getTeacherAttendance(schoolId: string, teacherId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next = new Date(today);
  next.setDate(next.getDate() + 1);
  return prisma.attendance.findMany({
    where: {
      schoolId,
      teacherId,
      date: { gte: today, lt: next },
    },
    include: {
      student: { include: { user: { select: { name: true } } } },
      class: true,
    },
  });
}

export async function getTeacherCbe(schoolId: string, teacherId: string) {
  const classes = await prisma.class.findMany({
    where: { classTeacherId: teacherId },
    select: { students: { select: { id: true } } },
  });
  const studentIds = classes.flatMap((c) => c.students.map((s) => s.id));
  if (studentIds.length === 0) return [];
  return prisma.cbeAssessment.findMany({
    where: { schoolId, studentId: { in: studentIds } },
    include: { student: { include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getSchoolAnnouncements(schoolId: string) {
  return prisma.announcement.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
