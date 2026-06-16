'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/super-admin' },
  { label: 'Schools', icon: 'groups', href: '/super-admin/schools' },
  { label: 'Subscriptions', icon: 'subscriptions', href: '/super-admin/subscriptions' },
  { label: 'Billing', icon: 'payments', href: '/super-admin/billing' },
  { label: 'Features', icon: 'featured_play_list', href: '/super-admin/features' },
  { label: 'Support Tickets', icon: 'confirmation_number', href: '/super-admin/tickets' },
  { label: 'Audit Logs', icon: 'receipt_long', href: '/super-admin/audit' },
  { label: 'Analytics', icon: 'analytics', href: '/super-admin/analytics' },
  { label: 'Database', icon: 'storage', href: '/super-admin/database' },
]

const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/super-admin/settings' },
  { label: 'Support', icon: 'help', href: '/super-admin/support' },
]

const schools = [
  { initials: 'GA', name: 'Greenwood Academy', id: 'ED-9283-K', location: 'Nairobi, KE', plan: 'Enterprise', planIcon: 'workspace_premium', planColor: 'text-tertiary', status: 'Active', statusColor: 'bg-primary/10 text-primary' },
  { initials: 'LV', name: 'Lakeview Primary', id: 'ED-1022-K', location: 'Kisumu, KE', plan: 'Standard', planIcon: '', planColor: 'text-secondary', status: 'Pending', statusColor: 'bg-secondary-container text-secondary' },
  { initials: 'SM', name: "St. Mary's Boys", id: 'ED-5561-K', location: 'Mombasa, KE', plan: 'Premium', planIcon: '', planColor: 'text-secondary', status: 'Suspended', statusColor: 'bg-error-container text-on-error-container' },
  { initials: 'KA', name: 'Kiserian Academy', id: 'ED-7732-K', location: 'Kajiado, KE', plan: 'Enterprise', planIcon: 'workspace_premium', planColor: 'text-tertiary', status: 'Active', statusColor: 'bg-primary/10 text-primary' },
  { initials: 'NP', name: 'Nairobi Primary', id: 'ED-4401-K', location: 'Nairobi, KE', plan: 'Premium', planIcon: '', planColor: 'text-secondary', status: 'Active', statusColor: 'bg-primary/10 text-primary' },
]

