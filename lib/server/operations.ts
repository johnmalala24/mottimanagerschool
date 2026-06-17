import { prisma } from "@/lib/prisma";

export async function getAdmissions(schoolId: string) {
  return prisma.admission.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getVisitors(schoolId: string) {
  return prisma.visitor.findMany({
    where: { schoolId },
    orderBy: { checkIn: "desc" },
    take: 100,
  });
}

export async function getAppointments(schoolId: string) {
  return prisma.appointment.findMany({
    where: { schoolId },
    orderBy: { date: "desc" },
    take: 100,
  });
}

export async function getLibraryBooks(schoolId: string) {
  return prisma.libraryBook.findMany({
    where: { schoolId },
    orderBy: { title: "asc" },
  });
}

export async function getLibraryIssuances(schoolId: string) {
  return prisma.libraryIssuance.findMany({
    where: { schoolId },
    include: { book: true, student: { include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getTransports(schoolId: string) {
  return prisma.transport.findMany({
    where: { schoolId },
    include: { allocations: { include: { student: { include: { user: { select: { name: true } } } } } } },
  });
}

export async function getHostels(schoolId: string) {
  return prisma.hostel.findMany({
    where: { schoolId },
    include: {
      allocations: {
        include: { student: { include: { user: { select: { name: true } } } } },
      },
    },
  });
}

export async function searchStudents(schoolId: string, limit = 50) {
  return prisma.student.findMany({
    where: { schoolId },
    include: {
      user: { select: { name: true, phone: true } },
      class: true,
    },
    take: limit,
  });
}

export async function searchParents(schoolId: string, limit = 50) {
  return prisma.parent.findMany({
    where: { schoolId },
    include: { user: { select: { name: true, phone: true } }, students: { include: { user: { select: { name: true } } } } },
    take: limit,
  });
}
