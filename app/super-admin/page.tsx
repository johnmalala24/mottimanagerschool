'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/super-admin' },
  { label: 'Schools', icon: 'school', href: '/super-admin/schools' },
  { label: 'Subscriptions', icon: 'subscriptions', href: '/super-admin/subscriptions' },
  { label: 'Billing', icon: 'payments', href: '/super-admin/billing' },
  { label: 'Features', icon: 'tune', href: '/super-admin/features' },
  { label: 'Support Tickets', icon: 'support_agent', href: '/super-admin/tickets' },
  { label: 'Audit Logs', icon: 'receipt_long', href: '/super-admin/audit' },
  { label: 'Analytics', icon: 'analytics', href: '/super-admin/analytics' },
  { label: 'Database', icon: 'storage', href: '/super-admin/database' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/super-admin/settings' },
  { label: 'Support', icon: 'help', href: '/super-admin/support' },
]

const schools = [
  { id: 'GW', name: 'Greenwood Academy', regId: 'ED-9283-K', location: 'Nairobi, KE', type: 'Primary', plan: 'Enterprise', status: 'Active', students: 1284, cbe: true, sms: true, transport: true, admin: 'Samuel Mwangi', phone: '+254712345678', renewal: '2024-08-01' },
  { id: 'LV', name: 'Lakeview Primary', regId: 'ED-1022-K', location: 'Kisumu, KE', type: 'Primary', plan: 'Standard', status: 'Pending', students: 420, cbe: false, sms: false, transport: false, admin: 'Jane Achieng', phone: '+254723456789', renewal: '2024-07-15' },
  { id: 'SM', name: "St. Mary's Boys", regId: 'ED-5561-K', location: 'Mombasa, KE', type: 'Secondary', plan: 'Premium', status: 'Suspended', students: 890, cbe: true, sms: true, transport: false, admin: 'Peter Njau', phone: '+254734567890', renewal: '2024-06-28' },
  { id: 'RP', name: 'Ridgepoint School', regId: 'ED-7732-K', location: 'Nakuru, KE', type: 'Mixed', plan: 'Premium', status: 'Active', students: 642, cbe: false, sms: true, transport: true, admin: 'Faith Kamau', phone: '+254745678901', renewal: '2024-09-10' },
  { id: 'KH', name: 'Kibera Hope Academy', regId: 'ED-4401-K', location: 'Nairobi, KE', type: 'Primary', plan: 'Standard', status: 'Active', students: 380, cbe: true, sms: false, transport: false, admin: 'Grace Otieno', phone: '+254756789012', renewal: '2024-10-01' },
]

const tickets = [
  { id: 'TK-001', school: 'Greenwood Academy', subject: 'M-Pesa STK Push not triggering', priority: 'High', status: 'Open', created: '2024-06-15' },
  { id: 'TK-002', school: 'Lakeview Primary', subject: 'Cannot upload school logo', priority: 'Medium', status: 'In Progress', created: '2024-06-14' },
  { id: 'TK-003', school: "St. Mary's Boys", subject: 'Subscription renewal failed', priority: 'High', status: 'Resolved', created: '2024-06-12' },
  { id: 'TK-004', school: 'Ridgepoint School', subject: 'CBE rubric missing strands', priority: 'Low', status: 'Open', created: '2024-06-11' },
]

const auditLogs = [
  { action: 'School suspended', actor: 'Super Admin', target: "St. Mary's Boys", time: '2 hours ago', icon: 'block' },
  { action: 'Plan upgraded: Standard → Premium', actor: 'Super Admin', target: 'Ridgepoint School', time: '5 hours ago', icon: 'upgrade' },
  { action: 'Feature toggle: CBE enabled', actor: 'Super Admin', target: 'Kibera Hope Academy', time: 'Yesterday', icon: 'tune' },
  { action: 'New school registered', actor: 'System', target: 'Sunrise Academy', time: 'Yesterday', icon: 'add_business' },
  { action: 'Subscription payment received KES 25,000', actor: 'Safaricom Gateway', target: 'Greenwood Academy', time: '2 days ago', icon: 'payments' },
  { action: 'Admin password reset', actor: 'Super Admin', target: 'Lakeview Primary', time: '3 days ago', icon: 'lock_reset' },
]

const TABS = ['Dashboard', 'Schools', 'Onboarding', 'Features', 'Support', 'Audit Logs']

