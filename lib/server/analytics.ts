import { prisma } from "@/lib/prisma";
import { formatKES } from "@/lib/format";

export async function getAdvancedAnalytics(schoolId: string) {
  const months = 6;
  const feeCollectionTrend: { month: string; collected: number; target: number }[] = [];
  const examPerformance: { exam: string; average: number; students: number }[] = [];
  const subjectPerformance: { subject: string; average: number }[] = [];
  const atRiskStudents: { name: string; reason: string; class: string }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const start = new Date();
    start.setDate(1);
    start.setMonth(start.getMonth() - i);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    const label = start.toLocaleDateString("en-KE", { month: "short", year: "2-digit" });

    const [payments, invoices] = await Promise.all([
      prisma.feePayment.aggregate({
        where: { schoolId, paymentDate: { gte: start, lt: end }, status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.feeInvoice.aggregate({
        where: { schoolId, createdAt: { gte: start, lt: end } },
        _sum: { amount: true },
      }),
    ]);

    feeCollectionTrend.push({
      month: label,
      collected: payments._sum.amount ?? 0,
      target: invoices._sum.amount ?? 0,
    });
  }

  const exams = await prisma.exam.findMany({
    where: { schoolId, status: "PUBLISHED" },
    include: { grades: { select: { marks: true, studentId: true } } },
    orderBy: { publishedAt: "desc" },
    take: 6,
  });

  for (const exam of exams) {
    const marks = exam.grades.map((g) => g.marks).filter((m): m is number => m != null);
    const avg = marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;
    const students = new Set(exam.grades.map((g) => g.studentId)).size;
    examPerformance.push({ exam: exam.name, average: Math.round(avg * 10) / 10, students });
  }

  const gradesBySubject = await prisma.grade.groupBy({
    by: ["subjectId"],
    where: { schoolId, isPublished: true, marks: { not: null } },
    _avg: { marks: true },
  });

  const subjectIds = gradesBySubject.map((g) => g.subjectId);
  const subjects = await prisma.subject.findMany({
    where: { id: { in: subjectIds } },
    select: { id: true, name: true },
  });
  const subjectMap = new Map(subjects.map((s) => [s.id, s.name]));

  for (const g of gradesBySubject) {
    subjectPerformance.push({
      subject: subjectMap.get(g.subjectId) ?? "Unknown",
      average: Math.round((g._avg.marks ?? 0) * 10) / 10,
    });
  }
  subjectPerformance.sort((a, b) => b.average - a.average);

  const students = await prisma.student.findMany({
    where: { schoolId, status: "ACTIVE" },
    include: {
      user: { select: { name: true } },
      class: { select: { name: true } },
      feeInvoices: { where: { status: { in: ["OVERDUE", "PARTIAL"] } }, take: 1 },
      attendance: { orderBy: { date: "desc" }, take: 10 },
      grades: { where: { isPublished: true }, orderBy: { createdAt: "desc" }, take: 5 },
    },
    take: 200,
  });

  for (const s of students) {
    if (s.feeInvoices.length > 0) {
      atRiskStudents.push({
        name: s.user.name ?? "Student",
        class: s.class.name,
        reason: "Overdue fees",
      });
      continue;
    }
    const absences = s.attendance.filter((a) => a.status === "Absent").length;
    if (absences >= 3) {
      atRiskStudents.push({
        name: s.user.name ?? "Student",
        class: s.class.name,
        reason: `${absences} recent absences`,
      });
      continue;
    }
    const lowMarks = s.grades.filter((g) => g.marks != null && g.marks < 40);
    if (lowMarks.length >= 2) {
      atRiskStudents.push({
        name: s.user.name ?? "Student",
        class: s.class.name,
        reason: "Low exam performance",
      });
    }
  }

  const [totalStudents, activeTeachers, collectionRate, avgAttendance] = await Promise.all([
    prisma.student.count({ where: { schoolId, status: "ACTIVE" } }),
    prisma.teacher.count({ where: { schoolId } }),
    computeCollectionRate(schoolId),
    computeAvgAttendance(schoolId, 30),
  ]);

  return {
    summary: {
      totalStudents,
      activeTeachers,
      collectionRate,
      avgAttendance,
      atRiskCount: atRiskStudents.length,
    },
    feeCollectionTrend,
    examPerformance,
    subjectPerformance: subjectPerformance.slice(0, 8),
    atRiskStudents: atRiskStudents.slice(0, 15),
  };
}

async function computeCollectionRate(schoolId: string) {
  const agg = await prisma.feeInvoice.aggregate({
    where: { schoolId },
    _sum: { amount: true, paidAmount: true },
  });
  const total = agg._sum.amount ?? 0;
  const paid = agg._sum.paidAmount ?? 0;
  return total > 0 ? Math.round((paid / total) * 100) : 0;
}

async function computeAvgAttendance(schoolId: string, days: number) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const records = await prisma.attendance.findMany({
    where: { schoolId, date: { gte: since } },
    select: { status: true },
  });
  if (records.length === 0) return 0;
  const present = records.filter((r) => ["Present", "Late"].includes(r.status)).length;
  return Math.round((present / records.length) * 100);
}

export async function runAutomatedReminders(schoolId: string) {
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: { name: true, settings: { select: { emailEnabled: true } } },
  });
  if (!school?.settings?.emailEnabled) return { emails: 0, notifications: 0 };

  const { sendBulkSchoolEmail, notifyParentByEmail } = await import("@/lib/server/email");
  const { notifyStudentParent, notifyRoleUsers } = await import("@/lib/server/notifications");

  let emails = 0;
  let notifications = 0;

  const overdue = await prisma.feeInvoice.findMany({
    where: { schoolId, status: { in: ["OVERDUE", "PARTIAL"] }, balance: { gt: 0 } },
    include: {
      student: { include: { user: { select: { name: true } } } },
    },
    take: 50,
  });

  for (const inv of overdue) {
    const result = await notifyParentByEmail({
      schoolId,
      schoolName: school.name,
      studentId: inv.studentId,
      subject: `Fee reminder — ${school.name}`,
      title: "Fee Payment Reminder",
      body: `Dear Parent,\n\nThis is a reminder that ${inv.student.user.name} has an outstanding balance of ${formatKES(inv.balance)} on invoice ${inv.invoiceNumber}.\n\nPlease log in to MottiManager to view details and record payment.`,
      type: "fee_reminder",
    });
    emails += result.sent;

    notifications += await notifyStudentParent({
      schoolId,
      studentId: inv.studentId,
      title: "Fee balance reminder",
      message: `Outstanding balance: ${formatKES(inv.balance)} on ${inv.invoiceNumber}`,
      type: "Warning",
      actionUrl: "/parent/fees",
    });
  }

  await prisma.feeInvoice.updateMany({
    where: { schoolId, status: "PENDING", dueDate: { lt: new Date() } },
    data: { status: "OVERDUE" },
  });

  notifications += await notifyRoleUsers({
    schoolId,
    roles: ["FINANCE", "SCHOOL_ADMIN"],
    title: "Automated reminders sent",
    message: `${overdue.length} fee reminder emails processed.`,
    type: "Info",
    actionUrl: "/finance",
  });

  return { emails, notifications, overdue: overdue.length };
}
