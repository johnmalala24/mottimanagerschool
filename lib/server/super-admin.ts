import { prisma } from "@/lib/prisma";
import { formatKES } from "@/lib/format";

export async function getSuperAdminDashboardStats() {
  const [
    totalSchools,
    activeSchools,
    suspendedSchools,
    totalStudents,
    billingSum,
    openTickets,
  ] = await Promise.all([
    prisma.school.count(),
    prisma.school.count({ where: { active: true } }),
    prisma.schoolSubscription.count({ where: { status: "SUSPENDED" } }),
    prisma.student.count(),
    prisma.billingTransaction.aggregate({ _sum: { amount: true } }),
    prisma.supportTicket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
  ]);

  const revenue = billingSum._sum.amount ?? 0;

  return {
    totalSchools,
    activeSchools,
    suspendedSchools,
    totalStudents,
    revenue,
    revenueFormatted: formatKES(revenue),
    openTickets,
  };
}

export async function getSuperAdminChartData() {
  const months = 6;
  const revenueTrend: { month: string; revenue: number; schools: number }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const start = new Date();
    start.setDate(1);
    start.setMonth(start.getMonth() - i);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const label = start.toLocaleDateString("en-KE", { month: "short" });

    const [billing, schools] = await Promise.all([
      prisma.billingTransaction.aggregate({
        where: { createdAt: { gte: start, lt: end } },
        _sum: { amount: true },
      }),
      prisma.school.count({ where: { createdAt: { lt: end } } }),
    ]);

    revenueTrend.push({
      month: label,
      revenue: billing._sum.amount ?? 0,
      schools,
    });
  }

  const subscriptionBreakdown = await prisma.schoolSubscription.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  return {
    revenueTrend,
    subscriptionBreakdown: subscriptionBreakdown.map((s) => ({
      name: s.status,
      count: s._count.id,
    })),
  };
}

export async function getSchoolsWithDetails() {
  return prisma.school.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      settings: true,
      subscription: true,
      students: { select: { id: true } },
      users: {
        where: { role: "SCHOOL_ADMIN" },
        select: { name: true, phone: true },
        take: 1,
      },
    },
  });
}

export async function getSubscriptions() {
  return prisma.schoolSubscription.findMany({
    include: {
      school: {
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          country: true,
        },
      },
    },
    orderBy: { renewalDate: "asc" },
  });
}

export async function getBillingTransactions() {
  return prisma.billingTransaction.findMany({
    include: {
      school: { select: { name: true } },
    },
    orderBy: { paymentDate: "desc" },
    take: 100,
  });
}

export async function getSupportTickets() {
  return prisma.supportTicket.findMany({
    include: { school: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getAuditLogs() {
  return prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { school: { select: { name: true } } },
  });
}

export async function getSubscriptionPlanBreakdown() {
  const groups = await prisma.schoolSubscription.groupBy({
    by: ["plan"],
    _count: { plan: true },
    _sum: { monthlyAmount: true },
  });
  return groups;
}

export async function getDatabaseTableCounts() {
  const tables = [
    "school",
    "user",
    "student",
    "teacher",
    "parent",
    "class",
    "subject",
    "admission",
    "attendance",
    "grade",
    "feePayment",
    "feeInvoice",
    "mpesaTransaction",
    "libraryBook",
    "hostel",
    "transport",
    "supportTicket",
    "auditLog",
    "announcement",
  ] as const;

  const counts: Record<string, number> = {};
  for (const table of tables) {
    // @ts-expect-error dynamic prisma model access
    counts[table] = await prisma[table].count();
  }
  return counts;
}
