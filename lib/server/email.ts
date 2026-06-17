import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM =
  process.env.RESEND_FROM_DEFAULT ??
  process.env.RESEND_FROM_EMAIL ??
  "Motti Manager <noreply@mottimanager.com>";

export type EmailType =
  | "announcement"
  | "fee_reminder"
  | "payment_receipt"
  | "attendance_alert"
  | "exam_results"
  | "assignment"
  | "welcome"
  | "general";

function wrapHtml(title: string, body: string, schoolName?: string) {
  const header = schoolName ?? "MottiManager";
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="font-family:Inter,Arial,sans-serif;background:#f8f9ff;margin:0;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <div style="background:#006b2c;color:#fff;padding:20px 24px">
      <h1 style="margin:0;font-size:18px;font-weight:700">${header}</h1>
    </div>
    <div style="padding:24px">
      <h2 style="margin:0 0 12px;font-size:16px;color:#0b1c30">${title}</h2>
      <div style="color:#545f73;font-size:14px;line-height:1.6">${body}</div>
    </div>
    <div style="padding:16px 24px;background:#eff4ff;font-size:12px;color:#545f73">
      Sent via MottiManager · School management platform
    </div>
  </div>
</body></html>`;
}

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  type: EmailType;
  schoolId?: string;
}) {
  const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];
  const valid = recipients.filter((e) => e && e.includes("@"));

  if (valid.length === 0) return { sent: 0, failed: 0 };

  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping send");
    for (const to of valid) {
      await prisma.emailLog.create({
        data: {
          schoolId: opts.schoolId,
          to,
          subject: opts.subject,
          type: opts.type,
          status: "SKIPPED",
          error: "No API key",
        },
      });
    }
    return { sent: 0, failed: valid.length };
  }

  let sent = 0;
  let failed = 0;

  for (const to of valid) {
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to,
        subject: opts.subject,
        html: opts.html,
      });
      if (error) throw new Error(error.message);
      await prisma.emailLog.create({
        data: { schoolId: opts.schoolId, to, subject: opts.subject, type: opts.type, status: "SENT" },
      });
      sent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Send failed";
      await prisma.emailLog.create({
        data: {
          schoolId: opts.schoolId,
          to,
          subject: opts.subject,
          type: opts.type,
          status: "FAILED",
          error: msg,
        },
      });
      failed++;
    }
  }

  return { sent, failed };
}

export async function sendBulkSchoolEmail(opts: {
  schoolId: string;
  schoolName: string;
  subject: string;
  title: string;
  body: string;
  roles?: ("PARENT" | "STUDENT" | "TEACHER" | "CLASS_TEACHER" | "SCHOOL_ADMIN" | "FINANCE")[];
  type: EmailType;
}) {
  const settings = await prisma.schoolSettings.findUnique({
    where: { schoolId: opts.schoolId },
    select: { emailEnabled: true },
  });
  if (settings && !settings.emailEnabled) return { sent: 0, failed: 0 };

  const users = await prisma.user.findMany({
    where: {
      schoolId: opts.schoolId,
      active: true,
      ...(opts.roles ? { role: { in: opts.roles } } : {}),
    },
    select: { email: true },
  });

  const emails = [...new Set(users.map((u) => u.email).filter(Boolean))];
  if (emails.length === 0) return { sent: 0, failed: 0 };

  const html = wrapHtml(opts.title, opts.body.replace(/\n/g, "<br/>"), opts.schoolName);
  return sendEmail({
    to: emails,
    subject: opts.subject,
    html,
    type: opts.type,
    schoolId: opts.schoolId,
  });
}

export async function notifyParentByEmail(opts: {
  schoolId: string;
  schoolName: string;
  studentId: string;
  subject: string;
  title: string;
  body: string;
  type: EmailType;
}) {
  const student = await prisma.student.findFirst({
    where: { id: opts.studentId, schoolId: opts.schoolId },
    include: { parent: { include: { user: { select: { email: true } } } } },
  });
  const email = student?.parent?.user.email;
  if (!email) return { sent: 0, failed: 0 };

  const html = wrapHtml(opts.title, opts.body.replace(/\n/g, "<br/>"), opts.schoolName);
  return sendEmail({
    to: email,
    subject: opts.subject,
    html,
    type: opts.type,
    schoolId: opts.schoolId,
  });
}

export { wrapHtml };
