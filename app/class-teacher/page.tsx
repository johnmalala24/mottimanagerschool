'use client'
import Sidebar from '@/components/Sidebar'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/class-teacher' },
  { label: 'Class Attendance', icon: 'fact_check', href: '/class-teacher/attendance' },
  { label: 'Discipline Records', icon: 'gavel', href: '/class-teacher/discipline' },
  { label: 'Student Profiles', icon: 'person', href: '/class-teacher/students' },
  { label: 'Parent Communication', icon: 'message', href: '/class-teacher/communication' },
  { label: 'Class Performance', icon: 'bar_chart', href: '/class-teacher/performance' },
  { label: 'Report Generation', icon: 'summarize', href: '/class-teacher/reports' },
  { label: 'Announcements', icon: 'campaign', href: '/class-teacher/announcements' },
]

const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/class-teacher/settings' },
  { label: 'Support', icon: 'help', href: '/class-teacher/support' },
]

const students = [
  { name: 'Amina Odhiambo', adm: 'GW-4A-001', attendance: 98, grade: 'A', status: 'Excellent', statusColor: 'bg-primary/10 text-primary' },
  { name: 'Kelvin Mwai', adm: 'GW-4A-002', attendance: 85, grade: 'B+', status: 'Good', statusColor: 'bg-tertiary/10 text-tertiary' },
  { name: 'Zara Abdi', adm: 'GW-4A-003', attendance: 72, grade: 'C+', status: 'Needs Attention', statusColor: 'bg-secondary-container text-secondary' },
  { name: 'Brian Otieno', adm: 'GW-4A-004', attendance: 60, grade: 'C', status: 'At Risk', statusColor: 'bg-error-container text-on-error-container' },
  { name: 'Faith Wanjiku', adm: 'GW-4A-005', attendance: 95, grade: 'A-', status: 'Excellent', statusColor: 'bg-primary/10 text-primary' },
]

