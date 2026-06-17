import { NextRequest, NextResponse } from "next/server";
import { registerSchool } from "@/lib/server/school-register";
import type { SchoolType } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      schoolName,
      schoolEmail,
      phone,
      schoolType,
      principalName,
      password,
      city,
    } = body;

    if (!schoolName || !schoolEmail || !phone || !schoolType || !principalName || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const validTypes: SchoolType[] = ["PRIMARY", "SECONDARY", "MIXED"];
    if (!validTypes.includes(schoolType)) {
      return NextResponse.json({ error: "Invalid school type" }, { status: 400 });
    }

    const { school, admin } = await registerSchool({
      schoolName,
      schoolEmail,
      phone,
      schoolType,
      principalName,
      password,
      city,
    });

    return NextResponse.json(
      {
        message: "School registered successfully",
        school: { id: school.id, name: school.name, code: school.code },
        admin: { id: admin.id, email: admin.email },
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
