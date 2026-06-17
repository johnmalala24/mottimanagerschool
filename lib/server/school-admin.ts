import { prisma } from "@/lib/prisma";
import { formatKES } from "@/lib/format";

export async function getSchoolById(schoolId: string) {
  return prisma.school.findUnique({
    where: { id: schoolId },
    include: {
      settings: true,
      subscription: true,
      academicYears: { include: { terms: true } },
      students: { select: { id: true } },
      teachers: { select: { id: true } },
      users: {
        where: { role: "SCHOOL_ADMIN" },
        select: { name: true, email: true, phone: true },
        take: 1,
      },
    },
  });
}

export async function getSchoolAdminDashboard(schoolId: string) {
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: { name: true },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalStudents,
    totalTeachers,
    totalClasses,
    todayPayments,
    recentAttendance,
    overdueInvoices,
    recentAnnouncements,
  ] = await Promise.all([
    prisma.student.count({ where: { schoolId, status: "ACTIVE" } }),
    prisma.teacher.count({ where: { schoolId } }),
    prisma.class.count({ where: { schoolId } }),
    prisma.feePayment.aggregate({
      where: { schoolId, paymentDate: { gte: today }, status: "COMPLETED" },
      _sum: { amount: true },
    }),
    prisma.attendance.findMany({
      where: { schoolId, date: { gte: today } },
      select: { status: true },
    }),
    prisma.feeInvoice.count({
      where: { schoolId, status: { in: ["OVERDUE", "PARTIAL"] } },
    }),
    prisma.announcement.findMany({
      where: { schoolId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const present = recentAttendance.filter((a) =>
    ["Present", "Late"].includes(a.status)
  ).length;
  const attendanceRate =
    recentAttendance.length > 0
      ? Math.round((present / recentAttendance.length) * 100)
      : 0;

  const feesToday = todayPayments._sum.amount ?? 0;

  return {
    schoolName: school?.name ?? "School",
    totalStudents,
    totalTeachers,
    totalClasses,
    feesToday,
    feesTodayFormatted: formatKES(feesToday),
    attendanceRate,
    overdueInvoices,
    recentAnnouncements,
  };
}

export async function getSchoolStudents(schoolId: string) {
  return prisma.student.findMany({
    where: { schoolId },
    include: {
      user: { select: { name: true } },
      class: { select: { name: true, section: true } },
      parent: { include: { user: { select: { name: true, phone: true } } } },
      feeInvoices: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { status: true },
      },
    },
    orderBy: { registrationNumber: "asc" },
  });
}

export async function getSchoolStaff(schoolId: string) {
  return prisma.teacher.findMany({
    where: { schoolId },
    include: {
      user: { select: { name: true, phone: true } },
      subject: { select: { name: true } },
      classesTeaching: { select: { name: true } },
    },
  });
}

export async function getSchoolClasses(schoolId: string) {
  return prisma.class.findMany({
    where: { schoolId },
    include: {
      classTeacher: {
        include: { user: { select: { name: true } } },
      },
      students: { select: { id: true } },
      subjects: { select: { id: true } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getSchoolAttendance(schoolId: string, date?: Date) {
  const target = date ?? new Date();
  target.setHours(0, 0, 0, 0);
  const next = new Date(target);
  next.setDate(next.getDate() + 1);

  return prisma.attendance.findMany({
    where: {
      schoolId,
      date: { gte: target, lt: next },
    },
    include: {
      student: {
        include: {
          user: { select: { name: true } },
          class: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSchoolGrades(schoolId: string) {
  return prisma.grade.findMany({
    where: { schoolId },
    include: {
      student: { include: { user: { select: { name: true } } } },
      subject: { select: { name: true } },
      class: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getSchoolFeeData(schoolId: string) {
  const [structures, payments, invoices, mpesa] = await Promise.all([
    prisma.feeStructure.findMany({ where: { schoolId } }),
    prisma.feePayment.findMany({
      where: { schoolId },
      include: {
        student: { include: { user: { select: { name: true } } } },
      },
      orderBy: { paymentDate: "desc" },
      take: 50,
    }),
    prisma.feeInvoice.findMany({
      where: { schoolId },
      include: {
        student: { include: { user: { select: { name: true } }, class: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.mpesaTransaction.findMany({
      where: { schoolId },
      include: {
        student: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return { structures, payments, invoices, mpesa };
}

export async function getSchoolAnnouncements(schoolId: string) {
  return prisma.announcement.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getSchoolAcademicYears(schoolId: string) {
  return prisma.academicYear.findMany({
    where: { schoolId },
    include: { terms: true },
    orderBy: { startDate: "desc" },
  });
}

export async function getSchoolSettings(schoolId: string) {
  const settings = await prisma.schoolSettings.findUnique({ where: { schoolId } });
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: { logo: true, name: true },
  });
  return settings ? { ...settings, logo: school?.logo ?? null, schoolName: school?.name } : null;
}

export type SchoolSettingsUpdate = {
  themeColor?: string;
  accentColor?: string;
  dashboardBgColor?: string;
  favicon?: string | null;
  motto?: string | null;
  logo?: string | null;
  disabledRoles?: import("@prisma/client").UserRole[];
  cbeEnabled?: boolean;
  smsEnabled?: boolean;
  whatsappEnabled?: boolean;
  transportEnabled?: boolean;
  libraryEnabled?: boolean;
  hostelEnabled?: boolean;
  payrollEnabled?: boolean;
  mpesaPaybill?: string | null;
};

export async function updateSchoolSettings(schoolId: string, data: SchoolSettingsUpdate) {
  const { logo, ...settingsData } = data;

  if (logo && logo.startsWith("data:") && logo.length > 700_000) {
    throw new Error("Logo file is too large. Please use an image under 512 KB.");
  }

  return prisma.$transaction(async (tx) => {
    if (logo !== undefined) {
      await tx.school.update({
        where: { id: schoolId },
        data: { logo: logo || null },
      });
    }

    return tx.schoolSettings.upsert({
      where: { schoolId },
      create: { schoolId, ...settingsData },
      update: settingsData,
    });
  });
}

export async function getSchoolAdminChartData(schoolId: string) {
  const days = 7;
  const attendanceTrend: { day: string; rate: number; present: number; total: number }[] = [];
  const feesTrend: { day: string; amount: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const next = new Date(date);
    next.setDate(next.getDate() + 1);

    const dayLabel = date.toLocaleDateString("en-KE", { weekday: "short" });

    const [attendance, payments] = await Promise.all([
      prisma.attendance.findMany({
        where: { schoolId, date: { gte: date, lt: next } },
        select: { status: true },
      }),
      prisma.feePayment.aggregate({
        where: { schoolId, paymentDate: { gte: date, lt: next }, status: "COMPLETED" },
        _sum: { amount: true },
      }),
    ]);

    const present = attendance.filter((a) => ["Present", "Late"].includes(a.status)).length;
    const total = attendance.length;
    attendanceTrend.push({
      day: dayLabel,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
      present,
      total,
    });
    feesTrend.push({ day: dayLabel, amount: payments._sum.amount ?? 0 });
  }

  const [studentsByClass, invoiceStatus] = await Promise.all([
    prisma.class.findMany({
      where: { schoolId },
      select: {
        name: true,
        section: true,
        _count: { select: { students: true } },
      },
      orderBy: { name: "asc" },
      take: 8,
    }),
    prisma.feeInvoice.groupBy({
      by: ["status"],
      where: { schoolId },
      _count: { id: true },
    }),
  ]);

  return {
    attendanceTrend,
    feesTrend,
    studentsByClass: studentsByClass.map((c) => ({
      name: c.section ? `${c.name} ${c.section}` : c.name,
      students: c._count.students,
    })),
    invoiceStatus: invoiceStatus.map((s) => ({
      status: s.status,
      count: s._count.id,
    })),
  };
}
