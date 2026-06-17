import { prisma } from "@/lib/prisma";
import { formatKES } from "@/lib/format";

export async function getFinanceDashboard(schoolId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [collectedToday, pendingInvoices, overdueInvoices, totalExpenses, recentMpesa] =
    await Promise.all([
      prisma.feePayment.aggregate({
        where: { schoolId, paymentDate: { gte: today }, status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.feeInvoice.count({ where: { schoolId, status: "PENDING" } }),
      prisma.feeInvoice.count({ where: { schoolId, status: "OVERDUE" } }),
      prisma.expense.aggregate({
        where: { schoolId },
        _sum: { amount: true },
      }),
      prisma.mpesaTransaction.findMany({
        where: { schoolId },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          student: { include: { user: { select: { name: true } } } },
        },
      }),
    ]);

  const collected = collectedToday._sum.amount ?? 0;
  const expenses = totalExpenses._sum.amount ?? 0;

  return {
    collectedToday: collected,
    collectedTodayFormatted: formatKES(collected),
    pendingInvoices,
    overdueInvoices,
    totalExpenses: expenses,
    totalExpensesFormatted: formatKES(expenses),
    recentMpesa,
  };
}

export async function getFinanceChartData(schoolId: string) {
  const months = 6;
  const monthlyCollections: { month: string; collected: number; expenses: number }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const start = new Date();
    start.setDate(1);
    start.setMonth(start.getMonth() - i);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const label = start.toLocaleDateString("en-KE", { month: "short" });

    const [payments, expenses] = await Promise.all([
      prisma.feePayment.aggregate({
        where: { schoolId, paymentDate: { gte: start, lt: end }, status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.expense.aggregate({
        where: { schoolId, date: { gte: start, lt: end } },
        _sum: { amount: true },
      }),
    ]);

    monthlyCollections.push({
      month: label,
      collected: payments._sum.amount ?? 0,
      expenses: expenses._sum.amount ?? 0,
    });
  }

  const paymentMethods = await prisma.feePayment.groupBy({
    by: ["mode"],
    where: { schoolId, status: "COMPLETED" },
    _sum: { amount: true },
    _count: { id: true },
  });

  return {
    monthlyCollections,
    paymentMethods: paymentMethods.map((p) => ({
      name: p.mode ?? "Other",
      value: p._sum.amount ?? 0,
      count: p._count.id,
    })),
  };
}

export async function getFinanceExpenses(schoolId: string) {
  return prisma.expense.findMany({
    where: { schoolId },
    orderBy: { date: "desc" },
    take: 100,
  });
}

export async function getFinanceReceipts(schoolId: string) {
  return prisma.feePayment.findMany({
    where: { schoolId, status: "COMPLETED" },
    include: {
      student: {
        include: {
          user: { select: { name: true } },
          class: { select: { name: true } },
        },
      },
    },
    orderBy: { paymentDate: "desc" },
    take: 100,
  });
}

export async function getFinanceBalances(schoolId: string) {
  return prisma.feeInvoice.findMany({
    where: { schoolId, balance: { gt: 0 } },
    include: {
      student: {
        include: {
          user: { select: { name: true } },
          class: { select: { name: true } },
        },
      },
    },
    orderBy: { balance: "desc" },
  });
}
