import { NextRequest, NextResponse } from "next/server";
import { submitAdmissionApplication } from "@/lib/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schoolCode, ...data } = body;
    if (!schoolCode) {
      return NextResponse.json({ error: "School code is required" }, { status: 400 });
    }
    const application = await submitAdmissionApplication(schoolCode, data);
    return NextResponse.json(
      {
        message: "Application submitted",
        applicationNumber: application.applicationNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Application failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
