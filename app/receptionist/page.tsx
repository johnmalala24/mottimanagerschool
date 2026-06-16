'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/receptionist' },
  { label: 'Visitor Management', icon: 'badge', href: '/receptionist/visitors' },
  { label: 'Student Lookup', icon: 'person_search', href: '/receptionist/students' },
  { label: 'Parent Lookup', icon: 'family_restroom', href: '/receptionist/parents' },
  { label: 'Appointments', icon: 'event', href: '/receptionist/appointments' },
  { label: 'Check-In / Out', icon: 'login', href: '/receptionist/checkin' },
  { label: 'Communication', icon: 'message', href: '/receptionist/communication' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/receptionist/settings' },
  { label: 'Support', icon: 'help', href: '/receptionist/support' },
]

const visitors = [
  { name: 'John Kamau', id: 'V-2401', purpose: 'Parent Meeting — Grade 4A', time: '9:00 AM', status: 'Checked In', badge: '🟢', host: 'Ms. Grace Njeri' },
  { name: 'Mary Wanjiku', id: 'V-2402', purpose: 'Document Collection', time: '9:45 AM', status: 'Waiting', badge: '🟡', host: 'Admissions Office' },
  { name: 'Peter Odhiambo', id: 'V-2403', purpose: 'Admissions Inquiry', time: '10:30 AM', status: 'Checked In', badge: '🟢', host: 'Ms. Patricia Kamau' },
  { name: 'Grace Mutua', id: 'V-2404', purpose: 'Fee Payment', time: '11:00 AM', status: 'Checked Out', badge: '⚫', host: 'Finance Office' },
]

const appointments = [
  { guest: 'Mr. Njoroge', host: 'Principal Mwangi', time: '2:00 PM', type: 'Parent-Teacher Meeting', status: 'Upcoming' },
  { guest: 'Dr. Achieng', host: 'Nurse Wanjiku', time: '3:00 PM', type: 'Health Checkup', status: 'Upcoming' },
  { guest: 'EdTech Team (3 visitors)', host: 'Admin Office', time: '4:00 PM', type: 'Vendor Meeting', status: 'Upcoming' },
]

const lookupStudents = [
  { adm: 'GW-4A-001', name: 'Amina Odhiambo', grade: 'Grade 4A', parent: 'Mrs. Odhiambo', phone: '+254712345678', status: 'Present' },
  { adm: 'GW-4A-002', name: 'Kelvin Mwai', grade: 'Grade 4A', parent: 'Mr. Mwai', phone: '+254723456789', status: 'Present' },
  { adm: 'GW-6B-001', name: 'Brian Otieno', grade: 'Grade 6B', parent: 'Mr. Otieno', phone: '+254734567890', status: 'Absent' },
]

const TABS = ['Dashboard', 'Visitor Log', 'Student Lookup', 'Appointments', 'Check-In / Out']

