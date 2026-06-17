import { NextRequest, NextResponse } from "next/server";
import { admitStudent } from "@/lib/server/school-register";
import { requireAdmissionsStaff } from "@/lib/server/permissions";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmissionsStaff();
    const body = await request.json();
    const {
      fullName,
      dateOfBirth,
      gender,
      classId,
      guardianName,
      guardianEmail,
      guardianPhone,
      relationship,
      studentImage,
      parentImage,
    } = body;

    if (!fullName || !classId || !guardianName || !guardianEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await admitStudent(user.schoolId!, {
      fullName,
      dateOfBirth,
      gender,
      classId,
      guardianName,
      guardianEmail,
      guardianPhone,
      relationship,
      studentImage,
      parentImage,
    });

    return NextResponse.json(
      {
        message: "Student admitted successfully",
        admissionNumber: result.admissionNumber,
        studentId: result.student.id,
        parentEmail: result.parentEmail,
        parentTemporaryPassword: result.parentTemporaryPassword,
        studentEmail: result.studentEmail,
        studentTemporaryPassword: result.studentTemporaryPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Admission failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
