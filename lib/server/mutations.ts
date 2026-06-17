import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type {
  AdmissionStatus,
  InvoiceStatus,
  PaymentStatus,
  TermStatus,
  UserRole,
} from "@prisma/client";
import { assertProfileImage } from "@/lib/server/image-utils";
import { admitStudent, type AdmitStudentInput } from "@/lib/server/school-register";

export async function updateUserProfile(
  userId: string,
  data: { name?: string; phone?: string; image?: string | null; password?: string }
) {
  if (data.image !== undefined) assertProfileImage(data.image);
  const update: {
    name?: string;
    phone?: string;
    image?: string | null;
    password?: string;
  } = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.phone !== undefined) update.phone = data.phone;
  if (data.image !== undefined) update.image = data.image || null;
  if (data.password) {
    if (data.password.length < 8) throw new Error("Password must be at least 8 characters");
    update.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({ where: { id: userId }, data: update });
}

export async function updateSchoolUserProfile(
  schoolId: string,
  targetUserId: string,
  data: { name?: string; phone?: string; image?: string | null; active?: boolean }
) {
  const target = await prisma.user.findFirst({
    where: { id: targetUserId, schoolId },
  });
  if (!target) throw new Error("User not found in your school");
  if (data.image !== undefined) assertProfileImage(data.image);
  return prisma.user.update({
    where: { id: targetUserId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.image !== undefined && { image: data.image || null }),
      ...(data.active !== undefined && { active: data.active }),
    },
  });
}

export async function markClassAttendance(
  schoolId: string,
  teacherId: string,
  classId: string,
  records: { studentId: string; status: string; remarks?: string }[],
  date = new Date()
) {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);

  const cls = await prisma.class.findFirst({ where: { id: classId, schoolId } });
  if (!cls) throw new Error("Class not found");

  return prisma.$transaction(
    records.map((r) =>
      prisma.attendance.upsert({
        where: {
          classId_studentId_date: {
            classId,
            studentId: r.studentId,
            date: day,
          },
        },
        create: {
          schoolId,
          classId,
          studentId: r.studentId,
          teacherId,
          date: day,
          status: r.status,
          remarks: r.remarks,
        },
        update: {
          status: r.status,
          remarks: r.remarks,
          teacherId,
        },
      })
    )
  );
}

export async function createGrade(
  schoolId: string,
  data: {
    classId: string;
    studentId: string;
    subjectId: string;
    examName: string;
    marks?: number;
    gradePoint?: string;
    term: string;
    academicYear: string;
  }
) {
  return prisma.grade.upsert({
    where: {
      schoolId_studentId_subjectId_examName_academicYear: {
        schoolId,
        studentId: data.studentId,
        subjectId: data.subjectId,
        examName: data.examName,
        academicYear: data.academicYear,
      },
    },
    create: { schoolId, ...data },
    update: {
      marks: data.marks,
      gradePoint: data.gradePoint,
      term: data.term,
      classId: data.classId,
    },
  });
}

export async function createAssignment(
  schoolId: string,
  data: {
    classId: string;
    subjectId?: string;
    teacherId?: string;
    title: string;
    description?: string;
    dueDate?: string;
  }
) {
  return prisma.assignment.create({
    data: {
      schoolId,
      classId: data.classId,
      subjectId: data.subjectId,
      teacherId: data.teacherId,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      status: "Open",
    },
  });
}

export async function createCbeAssessment(
  schoolId: string,
  data: {
    studentId: string;
    learningArea: string;
    level: string;
    term: string;
    academicYear: string;
  }
) {
  return prisma.cbeAssessment.create({ data: { schoolId, ...data } });
}

export async function createAnnouncement(
  schoolId: string,
  data: { title: string; message: string; sendSms?: boolean; createdById?: string }
) {
  const recipientCount = await prisma.user.count({
    where: {
      schoolId,
      role: { in: ["PARENT", "STUDENT", "TEACHER", "CLASS_TEACHER"] },
      active: true,
    },
  });
  return prisma.announcement.create({
    data: {
      schoolId,
      title: data.title,
      message: data.message,
      sendSms: data.sendSms ?? false,
      recipientCount,
      createdById: data.createdById,
    },
  });
}

export async function createDisciplineRecord(
  schoolId: string,
  data: {
    studentId: string;
    classId?: string;
    description: string;
    action?: string;
  }
) {
  return prisma.disciplineRecord.create({
    data: { schoolId, ...data, date: new Date() },
  });
}

