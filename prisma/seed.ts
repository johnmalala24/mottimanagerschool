import "dotenv/config";
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

  await prisma.attendance.upsert({
    where: {
      classId_studentId_date: {
        classId: class4A.id,
        studentId: student.id,
        date: today,
      },
    },
    update: {
      teacherId: teacher.id,
      status: "Present",
    },
    create: {
      schoolId: school.id,
      classId: class4A.id,
      studentId: student.id,
      teacherId: teacher.id,
      date: today,
      status: "Present",
    },
  });

  await prisma.grade.upsert({
    where: {
      schoolId_studentId_subjectId_examName_academicYear: {
        schoolId: school.id,
        studentId: student.id,
        subjectId: math.id,
        examName: "Mid-Term",
        academicYear: "2024",
      },
    },
    update: {
      marks: 92,
      gradePoint: "A",
      term: "2",
    },
    create: {
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

  const existingAnnouncement = await prisma.announcement.findFirst({
    where: {
      schoolId: school.id,
      title: "End-Term Exams — June 25, 2024",
    },
  });

  if (!existingAnnouncement) {
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
  }

  await prisma.supportTicket.upsert({
    where: { ticketNumber: "TK-001" },
    update: {
      schoolId: school.id,
      subject: "M-Pesa STK Push configuration",
      priority: "HIGH",
      status: "OPEN",
    },
    create: {
      ticketNumber: "TK-001",
      schoolId: school.id,
      subject: "M-Pesa STK Push configuration",
      priority: "HIGH",
      status: "OPEN",
    },
  });

  const existingAuditLog = await prisma.auditLog.findFirst({
    where: {
      action: "School seeded for development",
      target: school.name,
    },
  });

  if (!existingAuditLog) {
    await prisma.auditLog.create({
      data: {
        action: "School seeded for development",
        actorName: "System",
        target: school.name,
        schoolId: school.id,
        icon: "add_business",
      },
    });
  }

  await prisma.billingTransaction.create({
    data: {
      schoolId: school.id,
      amount: 25000,
      description: "Enterprise subscription — June 2024",
      status: "COMPLETED",
      transactionId: "BILL-2024-06-001",
    },
  });

  const kajembeSchool = await prisma.school.upsert({
    where: { code: "KHS" },
    update: {},
    create: {
      name: "Kajembe High School",
      code: "KHS",
      registrationId: "ED-7321-K",
      schoolType: "SECONDARY",
      address: "Plot 24 Kajembe Road, Kibera",
      city: "Nairobi",
      state: "Nairobi County",
      country: "KE",
      phone: "+254700123456",
      email: "admin@kajembe.ac.ke",
      website: "https://www.kajembe.ac.ke",
      principalName: "Esther Njoroge",
      boardAffiliation: "KCSE",
      active: true,
    },
  });

  await prisma.schoolSettings.upsert({
    where: { schoolId: kajembeSchool.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      setupCompleted: true,
      cbeEnabled: true,
      smsEnabled: true,
      whatsappEnabled: true,
      transportEnabled: true,
      libraryEnabled: true,
      hostelEnabled: true,
      payrollEnabled: true,
      themeColor: "#0b5394",
      accentColor: "#ff9f1c",
      dashboardBgColor: "#f2f6ff",
      favicon: "https://www.kajembe.ac.ke/favicon.ico",
      motto: "Excellence and Integrity",
      disabledRoles: [],
      mpesaPaybill: "444444",
      academicStructure: "KCSE",
      termsPerYear: 3,
    },
  });

  await prisma.schoolSubscription.upsert({
    where: { schoolId: kajembeSchool.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      plan: "ENTERPRISE",
      status: "ACTIVE",
      monthlyAmount: 30000,
      renewalDate: new Date("2026-08-01"),
    },
  });

  const kajembeAdmin = await prisma.user.upsert({
    where: { email: "jw16151615@gmail.com" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "jw16151615@gmail.com",
      name: "John Wanjiru",
      password,
      role: "SCHOOL_ADMIN",
      schoolId: kajembeSchool.id,
      phone: "+254711515161",
      address: "Kibera, Nairobi",
      active: true,
    },
  });

  const deputyAdmin = await prisma.user.upsert({
    where: { email: "deputy@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "deputy@kajembe.ac.ke",
      name: "Grace Mwende",
      password,
      role: "DEPUTY_ADMIN",
      schoolId: kajembeSchool.id,
      phone: "+254711515162",
      active: true,
    },
  });

  const ictAdmin = await prisma.user.upsert({
    where: { email: "ict@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "ict@kajembe.ac.ke",
      name: "Sam Oduor",
      password,
      role: "ICT_ADMIN",
      schoolId: kajembeSchool.id,
      phone: "+254711515163",
      active: true,
    },
  });

  const financeUser = await prisma.user.upsert({
    where: { email: "finance@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "finance@kajembe.ac.ke",
      name: "Peter Njoroge",
      password,
      role: "FINANCE",
      schoolId: kajembeSchool.id,
      phone: "+254711515164",
      active: true,
    },
  });

  const receptionistUser = await prisma.user.upsert({
    where: { email: "reception@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "reception@kajembe.ac.ke",
      name: "Mercy Wanjiru",
      password,
      role: "RECEPTIONIST",
      schoolId: kajembeSchool.id,
      phone: "+254711515165",
      active: true,
    },
  });

  const transportManagerUser = await prisma.user.upsert({
    where: { email: "transport@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "transport@kajembe.ac.ke",
      name: "Raymond Otieno",
      password,
      role: "TRANSPORT_MANAGER",
      schoolId: kajembeSchool.id,
      phone: "+254711515166",
      active: true,
    },
  });

  const hostelManagerUser = await prisma.user.upsert({
    where: { email: "hostel@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "hostel@kajembe.ac.ke",
      name: "Agnes Achieng",
      password,
      role: "HOSTEL_MANAGER",
      schoolId: kajembeSchool.id,
      phone: "+254711515167",
      active: true,
    },
  });

  const admissionsUser = await prisma.user.upsert({
    where: { email: "admissions@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "admissions@kajembe.ac.ke",
      name: "Dorcas Nyokabi",
      password,
      role: "ADMISSIONS_OFFICER",
      schoolId: kajembeSchool.id,
      phone: "+254711515168",
      active: true,
    },
  });

  const librarianUser = await prisma.user.upsert({
    where: { email: "librarian@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "librarian@kajembe.ac.ke",
      name: "Nancy Chebet",
      password,
      role: "LIBRARIAN",
      schoolId: kajembeSchool.id,
      phone: "+254711515169",
      active: true,
    },
  });

  const kajembeTeacherUser = await prisma.user.upsert({
    where: { email: "teacher1@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "teacher1@kajembe.ac.ke",
      name: "David Karanja",
      password,
      role: "TEACHER",
      schoolId: kajembeSchool.id,
      phone: "+254711515170",
      active: true,
    },
  });

  const kajembeScienceTeacherUser = await prisma.user.upsert({
    where: { email: "teacher2@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "teacher2@kajembe.ac.ke",
      name: "Mercy Mutua",
      password,
      role: "TEACHER",
      schoolId: kajembeSchool.id,
      phone: "+254711515174",
      active: true,
    },
  });

  const kajembeChemistryTeacherUser = await prisma.user.upsert({
    where: { email: "teacher3@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "teacher3@kajembe.ac.ke",
      name: "Peter Mwangi",
      password,
      role: "TEACHER",
      schoolId: kajembeSchool.id,
      phone: "+254711515175",
      active: true,
    },
  });

  const kajembeClassTeacherUser = await prisma.user.upsert({
    where: { email: "classteacher@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "classteacher@kajembe.ac.ke",
      name: "Faith Wambui",
      password,
      role: "CLASS_TEACHER",
      schoolId: kajembeSchool.id,
      phone: "+254711515171",
      active: true,
    },
  });

  const biology = await prisma.subject.upsert({
    where: { schoolId_code: { schoolId: kajembeSchool.id, code: "BIO" } },
    update: {},
    create: { schoolId: kajembeSchool.id, name: "Biology", code: "BIO", maxMarks: 100 },
  });

  const chemistry = await prisma.subject.upsert({
    where: { schoolId_code: { schoolId: kajembeSchool.id, code: "CHEM" } },
    update: {},
    create: { schoolId: kajembeSchool.id, name: "Chemistry", code: "CHEM", maxMarks: 100 },
  });

  const mathematics = await prisma.subject.upsert({
    where: { schoolId_code: { schoolId: kajembeSchool.id, code: "MATH" } },
    update: {},
    create: { schoolId: kajembeSchool.id, name: "Mathematics", code: "MATH", maxMarks: 100 },
  });

  const englishKajembe = await prisma.subject.upsert({
    where: { schoolId_code: { schoolId: kajembeSchool.id, code: "ENG" } },
    update: {},
    create: { schoolId: kajembeSchool.id, name: "English", code: "ENG", maxMarks: 100 },
  });

  const geography = await prisma.subject.upsert({
    where: { schoolId_code: { schoolId: kajembeSchool.id, code: "GEO" } },
    update: {},
    create: { schoolId: kajembeSchool.id, name: "Geography", code: "GEO", maxMarks: 100 },
  });

  const kajembeYear = await prisma.academicYear.upsert({
    where: { schoolId_name: { schoolId: kajembeSchool.id, name: "2026" } },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      name: "2026",
      startDate: new Date("2026-01-08"),
      endDate: new Date("2026-11-29"),
      isCurrent: true,
    },
  });

  await prisma.term.createMany({
    data: [
      { academicYearId: kajembeYear.id, name: "Term 1", startDate: new Date("2026-01-08"), endDate: new Date("2026-04-05"), status: "COMPLETED" },
      { academicYearId: kajembeYear.id, name: "Term 2", startDate: new Date("2026-04-29"), endDate: new Date("2026-08-02"), status: "ACTIVE" },
      { academicYearId: kajembeYear.id, name: "Term 3", startDate: new Date("2026-09-02"), endDate: new Date("2026-11-29"), status: "UPCOMING" },
    ],
    skipDuplicates: true,
  });

  const form3A = await prisma.class.upsert({
    where: { schoolId_name_academicYear: { schoolId: kajembeSchool.id, name: "Form 3A", academicYear: "2026" } },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      name: "Form 3A",
      section: "A",
      academicYear: "2026",
      capacity: 100,
    },
  });

  await prisma.class.update({
    where: { id: form3A.id },
    data: { subjects: { connect: [{ id: biology.id }, { id: chemistry.id }, { id: mathematics.id }, { id: englishKajembe.id }, { id: geography.id }] } },
  });

  const teacherRecord = await prisma.teacher.upsert({
    where: { userId: kajembeTeacherUser.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      userId: kajembeTeacherUser.id,
      employeeId: "TCH-KHS-001",
      joinDate: new Date("2024-02-15"),
      subjectId: mathematics.id,
      qualification: "B.Sc. Mathematics",
      experience: 7,
    },
  });

  const scienceTeacherRecord = await prisma.teacher.upsert({
    where: { userId: kajembeScienceTeacherUser.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      userId: kajembeScienceTeacherUser.id,
      employeeId: "TCH-KHS-003",
      joinDate: new Date("2025-01-10"),
      subjectId: biology.id,
      qualification: "B.Sc. Biology",
      experience: 5,
    },
  });

  const chemistryTeacherRecord = await prisma.teacher.upsert({
    where: { userId: kajembeChemistryTeacherUser.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      userId: kajembeChemistryTeacherUser.id,
      employeeId: "TCH-KHS-004",
      joinDate: new Date("2025-03-05"),
      subjectId: chemistry.id,
      qualification: "B.Sc. Chemistry",
      experience: 6,
    },
  });

  const classTeacherRecord = await prisma.teacher.upsert({
    where: { userId: kajembeClassTeacherUser.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      userId: kajembeClassTeacherUser.id,
      employeeId: "TCH-KHS-002",
      joinDate: new Date("2023-08-01"),
      subjectId: englishKajembe.id,
      isClassTeacher: true,
      qualification: "B.Ed. English",
      experience: 10,
    },
  });

  await prisma.class.update({
    where: { id: form3A.id },
    data: { classTeacherId: classTeacherRecord.id },
  });

  const kajembeParentUser = await prisma.user.upsert({
    where: { email: "parent@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "parent@kajembe.ac.ke",
      name: "Rose Njoroge",
      password,
      role: "PARENT",
      schoolId: kajembeSchool.id,
      phone: "+254711515172",
      address: "Kibera, Nairobi",
      active: true,
    },
  });

  const kajembeParent = await prisma.parent.upsert({
    where: { userId: kajembeParentUser.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      userId: kajembeParentUser.id,
      relationship: "Mother",
      occupation: "Teacher",
      annualIncome: 550000,
    },
  });

  const kajembeStudentUser = await prisma.user.upsert({
    where: { email: "student@kajembe.ac.ke" },
    update: { schoolId: kajembeSchool.id },
    create: {
      email: "student@kajembe.ac.ke",
      name: "Brian Njoroge",
      password,
      role: "STUDENT",
      schoolId: kajembeSchool.id,
      phone: "+254711515173",
      active: true,
    },
  });

  const kajembeStudent = await prisma.student.upsert({
    where: { userId: kajembeStudentUser.id },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      userId: kajembeStudentUser.id,
      registrationNumber: "KHS-3A-001",
      classId: form3A.id,
      parentId: kajembeParent.id,
      admissionNumber: "KHS-2026-001",
      admissionDate: new Date("2026-01-08"),
      guardianName: "Rose Njoroge",
      guardianPhone: "+254711515172",
      status: "ACTIVE",
    },
  });

  const kajembeToday = new Date();
  kajembeToday.setHours(0, 0, 0, 0);

  const totalKajembeStudents = 100;
  for (let studentIndex = 2; studentIndex <= totalKajembeStudents; studentIndex += 1) {
    const suffix = String(studentIndex).padStart(3, "0");
    const studentEmail = `student${studentIndex}@kajembe.ac.ke`;
    const parentEmail = `parent${studentIndex}@kajembe.ac.ke`;
    const studentName = `Student ${studentIndex} Karanja`;
    const parentName = `Parent ${studentIndex} Karanja`;
    const registrationNumber = `KHS-3A-${suffix}`;
    const admissionNumber = `KHS-2026-${suffix}`;
    const invoiceNumber = `KHS-INV-2026-${suffix}`;
    const paymentId = `FPAY-KHS-2026-${suffix}`;
    const marks = 65 + (studentIndex % 36);
    const gradePoint = marks >= 90 ? "A" : marks >= 80 ? "A-" : marks >= 70 ? "B+" : marks >= 60 ? "B" : "C";

    const studentUser = await prisma.user.upsert({
      where: { email: studentEmail },
      update: { schoolId: kajembeSchool.id },
      create: {
        email: studentEmail,
        name: studentName,
        password,
        role: "STUDENT",
        schoolId: kajembeSchool.id,
        phone: `+2547115${600 + studentIndex}`,
        active: true,
      },
    });

    const parentUser = await prisma.user.upsert({
      where: { email: parentEmail },
      update: { schoolId: kajembeSchool.id },
      create: {
        email: parentEmail,
        name: parentName,
        password,
        role: "PARENT",
        schoolId: kajembeSchool.id,
        phone: `+2547115${700 + studentIndex}`,
        active: true,
      },
    });

    const parent = await prisma.parent.upsert({
      where: { userId: parentUser.id },
      update: {},
      create: {
        schoolId: kajembeSchool.id,
        userId: parentUser.id,
        relationship: "Parent",
        occupation: "Business",
        annualIncome: 400000 + studentIndex * 2000,
      },
    });

    const student = await prisma.student.upsert({
      where: { userId: studentUser.id },
      update: {},
      create: {
        schoolId: kajembeSchool.id,
        userId: studentUser.id,
        registrationNumber,
        classId: form3A.id,
        parentId: parent.id,
        admissionNumber,
        admissionDate: new Date("2026-01-08"),
        guardianName: parentName,
        guardianPhone: `+2547115${700 + studentIndex}`,
        status: "ACTIVE",
      },
    });

    await prisma.feeInvoice.upsert({
      where: { invoiceNumber },
      update: {},
      create: {
        invoiceNumber,
        schoolId: kajembeSchool.id,
        studentId: student.id,
        amount: 56500,
        paidAmount: 56500,
        balance: 0,
        status: "PAID",
        dueDate: new Date("2026-05-30"),
        academicYear: "2026",
      },
    });

    const existingFeePayment = await prisma.feePayment.findFirst({
      where: { transactionId: paymentId },
    });

    if (!existingFeePayment) {
      await prisma.feePayment.create({
        data: {
          schoolId: kajembeSchool.id,
          studentId: student.id,
          amount: 56500,
          paymentDate: new Date(`2026-05-${20 + (studentIndex % 10)}`),
          dueDate: new Date("2026-05-30"),
          status: "COMPLETED",
          mode: "Online",
          transactionId: paymentId,
          remarks: "Full school fee payment for Form 3A",
          academicYear: "2026",
        },
      });
    }

    await prisma.attendance.upsert({
      where: {
        classId_studentId_date: {
          classId: form3A.id,
          studentId: student.id,
          date: kajembeToday,
        },
      },
      update: {
        teacherId: teacherRecord.id,
        status: "Present",
      },
      create: {
        schoolId: kajembeSchool.id,
        classId: form3A.id,
        studentId: student.id,
        teacherId: teacherRecord.id,
        date: kajembeToday,
        status: "Present",
      },
    });

    await prisma.grade.upsert({
      where: {
        schoolId_studentId_subjectId_examName_academicYear: {
          schoolId: kajembeSchool.id,
          studentId: student.id,
          subjectId: mathematics.id,
          examName: "Mid-Term",
          academicYear: "2026",
        },
      },
      update: {
        marks,
        gradePoint,
        term: "2",
      },
      create: {
        schoolId: kajembeSchool.id,
        classId: form3A.id,
        studentId: student.id,
        subjectId: mathematics.id,
        examName: "Mid-Term",
        marks,
        gradePoint,
        term: "2",
        academicYear: "2026",
      },
    });
  }

  await prisma.feeStructure.upsert({
    where: { schoolId_className_academicYear: { schoolId: kajembeSchool.id, className: "Form 3A", academicYear: "2026" } },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      className: "Form 3A",
      academicYear: "2026",
      tuitionFee: 40000,
      developmentFee: 6000,
      libraryFee: 2500,
      sportsFee: 3000,
      transportFee: 5000,
      totalFee: 56500,
    },
  });

  await prisma.feeInvoice.upsert({
    where: { invoiceNumber: "KHS-INV-2026-001" },
    update: {},
    create: {
      invoiceNumber: "KHS-INV-2026-001",
      schoolId: kajembeSchool.id,
      studentId: kajembeStudent.id,
      amount: 56500,
      paidAmount: 56500,
      balance: 0,
      status: "PAID",
      dueDate: new Date("2026-05-30"),
      academicYear: "2026",
    },
  });

  const feePaymentExists = await prisma.feePayment.findFirst({
    where: {
      schoolId: kajembeSchool.id,
      studentId: kajembeStudent.id,
      amount: 56500,
      paymentDate: new Date("2026-05-20"),
    },
  });

  if (!feePaymentExists) {
    await prisma.feePayment.create({
      data: {
        schoolId: kajembeSchool.id,
        studentId: kajembeStudent.id,
        amount: 56500,
        paymentDate: new Date("2026-05-20"),
        dueDate: new Date("2026-05-30"),
        status: "COMPLETED",
        mode: "Online",
        transactionId: "FPAY-KHS-2026-001",
        remarks: "Full school fee payment for Form 3A",
        academicYear: "2026",
      },
    });
  }

  await prisma.attendance.upsert({
    where: {
      classId_studentId_date: {
        classId: form3A.id,
        studentId: kajembeStudent.id,
        date: kajembeToday,
      },
    },
    update: {
      teacherId: teacherRecord.id,
      status: "Present",
    },
    create: {
      schoolId: kajembeSchool.id,
      classId: form3A.id,
      studentId: kajembeStudent.id,
      teacherId: teacherRecord.id,
      date: kajembeToday,
      status: "Present",
    },
  });

  await prisma.grade.upsert({
    where: {
      schoolId_studentId_subjectId_examName_academicYear: {
        schoolId: kajembeSchool.id,
        studentId: kajembeStudent.id,
        subjectId: mathematics.id,
        examName: "Mid-Term",
        academicYear: "2026",
      },
    },
    update: {
      marks: 78,
      gradePoint: "B+",
      term: "2",
    },
    create: {
      schoolId: kajembeSchool.id,
      classId: form3A.id,
      studentId: kajembeStudent.id,
      subjectId: mathematics.id,
      examName: "Mid-Term",
      marks: 78,
      gradePoint: "B+",
      term: "2",
      academicYear: "2026",
    },
  });

  await prisma.grade.upsert({
    where: {
      schoolId_studentId_subjectId_examName_academicYear: {
        schoolId: kajembeSchool.id,
        studentId: kajembeStudent.id,
        subjectId: englishKajembe.id,
        examName: "Mid-Term",
        academicYear: "2026",
      },
    },
    update: {
      marks: 82,
      gradePoint: "A-",
      term: "2",
    },
    create: {
      schoolId: kajembeSchool.id,
      classId: form3A.id,
      studentId: kajembeStudent.id,
      subjectId: englishKajembe.id,
      examName: "Mid-Term",
      marks: 82,
      gradePoint: "A-",
      term: "2",
      academicYear: "2026",
    },
  });

  await prisma.grade.upsert({
    where: {
      schoolId_studentId_subjectId_examName_academicYear: {
        schoolId: kajembeSchool.id,
        studentId: kajembeStudent.id,
        subjectId: biology.id,
        examName: "Mid-Term",
        academicYear: "2026",
      },
    },
    update: {
      marks: 74,
      gradePoint: "B",
      term: "2",
    },
    create: {
      schoolId: kajembeSchool.id,
      classId: form3A.id,
      studentId: kajembeStudent.id,
      subjectId: biology.id,
      examName: "Mid-Term",
      marks: 74,
      gradePoint: "B",
      term: "2",
      academicYear: "2026",
    },
  });

  await prisma.timetable.upsert({
    where: {
      schoolId_classId_subjectId_teacherId_dayOfWeek_startTime_academicYear: {
        schoolId: kajembeSchool.id,
        classId: form3A.id,
        subjectId: mathematics.id,
        teacherId: teacherRecord.id,
        dayOfWeek: "Monday",
        startTime: "09:00",
        academicYear: "2026",
      },
    },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      classId: form3A.id,
      subjectId: mathematics.id,
      teacherId: teacherRecord.id,
      dayOfWeek: "Monday",
      startTime: "09:00",
      endTime: "10:00",
      room: "B1",
      academicYear: "2026",
    },
  });

  await prisma.timetable.upsert({
    where: {
      schoolId_classId_subjectId_teacherId_dayOfWeek_startTime_academicYear: {
        schoolId: kajembeSchool.id,
        classId: form3A.id,
        subjectId: biology.id,
        teacherId: scienceTeacherRecord.id,
        dayOfWeek: "Tuesday",
        startTime: "10:00",
        academicYear: "2026",
      },
    },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      classId: form3A.id,
      subjectId: biology.id,
      teacherId: scienceTeacherRecord.id,
      dayOfWeek: "Tuesday",
      startTime: "10:00",
      endTime: "11:00",
      room: "B2",
      academicYear: "2026",
    },
  });

  await prisma.timetable.upsert({
    where: {
      schoolId_classId_subjectId_teacherId_dayOfWeek_startTime_academicYear: {
        schoolId: kajembeSchool.id,
        classId: form3A.id,
        subjectId: chemistry.id,
        teacherId: chemistryTeacherRecord.id,
        dayOfWeek: "Wednesday",
        startTime: "11:00",
        academicYear: "2026",
      },
    },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      classId: form3A.id,
      subjectId: chemistry.id,
      teacherId: chemistryTeacherRecord.id,
      dayOfWeek: "Wednesday",
      startTime: "11:00",
      endTime: "12:00",
      room: "B3",
      academicYear: "2026",
    },
  });

  const admissionApplication = await prisma.admission.upsert({
    where: { applicationNumber: "KHS-ADM-2026-001" },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      applicationNumber: "KHS-ADM-2026-001",
      studentName: "Samuel Kimani",
      dateOfBirth: new Date("2010-06-12"),
      gender: "Male",
      fatherName: "John Kimani",
      motherName: "Grace Kimani",
      guardianName: "John Kimani",
      contactNumber: "+254722123456",
      email: "samuel.kimani@example.com",
      address: "Kibera, Nairobi",
      applyingForClass: "Form 3A",
      previousSchool: "Kibera Primary School",
      status: "UNDER_REVIEW",
      remarks: "Application for Form 3A transfer student",
    },
  });

  const transportRoute = await prisma.transport.upsert({
    where: { schoolId_routeNumber_vehicleNumber: { schoolId: kajembeSchool.id, routeNumber: "TR-01", vehicleNumber: "KAP-123A" } },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      routeName: "Kibera Express",
      routeNumber: "TR-01",
      vehicleNumber: "KAP-123A",
      driverName: "James Ndung'u",
      driverPhone: "+254700987654",
      capacity: 25,
      monthlyFee: 5000,
    },
  });

  const transportAllocationExists = await prisma.transportAllocation.findFirst({
    where: {
      schoolId: kajembeSchool.id,
      studentId: kajembeStudent.id,
      transportId: transportRoute.id,
    },
  });

  if (!transportAllocationExists) {
    await prisma.transportAllocation.create({
      data: {
        schoolId: kajembeSchool.id,
        studentId: kajembeStudent.id,
        transportId: transportRoute.id,
        stopPoint: "Kibera Junction",
        allocationDate: new Date("2026-01-08"),
      },
    });
  }

  const hostel = await prisma.hostel.upsert({
    where: { schoolId_name: { schoolId: kajembeSchool.id, name: "Sunrise Hostel" } },
    update: {},
    create: {
      schoolId: kajembeSchool.id,
      name: "Sunrise Hostel",
      type: "Boys",
      address: "Block C, Kajembe Road",
      capacity: 120,
      warden: "Moses Njuguna",
    },
  });

  const hostelAllocationExists = await prisma.hostelAllocation.findFirst({
    where: {
      schoolId: kajembeSchool.id,
      studentId: kajembeStudent.id,
      hostelId: hostel.id,
    },
  });

  if (!hostelAllocationExists) {
    await prisma.hostelAllocation.create({
      data: {
        schoolId: kajembeSchool.id,
        studentId: kajembeStudent.id,
        hostelId: hostel.id,
        roomNumber: "C-12",
        bedNumber: "B-04",
        allocationDate: new Date("2026-01-08"),
      },
    });
  }

  const announcementExists = await prisma.announcement.findFirst({
    where: {
      schoolId: kajembeSchool.id,
      title: "KSCE registration deadline",
    },
  });

  if (!announcementExists) {
    await prisma.announcement.create({
      data: {
        schoolId: kajembeSchool.id,
        title: "KSCE registration deadline",
        message: "All Form 3 learners must complete KCSE registration by July 15, 2026.",
        sendSms: true,
        recipientCount: 180,
        createdById: kajembeAdmin.id,
      },
    });
  }

  await prisma.supportTicket.upsert({
    where: { ticketNumber: "KHS-TK-001" },
    update: {},
    create: {
      ticketNumber: "KHS-TK-001",
      schoolId: kajembeSchool.id,
      subject: "Payroll setup and staff salary entries",
      priority: "HIGH",
      status: "OPEN",
    },
  });

  const payrollTransactionExists = await prisma.billingTransaction.findFirst({
    where: { transactionId: "BILL-PAYROLL-2026-03-001" },
  });

  if (!payrollTransactionExists) {
    await prisma.billingTransaction.create({
      data: {
        schoolId: kajembeSchool.id,
        amount: 350000,
        description: "Payroll disbursement — March 2026",
        status: "COMPLETED",
        transactionId: "BILL-PAYROLL-2026-03-001",
      },
    });
  }

  const payrollExpenseExists = await prisma.expense.findFirst({
    where: {
      schoolId: kajembeSchool.id,
      category: "Payroll",
      amount: 350000,
      date: new Date("2026-03-31"),
    },
  });

  if (!payrollExpenseExists) {
    await prisma.expense.create({
      data: {
        schoolId: kajembeSchool.id,
        category: "Payroll",
        amount: 350000,
        description: "Teacher and support staff salaries for March 2026",
        date: new Date("2026-03-31"),
      },
    });
  }

  const auditLogExists = await prisma.auditLog.findFirst({
    where: {
      action: "Kajembe High School seeded for development",
      schoolId: kajembeSchool.id,
    },
  });

  if (!auditLogExists) {
    await prisma.auditLog.create({
      data: {
        action: "Kajembe High School seeded for development",
        actorName: "System",
        target: kajembeSchool.name,
        schoolId: kajembeSchool.id,
        icon: "school",
      },
    });
  }

  console.log("Seed complete:", { superAdmin: superAdmin.email, greenwoodSchool: school.name, kajembeSchool: kajembeSchool.name, kajembeAdmin: kajembeAdmin.email });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
