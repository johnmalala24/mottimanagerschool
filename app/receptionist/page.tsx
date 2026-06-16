'use client'
import Sidebar from '@/components/Sidebar'

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
  { name: 'John Kamau', purpose: 'Parent Meeting — Grade 4A', time: '9:00 AM', status: 'Checked In', statusBg: 'bg-primary/10 text-primary', badge: '🟢' },
  { name: 'Mary Wanjiku', purpose: 'Document Collection', time: '9:45 AM', status: 'Waiting', statusBg: 'bg-secondary-container text-secondary', badge: '🟡' },
  { name: 'Peter Odhiambo', purpose: 'Admissions Inquiry', time: '10:30 AM', status: 'Checked In', statusBg: 'bg-primary/10 text-primary', badge: '🟢' },
  { name: 'Grace Mutua', purpose: 'Fee Payment', time: '11:00 AM', status: 'Checked Out', statusBg: 'bg-surface-container text-secondary', badge: '⚫' },
]

const appointments = [
  { guest: 'Mr. Njoroge', host: 'Principal Mwangi', time: '2:00 PM', type: 'Parent-Teacher Meeting' },
  { guest: 'Dr. Achieng', host: 'Nurse Wanjiku', time: '3:00 PM', type: 'Health Checkup' },
  { guest: 'EdTech Team', host: 'Admin', time: '4:00 PM', type: 'Vendor Meeting' },
]

export default function ReceptionistPortal() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Receptionist Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Ms. Jane Adhiambo"
        userRole="Front Desk Officer"
      />
      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Front Office</h2>
            <p className="text-body-md text-secondary">Greenwood Academy · Monday, June 16, 2024</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg hover:opacity-90 text-label-md font-semibold">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Visitor
            </button>
          </div>
        </header>

        {/* Quick Lookup */}
        <div className="tonal-card p-lg rounded-xl mb-xl">
          <h3 className="text-title-md font-bold mb-md">Quick Lookup</h3>
          <div className="flex flex-col md:flex-row gap-md">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
              <input className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="Search student name, admission no..." />
            </div>
            <div className="flex gap-sm">
              <button className="px-lg py-sm bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:opacity-90">Search Student</button>
              <button className="px-lg py-sm bg-tertiary text-on-tertiary rounded-lg font-semibold text-label-md hover:opacity-90">Search Parent</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'Visitors Today', value: '12', icon: 'badge', bg: 'bg-primary/10', color: 'text-primary', badge: '4 checked in' },
            { label: 'Students Present', value: '1,210', icon: 'groups', bg: 'bg-tertiary/10', color: 'text-tertiary', badge: '94.2%' },
            { label: 'Appointments Today', value: '3', icon: 'event', bg: 'bg-secondary-container', color: 'text-secondary', badge: 'Next at 2 PM' },
            { label: 'Late Check-Ins', value: '8', icon: 'schedule', bg: 'bg-error-container/40', color: 'text-error', badge: 'This morning' },
          ].map((s) => (
            <div key={s.label} className="tonal-card p-lg rounded-xl">
              <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-lg flex items-center justify-center mb-md`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <p className="text-label-sm text-secondary">{s.label}</p>
              <h3 className="text-headline-lg font-bold">{s.value}</h3>
              <p className={`text-label-sm mt-xs ${s.color}`}>{s.badge}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {/* Visitor Log */}
          <div className="lg:col-span-2 tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">Today's Visitor Log</h3>
              <button className="text-primary text-label-md font-medium hover:underline">Print Log</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    {['Visitor', 'Purpose', 'Time In', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-lg py-md text-label-sm font-bold text-secondary uppercase tracking-wider border-b border-outline-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {visitors.map((v) => (
                    <tr key={v.name} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">
                            {v.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-label-md font-medium">{v.name}</span>
                        </div>
                      </td>
                      <td className="px-lg py-md text-label-sm text-secondary">{v.purpose}</td>
                      <td className="px-lg py-md text-label-sm font-mono">{v.time}</td>
                      <td className="px-lg py-md">
                        <span className={`${v.statusBg} px-sm py-xs rounded-full text-label-sm font-bold`}>{v.status}</span>
                      </td>
                      <td className="px-lg py-md">
                        <div className="flex gap-xs">
                          <button className="px-sm py-xs bg-primary/10 text-primary rounded text-label-sm font-medium hover:bg-primary/20">Check Out</button>
                          <button className="p-1 text-secondary hover:text-primary rounded"><span className="material-symbols-outlined text-[18px]">print</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Appointments & Notices */}
          <div className="flex flex-col gap-lg">
            <div className="tonal-card p-lg rounded-xl">
              <h3 className="text-title-md font-bold mb-md">Today's Appointments</h3>
              <div className="space-y-md">
                {appointments.map((a) => (
                  <div key={a.time} className="p-md bg-surface-container-low rounded-lg border border-outline-variant">
                    <div className="flex justify-between items-start mb-xs">
                      <p className="text-label-md font-bold">{a.guest}</p>
                      <span className="text-label-sm font-bold text-primary">{a.time}</span>
                    </div>
                    <p className="text-label-sm text-secondary">with {a.host}</p>
                    <p className="text-label-sm mt-xs bg-surface-container rounded px-xs py-xs inline-block">{a.type}</p>
                  </div>
                ))}
                <button className="w-full py-sm border border-primary/30 text-primary rounded-lg text-label-md font-medium hover:bg-primary/5 transition-colors">
                  + Add Appointment
                </button>
              </div>
            </div>

            {/* Student Check-In */}
            <div className="tonal-card p-lg rounded-xl">
              <h3 className="text-title-md font-bold mb-md">Student Check-In</h3>
              <div className="space-y-sm mb-md">
                <input className="w-full pl-4 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-label-md focus:ring-1 focus:ring-primary outline-none" placeholder="Student name or adm no..." />
                <select className="w-full bg-surface-container border border-outline-variant rounded-lg px-md py-2 text-label-md focus:ring-1 focus:ring-primary outline-none">
                  <option>Select reason</option>
                  <option>Late Arrival</option>
                  <option>Early Departure</option>
                  <option>Doctor's Appointment</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex gap-sm">
                <button className="flex-1 py-sm bg-primary text-on-primary rounded-lg font-semibold text-label-md">Check In</button>
                <button className="flex-1 py-sm bg-error text-on-error rounded-lg font-semibold text-label-md">Check Out</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
