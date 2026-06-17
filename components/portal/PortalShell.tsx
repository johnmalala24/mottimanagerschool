'use client'

import Sidebar from '@/components/Sidebar'
import NotificationBell from '@/components/portal/NotificationBell'
import type { SchoolBranding } from '@/lib/school-branding'

export type NavItem = { label: string; icon: string; href: string }

type PortalShellProps = {
  title: string
  subtitle: string
  navItems: NavItem[]
  bottomItems?: NavItem[]
  userName?: string
  userRole?: string
  userImage?: string | null
  branding?: SchoolBranding
  children: React.ReactNode
}

export default function PortalShell({
  title,
  subtitle,
  navItems,
  bottomItems = [],
  userName = 'User',
  userRole = 'Member',
  userImage,
  branding,
  children,
}: PortalShellProps) {
  return (
    <div className="flex min-h-screen bg-surface flex-1">
      <Sidebar
        title={title}
        subtitle={subtitle}
        navItems={navItems}
        bottomItems={bottomItems}
        userName={userName}
        userRole={userRole}
        userImage={userImage}
        branding={branding}
      />
      <main className="ml-0 md:ml-64 flex-1 flex flex-col min-h-screen pb-16 md:pb-0 bg-surface">
        <div className="sticky top-0 z-30 flex justify-end px-gutter pt-md pb-0 bg-surface/95 backdrop-blur-sm">
          <NotificationBell />
        </div>
        <div className="flex-1 px-gutter pb-gutter">{children}</div>
      </main>
    </div>
  )
}
