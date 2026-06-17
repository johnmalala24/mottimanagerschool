import { prisma } from "@/lib/prisma";
import { formatKES } from "@/lib/format";

export async function getLandingStats() {
  try {
    const [schools, students, billing] = await Promise.all([
      prisma.school.count({ where: { active: true } }),
      prisma.student.count({ where: { status: "ACTIVE" } }),
      prisma.billingTransaction.aggregate({ _sum: { amount: true } }),
    ]);

    const revenue = billing._sum.amount ?? 0;

    return {
      schools,
      students,
      revenueFormatted: formatKES(revenue),
    };
  } catch {
    return {
      schools: 0,
      students: 0,
      revenueFormatted: formatKES(0),
    };
  }
}