export default function SuperAdminPage() {
  const [tab, setTab] = useState('Dashboard')
  const [step, setStep] = useState(1)
  const [features, setFeatures] = useState(schools.map(s => ({ cbe: s.cbe, sms: s.sms, transport: s.transport, library: true })))

  const toggle = (si: number, key: 'cbe' | 'sms' | 'transport' | 'library') => {
    setFeatures(f => f.map((row, i) => i === si ? { ...row, [key]: !row[key] } : row))
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Platform Owner Portal" navItems={navItems} bottomItems={bottomItems} userName="Admin User" userRole="Super Administrator" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Super Admin Dashboard</h1>
            <p className="text-body-md text-secondary">Global overview of MottiManager platform performance.</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">download</span> Export Data
            </button>
            <button onClick={() => { setTab('Onboarding'); setStep(1) }} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[18px]">add</span> Register New School
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-outline-variant bg-surface-container-lowest px-lg flex gap-xs overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={clsx('py-md px-md text-label-md font-semibold border-b-2 whitespace-nowrap transition-colors', tab === t ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface')}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-lg flex-1">

          {/* ── DASHBOARD ── */}
          {tab === 'Dashboard' && (
            <div className="flex flex-col gap-lg">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
                {[
                  { label: 'Total Schools', value: '1,482', sub: '+12% this month', icon: 'school', badge: '+12%', bc: 'text-primary bg-primary/10' },
                  { label: 'Active Schools', value: '1,240', sub: '242 suspended', icon: 'check_circle', badge: 'Active', bc: 'text-tertiary bg-tertiary/10' },
                  { label: 'Revenue (MTD)', value: 'KES 4.2M', sub: '↑ 18% vs last month', icon: 'payments', badge: 'KES', bc: 'text-primary bg-primary/10' },
                  { label: 'System Health', value: '99.9%', sub: 'Avg Response: 120ms', icon: 'monitor_heart', badge: '● Healthy', bc: 'text-primary bg-primary/10' },
                ].map(s => (
                  <div key={s.label} className="tonal-card rounded-xl p-md">
                    <div className="flex items-start justify-between mb-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">{s.icon}</span>
                      </div>
                      <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', s.bc)}>{s.badge}</span>
                    </div>
                    <p className="text-body-sm text-secondary mb-xs">{s.label}</p>
                    <p className="text-headline-sm font-bold text-on-surface">{s.value}</p>
                    <p className="text-label-sm text-secondary mt-xs">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Subscription Revenue by Plan</h3>
                  {[
                    { plan: 'Enterprise', count: 48, revenue: 'KES 2.4M', pct: 76 },
                    { plan: 'Premium', count: 312, revenue: 'KES 1.2M', pct: 50 },
                    { plan: 'Standard', count: 880, revenue: 'KES 0.6M', pct: 25 },
                  ].map(p => (
                    <div key={p.plan} className="mb-md">
                      <div className="flex justify-between text-label-md mb-xs">
                        <span className="font-semibold">{p.plan} <span className="text-secondary font-normal">({p.count} schools)</span></span>
                        <span className="font-bold text-primary">{p.revenue}</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full">
                        <div className="h-2 bg-primary rounded-full transition-all" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="mt-md pt-md border-t border-outline-variant flex justify-between text-label-md">
                    <span className="text-secondary">Churn Rate (MTD)</span>
                    <span className="font-bold text-error">1.4%</span>
                  </div>
                </div>

                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Upcoming Renewals (30 days)</h3>
                  {schools.map(s => (
                    <div key={s.id} className="flex items-center justify-between py-sm border-b border-outline-variant last:border-0">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm">{s.id}</div>
                        <div>
                          <p className="text-label-md font-semibold">{s.name}</p>
                          <p className="text-label-sm text-secondary">{s.plan} · Renews {s.renewal}</p>
                        </div>
                      </div>
                      <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', s.status === 'Active' ? 'bg-primary/10 text-primary' : s.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-error/10 text-error')}>
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Recent Platform Activity</h3>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {auditLogs.map((l, i) => (
                    <div key={i} className="flex items-center gap-md py-sm">
                      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-secondary text-[18px]">{l.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-label-md font-semibold">{l.action}</p>
                        <p className="text-label-sm text-secondary">By: {l.actor} · {l.target}</p>
                      </div>
                      <span className="text-label-sm text-secondary whitespace-nowrap">{l.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SCHOOLS ── */}
          {tab === 'Schools' && (
            <div className="tonal-card rounded-xl overflow-hidden">
              <div className="p-md flex items-center justify-between border-b border-outline-variant">
                <h3 className="text-title-md font-bold">Manage Schools</h3>
                <div className="flex gap-sm">
                  <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm">
                    <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                    <input className="bg-transparent text-body-md outline-none w-40 placeholder:text-secondary" placeholder="Search schools..." />
                  </div>
                  <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-surface-container-lowest outline-none">
                    <option>All Status</option><option>Active</option><option>Pending</option><option>Suspended</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['School', 'Location', 'Type', 'Plan', 'Students', 'Features', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {schools.map(s => (
                      <tr key={s.id} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm flex-shrink-0">{s.id}</div>
                            <div>
                              <p className="text-label-md font-semibold whitespace-nowrap">{s.name}</p>
                              <p className="text-label-sm text-secondary">{s.admin}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.location}</td>
                        <td className="px-md py-md text-label-sm whitespace-nowrap">{s.type}</td>
                        <td className="px-md py-md"><span className="text-label-sm font-bold px-sm py-xs rounded-full bg-tertiary/10 text-tertiary whitespace-nowrap">{s.plan}</span></td>
                        <td className="px-md py-md text-body-md font-semibold">{s.students.toLocaleString()}</td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs">
                            {s.cbe && <span className="text-label-sm px-xs py-xs rounded bg-primary/10 text-primary font-bold">CBE</span>}
                            {s.sms && <span className="text-label-sm px-xs py-xs rounded bg-tertiary/10 text-tertiary font-bold">SMS</span>}
                            {s.transport && <span className="text-label-sm px-xs py-xs rounded bg-secondary/10 text-secondary font-bold">Bus</span>}
                          </div>
                        </td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', s.status === 'Active' ? 'bg-primary/10 text-primary' : s.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-error/10 text-error')}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs items-center">
                            <button className="p-xs hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined text-[18px] text-secondary">edit</span></button>
                            <button className="p-xs hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined text-[18px] text-secondary">block</span></button>
                            <button className="text-label-sm bg-primary text-on-primary px-sm py-xs rounded font-semibold whitespace-nowrap">Login As Admin</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ONBOARDING ── */}
          {tab === 'Onboarding' && (
            <div className="max-w-[42rem] mx-auto">
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="bg-primary text-on-primary p-lg">
                  <h2 className="text-title-lg font-bold">School Onboarding Wizard</h2>
                  <p className="text-body-md opacity-80 mb-lg">Register a new school in 4 simple steps</p>
                  <div className="flex gap-xs items-center">
                    {['Registration', 'Setup', 'Branding', 'Ready'].map((s, i) => (
                      <div key={s} className="flex items-center gap-xs">
                        <div className={clsx('w-7 h-7 rounded-full flex items-center justify-center text-label-sm font-bold transition-all', i + 1 <= step ? 'bg-white text-primary' : 'bg-white/25 text-white')}>{i + 1}</div>
                        <span className="text-label-sm hidden sm:block opacity-90">{s}</span>
                        {i < 3 && <span className="material-symbols-outlined text-[16px] opacity-40 mx-xs">chevron_right</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-lg">
                  {step === 1 && (
                    <div className="flex flex-col gap-md">
                      <h3 className="text-title-md font-bold">Step 1: School Registration</h3>
                      {[['School Name', 'text', 'e.g. Sunrise Academy'], ['Location (City, County)', 'text', 'Nairobi, Nairobi County'], ['Admin Full Name', 'text', 'e.g. John Kamau'], ['Admin Email', 'email', 'admin@school.ac.ke'], ['Admin Phone', 'tel', '+254700000000']].map(([label, type, ph]) => (
                        <div key={label as string}>
                          <label className="text-label-md font-semibold text-on-surface block mb-xs">{label}</label>
                          <input type={type as string} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary transition-colors" placeholder={ph as string} />
                        </div>
                      ))}
                      <div>
                        <label className="text-label-md font-semibold text-on-surface block mb-xs">School Type</label>
                        <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary bg-white">
                          <option>Primary</option><option>Secondary</option><option>Mixed (Primary + Secondary)</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col gap-md">
                      <h3 className="text-title-md font-bold">Step 2: System Setup</h3>
                      <div className="bg-surface-container-low rounded-xl p-md flex flex-col gap-md">
                        <p className="text-label-md font-bold text-secondary">Feature Toggles</p>
                        {[
                          { key: 'cbe', label: 'Enable CBE (Competency-Based Education)', desc: 'Enables EE/ME/AE/BE assessment rubrics, portfolios, and competency reports instead of marks.' },
                          { key: 'sms', label: 'Enable SMS Notifications', desc: 'Send fee reminders, attendance alerts, and exam results via SMS to parents.' },
                          { key: 'transport', label: 'Enable Transport Management', desc: 'Manage buses, routes, drivers, student allocation, and transport fees.' },
                        ].map(f => (
                          <label key={f.key} className="flex items-start gap-md cursor-pointer">
                            <input type="checkbox" defaultChecked={f.key === 'cbe'} className="mt-xs accent-primary w-4 h-4 flex-shrink-0" />
                            <div>
                              <p className="text-label-md font-semibold">{f.label}</p>
                              <p className="text-label-sm text-secondary">{f.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-xs">Academic Structure</label>
                        <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                          <option>CBC (Competency-Based Curriculum)</option><option>8-4-4</option><option>Mixed</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-md">
                        <div>
                          <label className="text-label-md font-semibold block mb-xs">Terms per Year</label>
                          <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                            <option>3 Terms</option><option>2 Semesters</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-label-md font-semibold block mb-xs">Subscription Plan</label>
                          <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                            <option>Standard</option><option>Premium</option><option>Enterprise</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="flex flex-col gap-md">
                      <h3 className="text-title-md font-bold">Step 3: Branding Setup</h3>
                      <div className="border-2 border-dashed border-outline-variant rounded-xl p-2xl text-center cursor-pointer hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-[48px] text-secondary">upload_file</span>
                        <p className="text-label-md font-semibold mt-sm">Upload School Logo</p>
                        <p className="text-label-sm text-secondary">PNG, JPG up to 2MB</p>
                        <button className="mt-md px-md py-sm bg-surface-container border border-outline-variant rounded-lg text-label-md">Browse Files</button>
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-sm">Theme Color</label>
                        <div className="flex gap-sm items-center">
                          {['#006b2c', '#00628d', '#7c3aed', '#dc2626', '#d97706', '#0891b2'].map(c => (
                            <button key={c} className="w-8 h-8 rounded-full border-2 border-white shadow hover:scale-110 transition-transform" style={{ background: c }} />
                          ))}
                          <input type="color" className="w-8 h-8 rounded-full cursor-pointer border border-outline-variant" defaultValue="#006b2c" />
                        </div>
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-xs">School Motto (optional)</label>
                        <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. Excellence Through Integrity" />
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-xs">M-Pesa Paybill / Till Number</label>
                        <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. 522522" />
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="flex flex-col items-center gap-md text-center py-xl">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary icon-filled" style={{ fontSize: '40px' }}>check_circle</span>
                      </div>
                      <h3 className="text-title-lg font-bold text-primary">School Dashboard Ready!</h3>
                      <p className="text-body-md text-secondary">The school has been registered and their dashboard is now live. Admin credentials have been sent via email and SMS.</p>
                      <div className="w-full bg-surface-container-low rounded-xl p-md text-left">
                        <p className="text-label-md font-bold mb-sm">Auto-generated for the school:</p>
                        {['School admin dashboard & login portal', 'Admin account with temporary password (sent via SMS)', 'Default class structure (editable by admin)', 'Fee template per class (editable)', 'Academic year & terms auto-setup', 'M-Pesa Paybill linked & tested', 'Welcome email with setup guide sent'].map(item => (
                          <div key={item} className="flex items-center gap-sm py-xs">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>check</span>
                            <span className="text-body-md">{item}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setTab('Schools')} className="px-xl py-sm bg-primary text-on-primary rounded-lg text-label-md font-bold hover:opacity-90">View All Schools</button>
                    </div>
                  )}

                  {step < 4 && (
                    <div className="flex justify-between mt-lg pt-md border-t border-outline-variant">
                      <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-md py-sm border border-outline-variant rounded-lg text-label-md disabled:opacity-40 hover:bg-surface-container transition-colors">← Back</button>
                      <button onClick={() => setStep(Math.min(4, step + 1))} className="px-lg py-sm bg-primary text-on-primary rounded-lg text-label-md font-bold hover:opacity-90 transition-opacity">
                        {step === 3 ? 'Register School →' : 'Next →'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── FEATURES ── */}
          {tab === 'Features' && (
            <div className="flex flex-col gap-lg">
              <div className="bg-tertiary/10 border border-tertiary/20 rounded-xl p-md flex items-start gap-sm">
                <span className="material-symbols-outlined text-tertiary">info</span>
                <p className="text-body-md text-tertiary">Feature toggles take effect immediately. Hidden features disappear from menus and workflows for that school.</p>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['School', 'CBE', 'SMS Alerts', 'Transport', 'Library', 'Plan', 'Action'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {schools.map((s, si) => (
                      <tr key={s.id} className="border-t border-outline-variant">
                        <td className="px-md py-md">
                          <p className="text-label-md font-semibold">{s.name}</p>
                          <p className="text-label-sm text-secondary">{s.location}</p>
                        </td>
                        {(['cbe', 'sms', 'transport', 'library'] as const).map(key => (
                          <td key={key} className="px-md py-md">
                            <button onClick={() => toggle(si, key)} className={clsx('relative inline-flex items-center w-10 h-5 rounded-full transition-colors', features[si][key] ? 'bg-primary' : 'bg-outline-variant')}>
                              <span className={clsx('absolute w-4 h-4 bg-white rounded-full shadow transition-transform', features[si][key] ? 'translate-x-5' : 'translate-x-0.5')} />
                            </button>
                          </td>
                        ))}
                        <td className="px-md py-md"><span className="text-label-sm font-bold px-sm py-xs rounded-full bg-tertiary/10 text-tertiary">{s.plan}</span></td>
                        <td className="px-md py-md"><button className="text-label-sm text-primary font-semibold hover:underline">Saved ✓</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SUPPORT ── */}
          {tab === 'Support' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <h3 className="text-title-md font-bold">Support Tickets</h3>
                <span className="text-label-sm bg-error/10 text-error font-bold px-sm py-xs rounded-full">3 Open</span>
              </div>
              {tickets.map(t => (
                <div key={t.id} className="tonal-card rounded-xl p-md flex items-center justify-between gap-md">
                  <div className="flex items-center gap-md">
                    <div className={clsx('w-1.5 h-12 rounded-full flex-shrink-0', t.priority === 'High' ? 'bg-error' : t.priority === 'Medium' ? 'bg-yellow-400' : 'bg-outline')} />
                    <div>
                      <div className="flex items-center gap-sm mb-xs">
                        <span className="text-label-sm text-secondary font-mono">{t.id}</span>
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', t.priority === 'High' ? 'bg-error/10 text-error' : t.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-surface-container text-secondary')}>{t.priority}</span>
                      </div>
                      <p className="text-label-md font-semibold">{t.subject}</p>
                      <p className="text-label-sm text-secondary">{t.school} · Created {t.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-sm flex-shrink-0">
                    <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', t.status === 'Open' ? 'bg-error/10 text-error' : t.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-primary/10 text-primary')}>{t.status}</span>
                    <button className="text-label-sm bg-primary text-on-primary px-md py-sm rounded font-semibold">View</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── AUDIT LOGS ── */}
          {tab === 'Audit Logs' && (
            <div className="tonal-card rounded-xl overflow-hidden">
              <div className="p-md border-b border-outline-variant flex gap-md">
                <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm flex-1">
                  <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                  <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search audit logs..." />
                </div>
                <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-surface-container-lowest outline-none">
                  <option>All Actions</option><option>School Actions</option><option>Billing</option><option>Features</option>
                </select>
              </div>
              <div className="divide-y divide-outline-variant">
                {[...auditLogs, ...auditLogs].map((l, i) => (
                  <div key={i} className="flex items-center gap-md px-md py-md hover:bg-surface-container-low transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[18px]">{l.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-label-md font-semibold">{l.action}</p>
                      <p className="text-label-sm text-secondary">By: {l.actor} · Target: {l.target}</p>
                    </div>
                    <span className="text-label-sm text-secondary whitespace-nowrap">{l.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