export default function ReceptionistPage() {
  const [tab, setTab] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [checkedIn, setCheckedIn] = useState(false)

  const filtered = lookupStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.adm.includes(search))

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Receptionist Portal" navItems={navItems} bottomItems={bottomItems} userName="Ms. Jane Adhiambo" userRole="Front Desk Officer" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Front Office</h1>
            <p className="text-body-md text-secondary">Greenwood Academy · Monday, June 16, 2024</p>
          </div>
          <div className="flex gap-sm">
            <button onClick={() => setTab('Check-In / Out')} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">login</span> Log Visitor
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
                  { label: 'Visitors Today', value: '12', sub: '3 still on campus', icon: 'badge', bc: 'text-secondary bg-surface-container', badge: 'Today' },
                  { label: 'Students Present', value: '1,210', sub: 'of 1,284 enrolled', icon: 'groups', bc: 'text-primary bg-primary/10', badge: '94.2%' },
                  { label: 'Appointments', value: '3', sub: 'Remaining today', icon: 'event', bc: 'text-tertiary bg-tertiary/10', badge: 'Today' },
                  { label: 'Late Check-Ins', value: '8', sub: 'This morning', icon: 'schedule', bc: 'text-yellow-700 bg-yellow-100', badge: 'Late' },
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

              {/* Quick Lookup */}
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Quick Student / Parent Lookup</h3>
                <div className="flex gap-sm">
                  <div className="flex-1 flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm">
                    <span className="material-symbols-outlined text-secondary">person_search</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-body-md outline-none flex-1 placeholder:text-secondary" placeholder="Search by name, admission number, or parent..." />
                  </div>
                  <button className="bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">Search</button>
                </div>
                {search && (
                  <div className="mt-md flex flex-col divide-y divide-outline-variant border border-outline-variant rounded-xl overflow-hidden">
                    {filtered.length > 0 ? filtered.map(s => (
                      <div key={s.adm} className="flex items-center justify-between px-md py-md bg-white hover:bg-surface-container-low transition-colors">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                            {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-label-md font-semibold">{s.name}</p>
                            <p className="text-label-sm text-secondary">{s.adm} · {s.grade} · Parent: {s.parent}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-sm">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', s.status === 'Present' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error')}>{s.status}</span>
                          <a href={`tel:${s.phone}`} className="text-label-sm text-tertiary font-semibold hover:underline">{s.phone}</a>
                        </div>
                      </div>
                    )) : (
                      <div className="px-md py-md text-body-md text-secondary bg-white">No results found for "{search}"</div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Current Visitors on Campus</h3>
                  <div className="flex flex-col divide-y divide-outline-variant">
                    {visitors.filter(v => v.status !== 'Checked Out').map(v => (
                      <div key={v.id} className="py-sm flex items-start gap-sm">
                        <span className="text-[16px] mt-xs">{v.badge}</span>
                        <div className="flex-1">
                          <p className="text-label-md font-semibold">{v.name}</p>
                          <p className="text-label-sm text-secondary">{v.purpose}</p>
                          <p className="text-label-sm text-secondary">Host: {v.host} · {v.time}</p>
                        </div>
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', v.status === 'Checked In' ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-700')}>{v.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Today's Appointments</h3>
                  <div className="flex flex-col gap-sm">
                    {appointments.map((a, i) => (
                      <div key={i} className="flex items-start gap-sm p-sm bg-surface-container-low rounded-xl">
                        <div className="w-10 h-10 bg-tertiary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-tertiary">event</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-label-md font-semibold">{a.guest}</p>
                          <p className="text-label-sm text-secondary">Meets: {a.host}</p>
                          <p className="text-label-sm text-secondary">{a.type} · {a.time}</p>
                        </div>
                        <span className="text-label-sm bg-yellow-100 text-yellow-700 font-bold px-sm py-xs rounded-full whitespace-nowrap">{a.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── VISITOR LOG ── */}
          {tab === 'Visitor Log' && (
            <div className="tonal-card rounded-xl overflow-hidden">
              <div className="p-md border-b border-outline-variant flex items-center justify-between">
                <h3 className="text-title-md font-bold">Today's Visitor Log</h3>
                <button onClick={() => setTab('Check-In / Out')} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px]">add</span> New Visitor
                </button>
              </div>
              <table className="w-full">
                <thead className="bg-surface-container-low">
                  <tr>{['ID', 'Visitor Name', 'Purpose', 'Host', 'Time', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {visitors.map(v => (
                    <tr key={v.id} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="px-md py-md text-label-sm font-mono text-secondary">{v.id}</td>
                      <td className="px-md py-md text-label-md font-semibold whitespace-nowrap">{v.name}</td>
                      <td className="px-md py-md text-body-md text-secondary">{v.purpose}</td>
                      <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{v.host}</td>
                      <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{v.time}</td>
                      <td className="px-md py-md">
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', v.status === 'Checked In' ? 'bg-primary/10 text-primary' : v.status === 'Waiting' ? 'bg-yellow-100 text-yellow-700' : 'bg-surface-container text-secondary')}>{v.status}</span>
                      </td>
                      <td className="px-md py-md">
                        {v.status !== 'Checked Out' && <button className="text-label-sm text-secondary font-semibold hover:underline">Check Out</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── STUDENT LOOKUP ── */}
          {tab === 'Student Lookup' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm max-w-[32rem]">
                <span className="material-symbols-outlined text-secondary">person_search</span>
                <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-body-md outline-none flex-1 placeholder:text-secondary" placeholder="Enter name, admission number, or parent name..." />
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Adm No.', 'Student', 'Class', 'Parent', 'Phone', 'Status'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {(search ? filtered : lookupStudents).map(s => (
                      <tr key={s.adm} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md text-label-sm font-mono text-secondary">{s.adm}</td>
                        <td className="px-md py-md text-label-md font-semibold whitespace-nowrap">{s.name}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.grade}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.parent}</td>
                        <td className="px-md py-md"><a href={`tel:${s.phone}`} className="text-body-md text-tertiary hover:underline whitespace-nowrap">{s.phone}</a></td>
                        <td className="px-md py-md"><span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', s.status === 'Present' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error')}>{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── APPOINTMENTS ── */}
          {tab === 'Appointments' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Today's Schedule</h3>
                <div className="flex flex-col gap-md">
                  {appointments.map((a, i) => (
                    <div key={i} className="flex items-start gap-md p-md bg-surface-container-low rounded-xl">
                      <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-tertiary text-[22px]">event</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-label-md font-bold">{a.type}</p>
                        <p className="text-body-sm text-secondary">{a.guest} → {a.host}</p>
                        <p className="text-label-sm text-secondary mt-xs">⏰ {a.time}</p>
                      </div>
                      <button className="text-label-sm bg-primary text-on-primary px-sm py-xs rounded font-semibold">Check In</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Book New Appointment</h3>
                <div className="flex flex-col gap-md">
                  {[['Guest Name', 'text', 'Visitor full name'], ['Host (Staff Member)', 'text', 'Teacher or staff name'], ['Purpose', 'text', 'e.g. Parent-Teacher Meeting']].map(([label, type, ph]) => (
                    <div key={label as string}>
                      <label className="text-label-md font-semibold block mb-xs">{label}</label>
                      <input type={type as string} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder={ph as string} />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-md">
                    <div>
                      <label className="text-label-md font-semibold block mb-xs">Date</label>
                      <input type="date" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none" />
                    </div>
                    <div>
                      <label className="text-label-md font-semibold block mb-xs">Time</label>
                      <input type="time" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none" />
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary py-sm rounded-lg text-label-md font-bold hover:opacity-90">Book Appointment</button>
                </div>
              </div>
            </div>
          )}

          {/* ── CHECK-IN / OUT ── */}
          {tab === 'Check-In / Out' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Log New Visitor</h3>
                {checkedIn && (
                  <div className="mb-md bg-primary/10 border border-primary/20 rounded-xl p-md flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary icon-filled">check_circle</span>
                    <div>
                      <p className="text-label-md font-bold text-primary">Visitor Checked In!</p>
                      <p className="text-label-sm text-secondary">Visitor badge printed. Please escort to host.</p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-md">
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Visitor Full Name</label>
                    <input value={visitorName} onChange={e => setVisitorName(e.target.value)} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. John Kamau" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">ID / Passport Number</label>
                    <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. 12345678" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Purpose of Visit</label>
                    <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                      <option>Parent Meeting</option><option>Fee Payment</option><option>Admissions Inquiry</option><option>Document Collection</option><option>Vendor / Supplier</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Host / Department</label>
                    <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. Principal's Office" />
                  </div>
                  <button onClick={() => { if (visitorName) { setCheckedIn(true); setVisitorName(''); setTimeout(() => setCheckedIn(false), 4000) } }} className="bg-primary text-on-primary py-sm rounded-lg text-label-md font-bold hover:opacity-90 flex items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-[18px]">login</span> Check In & Print Badge
                  </button>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Student Late Check-In</h3>
                <p className="text-body-md text-secondary mb-md">Log students who arrive after the school bell (8:00 AM). This updates the attendance record.</p>
                <div className="flex flex-col gap-md">
                  <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm">
                    <span className="material-symbols-outlined text-secondary">person_search</span>
                    <input className="bg-transparent text-body-md outline-none flex-1 placeholder:text-secondary" placeholder="Search student by name or Adm No..." />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Arrival Time</label>
                    <input type="time" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none" defaultValue="08:35" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Reason</label>
                    <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                      <option>Traffic / Transport issue</option><option>Medical appointment</option><option>No reason given</option><option>Parent explained</option>
                    </select>
                  </div>
                  <button className="bg-tertiary text-on-tertiary py-sm rounded-lg text-label-md font-bold hover:opacity-90">Log Late Arrival</button>
                </div>

                <div className="mt-lg">
                  <h4 className="text-label-md font-bold mb-sm text-secondary">Today's Late Arrivals (8)</h4>
                  {['Brian Otieno — 8:42 AM', 'Hassan Nur — 8:55 AM', 'Grace Chebet — 9:10 AM'].map((s, i) => (
                    <div key={i} className="flex items-center gap-sm py-xs border-b border-outline-variant last:border-0">
                      <span className="material-symbols-outlined text-yellow-500 text-[18px]">schedule</span>
                      <p className="text-body-sm">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
