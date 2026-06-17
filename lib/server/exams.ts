import { prisma } from "@/lib/prisma";
import type { ExamStatus } from "@prisma/client";
import { marksToGradePoint, rankStudents } from "@/lib/server/grade-calc";
import { notifyRoleUsers, notifyStudentParent } from "@/lib/server/notifications";
import { sendBulkSchoolEmail, notifyParentByEmail } from "@/lib/server/email";

export async function getSchoolExams(schoolId: string) {
  return prisma.exam.findMany({
    where: { schoolId },
    include: {
      class: { select: { name: true, section: true } },
      _count: { select: { grades: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getExamById(schoolId: string, examId: string) {
  return prisma.exam.findFirst({
    where: { id: examId, schoolId },
    include: {
      class: {
        include: {
          students: {
            where: { status: "ACTIVE" },
            include: { user: { select: { name: true } } },
          },
        },
      },
      grades: {
        include: {
          student: { include: { user: { select: { name: true } } } },
          subject: { select: { name: true, code: true } },
        },
      },
    },
  });
}

export async function createExam(
  schoolId: string,
  data: {
    name: string;
    classId: string;
    term: string;
    academicYear: string;
    maxMarks?: number;
    subjectIds: string[];
    createdById?: string;
  }
) {
  const cls = await prisma.class.findFirst({ where: { id: data.classId, schoolId } });
  if (!cls) throw new Error("Class not found");

  return prisma.exam.create({
    data: {
      schoolId,
      name: data.name,
      classId: data.classId,
      term: data.term,
      academicYear: data.academicYear,
      maxMarks: data.maxMarks ?? 100,
      subjectIds: data.subjectIds,
      createdById: data.createdById,
      status: "DRAFT",
    },
  });
}

export async function updateExamStatus(
  schoolId: string,
  examId: string,
  status: ExamStatus
) {
  const exam = await prisma.exam.findFirst({ where: { id: examId, schoolId } });
  if (!exam) throw new Error("Exam not found");

  const transitions: Record<ExamStatus, ExamStatus[]> = {
    DRAFT: ["OPEN"],
    OPEN: ["CLOSED", "DRAFT"],
    CLOSED: ["OPEN", "PROCESSED"],
    PROCESSED: ["PUBLISHED", "CLOSED"],
    PUBLISHED: [],
  };

  if (!transitions[exam.status]?.includes(status)) {
    throw new Error(`Cannot move exam from ${exam.status} to ${status}`);
  }

  return prisma.exam.update({
    where: { id: examId },
    data: {
      status,
      ...(status === "PROCESSED" ? { processedAt: new Date() } : {}),
      ...(status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
    },
  });
}

export async function saveExamMarks(
  schoolId: string,
  examId: string,
  marks: { studentId: string; subjectId: string; marks?: number; teacherComment?: string }[]
) {
  const exam = await prisma.exam.findFirst({ where: { id: examId, schoolId } });
  if (!exam) throw new Error("Exam not found");
  if (exam.status !== "OPEN") throw new Error("Exam is not open for marks entry");

  const results = [];
  for (const row of marks) {
    if (row.marks != null && (row.marks < 0 || row.marks > exam.maxMarks)) {
      throw new Error(`Marks must be between 0 and ${exam.maxMarks}`);
    }
    const gradePoint =
      row.marks != null ? marksToGradePoint(row.marks, exam.maxMarks) : undefined;

    const grade = await prisma.grade.upsert({
      where: {
        schoolId_studentId_subjectId_examName_academicYear: {
          schoolId,
          studentId: row.studentId,
          subjectId: row.subjectId,
          examName: exam.name,
          academicYear: exam.academicYear,
        },
      },
      create: {
        schoolId,
        classId: exam.classId,
        studentId: row.studentId,
        subjectId: row.subjectId,
        examId: exam.id,
        examName: exam.name,
        marks: row.marks,
        gradePoint,
        teacherComment: row.teacherComment,
        term: exam.term,
        academicYear: exam.academicYear,
        isPublished: false,
      },
      update: {
        marks: row.marks,
        gradePoint,
        teacherComment: row.teacherComment,
        examId: exam.id,
      },
    });
    results.push(grade);
  }
  return results;
}

export async function processExamResults(schoolId: string, examId: string) {
  const exam = await prisma.exam.findFirst({ where: { id: examId, schoolId } });
  if (!exam) throw new Error("Exam not found");
  if (!["CLOSED", "OPEN"].includes(exam.status)) {
    throw new Error("Exam must be closed before processing");
  }

  const grades = await prisma.grade.findMany({
    where: { examId: exam.id, schoolId },
  });

  const byStudent = new Map<string, number>();
  for (const g of grades) {
    if (g.marks == null) continue;
    byStudent.set(g.studentId, (byStudent.get(g.studentId) ?? 0) + g.marks);
  }

  const totals = [...byStudent.entries()].map(([studentId, total]) => ({ studentId, total }));
  const ranks = rankStudents(totals);

  await prisma.$transaction([
    ...grades.map((g) => {
      const gradePoint =
        g.marks != null ? marksToGradePoint(g.marks, exam.maxMarks) : g.gradePoint;
      return prisma.grade.update({
        where: { id: g.id },
        data: {
          gradePoint,
          position: ranks.get(g.studentId) ?? null,
        },
      });
    }),
    prisma.exam.update({
      where: { id: examId },
      data: { status: "PROCESSED", processedAt: new Date() },
    }),
  ]);

  return { processed: grades.length, students: totals.length };
}

export async function publishExamResults(schoolId: string, examId: string) {
  const exam = await prisma.exam.findFirst({
    where: { id: examId, schoolId },
    include: { class: { select: { name: true } } },
  });
  if (!exam) throw new Error("Exam not found");
  if (exam.status !== "PROCESSED") throw new Error("Process results before publishing");

  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: { name: true },
  });

  await prisma.$transaction([
    prisma.grade.updateMany({
      where: { examId: exam.id, schoolId },
      data: { isPublished: true },
    }),
    prisma.exam.update({
      where: { id: examId },
      data: { status: "PUBLISHED", publishedAt: new Date() },
    }),
  ]);

  const students = await prisma.student.findMany({
    where: { classId: exam.classId, schoolId, status: "ACTIVE" },
    select: { id: true },
  });

  for (const s of students) {
    await notifyStudentParent({
      schoolId,
      studentId: s.id,
      title: `${exam.name} results published`,
      message: `Results for ${exam.name} (${exam.class.name}) are now available in your portal.`,
      type: "Success",
      actionUrl: "/parent/results",
    });
    await notifyParentByEmail({
      schoolId,
      schoolName: school?.name ?? "School",
      studentId: s.id,
      subject: `${exam.name} results — ${school?.name}`,
      title: "Exam Results Published",
      body: `Dear Parent,\n\nResults for ${exam.name} (${exam.term}, ${exam.academicYear}) are now available.\n\nSign in to MottiManager to view detailed results and download the report card.`,
      type: "exam_results",
    });
  }

  await notifyRoleUsers({
    schoolId,
    roles: ["SCHOOL_ADMIN", "DEPUTY_ADMIN"],
    title: `${exam.name} published`,
    message: `Exam results for ${exam.class.name} have been published to parents.`,
    type: "Info",
    actionUrl: "/school-admin/exams",
  });

  return { published: true, students: students.length };
}

export async function getExamMarksGrid(schoolId: string, examId: string) {
  const exam = await getExamById(schoolId, examId);
  if (!exam) return null;

  const subjects = await prisma.subject.findMany({
    where: { id: { in: exam.subjectIds }, schoolId },
    select: { id: true, name: true, code: true },
  });

  const gradeMap = new Map<string, (typeof exam.grades)[0]>();
  for (const g of exam.grades) {
    gradeMap.set(`${g.studentId}:${g.subjectId}`, g);
  }

  return {
    exam,
    subjects,
    students: exam.class.students,
    gradeMap: Object.fromEntries(gradeMap),
  };
}

export async function getStudentReportCard(
  schoolId: string,
  studentId: string,
  term: string,
  academicYear: string
) {
  const student = await prisma.student.findFirst({
    where: { id: studentId, schoolId },
    include: {
      user: { select: { name: true, email: true } },
      class: true,
      school: { select: { name: true, logo: true, principalName: true } },
    },
  });
  if (!student) return null;

  const grades = await prisma.grade.findMany({
    where: {
      schoolId,
      studentId,
      term,
      academicYear,
      isPublished: true,
    },
    include: { subject: { select: { name: true, code: true } }, exam: true },
    orderBy: { subject: { name: "asc" } },
  });

  const cbe = await prisma.cbeAssessment.findMany({
    where: { schoolId, studentId, term, academicYear },
    orderBy: { learningArea: "asc" },
  });

  const attendance = await prisma.attendance.findMany({
    where: { schoolId, studentId },
    orderBy: { date: "desc" },
    take: 90,
  });

  const present = attendance.filter((a) => ["Present", "Late"].includes(a.status)).length;
  const attendanceRate =
    attendance.length > 0 ? Math.round((present / attendance.length) * 100) : null;

  const totalMarks = grades.reduce((s, g) => s + (g.marks ?? 0), 0);
  const position = grades[0]?.position ?? null;

  return {
    student,
    grades,
    cbe,
    attendanceRate,
    totalMarks,
    position,
    term,
    academicYear,
  };
}
