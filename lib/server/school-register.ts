import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { SchoolType, UserRole } from "@prisma/client";

export type SchoolRegisterInput = {
  schoolName: string;
  schoolEmail: string;
  phone: string;
  schoolType: SchoolType;
  principalName: string;
  password: string;
  city?: string;
};

function generateSchoolCode(name: string): string {
  const base = name
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 4)
    .toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base || "SCH"}${suffix}`;
}

export async function registerSchool(input: SchoolRegisterInput) {
  const existing = await prisma.user.findUnique({
    where: { email: input.schoolEmail },
  });
  if (existing) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  let code = generateSchoolCode(input.schoolName);

  for (let i = 0; i < 5; i++) {
    const taken = await prisma.school.findUnique({ where: { code } });
    if (!taken) break;
    code = generateSchoolCode(input.schoolName);
  }

  return prisma.$transaction(async (tx) => {
    const school = await tx.school.create({
      data: {
        name: input.schoolName,
        code,
        email: input.schoolEmail,
        phone: input.phone,
        schoolType: input.schoolType,
        principalName: input.principalName,
        city: input.city,
        country: "KE",
        active: true,
      },
    });

    await tx.schoolSettings.create({
      data: {
        schoolId: school.id,
        setupCompleted: false,
        cbeEnabled: false,
        smsEnabled: false,
        libraryEnabled: true,
        transportEnabled: false,
        hostelEnabled: false,
        payrollEnabled: false,
        whatsappEnabled: false,
      },
    });

    await tx.schoolSubscription.create({
      data: {
        schoolId: school.id,
        plan: "STANDARD",
        status: "PENDING",
        monthlyAmount: 0,
      },
    });

    const admin = await tx.user.create({
      data: {
        email: input.schoolEmail,
        name: input.principalName,
        password: hashedPassword,
        phone: input.phone,
        role: "SCHOOL_ADMIN",
        schoolId: school.id,
        active: true,
      },
    });

    return { school, admin };
  });
}

export type CreateStaffInput = {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password?: string;
  isClassTeacher?: boolean;
};

const STAFF_ROLES: UserRole[] = [
  "DEPUTY_ADMIN",
  "ICT_ADMIN",
  "TEACHER",
  "FINANCE",
  "RECEPTIONIST",
  "ADMISSIONS_OFFICER",
  "LIBRARIAN",
  "TRANSPORT_MANAGER",
  "HOSTEL_MANAGER",
];

export function isStaffCreatableRole(role: UserRole): boolean {
  return STAFF_ROLES.includes(role);
}

function generateTempPassword(): string {
  return `Mm${Math.random().toString(36).slice(2, 10)}!`;
}

function generateEmployeeId(schoolId: string): string {
  return `TCH-${schoolId.slice(-4).toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
}

export async function createStaffMember(
  schoolId: string,
  input: CreateStaffInput
) {
  if (!isStaffCreatableRole(input.role)) {
    throw new Error("Invalid staff role");
  }

  const settings = await prisma.schoolSettings.findUnique({
    where: { schoolId },
    select: { disabledRoles: true },
  });
  if (settings?.disabledRoles.includes(input.role)) {
    throw new Error("This role is disabled for your school. Enable it in Settings first.");
  }

  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    throw new Error("A user with this email already exists");
  }

  const plainPassword = input.password ?? generateTempPassword();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      password: hashedPassword,
      role: input.role,
      schoolId,
      active: true,
    },
  });

  if (input.role === "TEACHER") {
    await prisma.teacher.create({
      data: {
        schoolId,
        userId: user.id,
        employeeId: generateEmployeeId(schoolId),
        joinDate: new Date(),
        isClassTeacher: input.isClassTeacher ?? false,
      },
    });
  }

  return { user, temporaryPassword: input.password ? undefined : plainPassword };
}

export type AdmitStudentInput = {
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  classId: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone?: string;
  relationship?: string;
};

