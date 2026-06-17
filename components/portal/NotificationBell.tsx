"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  actionUrl?: string | null;
  createdAt: string;
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = () => {
    fetch("/api/school/notifications")
      .then((r) => r.json())
      .then((data) => {
        setNotifications(data.notifications ?? []);
        setUnreadCount(data.unreadCount ?? 0);
      })
      .catch(() => {});
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  const markRead = async (id: string) => {
    await fetch("/api/school/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId: id }),
    });
    load();
  };

  const markAll = async () => {
    await fetch("/api/school/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
    load();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-surface-variant transition-colors"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-outline-variant rounded-xl shadow-lg z-50">
            <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant">
              <span className="text-label-md font-bold">Notifications</span>
              {unreadCount > 0 && (
                <button type="button" onClick={markAll} className="text-label-sm text-primary font-medium">
                  Mark all read
                </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="p-md text-sm text-secondary text-center">No notifications yet</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={clsx(
                    "px-md py-sm border-b border-outline-variant last:border-0 hover:bg-surface-container-low",
                    !n.read && "bg-primary/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-sm">
                    <div className="min-w-0 flex-1">
                      <p className="text-label-md font-semibold truncate">{n.title}</p>
                      <p className="text-label-sm text-secondary line-clamp-2">{n.message}</p>
                      {n.actionUrl && (
                        <Link
                          href={n.actionUrl}
                          onClick={() => { markRead(n.id); setOpen(false); }}
                          className="text-label-sm text-primary font-medium mt-1 inline-block"
                        >
                          View →
                        </Link>
                      )}
                    </div>
                    {!n.read && (
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        className="text-label-sm text-secondary hover:text-primary flex-shrink-0"
                      >
                        ✓
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
