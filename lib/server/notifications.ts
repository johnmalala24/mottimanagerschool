import { prisma } from "@/lib/prisma";

export async function createNotification(opts: {
  userId: string;
  schoolId?: string;
  title: string;
  message: string;
  type?: "Info" | "Warning" | "Error" | "Success";
  actionUrl?: string;
}) {
  return prisma.notification.create({
    data: {
      userId: opts.userId,
      schoolId: opts.schoolId,
      title: opts.title,
      message: opts.message,
      type: opts.type ?? "Info",
      actionUrl: opts.actionUrl,
    },
  });
}

export async function notifyRoleUsers(opts: {
  schoolId: string;
  roles: import("@prisma/client").UserRole[];
  title: string;
  message: string;
  type?: "Info" | "Warning" | "Error" | "Success";
  actionUrl?: string;
}) {
  const users = await prisma.user.findMany({
    where: { schoolId: opts.schoolId, role: { in: opts.roles }, active: true },
    select: { id: true },
  });

  if (users.length === 0) return 0;

  await prisma.notification.createMany({
    data: users.map((u) => ({
      userId: u.id,
      schoolId: opts.schoolId,
      title: opts.title,
      message: opts.message,
      type: opts.type ?? "Info",
      actionUrl: opts.actionUrl,
    })),
  });

  return users.length;
}

export async function notifyStudentParent(opts: {
  schoolId: string;
  studentId: string;
  title: string;
  message: string;
  type?: "Info" | "Warning" | "Error" | "Success";
  actionUrl?: string;
}) {
  const student = await prisma.student.findFirst({
    where: { id: opts.studentId, schoolId: opts.schoolId },
    include: {
      user: { select: { id: true } },
      parent: { include: { user: { select: { id: true } } } },
    },
  });
  if (!student) return 0;

  const ids = [student.user.id];
  if (student.parent?.user.id) ids.push(student.parent.user.id);

  await prisma.notification.createMany({
    data: ids.map((userId) => ({
      userId,
      schoolId: opts.schoolId,
      title: opts.title,
      message: opts.message,
      type: opts.type ?? "Info",
      actionUrl: opts.actionUrl,
    })),
  });

  return ids.length;
}

export async function getUserNotifications(userId: string, limit = 20) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getUnreadCount(userId: string) {
  return prisma.notification.count({ where: { userId, read: false } });
}

export async function markNotificationRead(userId: string, notificationId: string) {
  return prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { read: true, readAt: new Date() },
  });
}

export async function markAllNotificationsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true, readAt: new Date() },
  });
}
