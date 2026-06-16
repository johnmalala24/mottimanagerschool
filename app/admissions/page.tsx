'use client'
import Sidebar from '@/components/Sidebar'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/admissions' },
  { label: 'Applications', icon: 'inbox', href: '/admissions/applications' },
  { label: 'Student Registration', icon: 'person_add', href: '/admissions/register' },
  { label: 'Approvals', icon: 'approval', href: '/admissions/approvals' },
  { label: 'Document Uploads', icon: 'upload_file', href: '/admissions/documents' },
  { label: 'Admission Letters', icon: 'mail', href: '/admissions/letters' },
  { label: 'Enrollment Reports', icon: 'bar_chart', href: '/admissions/reports' },
]

const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/admissions/settings' },
  { label: 'Support', icon: 'help', href: '/admissions/support' },
]

const applications = [
  { name: 'Liam Njoroge', grade: 'Grade 1', applied: 'Jun 14, 2024', status: 'Pending Review', statusBg: 'bg-secondary-container text-secondary', docs: 3, required: 4 },
  { name: 'Aisha Odhiambo', grade: 'Grade 4', applied: 'Jun 13, 2024', status: 'Approved', statusBg: 'bg-primary/10 text-primary', docs: 4, required: 4 },
  { name: 'Kevin Mutua', grade: 'Grade 2', applied: 'Jun 12, 2024', status: 'Documents Missing', statusBg: 'bg-error-container/40 text-error', docs: 2, required: 4 },
  { name: 'Grace Wanjiru', grade: 'Grade 6', applied: 'Jun 11, 2024', status: 'Interview Scheduled', statusBg: 'bg-tertiary/10 text-tertiary', docs: 4, required: 4 },
  { name: 'Brian Otieno', grade: 'Grade 3', applied: 'Jun 10, 2024', status: 'Approved', statusBg: 'bg-primary/10 text-primary', docs: 4, required: 4 },
]

export default function AdmissionsPortal() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Admissions Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Ms. Patricia Kamau"
        userRole="Admissions Officer"
      />
      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Admissions Portal</h2>
            <p className="text-body-md text-secondary">Greenwood Academy · 2024/2025 Academic Year</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant text-label-md">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export Report
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg hover:opacity-90 text-label-md font-semibold">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              New Application
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'Total Applications', value: '124', icon: 'inbox', bg: 'bg-primary/10', color: 'text-primary', badge: 'This cycle' },
            { label: 'Approved', value: '68', icon: 'check_circle', bg: 'bg-primary/10', color: 'text-primary', badge: '54.8%' },
            { label: 'Pending Review', value: '31', icon: 'pending', bg: 'bg-secondary-container', color: 'text-secondary', badge: 'Action needed' },
            { label: 'Documents Missing', value: '25', icon: 'warning', bg: 'bg-error-container/40', color: 'text-error', badge: 'Follow up' },
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

        {/* Pipeline */}
        <div className="tonal-card p-lg rounded-xl mb-xl">
          <h3 className="text-title-md font-bold mb-lg">Admission Pipeline</h3>
          <div className="flex flex-col md:flex-row gap-md">
            {[
              { stage: 'Application Received', count: 124, color: 'bg-secondary-container text-secondary', pct: 100 },
              { stage: 'Documents Verified', count: 99, color: 'bg-tertiary/10 text-tertiary', pct: 80 },
              { stage: 'Interview / Assessment', count: 72, color: 'bg-primary/20 text-primary', pct: 58 },
              { stage: 'Offer Issued', count: 68, color: 'bg-primary text-on-primary', pct: 55 },
            ].map((p, i) => (
              <div key={p.stage} className={`flex-1 relative ${p.color} rounded-xl p-md`}>
                <p className="text-label-sm font-bold opacity-80">Stage {i + 1}</p>
                <p className="text-headline-lg font-bold">{p.count}</p>
                <p className="text-label-sm">{p.stage}</p>
                <div className="mt-md bg-white/20 rounded-full h-1">
                  <div className="bg-current h-1 rounded-full opacity-60" style={{ width: `${p.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-lg border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
            <h3 className="text-title-md font-bold">Recent Applications</h3>
            <div className="flex gap-sm w-full md:w-auto">
              <input className="flex-1 md:w-56 pl-4 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-label-md focus:ring-1 focus:ring-primary outline-none" placeholder="Search applicants..." />
              <select className="bg-surface-container border border-outline-variant rounded-lg px-md py-2 text-label-md focus:ring-1 focus:ring-primary outline-none">
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Missing Docs</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low">
                  {['Applicant', 'Grade Applied', 'Date Applied', 'Documents', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-lg py-md text-label-sm font-bold text-secondary uppercase tracking-wider border-b border-outline-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {applications.map((a) => (
                  <tr key={a.name} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">
                          {a.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-label-md font-medium">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-label-md">{a.grade}</td>
                    <td className="px-lg py-md text-label-sm text-secondary">{a.applied}</td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-16 bg-surface-container rounded-full h-2">
                          <div className={`h-2 rounded-full ${a.docs === a.required ? 'bg-primary' : 'bg-error'}`} style={{ width: `${(a.docs / a.required) * 100}%` }}></div>
                        </div>
                        <span className="text-label-sm text-secondary">{a.docs}/{a.required}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <span className={`${a.statusBg} px-sm py-xs rounded-full text-label-sm font-bold`}>{a.status}</span>
                    </td>
                    <td className="px-lg py-md">
                      <div className="flex gap-xs">
                        <button className="p-2 text-secondary hover:text-primary hover:bg-surface-variant rounded-lg" title="Review"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                        <button className="p-2 text-secondary hover:text-primary hover:bg-surface-variant rounded-lg" title="Approve"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                        <button className="p-2 text-secondary hover:text-tertiary hover:bg-surface-variant rounded-lg" title="Send Letter"><span className="material-symbols-outlined text-[20px]">mail</span></button>
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
