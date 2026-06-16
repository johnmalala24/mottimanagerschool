'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/transport' },
  { label: 'Vehicles', icon: 'directions_bus', href: '/transport/vehicles' },
  { label: 'Routes', icon: 'route', href: '/transport/routes' },
  { label: 'Drivers', icon: 'person', href: '/transport/drivers' },
  { label: 'Student Allocation', icon: 'groups', href: '/transport/allocation' },
  { label: 'Transport Fees', icon: 'payments', href: '/transport/fees' },
  { label: 'Route Reports', icon: 'bar_chart', href: '/transport/reports' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/transport/settings' },
  { label: 'Support', icon: 'help', href: '/transport/support' },
]

const vehicles = [
  { plate: 'KCA 123B', type: 'Bus', capacity: 45, allocated: 42, driver: 'John Mwangi', driverPhone: '+254712000001', route: 'Route A — Westlands', status: 'Active', lastService: 'Jun 1, 2024', nextService: 'Sep 1, 2024' },
  { plate: 'KCB 456C', type: 'Bus', capacity: 45, allocated: 38, driver: 'Peter Odhiambo', driverPhone: '+254712000002', route: 'Route B — Eastlands', status: 'Active', lastService: 'May 28, 2024', nextService: 'Aug 28, 2024' },
  { plate: 'KCC 789D', type: 'Minibus', capacity: 25, allocated: 25, driver: 'James Kamau', driverPhone: '+254712000003', route: 'Route C — Ngong Rd', status: 'Full', lastService: 'Jun 5, 2024', nextService: 'Sep 5, 2024' },
  { plate: 'KCD 012E', type: 'Bus', capacity: 45, allocated: 0, driver: 'N/A', driverPhone: '', route: 'Unassigned', status: 'Maintenance', lastService: 'Jun 10, 2024', nextService: 'Jun 25, 2024' },
]

const routes = [
  { name: 'Route A', area: 'Westlands → Parklands → School', students: 42, stops: 8, morning: '6:30 AM', afternoon: '4:00 PM', vehicle: 'KCA 123B', driver: 'John Mwangi', fee: 3000 },
  { name: 'Route B', area: 'Eastlands → Umoja → School', students: 38, stops: 6, morning: '6:45 AM', afternoon: '4:15 PM', vehicle: 'KCB 456C', driver: 'Peter Odhiambo', fee: 3000 },
  { name: 'Route C', area: 'Ngong Rd → Lavington → School', students: 25, stops: 5, morning: '6:50 AM', afternoon: '4:20 PM', vehicle: 'KCC 789D', driver: 'James Kamau', fee: 3500 },
]

const allocatedStudents = [
  { adm: 'GW-4A-001', name: 'Amina Odhiambo', grade: 'Grade 4A', route: 'Route A', stop: 'Parklands Stage', feeStatus: 'Paid', parent: 'Mrs. Odhiambo' },
  { adm: 'GW-4A-002', name: 'Kelvin Mwai', grade: 'Grade 4A', route: 'Route B', stop: 'Umoja Stage', feeStatus: 'Paid', parent: 'Mr. Mwai' },
  { adm: 'GW-6B-001', name: 'Brian Otieno', grade: 'Grade 6B', route: 'Route A', stop: 'Westlands', feeStatus: 'Overdue', parent: 'Mr. Otieno' },
  { adm: 'GW-1A-001', name: 'Sarah Atieno', grade: 'Grade 1A', route: 'Route C', stop: 'Lavington', feeStatus: 'Paid', parent: 'Ms. Atieno' },
]

const TABS = ['Dashboard', 'Fleet', 'Routes', 'Student Allocation', 'Transport Fees']

