import { NextRequest, NextResponse } from "next/server";
import { requireFinanceStaff } from "@/lib/server/permissions";
import {
  createFeeStructure,
  generateTermInvoices,
  recordFeePayment,
  recordMpesaTransaction,
  createExpense,
  markOverdueInvoices,
} from "@/lib/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const user = await requireFinanceStaff();
    const body = await request.json();
    const schoolId = user.schoolId!;

    switch (body.action) {
      case "fee-structure": {
        const structure = await createFeeStructure(schoolId, body);
        return NextResponse.json({ structure }, { status: 201 });
      }
      case "generate-invoices": {
        const invoices = await generateTermInvoices(schoolId, body.academicYear, body.dueDate);
        return NextResponse.json({ count: invoices.length, invoices }, { status: 201 });
      }
      case "payment": {
        const payment = await recordFeePayment(schoolId, body);
        return NextResponse.json({ payment }, { status: 201 });
      }
      case "mpesa": {
        const txn = await recordMpesaTransaction(schoolId, body);
        return NextResponse.json({ transaction: txn }, { status: 201 });
      }
      case "expense": {
        const expense = await createExpense(schoolId, body);
        return NextResponse.json({ expense }, { status: 201 });
      }
      case "mark-overdue": {
        const result = await markOverdueInvoices(schoolId);
        return NextResponse.json({ updated: result.count });
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