export default function SuperAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        title="MottiManager"
        subtitle="Platform Owner Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Admin User"
        userRole="Super Administrator"
      />

      <main className="md:ml-64 flex-1 p-xl pb-20 md:pb-xl">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface tracking-tight">Super Admin Dashboard</h2>
            <p className="text-body-md text-secondary">Global overview of MottiManager platform performance.</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container-highest border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant transition-all text-label-md">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export Data
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 transition-all text-label-md font-semibold">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Register New School
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-2xl">
          {[
            { label: 'Total Registered Schools', value: '1,482', icon: 'school', badge: '+12%', iconBg: 'bg-primary/10', iconColor: 'text-primary', progress: 75 },
            { label: 'Active vs Suspended', value: '1,240', icon: 'check_circle', badge: 'Active', iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary', sub: '/ 242 suspended', subColor: 'text-secondary' },
            { label: 'Platform Revenue (MTD)', value: 'KES 4.2M', icon: 'payments', badge: 'KES', iconBg: 'bg-secondary-container', iconColor: 'text-secondary', sub: '↑ 18% vs last month', subColor: 'text-primary' },
            { label: 'System Health Status', value: '99.9%', icon: 'analytics', badge: '● Healthy', iconBg: 'bg-primary/20', iconColor: 'text-primary', sub: 'Avg Response: 120ms', subColor: 'text-secondary' },
          ].map((s, i) => (
            <div key={i} className="tonal-card p-lg rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-md">
                <div className={`p-sm ${s.iconBg} rounded-lg ${s.iconColor}`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <span className={`text-label-sm font-bold ${i === 0 ? 'text-primary bg-primary/10' : i === 1 ? 'text-tertiary bg-tertiary/10' : 'text-primary'} px-sm py-1 rounded-full`}>
                  {s.badge}
                </span>
              </div>
              <p className="text-label-md text-secondary mb-1">{s.label}</p>
              <h3 className="text-headline-lg font-bold">{s.value}</h3>
              {s.sub && <p className={`text-label-sm mt-md ${s.subColor}`}>{s.sub}</p>}
              {i === 0 && (
                <div className="mt-md w-full bg-surface-variant rounded-full h-1">
                  <div className="bg-primary h-1 rounded-full" style={{ width: '75%' }}></div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Schools Table */}
        <section className="mb-2xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="p-lg border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
            <h3 className="text-title-md font-bold text-on-surface">Manage Schools</h3>
            <div className="flex items-center gap-sm w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">search</span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-label-md focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Search schools..."
                  type="text"
                />
              </div>
              <select className="bg-surface-container border border-outline-variant rounded-lg px-md py-2 text-label-md focus:ring-1 focus:ring-primary outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  {['School Name', 'Location', 'Current Plan', 'Status', 'Actions'].map((h, i) => (
                    <th key={h} className={`px-lg py-md text-label-sm font-bold text-secondary uppercase tracking-wider border-b border-outline-variant ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {schools.map((school) => (
                  <tr key={school.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-sm">
                          {school.initials}
                        </div>
                        <div>
                          <p className="text-label-md font-bold">{school.name}</p>
                          <p className="text-label-sm text-secondary">Reg ID: {school.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md text-body-md">{school.location}</td>
                    <td className="px-lg py-md">
                      <span className={`inline-flex items-center gap-1 text-label-sm font-bold ${school.planColor}`}>
                        {school.planIcon && <span className="material-symbols-outlined text-[14px] icon-filled">{school.planIcon}</span>}
                        {school.plan}
                      </span>
                    </td>
                    <td className="px-lg py-md">
                      <span className={`${school.statusColor} px-sm py-1 rounded-full text-label-sm font-bold`}>{school.status}</span>
                    </td>
                    <td className="px-lg py-md text-right">
                      <div className="flex justify-end gap-xs">
                        <button className="p-2 text-secondary hover:text-primary hover:bg-surface-variant rounded-lg" title="Edit">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="p-2 text-secondary hover:text-error hover:bg-error-container/20 rounded-lg" title="Suspend">
                          <span className="material-symbols-outlined text-[20px]">block</span>
                        </button>
                        <button className="px-sm py-1 bg-secondary-container text-on-secondary-container rounded text-label-sm font-bold hover:bg-secondary-fixed transition-colors">
                          Login As Admin
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-md bg-surface-container-low flex justify-between items-center px-lg">
            <p className="text-label-sm text-secondary">Showing 1–5 of 1,482 schools</p>
            <div className="flex items-center gap-xs">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-variant">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              {[1, 2, 3].map((n) => (
                <button key={n} className={`w-8 h-8 flex items-center justify-center rounded text-label-sm ${n === 1 ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-variant'}`}>{n}</button>
              ))}
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-variant">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bottom row: Subscription Metrics + Renewals */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Subscription Metrics */}
          <div className="lg:col-span-5 tonal-card border border-outline-variant rounded-xl p-lg shadow-sm">
            <h3 className="text-title-md font-bold text-on-surface mb-lg">Subscription Metrics</h3>
            <div className="space-y-md">
              {[
                { label: 'Enterprise MRR', value: 'KES 2.4M', change: '↑ 5.2%', color: 'bg-primary' },
                { label: 'Premium MRR', value: 'KES 1.2M', change: '↑ 12.0%', color: 'bg-tertiary' },
                { label: 'Standard MRR', value: 'KES 0.6M', change: '↓ 2.1%', color: 'bg-secondary' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between p-md bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-md">
                    <div className={`w-2 h-8 ${m.color} rounded-full`}></div>
                    <div>
                      <p className="text-label-sm text-secondary">{m.label}</p>
                      <p className="text-title-md font-bold">{m.value}</p>
                    </div>
                  </div>
                  <span className={`font-bold text-label-md ${m.change.startsWith('↑') ? 'text-primary' : 'text-error'}`}>{m.change}</span>
                </div>
              ))}
            </div>
            <div className="mt-lg pt-lg border-t border-outline-variant">
              <div className="flex justify-between items-center mb-sm">
                <p className="text-label-md font-bold">Platform Churn Rate</p>
                <p className="text-label-md font-bold">1.4%</p>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-error h-2 rounded-full" style={{ width: '1.4%' }}></div>
              </div>
            </div>
          </div>

          {/* Upcoming Renewals */}
          <div className="lg:col-span-7 tonal-card border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold text-on-surface">Upcoming Renewals (Next 30 Days)</h3>
              <a className="text-primary text-label-md font-bold hover:underline" href="#">View All</a>
            </div>
            <div className="flex-1 divide-y divide-outline-variant">
              {[
                { name: 'Greenwood Academy', plan: 'Enterprise', days: '3 days', amount: 'KES 28,000', urgent: true },
                { name: 'Riverside School', plan: 'Premium', days: '8 days', amount: 'KES 15,000', urgent: false },
                { name: 'Sunrise Academy', plan: 'Standard', days: '12 days', amount: 'KES 8,500', urgent: false },
                { name: 'Kiserian Primary', plan: 'Enterprise', days: '18 days', amount: 'KES 28,000', urgent: false },
              ].map((r) => (
                <div key={r.name} className="px-lg py-md flex items-center justify-between hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary">school</span>
                    </div>
                    <div>
                      <p className="text-label-md font-bold">{r.name}</p>
                      <p className="text-label-sm text-secondary">{r.plan} · Renews in {r.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <span className="text-label-md font-bold">{r.amount}</span>
                    {r.urgent ? (
                      <span className="text-label-sm font-bold text-error bg-error-container px-sm py-xs rounded-full">Urgent</span>
                    ) : (
                      <button className="text-label-sm font-bold text-primary bg-primary/10 px-sm py-xs rounded-full hover:bg-primary/20 transition-colors">Remind</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
