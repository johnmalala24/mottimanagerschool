import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@mottimanager.com" },
    update: {},
    create: {
      email: "admin@mottimanager.com",
      name: "Platform Admin",
      password,
      role: "SUPER_ADMIN",
      active: true,
    },
  });

  const school = await prisma.school.upsert({
    where: { code: "GW" },
    update: {},
    create: {
      name: "Greenwood Academy",
      code: "GW",
      registrationId: "ED-9283-K",
      schoolType: "PRIMARY",
      city: "Nairobi",
      state: "Nairobi County",
      country: "KE",
      phone: "+254712345678",
      email: "admin@greenwood.ac.ke",
      principalName: "Samuel Mwangi",
      boardAffiliation: "CBC",
      active: true,
    },
  });

  await prisma.schoolSettings.upsert({
    where: { schoolId: school.id },
    update: {},
    create: {
      schoolId: school.id,
      setupCompleted: true,
      cbeEnabled: true,
      smsEnabled: true,
      transportEnabled: true,
      libraryEnabled: true,
      mpesaPaybill: "522522",
      academicStructure: "CBC",
      termsPerYear: 3,
    },
  });

  await prisma.schoolSubscription.upsert({
    where: { schoolId: school.id },
    update: {},
    create: {
      schoolId: school.id,
      plan: "ENTERPRISE",
      status: "ACTIVE",
      monthlyAmount: 25000,
      renewalDate: new Date("2025-08-01"),
    },
  });

  const schoolAdmin = await prisma.user.upsert({
    where: { email: "principal@greenwood.ac.ke" },
    update: { schoolId: school.id },
    create: {
      email: "principal@greenwood.ac.ke",
      name: "Samuel Mwangi",
      password,
      role: "SCHOOL_ADMIN",
      schoolId: school.id,
      phone: "+254712345678",
      active: true,
    },
  });

  await prisma.user.update({
    where: { email: "warden.green.test12@greenwood.edu" },
    data: { schoolId: school.id },
  });

  const year = await prisma.academicYear.upsert({
    where: { schoolId_name: { schoolId: school.id, name: "2024" } },
    update: {},
    create: {
      schoolId: school.id,
      name: "2024",
      startDate: new Date("2024-01-08"),
      endDate: new Date("2024-11-29"),
      isCurrent: true,
    },
  });

  await prisma.term.createMany({
    data: [
      { academicYearId: year.id, name: "Term 1", startDate: new Date("2024-01-08"), endDate: new Date("2024-04-05"), status: "COMPLETED" },
      { academicYearId: year.id, name: "Term 2", startDate: new Date("2024-04-29"), endDate: new Date("2024-08-02"), status: "ACTIVE" },
      { academicYearId: year.id, name: "Term 3", startDate: new Date("2024-09-02"), endDate: new Date("2024-11-29"), status: "UPCOMING" },
    ],
    skipDuplicates: true,
  });

  const math = await prisma.subject.upsert({
    where: { schoolId_code: { schoolId: school.id, code: "MATH" } },
    update: {},
    create: { schoolId: school.id, name: "Mathematics", code: "MATH", maxMarks: 100 },
  });

  const english = await prisma.subject.upsert({
    where: { schoolId_code: { schoolId: school.id, code: "ENG" } },
    update: {},
    create: { schoolId: school.id, name: "English", code: "ENG", maxMarks: 100 },
  });

  const class4A = await prisma.class.upsert({
    where: { schoolId_name_academicYear: { schoolId: school.id, name: "Grade 4A", academicYear: "2024" } },
    update: {},
    create: {
      schoolId: school.id,
      name: "Grade 4A",
      section: "A",
      academicYear: "2024",
      capacity: 40,
    },
  });

  await prisma.class.update({
    where: { id: class4A.id },
    data: { subjects: { connect: [{ id: math.id }, { id: english.id }] } },
  });

  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher@greenwood.ac.ke" },
    update: { schoolId: school.id },
    create: {
      email: "teacher@greenwood.ac.ke",
      name: "Mr. James Ochieng",
      password,
      role: "TEACHER",
      schoolId: school.id,
      phone: "+254712000001",
      active: true,
    },
  });

  const teacher = await prisma.teacher.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: {
      schoolId: school.id,
      userId: teacherUser.id,
      employeeId: "TCH-001",
      joinDate: new Date("2022-01-10"),
      subjectId: math.id,
    },
  });

  await prisma.class.update({
    where: { id: class4A.id },
    data: { classTeacherId: teacher.id },
  });

  const parentUser = await prisma.user.upsert({
    where: { email: "parent@greenwood.ac.ke" },
    update: { schoolId: school.id },
    create: {
      email: "parent@greenwood.ac.ke",
      name: "Mrs. Odhiambo",
      password,
      role: "PARENT",
      schoolId: school.id,
      phone: "+254712345678",
      active: true,
    },
  });

  const parent = await prisma.parent.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: {
      schoolId: school.id,
      userId: parentUser.id,
      relationship: "Mother",
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: "student@greenwood.ac.ke" },
    update: { schoolId: school.id },
    create: {
      email: "student@greenwood.ac.ke",
      name: "Amina Odhiambo",
      password,
      role: "STUDENT",
      schoolId: school.id,
      active: true,
    },
  });

  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      schoolId: school.id,
      userId: studentUser.id,
      registrationNumber: "GW-4A-001",
      classId: class4A.id,
      parentId: parent.id,
      admissionNumber: "ADM-2024-001",
      admissionDate: new Date("2024-01-08"),
      guardianName: "Mrs. Odhiambo",
      guardianPhone: "+254712345678",
      status: "ACTIVE",
    },
  });

  await prisma.feeStructure.upsert({
    where: { schoolId_className_academicYear: { schoolId: school.id, className: "Grade 4A", academicYear: "2024" } },
    update: {},
    create: {
      schoolId: school.id,
      className: "Grade 4A",
      academicYear: "2024",
      tuitionFee: 22000,
      developmentFee: 3000,
      libraryFee: 1500,
      sportsFee: 2000,
      transportFee: 3000,
      totalFee: 30000,
    },
  });

  await prisma.feeInvoice.upsert({
    where: { invoiceNumber: "INV-2024-001" },
    update: {},
    create: {
      invoiceNumber: "INV-2024-001",
      schoolId: school.id,
      studentId: student.id,
      amount: 30000,
      paidAmount: 30000,
      balance: 0,
      status: "PAID",
      dueDate: new Date("2024-06-30"),
      academicYear: "2024",
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.attendance.create({
    data: {
      schoolId: school.id,
      classId: class4A.id,
      studentId: student.id,
      teacherId: teacher.id,
      date: today,
      status: "Present",
    },
  });

  await prisma.grade.create({
    data: {
      schoolId: school.id,
      classId: class4A.id,
      studentId: student.id,
      subjectId: math.id,
      examName: "Mid-Term",
      marks: 92,
      gradePoint: "A",
      term: "2",
      academicYear: "2024",
    },
  });

  await prisma.announcement.create({
    data: {
      schoolId: school.id,
      title: "End-Term Exams — June 25, 2024",
      message: "End-Term examinations will begin on June 25, 2024.",
      sendSms: true,
      recipientCount: 1,
      createdById: schoolAdmin.id,
    },
  });

  await prisma.supportTicket.create({
    data: {
      ticketNumber: "TK-001",
      schoolId: school.id,
      subject: "M-Pesa STK Push configuration",
      priority: "HIGH",
      status: "OPEN",
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "School seeded for development",
      actorName: "System",
      target: school.name,
      schoolId: school.id,
      icon: "add_business",
    },
  });

  await prisma.billingTransaction.create({
    data: {
      schoolId: school.id,
      amount: 25000,
      description: "Enterprise subscription — June 2024",
      status: "COMPLETED",
      transactionId: "BILL-2024-06-001",
    },
  });

  console.log("Seed complete:", { superAdmin: superAdmin.email, school: school.name });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
