import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const result = await createPasswordResetToken(email);
    // Always return success to avoid email enumeration
    return NextResponse.json({
      message: "If an account exists, reset instructions have been sent.",
      ...(process.env.NODE_ENV === "development" && result
        ? { devToken: result.token, devEmail: result.email }
        : {}),
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