function generateAdmissionNumber(schoolCode: string): string {
  const year = new Date().getFullYear();
  const seq = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${schoolCode}-${year}-${seq}`;
}

export async function admitStudent(
  schoolId: string,
  input: AdmitStudentInput
) {
  const school = await prisma.school.findUnique({ where: { id: schoolId } });
  if (!school) throw new Error("School not found");

  const classExists = await prisma.class.findFirst({
    where: { id: input.classId, schoolId },
  });
  if (!classExists) throw new Error("Class not found");

  const admissionNumber = generateAdmissionNumber(school.code);
  const studentEmail = `student.${admissionNumber.toLowerCase().replace(/[^a-z0-9]/g, ".")}@${school.code.toLowerCase()}.motti.local`;
  const studentTempPassword = generateTempPassword();

  return prisma.$transaction(async (tx) => {
    let parentUser = await tx.user.findUnique({
      where: { email: input.guardianEmail },
    });

    let parentRecord = parentUser
      ? await tx.parent.findUnique({ where: { userId: parentUser.id } })
      : null;

    let parentTemporaryPassword: string | undefined;

    if (!parentUser) {
      parentTemporaryPassword = generateTempPassword();
      parentUser = await tx.user.create({
        data: {
          email: input.guardianEmail,
          name: input.guardianName,
          phone: input.guardianPhone,
          password: await bcrypt.hash(parentTemporaryPassword, 10),
          role: "PARENT",
          schoolId,
          active: true,
        },
      });

      parentRecord = await tx.parent.create({
        data: {
          schoolId,
          userId: parentUser.id,
          relationship: input.relationship ?? "Guardian",
        },
      });
    } else if (!parentRecord) {
      parentRecord = await tx.parent.create({
        data: {
          schoolId,
          userId: parentUser.id,
          relationship: input.relationship ?? "Guardian",
        },
      });
    }

    const studentUser = await tx.user.create({
      data: {
        email: studentEmail,
        name: input.fullName,
        password: await bcrypt.hash(studentTempPassword, 10),
        role: "STUDENT",
        schoolId,
        active: true,
      },
    });

    const student = await tx.student.create({
      data: {
        schoolId,
        userId: studentUser.id,
        registrationNumber: admissionNumber,
        admissionNumber,
        admissionDate: new Date(),
        classId: input.classId,
        dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
        gender: input.gender,
        guardianName: input.guardianName,
        guardianPhone: input.guardianPhone,
        parentId: parentRecord!.id,
        status: "ACTIVE",
      },
    });

    return {
      student,
      admissionNumber,
      parentEmail: input.guardianEmail,
      parentTemporaryPassword,
      studentEmail,
      studentTemporaryPassword: studentTempPassword,
    };
  });
}

export async function completeSchoolSetup(
  schoolId: string,
  data: {
    themeColor?: string;
    motto?: string;
    cbeEnabled?: boolean;
    smsEnabled?: boolean;
    whatsappEnabled?: boolean;
    transportEnabled?: boolean;
    libraryEnabled?: boolean;
    hostelEnabled?: boolean;
    payrollEnabled?: boolean;
    academicYearName?: string;
    academicYearStart?: string;
    academicYearEnd?: string;
    terms?: { name: string; startDate: string; endDate: string }[];
    classes?: { name: string; section: string }[];
    subjects?: { name: string; code: string }[];
  }
) {
  const yearName =
    data.academicYearName ?? String(new Date().getFullYear());

  await prisma.$transaction(async (tx) => {
    await tx.schoolSettings.update({
      where: { schoolId },
      data: {
        setupCompleted: true,
        themeColor: data.themeColor,
        motto: data.motto,
        cbeEnabled: data.cbeEnabled ?? false,
        smsEnabled: data.smsEnabled ?? false,
        whatsappEnabled: data.whatsappEnabled ?? false,
        transportEnabled: data.transportEnabled ?? false,
        libraryEnabled: data.libraryEnabled ?? true,
        hostelEnabled: data.hostelEnabled ?? false,
        payrollEnabled: data.payrollEnabled ?? false,
      },
    });

    if (data.academicYearStart && data.academicYearEnd) {
      const year = await tx.academicYear.upsert({
        where: { schoolId_name: { schoolId, name: yearName } },
        update: {
          startDate: new Date(data.academicYearStart),
          endDate: new Date(data.academicYearEnd),
          isCurrent: true,
        },
        create: {
          schoolId,
          name: yearName,
          startDate: new Date(data.academicYearStart),
          endDate: new Date(data.academicYearEnd),
          isCurrent: true,
        },
      });

      if (data.terms?.length) {
        for (const term of data.terms) {
          await tx.term.create({
            data: {
              academicYearId: year.id,
              name: term.name,
              startDate: new Date(term.startDate),
              endDate: new Date(term.endDate),
              status: "UPCOMING",
            },
          });
        }
      }
    }

    if (data.classes?.length) {
      for (const cls of data.classes) {
        await tx.class.create({
          data: {
            schoolId,
            name: cls.name,
            section: cls.section,
            academicYear: yearName,
          },
        });
      }
    }

    if (data.subjects?.length) {
      for (const sub of data.subjects) {
        await tx.subject.create({
          data: {
            schoolId,
            name: sub.name,
            code: sub.code.toUpperCase(),
          },
        });
      }
    }
  });
}

export async function getAllSchoolUsers(schoolId: string) {
  return prisma.user.findMany({
    where: {
      schoolId,
      role: {
        in: [
          "SCHOOL_ADMIN",
          "DEPUTY_ADMIN",
          "ICT_ADMIN",
          "TEACHER",
          "CLASS_TEACHER",
          "FINANCE",
          "RECEPTIONIST",
          "ADMISSIONS_OFFICER",
          "LIBRARIAN",
          "TRANSPORT_MANAGER",
          "HOSTEL_MANAGER",
        ],
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      active: true,
      createdAt: true,
      teacher: { select: { isClassTeacher: true, employeeId: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