export default function TransportPage() {
  const [tab, setTab] = useState('Dashboard')

  const statusColor = (s: string) => s === 'Active' ? 'bg-primary/10 text-primary' : s === 'Full' ? 'bg-yellow-100 text-yellow-700' : 'bg-error/10 text-error'

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Transport Portal" navItems={navItems} bottomItems={bottomItems} userName="Mr. David Kimani" userRole="Transport Manager" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Transport Management</h1>
            <p className="text-body-md text-secondary">Greenwood Academy · Fleet & Route Overview</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
              <span className="material-symbols-outlined text-[18px]">download</span> Export
            </button>
            <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">add</span> Add Vehicle
            </button>
          </div>
        </div>

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
                  { label: 'Total Vehicles', value: '4', sub: '3 active', icon: 'directions_bus', bc: 'text-secondary bg-surface-container', badge: 'Fleet' },
                  { label: 'Students Transported', value: '105', sub: 'Daily', icon: 'groups', bc: 'text-tertiary bg-tertiary/10', badge: 'Daily' },
                  { label: 'Active Routes', value: '3', sub: '6–8 stops each', icon: 'route', bc: 'text-primary bg-primary/10', badge: 'Active' },
                  { label: 'Maintenance Due', value: '1', sub: 'KCD 012E', icon: 'build', bc: 'text-error bg-error/10', badge: 'Urgent' },
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

              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="p-md border-b border-outline-variant">
                  <h3 className="text-title-md font-bold">Fleet Overview</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface-container-low">
                      <tr>{['Vehicle', 'Type', 'Route', 'Driver', 'Occupancy', 'Last Service', 'Status'].map(h => (
                        <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody>
                      {vehicles.map(v => (
                        <tr key={v.plate} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                          <td className="px-md py-md">
                            <div className="flex items-center gap-sm">
                              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', v.status === 'Maintenance' ? 'bg-error/10' : 'bg-primary/10')}>
                                <span className={clsx('material-symbols-outlined text-[18px]', v.status === 'Maintenance' ? 'text-error' : 'text-primary')}>directions_bus</span>
                              </div>
                              <span className="text-label-md font-bold font-mono">{v.plate}</span>
                            </div>
                          </td>
                          <td className="px-md py-md text-body-md text-secondary">{v.type}</td>
                          <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{v.route}</td>
                          <td className="px-md py-md">
                            <p className="text-label-md font-semibold whitespace-nowrap">{v.driver}</p>
                            {v.driverPhone && <p className="text-label-sm text-secondary">{v.driverPhone}</p>}
                          </td>
                          <td className="px-md py-md">
                            <div className="flex items-center gap-sm">
                              <div className="w-16 h-2 bg-surface-container rounded-full">
                                <div className={clsx('h-2 rounded-full', v.allocated / v.capacity >= 0.9 ? 'bg-error' : 'bg-primary')} style={{ width: `${(v.allocated / v.capacity) * 100}%` }} />
                              </div>
                              <span className="text-label-sm font-semibold whitespace-nowrap">{v.allocated}/{v.capacity}</span>
                            </div>
                          </td>
                          <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{v.lastService}</td>
                          <td className="px-md py-md">
                            <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', statusColor(v.status))}>{v.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                {routes.map(r => (
                  <div key={r.name} className="tonal-card rounded-xl p-lg">
                    <div className="flex items-start justify-between mb-md">
                      <div className="w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined icon-filled">route</span>
                      </div>
                      <span className="text-label-sm bg-surface-container px-sm py-xs rounded-full text-secondary font-semibold">{r.students} students</span>
                    </div>
                    <h3 className="text-label-md font-bold">{r.name}</h3>
                    <p className="text-label-sm text-secondary mb-md">{r.area}</p>
                    <div className="flex flex-col gap-xs text-label-sm text-secondary">
                      <div className="flex justify-between"><span>🚌 Morning</span><span className="font-semibold">{r.morning}</span></div>
                      <div className="flex justify-between"><span>🏫 Afternoon</span><span className="font-semibold">{r.afternoon}</span></div>
                      <div className="flex justify-between"><span>Stops</span><span className="font-semibold">{r.stops}</span></div>
                      <div className="flex justify-between"><span>Vehicle</span><span className="font-semibold font-mono">{r.vehicle}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FLEET ── */}
          {tab === 'Fleet' && (
            <div className="flex flex-col gap-md">
              {vehicles.map(v => (
                <div key={v.plate} className="tonal-card rounded-xl p-lg">
                  <div className="flex items-start justify-between gap-md mb-md">
                    <div className="flex items-center gap-md">
                      <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', v.status === 'Maintenance' ? 'bg-error/10' : 'bg-primary/10')}>
                        <span className={clsx('material-symbols-outlined icon-filled', v.status === 'Maintenance' ? 'text-error' : 'text-primary')}>directions_bus</span>
                      </div>
                      <div>
                        <h3 className="text-title-md font-bold font-mono">{v.plate}</h3>
                        <p className="text-body-md text-secondary">{v.type} · {v.route}</p>
                      </div>
                    </div>
                    <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap flex-shrink-0', statusColor(v.status))}>{v.status}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-md text-label-sm">
                    <div className="bg-surface-container-low rounded-lg p-sm">
                      <p className="text-secondary">Driver</p>
                      <p className="font-semibold">{v.driver || 'Unassigned'}</p>
                      {v.driverPhone && <p className="text-secondary">{v.driverPhone}</p>}
                    </div>
                    <div className="bg-surface-container-low rounded-lg p-sm">
                      <p className="text-secondary">Occupancy</p>
                      <p className="font-bold">{v.allocated}/{v.capacity}</p>
                      <div className="h-1 bg-surface-container rounded-full mt-xs">
                        <div className={clsx('h-1 rounded-full', v.allocated / v.capacity >= 0.9 ? 'bg-error' : 'bg-primary')} style={{ width: `${(v.allocated / v.capacity) * 100}%` }} />
                      </div>
                    </div>
                    <div className="bg-surface-container-low rounded-lg p-sm">
                      <p className="text-secondary">Last Service</p>
                      <p className="font-semibold">{v.lastService}</p>
                    </div>
                    <div className={clsx('rounded-lg p-sm', v.status === 'Maintenance' ? 'bg-error/10' : 'bg-surface-container-low')}>
                      <p className="text-secondary">Next Service</p>
                      <p className={clsx('font-semibold', v.status === 'Maintenance' && 'text-error')}>{v.nextService}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ROUTES ── */}
          {tab === 'Routes' && (
            <div className="flex flex-col gap-md">
              <div className="flex justify-end">
                <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px]">add</span> Add Route
                </button>
              </div>
              {routes.map(r => (
                <div key={r.name} className="tonal-card rounded-xl p-lg">
                  <div className="flex items-start justify-between mb-md">
                    <div>
                      <h3 className="text-title-md font-bold">{r.name}</h3>
                      <p className="text-body-md text-secondary">{r.area}</p>
                    </div>
                    <div className="flex gap-sm">
                      <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">edit</span></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-md text-center">
                    {[
                      { label: 'Students', value: String(r.students), color: 'text-primary' },
                      { label: 'Stops', value: String(r.stops), color: 'text-on-surface' },
                      { label: 'Morning Pickup', value: r.morning, color: 'text-tertiary' },
                      { label: 'Afternoon Return', value: r.afternoon, color: 'text-tertiary' },
                      { label: 'Term Fee', value: `KES ${r.fee.toLocaleString()}`, color: 'text-primary' },
                    ].map(s => (
                      <div key={s.label} className="bg-surface-container-low rounded-xl p-md">
                        <p className={clsx('text-label-md font-bold', s.color)}>{s.value}</p>
                        <p className="text-label-sm text-secondary">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-md flex items-center gap-sm text-label-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                    <span>Vehicle: <span className="font-semibold font-mono">{r.vehicle}</span></span>
                    <span className="material-symbols-outlined text-[18px] ml-md">person</span>
                    <span>Driver: <span className="font-semibold">{r.driver}</span></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── STUDENT ALLOCATION ── */}
          {tab === 'Student Allocation' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm w-72">
                  <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                  <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search student..." />
                </div>
                <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px]">person_add</span> Allocate Student
                </button>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Adm No.', 'Student', 'Class', 'Route', 'Stop', 'Parent', 'Fee Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {allocatedStudents.map(s => (
                      <tr key={s.adm} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md text-label-sm font-mono text-secondary">{s.adm}</td>
                        <td className="px-md py-md text-label-md font-semibold whitespace-nowrap">{s.name}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.grade}</td>
                        <td className="px-md py-md"><span className="text-label-sm font-bold px-sm py-xs rounded-full bg-primary/10 text-primary">{s.route}</span></td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.stop}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.parent}</td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', s.feeStatus === 'Paid' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error')}>{s.feeStatus}</span>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs">
                            <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">edit</span></button>
                            <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-error">person_remove</span></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TRANSPORT FEES ── */}
          {tab === 'Transport Fees' && (
            <div className="flex flex-col gap-lg">
              <div className="grid grid-cols-3 gap-md">
                {[
                  { label: 'Total Transport Fees (Term 2)', value: 'KES 315,000', color: 'text-primary' },
                  { label: 'Collected', value: 'KES 270,000', color: 'text-primary' },
                  { label: 'Outstanding', value: 'KES 45,000', color: 'text-error' },
                ].map(s => (
                  <div key={s.label} className="tonal-card rounded-xl p-lg text-center">
                    <p className={clsx('text-headline-sm font-bold', s.color)}>{s.value}</p>
                    <p className="text-label-md text-secondary mt-xs">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="p-md border-b border-outline-variant flex items-center justify-between">
                  <h3 className="text-title-md font-bold">Fee Collection by Route</h3>
                  <button className="text-label-md text-primary font-semibold hover:underline">Send Reminders to All Defaulters</button>
                </div>
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Route', 'Students', 'Fee/Term', 'Total Expected', 'Collected', 'Outstanding', 'Status'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {routes.map(r => {
                      const expected = r.students * r.fee
                      const collected = Math.round(expected * 0.85)
                      const outstanding = expected - collected
                      return (
                        <tr key={r.name} className="border-t border-outline-variant hover:bg-surface-container-low">
                          <td className="px-md py-md text-label-md font-bold">{r.name}</td>
                          <td className="px-md py-md text-body-md text-center">{r.students}</td>
                          <td className="px-md py-md text-body-md">KES {r.fee.toLocaleString()}</td>
                          <td className="px-md py-md text-label-md font-semibold">KES {expected.toLocaleString()}</td>
                          <td className="px-md py-md text-label-md font-bold text-primary">KES {collected.toLocaleString()}</td>
                          <td className="px-md py-md text-label-md font-bold text-error">KES {outstanding.toLocaleString()}</td>
                          <td className="px-md py-md">
                            <div className="w-16 h-2 bg-surface-container rounded-full">
                              <div className="h-2 bg-primary rounded-full" style={{ width: `${(collected / expected) * 100}%` }} />
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
