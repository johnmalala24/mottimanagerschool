'use client'

import Sidebar from '@/components/Sidebar'
import type { SchoolBranding } from '@/lib/school-branding'

export type NavItem = { label: string; icon: string; href: string }

type PortalShellProps = {
  title: string
  subtitle: string
  navItems: NavItem[]
  bottomItems?: NavItem[]
  userName?: string
  userRole?: string
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
        branding={branding}
      />
      <main className="ml-0 md:ml-64 flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        {children}
      </main>
    </div>
  )
}
