import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/server/session";

export async function getParentRecord() {
  const user = await getSessionUser();
  if (!user?.id) return null;
  return prisma.parent.findUnique({
    where: { userId: user.id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      students: {
        include: {
          user: { select: { name: true } },
          class: true,
        },
      },
    },
  });
}

export async function getParentChildData(parentId: string, schoolId: string) {
  const students = await prisma.student.findMany({
    where: { parentId, schoolId },
    include: {
      user: { select: { name: true } },
      class: true,
      attendance: { orderBy: { date: "desc" }, take: 30 },
      grades: {
        include: { subject: true },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      feeInvoices: { orderBy: { createdAt: "desc" }, take: 10 },
      cbeAssessments: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
  return students;
}
