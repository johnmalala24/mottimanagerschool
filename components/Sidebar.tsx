'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import type { SchoolBranding } from '@/lib/school-branding'

interface NavItem {
  label: string
  icon: string
  href: string
}

interface SidebarProps {
  title: string
  subtitle: string
  navItems: NavItem[]
  userName?: string
  userRole?: string
  bottomItems?: NavItem[]
  branding?: Pick<SchoolBranding, 'logo' | 'motto' | 'themeColor'>
}

export default function Sidebar({ title, subtitle, navItems, userName = 'Admin User', userRole = 'Administrator', bottomItems = [], branding }: SidebarProps) {
  const pathname = usePathname()
  const logo = branding?.logo

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen flex flex-col p-md gap-sm bg-surface-container-low border-r border-outline-variant w-64 z-40 hidden md:flex">
        <div className="px-md py-lg mb-md">
          <div className="flex items-center gap-sm">
            <div
              className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-lg text-on-primary-container overflow-hidden flex-shrink-0"
              style={branding?.themeColor ? { backgroundColor: branding.themeColor } : undefined}
            >
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined icon-filled text-white">school</span>
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-headline-lg-mobile font-bold text-primary leading-tight truncate">{title}</h1>
              <p className="text-label-sm text-secondary opacity-80 truncate">{subtitle}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-xs overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-md px-md py-sm rounded-lg transition-all duration-100 text-label-md font-medium',
                  isActive
                    ? 'bg-primary text-on-primary font-bold scale-95 shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                )}
              >
                <span className={clsx('material-symbols-outlined', isActive && 'icon-filled')}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-md border-t border-outline-variant flex flex-col gap-xs">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant transition-all rounded-lg text-label-md"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="flex items-center gap-md px-md py-md mt-sm bg-surface-container rounded-xl">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm flex-shrink-0">
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-label-md font-medium truncate">{userName}</p>
              <p className="text-label-sm text-secondary truncate">{userRole}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest border-t border-outline-variant flex justify-around items-center py-sm shadow-lg">
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center gap-xs',
                isActive ? 'text-primary' : 'text-secondary'
              )}
            >
              <span className={clsx('material-symbols-outlined', isActive && 'icon-filled')}>{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label.split(' ')[0]}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
