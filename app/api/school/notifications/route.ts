import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/server/session";
import {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
} from "@/lib/server/notifications";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [notifications, unreadCount] = await Promise.all([
      getUserNotifications(user.id),
      getUnreadCount(user.id),
    ]);

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    if (body.all) {
      await markAllNotificationsRead(user.id);
      return NextResponse.json({ message: "All marked read" });
    }

    if (body.notificationId) {
      await markNotificationRead(user.id, body.notificationId);
      return NextResponse.json({ message: "Marked read" });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
