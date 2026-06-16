'use client'
import Sidebar from '@/components/Sidebar'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/school-admin' },
  { label: 'Student Mgmt', icon: 'groups', href: '/school-admin/students' },
  { label: 'Attendance', icon: 'calendar_today', href: '/school-admin/attendance' },
  { label: 'Fees & M-Pesa', icon: 'payments', href: '/school-admin/fees' },
  { label: 'Exams & CBE', icon: 'analytics', href: '/school-admin/exams' },
  { label: 'Staff', icon: 'badge', href: '/school-admin/staff' },
  { label: 'Classes', icon: 'class', href: '/school-admin/classes' },
  { label: 'Communication', icon: 'campaign', href: '/school-admin/communication' },
  { label: 'Reports', icon: 'summarize', href: '/school-admin/reports' },
]

const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/school-admin/settings' },
  { label: 'Support', icon: 'help', href: '/school-admin/support' },
]

const activities = [
  { icon: 'check_circle', iconBg: 'bg-primary/20 text-primary', title: 'M-Pesa Payment Received', desc: 'Kamau Njoroge (Grade 4B) · KES 15,000', time: '2 mins ago' },
  { icon: 'description', iconBg: 'bg-tertiary/20 text-tertiary', title: 'Exam Results Published', desc: 'Mid-Term Competency Assessment: Grade 6', time: '45 mins ago' },
  { icon: 'person_add', iconBg: 'bg-surface-container text-secondary', title: 'New Student Registered', desc: 'Sarah Atieno (Grade 1A)', time: '2 hours ago' },
  { icon: 'warning', iconBg: 'bg-error-container/40 text-error', title: 'Fee Balance Alert', desc: 'Brian Otieno has an outstanding balance of KES 32,000', time: '3 hours ago' },
]

