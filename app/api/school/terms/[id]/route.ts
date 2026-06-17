import { NextRequest, NextResponse } from "next/server";
import type { TermStatus } from "@prisma/client";
import { requireSchoolAdmin } from "@/lib/server/permissions";
import { updateTermStatus } from "@/lib/server/mutations";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireSchoolAdmin();
    const { id } = await params;
    const body = await request.json();
    const term = await updateTermStatus(user.schoolId!, id, body.status as TermStatus);
    return NextResponse.json({ term });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
