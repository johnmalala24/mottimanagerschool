import { NextRequest, NextResponse } from "next/server";
import {
  createStaffMember,
  getAllSchoolUsers,
  isStaffCreatableRole,
} from "@/lib/server/school-register";
import { requireSchoolAdmin } from "@/lib/server/permissions";
import type { UserRole } from "@prisma/client";

export async function GET() {
  try {
    const user = await requireSchoolAdmin();
    const staff = await getAllSchoolUsers(user.schoolId!);
    return NextResponse.json({ staff });
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireSchoolAdmin();
    const body = await request.json();
    const { name, email, phone, role, password, isClassTeacher, image } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isStaffCreatableRole(role as UserRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const result = await createStaffMember(user.schoolId!, {
      name,
      email,
      phone,
      role: role as UserRole,
      password,
      isClassTeacher,
      image,
    });

    return NextResponse.json(
      {
        message: "Staff member created",
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
        temporaryPassword: result.temporaryPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create staff";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