export default function SchoolAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Greenwood Academy"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Samuel Mwangi"
        userRole="Principal Admin"
      />

      <main className="md:ml-64 p-gutter min-h-screen pb-20 md:pb-gutter flex-1">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-background">Admin Dashboard</h2>
            <p className="text-body-md text-secondary">Welcome back, here's what's happening at Greenwood Academy today.</p>
          </div>
          <div className="flex gap-md">
            <button className="bg-white border border-outline text-secondary px-lg py-sm rounded-lg text-label-md flex items-center gap-xs hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[20px]">print</span>
              Print Daily Report
            </button>
            <button className="bg-primary text-on-primary px-lg py-sm rounded-lg text-label-md font-semibold flex items-center gap-xs hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Registration
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-xl">
          {[
            { icon: 'group', iconBg: 'bg-primary/10', iconColor: 'text-primary', badge: '+4% from last term', badgeColor: 'text-primary', label: 'Total Students', value: '1,284' },
            { icon: 'payments', iconBg: 'bg-primary/20', iconColor: 'text-primary', badge: 'Live Updates', badgeColor: 'text-primary', label: 'Fees Collected Today', value: 'KES 428,500', highlight: true },
            { icon: 'how_to_reg', iconBg: 'bg-tertiary/20', iconColor: 'text-tertiary', badge: 'Above Average', badgeColor: 'text-tertiary', label: 'Attendance Rate', value: '94.2%' },
            { icon: 'warning', iconBg: 'bg-error-container/40', iconColor: 'text-error', badge: 'Action Required', badgeColor: 'text-error', label: 'Fee Balances (>50k)', value: '42 Cases', error: true },
          ].map((s, i) => (
            <div key={i} className={`tonal-card p-lg rounded-xl flex flex-col justify-between ${s.highlight ? 'bg-primary/5 border-primary/20' : ''}`}>
              <div className="flex justify-between items-start mb-md">
                <div className={`p-xs ${s.iconBg} rounded-lg ${s.iconColor}`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <span className={`${s.badgeColor} text-label-sm font-bold`}>{s.badge}</span>
              </div>
              <div>
                <p className="text-label-md text-secondary">{s.label}</p>
                <h3 className={`text-headline-lg font-bold ${s.error ? 'text-error' : s.highlight ? 'text-primary' : ''}`}>{s.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
          {/* Bar Chart */}
          <div className="lg:col-span-2 tonal-card p-lg rounded-xl">
            <div className="flex justify-between items-center mb-xl">
              <h4 className="text-title-md font-bold">Monthly Fee Collection</h4>
              <select className="bg-transparent border-none text-label-md text-secondary focus:ring-0 outline-none">
                <option>Term 2, 2024</option>
                <option>Term 1, 2024</option>
              </select>
            </div>
            <div className="relative h-64 w-full flex items-end gap-md">
              {[
                { month: 'Jan', h: '40%', active: false },
                { month: 'Feb', h: '65%', active: false },
                { month: 'Mar', h: '85%', active: false },
                { month: 'Apr', h: '95%', active: true },
                { month: 'May', h: '20%', active: false },
              ].map((b) => (
                <div key={b.month} className="flex-grow flex flex-col items-center gap-sm">
                  <div
                    className={`w-full rounded-t-lg transition-all ${b.active ? 'bg-primary shadow-lg' : 'bg-surface-container hover:bg-primary-container'}`}
                    style={{ height: b.h }}
                  ></div>
                  <span className={`text-label-sm font-semibold ${b.active ? 'text-primary' : 'text-secondary'}`}>{b.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="tonal-card p-lg rounded-xl flex flex-col">
            <h4 className="text-title-md font-bold mb-xl">Recent Activity</h4>
            <div className="space-y-lg flex-grow">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-md">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${a.iconBg} flex items-center justify-center`}>
                    <span className="material-symbols-outlined icon-filled text-[20px]">{a.icon}</span>
                  </div>
                  <div>
                    <p className="text-label-md font-medium">{a.title}</p>
                    <p className="text-label-sm text-secondary">{a.desc}</p>
                    <span className="text-label-sm text-outline">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-lg text-primary text-label-md font-medium hover:underline w-full text-center">View All Logs</button>
          </div>
        </div>

        {/* CBE & M-Pesa Section */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-lg bg-on-background text-white flex justify-between items-center">
            <div>
              <h4 className="text-title-md font-bold">CBE Mastery & Enrollment</h4>
              <p className="text-label-sm opacity-80">Real-time academic performance distribution</p>
            </div>
            <span className="px-md py-xs bg-primary rounded-full text-label-sm font-semibold">Active Term</span>
          </div>
          <div className="p-gutter grid grid-cols-1 md:grid-cols-2 gap-xl">
            {/* CBE Tracker */}
            <div>
              <div className="flex justify-between items-center mb-md">
                <h5 className="text-label-md font-medium">Grade 4 Performance Index</h5>
                <span className="text-primary font-bold">88% Mastery</span>
              </div>
              <div className="flex gap-xs w-full mb-lg">
                {['bg-primary', 'bg-primary', 'bg-primary/40', 'bg-surface-container'].map((c, i) => (
                  <div key={i} className={`progress-step flex-grow ${c}`}></div>
                ))}
              </div>
              <div className="flex justify-between text-label-sm text-secondary">
                <span>Exceeding (45%)</span>
                <span>Meeting (32%)</span>
                <span>Approaching (15%)</span>
                <span>Below (8%)</span>
              </div>
            </div>

            {/* M-Pesa Sync */}
            <div className="bg-surface-container p-lg rounded-xl flex items-center justify-between border border-outline-variant" style={{ boxShadow: 'inset 0px 2px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-lg">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm border border-outline-variant">
                  <div className="w-10 h-10 mpesa-gradient rounded-md flex items-center justify-center">
                    <span className="material-symbols-outlined text-white icon-filled text-[18px]">smartphone</span>
                  </div>
                </div>
                <div>
                  <p className="text-label-md font-medium text-on-surface">Integrated M-Pesa Ledger</p>
                  <p className="text-headline-lg font-bold text-primary">Synced</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-label-sm text-secondary">Last Sync</p>
                <p className="text-label-md font-bold">Today, 11:42 AM</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-gutter right-gutter w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform md:bottom-xl md:right-xl z-50">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  )
}