export default function ClassTeacherDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Class Teacher Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Ms. Grace Njeri"
        userRole="Class Teacher — 4A"
      />

      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Class 4A Dashboard</h2>
            <p className="text-body-md text-secondary">Greenwood Academy · Term 2, 2024 · 32 students enrolled</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant text-label-md">
              <span className="material-symbols-outlined text-[20px]">print</span>
              Print Report
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg hover:opacity-90 text-label-md font-semibold">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              Mark Attendance
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'Total Students', value: '32', icon: 'groups', bg: 'bg-primary/10', color: 'text-primary', badge: '2 new this term' },
            { label: 'Avg Attendance', value: '88%', icon: 'fact_check', bg: 'bg-tertiary/10', color: 'text-tertiary', badge: 'This week' },
            { label: 'Discipline Cases', value: '3', icon: 'gavel', bg: 'bg-error-container/40', color: 'text-error', badge: 'This term' },
            { label: 'Avg Class Grade', value: 'B+', icon: 'grade', bg: 'bg-primary/10', color: 'text-primary', badge: 'Mid-term' },
          ].map((s) => (
            <div key={s.label} className="tonal-card p-lg rounded-xl">
              <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-lg flex items-center justify-center mb-md`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <p className="text-label-sm text-secondary">{s.label}</p>
              <h3 className="text-headline-lg font-bold">{s.value}</h3>
              <p className="text-label-sm text-secondary mt-xs">{s.badge}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
          {/* Attendance Heatmap */}
          <div className="tonal-card p-lg rounded-xl">
            <h3 className="text-title-md font-bold mb-md">Weekly Attendance</h3>
            <div className="space-y-sm">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => {
                const pct = [96, 90, 84, 93, 88][i]
                return (
                  <div key={day} className="flex items-center gap-md">
                    <span className="text-label-sm text-secondary w-24">{day}</span>
                    <div className="flex-1 bg-surface-container rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${pct >= 90 ? 'bg-primary' : pct >= 80 ? 'bg-primary/60' : 'bg-error'}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <span className={`text-label-sm font-bold w-10 text-right ${pct >= 90 ? 'text-primary' : pct >= 80 ? 'text-secondary' : 'text-error'}`}>{pct}%</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-md pt-md border-t border-outline-variant">
              <div className="flex justify-between">
                <span className="text-label-sm text-secondary">Week Average</span>
                <span className="text-label-md font-bold text-primary">90.2%</span>
              </div>
            </div>
          </div>

          {/* Class Performance */}
          <div className="tonal-card p-lg rounded-xl">
            <h3 className="text-title-md font-bold mb-md">Class Performance</h3>
            <div className="space-y-md">
              {[
                { subject: 'Mathematics', teacher: 'Mr. Ochieng', avg: 76, color: 'bg-primary' },
                { subject: 'Science', teacher: 'Ms. Achieng', avg: 82, color: 'bg-tertiary' },
                { subject: 'English', teacher: 'Mr. Kamau', avg: 68, color: 'bg-primary/60' },
                { subject: 'Kiswahili', teacher: 'Ms. Wanjiku', avg: 85, color: 'bg-primary' },
              ].map((s) => (
                <div key={s.subject}>
                  <div className="flex justify-between text-label-md mb-xs">
                    <span className="font-medium">{s.subject}</span>
                    <span className="font-bold">{s.avg}%</span>
                  </div>
                  <div className="bg-surface-container rounded-full h-2">
                    <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.avg}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Messages */}
          <div className="tonal-card p-lg rounded-xl">
            <h3 className="text-title-md font-bold mb-md">Recent Parent Messages</h3>
            <div className="space-y-md">
              {[
                { parent: "Mrs. Odhiambo", msg: "Amina will be late tomorrow due to a doctor's appointment.", time: '10 min ago', unread: true },
                { parent: "Mr. Mwai", msg: "Please send Kelvin's report card when ready.", time: '1 hr ago', unread: false },
                { parent: "Ms. Wanjiku", msg: "Faith has been having headaches, please monitor.", time: 'Yesterday', unread: false },
              ].map((m) => (
                <div key={m.parent} className={`p-md rounded-lg border ${m.unread ? 'bg-primary/5 border-primary/20' : 'border-outline-variant'}`}>
                  <div className="flex justify-between items-start mb-xs">
                    <p className="text-label-md font-bold">{m.parent}</p>
                    <span className="text-label-sm text-secondary">{m.time}</span>
                  </div>
                  <p className="text-label-sm text-on-surface-variant">{m.msg}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-md py-sm text-primary text-label-md font-medium hover:underline">Send New Message</button>
          </div>
        </div>

        {/* Students Table */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-lg border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-title-md font-bold">Student Profiles — Class 4A</h3>
            <div className="flex gap-sm">
              <input className="pl-4 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-label-md focus:ring-1 focus:ring-primary outline-none" placeholder="Search students..." />
              <button className="px-md py-sm bg-primary text-on-primary rounded-lg text-label-md font-medium">Export</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low">
                  {['Student', 'Adm No.', 'Attendance', 'Mid-Term Grade', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-lg py-md text-label-sm font-bold text-secondary uppercase tracking-wider border-b border-outline-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {students.map((s) => (
                  <tr key={s.adm} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-label-md font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-label-sm font-mono text-secondary">{s.adm}</td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-16 bg-surface-container rounded-full h-2">
                          <div className={`h-2 rounded-full ${s.attendance >= 90 ? 'bg-primary' : s.attendance >= 75 ? 'bg-primary/60' : 'bg-error'}`} style={{ width: `${s.attendance}%` }}></div>
                        </div>
                        <span className="text-label-sm font-medium">{s.attendance}%</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-label-md font-bold">{s.grade}</td>
                    <td className="px-lg py-md">
                      <span className={`${s.statusColor} px-sm py-xs rounded-full text-label-sm font-bold`}>{s.status}</span>
                    </td>
                    <td className="px-lg py-md">
                      <div className="flex gap-xs">
                        <button className="p-2 text-secondary hover:text-primary hover:bg-surface-variant rounded-lg" title="View Profile"><span className="material-symbols-outlined text-[20px]">person</span></button>
                        <button className="p-2 text-secondary hover:text-tertiary hover:bg-surface-variant rounded-lg" title="Message Parent"><span className="material-symbols-outlined text-[20px]">message</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
