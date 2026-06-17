import { NextRequest, NextResponse } from "next/server";
import { requireFinanceStaff } from "@/lib/server/permissions";
import { runAutomatedReminders } from "@/lib/server/analytics";

export async function POST(request: NextRequest) {
  try {
    const user = await requireFinanceStaff();
    const body = await request.json();

    if (body.action === "fee-reminders") {
      const result = await runAutomatedReminders(user.schoolId!);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
