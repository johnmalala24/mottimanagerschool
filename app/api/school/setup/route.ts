import { NextRequest, NextResponse } from "next/server";
import { completeSchoolSetup } from "@/lib/server/school-register";
import { requireSchoolAdmin } from "@/lib/server/permissions";

export async function POST(request: NextRequest) {
  try {
    const user = await requireSchoolAdmin();
    const body = await request.json();
    await completeSchoolSetup(user.schoolId!, body);
    return NextResponse.json({ message: "Setup completed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Setup failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
