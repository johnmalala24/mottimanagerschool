import { prisma } from "@/lib/prisma";
import { notifyRoleUsers } from "@/lib/server/notifications";

export async function runPromotion(
  schoolId: string,
  data: {
    fromAcademicYear: string;
    toAcademicYear: string;
    mappings: { fromClassId: string; toClassId?: string; action: "promote" | "repeat" | "graduate" }[];
    createdById?: string;
    notes?: string;
  }
) {
  let promoted = 0;
  let repeated = 0;
  let graduated = 0;

  await prisma.$transaction(async (tx) => {
    for (const map of data.mappings) {
      const students = await tx.student.findMany({
        where: { schoolId, classId: map.fromClassId, status: "ACTIVE" },
      });

      for (const student of students) {
        if (map.action === "graduate") {
          await tx.student.update({
            where: { id: student.id },
            data: { status: "GRADUATED" },
          });
          graduated++;
        } else if (map.action === "repeat") {
          repeated++;
        } else if (map.action === "promote" && map.toClassId) {
          await tx.student.update({
            where: { id: student.id },
            data: { classId: map.toClassId },
          });
          promoted++;
        }
      }

      if (map.toClassId && map.action === "promote") {
        await tx.class.update({
          where: { id: map.toClassId },
          data: { academicYear: data.toAcademicYear },
        });
      }
    }

    await tx.promotionBatch.create({
      data: {
        schoolId,
        fromAcademicYear: data.fromAcademicYear,
        toAcademicYear: data.toAcademicYear,
        promotedCount: promoted,
        repeatedCount: repeated,
        graduatedCount: graduated,
        notes: data.notes,
        createdById: data.createdById,
      },
    });

    await tx.academicYear.updateMany({
      where: { schoolId, isCurrent: true },
      data: { isCurrent: false },
    });

    const existing = await tx.academicYear.findUnique({
      where: { schoolId_name: { schoolId, name: data.toAcademicYear } },
    });
    if (existing) {
      await tx.academicYear.update({
        where: { id: existing.id },
        data: { isCurrent: true },
      });
    }
  });

  await notifyRoleUsers({
    schoolId,
    roles: ["SCHOOL_ADMIN", "DEPUTY_ADMIN", "TEACHER", "CLASS_TEACHER"],
    title: "End-of-year promotion completed",
    message: `${promoted} promoted, ${repeated} repeated, ${graduated} graduated for ${data.toAcademicYear}.`,
    type: "Success",
    actionUrl: "/school-admin/students",
  });

  return { promoted, repeated, graduated };
}

export async function getPromotionHistory(schoolId: string) {
  return prisma.promotionBatch.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