function generateInvoiceNumber(): string {
  return `INV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function createFeeStructure(
  schoolId: string,
  data: {
    className: string;
    academicYear: string;
    tuitionFee: number;
    developmentFee?: number;
    libraryFee?: number;
    sportsFee?: number;
    transportFee?: number;
    computerFee?: number;
    otherFee?: number;
  }
) {
  const total =
    data.tuitionFee +
    (data.developmentFee ?? 0) +
    (data.libraryFee ?? 0) +
    (data.sportsFee ?? 0) +
    (data.transportFee ?? 0) +
    (data.computerFee ?? 0) +
    (data.otherFee ?? 0);

  return prisma.feeStructure.upsert({
    where: {
      schoolId_className_academicYear: {
        schoolId,
        className: data.className,
        academicYear: data.academicYear,
      },
    },
    create: {
      schoolId,
      ...data,
      developmentFee: data.developmentFee ?? 0,
      libraryFee: data.libraryFee ?? 0,
      sportsFee: data.sportsFee ?? 0,
      transportFee: data.transportFee ?? 0,
      computerFee: data.computerFee ?? 0,
      otherFee: data.otherFee ?? 0,
      totalFee: total,
    },
    update: {
      tuitionFee: data.tuitionFee,
      developmentFee: data.developmentFee ?? 0,
      libraryFee: data.libraryFee ?? 0,
      sportsFee: data.sportsFee ?? 0,
      transportFee: data.transportFee ?? 0,
      computerFee: data.computerFee ?? 0,
      otherFee: data.otherFee ?? 0,
      totalFee: total,
    },
  });
}

export async function generateTermInvoices(
  schoolId: string,
  academicYear: string,
  dueDate: string
) {
  const structures = await prisma.feeStructure.findMany({
    where: { schoolId, academicYear },
  });
  if (structures.length === 0) throw new Error("No fee structures for this academic year");

  const students = await prisma.student.findMany({
    where: { schoolId, status: "ACTIVE" },
    include: { class: true },
  });

  const created = [];
  for (const student of students) {
    const structure = structures.find(
      (s) => s.className === student.class.name || s.className === `${student.class.name}`
    );
    if (!structure) continue;

    const existing = await prisma.feeInvoice.findFirst({
      where: {
        schoolId,
        studentId: student.id,
        academicYear,
        status: { in: ["PENDING", "PARTIAL", "OVERDUE"] },
      },
    });
    if (existing) continue;

    const invoice = await prisma.feeInvoice.create({
      data: {
        invoiceNumber: generateInvoiceNumber(),
        schoolId,
        studentId: student.id,
        amount: structure.totalFee,
        paidAmount: 0,
        balance: structure.totalFee,
        status: "PENDING",
        dueDate: new Date(dueDate),
        academicYear,
      },
    });
    created.push(invoice);
  }
  return created;
}

async function reconcileInvoice(invoiceId: string, amount: number) {
  const invoice = await prisma.feeInvoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new Error("Invoice not found");

  const paidAmount = invoice.paidAmount + amount;
  const balance = Math.max(0, invoice.amount - paidAmount);
  let status: InvoiceStatus = "PARTIAL";
  if (balance <= 0) status = "PAID";
  else if (new Date() > invoice.dueDate) status = "OVERDUE";

  return prisma.feeInvoice.update({
    where: { id: invoiceId },
    data: { paidAmount, balance, status },
  });
}

export async function recordFeePayment(
  schoolId: string,
  data: {
    studentId: string;
    amount: number;
    mode: string;
    academicYear: string;
    invoiceId?: string;
    transactionId?: string;
    remarks?: string;
  }
) {
  const payment = await prisma.feePayment.create({
    data: {
      schoolId,
      studentId: data.studentId,
      amount: data.amount,
      paymentDate: new Date(),
      dueDate: new Date(),
      status: "COMPLETED" as PaymentStatus,
      mode: data.mode,
      transactionId: data.transactionId,
      remarks: data.remarks,
      academicYear: data.academicYear,
    },
  });

  if (data.invoiceId) {
    await reconcileInvoice(data.invoiceId, data.amount);
  }

  return payment;
}

export async function recordMpesaTransaction(
  schoolId: string,
  data: {
    studentId?: string;
    amount: number;
    phone?: string;
    transactionId?: string;
    type?: "STK_PUSH" | "C2B" | "MANUAL";
    invoiceId?: string;
    academicYear?: string;
  }
) {
  const txn = await prisma.mpesaTransaction.create({
    data: {
      schoolId,
      studentId: data.studentId,
      amount: data.amount,
      phone: data.phone,
      transactionId: data.transactionId,
      status: "SUCCESS",
      type: data.type ?? "MANUAL",
    },
  });

  if (data.studentId && data.invoiceId && data.academicYear) {
    await recordFeePayment(schoolId, {
      studentId: data.studentId,
      amount: data.amount,
      mode: "M-Pesa",
      academicYear: data.academicYear,
      invoiceId: data.invoiceId,
      transactionId: data.transactionId,
    });
  }

  return txn;
}

export async function createExpense(
  schoolId: string,
  data: { category: string; amount: number; description?: string; date?: string }
) {
  return prisma.expense.create({
    data: {
      schoolId,
      category: data.category,
      amount: data.amount,
      description: data.description,
      date: data.date ? new Date(data.date) : new Date(),
    },
  });
}

export async function markOverdueInvoices(schoolId: string) {
  const now = new Date();
  return prisma.feeInvoice.updateMany({
    where: {
      schoolId,
      status: { in: ["PENDING", "PARTIAL"] },
      dueDate: { lt: now },
      balance: { gt: 0 },
    },
    data: { status: "OVERDUE" },
  });
}

function generateApplicationNumber(schoolCode: string): string {
  return `APP-${schoolCode}-${Date.now().toString(36).slice(-6).toUpperCase()}`;
}

export async function submitAdmissionApplication(
  schoolCode: string,
  data: {
    studentName: string;
    dateOfBirth: string;
    gender: string;
    fatherName: string;
    motherName?: string;
    guardianName?: string;
    contactNumber: string;
    email: string;
    address: string;
    applyingForClass: string;
    previousSchool?: string;
  }
) {
  const school = await prisma.school.findUnique({ where: { code: schoolCode.toUpperCase() } });
  if (!school?.active) throw new Error("School not found");

  return prisma.admission.create({
    data: {
      schoolId: school.id,
      applicationNumber: generateApplicationNumber(school.code),
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
      status: "APPLIED",
    },
  });
}

export async function updateAdmissionStatus(
  schoolId: string,
  admissionId: string,
  status: AdmissionStatus,
  remarks?: string
) {
  const admission = await prisma.admission.findFirst({
    where: { id: admissionId, schoolId },
  });
  if (!admission) throw new Error("Application not found");

  return prisma.admission.update({
    where: { id: admissionId },
    data: { status, remarks },
  });
}

export async function admitFromApplication(
  schoolId: string,
  admissionId: string,
  classId: string,
  extras?: { studentImage?: string; parentImage?: string }
) {
  const admission = await prisma.admission.findFirst({
    where: { id: admissionId, schoolId, status: { in: ["APPROVED", "UNDER_REVIEW", "APPLIED"] } },
  });
  if (!admission) throw new Error("Application not found or already processed");

  const guardianEmail = admission.email;
  const guardianName =
    admission.guardianName || admission.fatherName || admission.motherName || "Guardian";

  const input: AdmitStudentInput & { studentImage?: string; parentImage?: string } = {
    fullName: admission.studentName,
    dateOfBirth: admission.dateOfBirth.toISOString().slice(0, 10),
    gender: admission.gender,
    classId,
    guardianName,
    guardianEmail,
    guardianPhone: admission.contactNumber,
    relationship: "Guardian",
    studentImage: extras?.studentImage,
    parentImage: extras?.parentImage,
  };

  const result = await admitStudent(schoolId, input);

  await prisma.admission.update({
    where: { id: admissionId },
    data: { status: "ADMITTED", remarks: `Admitted as ${result.admissionNumber}` },
  });

  return result;
}

export async function checkInVisitor(
  schoolId: string,
  data: { name: string; purpose?: string; phone?: string }
) {
  return prisma.visitor.create({
    data: { schoolId, ...data, checkIn: new Date() },
  });
}

export async function checkOutVisitor(schoolId: string, visitorId: string) {
  const visitor = await prisma.visitor.findFirst({
    where: { id: visitorId, schoolId },
  });
  if (!visitor) throw new Error("Visitor not found");
  return prisma.visitor.update({
    where: { id: visitorId },
    data: { checkOut: new Date() },
  });
}

export async function createAppointment(
  schoolId: string,
  data: { visitorName: string; purpose?: string; date: string }
) {
  return prisma.appointment.create({
    data: {
      schoolId,
      visitorName: data.visitorName,
      purpose: data.purpose,
      date: new Date(data.date),
      status: "Scheduled",
    },
  });
}

export async function createLibraryBook(
  schoolId: string,
  data: {
    title: string;
    author: string;
    category: string;
    quantity: number;
    isbn?: string;
    location?: string;
  }
) {
  return prisma.libraryBook.create({
    data: {
      schoolId,
      title: data.title,
      author: data.author,
      category: data.category,
      quantity: data.quantity,
      availableQuantity: data.quantity,
      isbn: data.isbn,
      location: data.location,
      status: "AVAILABLE",
    },
  });
}

export async function issueLibraryBook(
  schoolId: string,
  data: { bookId: string; studentId: string; dueDate: string }
) {
  const book = await prisma.libraryBook.findFirst({
    where: { id: data.bookId, schoolId },
  });
  if (!book || book.availableQuantity < 1) throw new Error("Book not available");

  const [issuance] = await prisma.$transaction([
    prisma.libraryIssuance.create({
      data: {
        schoolId,
        bookId: data.bookId,
        studentId: data.studentId,
        dueDate: new Date(data.dueDate),
        status: "Issued",
      },
    }),
    prisma.libraryBook.update({
      where: { id: data.bookId },
      data: {
        availableQuantity: { decrement: 1 },
        status: book.availableQuantity - 1 <= 0 ? "ISSUED" : "AVAILABLE",
      },
    }),
  ]);

  return issuance;
}

export async function returnLibraryBook(schoolId: string, issuanceId: string, fine = 0) {
  const issuance = await prisma.libraryIssuance.findFirst({
    where: { id: issuanceId, schoolId, status: "Issued" },
    include: { book: true },
  });
  if (!issuance) throw new Error("Issuance not found");

  return prisma.$transaction([
    prisma.libraryIssuance.update({
      where: { id: issuanceId },
      data: {
        returnDate: new Date(),
        status: "Returned",
        fine,
      },
    }),
    prisma.libraryBook.update({
      where: { id: issuance.bookId },
      data: {
        availableQuantity: { increment: 1 },
        status: "AVAILABLE",
      },
    }),
  ]);
}

export async function createTransportRoute(
  schoolId: string,
  data: {
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driverName: string;
    driverPhone?: string;
    capacity: number;
    monthlyFee: number;
  }
) {
  return prisma.transport.create({ data: { schoolId, ...data } });
}

export async function allocateTransport(
  schoolId: string,
  data: { studentId: string; transportId: string; stopPoint: string }
) {
  return prisma.transportAllocation.create({
    data: {
      schoolId,
      studentId: data.studentId,
      transportId: data.transportId,
      stopPoint: data.stopPoint,
      allocationDate: new Date(),
    },
  });
}

export async function createHostel(
  schoolId: string,
  data: { name: string; type: string; capacity: number; address?: string; warden?: string }
) {
  return prisma.hostel.create({ data: { schoolId, ...data } });
}

export async function allocateHostel(
  schoolId: string,
  data: {
    studentId: string;
    hostelId: string;
    roomNumber: string;
    bedNumber: string;
  }
) {
  return prisma.hostelAllocation.create({
    data: {
      schoolId,
      studentId: data.studentId,
      hostelId: data.hostelId,
      roomNumber: data.roomNumber,
      bedNumber: data.bedNumber,
      allocationDate: new Date(),
    },
  });
}

export async function createClass(
  schoolId: string,
  data: { name: string; section: string; academicYear: string; capacity?: number }
) {
  return prisma.class.create({
    data: {
      schoolId,
      name: data.name,
      section: data.section,
      academicYear: data.academicYear,
      capacity: data.capacity ?? 50,
    },
  });
}

export async function createSubject(
  schoolId: string,
  data: { name: string; code: string; maxMarks?: number }
) {
  return prisma.subject.create({
    data: {
      schoolId,
      name: data.name,
      code: data.code.toUpperCase(),
      maxMarks: data.maxMarks ?? 100,
    },
  });
}

export async function createTimetableEntry(
  schoolId: string,
  data: {
    classId: string;
    subjectId: string;
    teacherId: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    room?: string;
    academicYear: string;
  }
) {
  return prisma.timetable.create({ data: { schoolId, ...data } });
}

export async function updateTermStatus(schoolId: string, termId: string, status: TermStatus) {
  const term = await prisma.term.findFirst({
    where: { id: termId, academicYear: { schoolId } },
  });
  if (!term) throw new Error("Term not found");
  return prisma.term.update({ where: { id: termId }, data: { status } });
}

export async function createPasswordResetToken(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const token = `reset_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  return { token, email: user.email, name: user.name };
}

export async function resetPasswordWithToken(token: string, email: string, password: string) {
  if (password.length < 8) throw new Error("Password must be at least 8 characters");

  const record = await prisma.verificationToken.findUnique({
    where: { identifier_token: { identifier: email, token } },
  });
  if (!record || record.expires < new Date()) {
    throw new Error("Invalid or expired reset link");
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.$transaction([
    prisma.user.update({ where: { email }, data: { password: hashed } }),
    prisma.verificationToken.delete({
      where: { identifier_token: { identifier: email, token } },
    }),
  ]);
}

export async function logSchoolAudit(
  schoolId: string,
  action: string,
  actorName?: string,
  actorId?: string,
  target?: string
) {
  return prisma.auditLog.create({
    data: { schoolId, action, actorName, actorId, target, icon: "history" },
  });
}

export function canManageProfiles(role: UserRole): boolean {
  return ["SCHOOL_ADMIN", "DEPUTY_ADMIN", "ICT_ADMIN"].includes(role);
}
