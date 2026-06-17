import { NextRequest, NextResponse } from "next/server";
import type { AdmissionStatus } from "@prisma/client";
import { requireAdmissionsStaff } from "@/lib/server/permissions";
import { updateAdmissionStatus } from "@/lib/server/mutations";

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAdmissionsStaff();
    const body = await request.json();
    const { admissionId, status, remarks } = body as {
      admissionId: string;
      status: AdmissionStatus;
      remarks?: string;
    };
    if (!admissionId || !status) {
      return NextResponse.json({ error: "Missing admissionId or status" }, { status: 400 });
    }
    const admission = await updateAdmissionStatus(
      user.schoolId!,
      admissionId,
      status,
      remarks
    );
    return NextResponse.json({ admission });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
