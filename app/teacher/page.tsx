'use client'
import Sidebar from '@/components/Sidebar'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/teacher' },
  { label: 'My Classes', icon: 'class', href: '/teacher/classes' },
  { label: 'My Subjects', icon: 'book', href: '/teacher/subjects' },
  { label: 'Attendance', icon: 'fact_check', href: '/teacher/attendance' },
  { label: 'Exam Marks', icon: 'grade', href: '/teacher/marks' },
  { label: 'Assignments', icon: 'assignment', href: '/teacher/assignments' },
  { label: 'CBE Assessment', icon: 'auto_awesome', href: '/teacher/cbe' },
  { label: 'Timetable', icon: 'calendar_month', href: '/teacher/timetable' },
  { label: 'Announcements', icon: 'campaign', href: '/teacher/announcements' },
]

const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/teacher/settings' },
  { label: 'Support', icon: 'help', href: '/teacher/support' },
]

const myClasses = [
  { grade: 'Grade 4A', subject: 'Mathematics', students: 32, attendance: 94, next: 'Today 10:00 AM' },
  { grade: 'Grade 5B', subject: 'Science', students: 28, attendance: 89, next: 'Today 1:00 PM' },
  { grade: 'Grade 6A', subject: 'Mathematics', students: 35, attendance: 97, next: 'Tomorrow 8:00 AM' },
]

const recentAssignments = [
  { title: 'Fractions & Decimals', class: 'Grade 4A', due: 'Jun 18, 2024', submitted: 24, total: 32, status: 'Open' },
  { title: 'Plant Biology Quiz', class: 'Grade 5B', due: 'Jun 15, 2024', submitted: 28, total: 28, status: 'Closed' },
  { title: 'Algebra Basics', class: 'Grade 6A', due: 'Jun 20, 2024', submitted: 10, total: 35, status: 'Open' },
]

const cbeStudents = [
  { name: 'Amina Odhiambo', grade: 'Grade 4A', mastery: 4, label: 'Exceeding', color: 'mastery-4' },
  { name: 'Kelvin Mwai', grade: 'Grade 4A', mastery: 3, label: 'Meeting', color: 'mastery-3' },
  { name: 'Zara Abdi', grade: 'Grade 4A', mastery: 2, label: 'Approaching', color: 'mastery-2' },
  { name: 'Brian Otieno', grade: 'Grade 4A', mastery: 1, label: 'Below', color: 'mastery-1' },
]

export default function TeacherDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Teacher Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Mr. James Ochieng"
        userRole="Mathematics Teacher"
      />

      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Teacher Dashboard</h2>
            <p className="text-body-md text-secondary">Good morning, James! You have 3 classes today.</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant transition-all text-label-md">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Download Report
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 transition-all text-label-md font-semibold">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Assignment
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'My Classes', value: '3', icon: 'class', color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Total Students', value: '95', icon: 'groups', color: 'text-tertiary', bg: 'bg-tertiary/10' },
            { label: 'Avg Attendance', value: '93.3%', icon: 'fact_check', color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Pending Marking', value: '34', icon: 'assignment_late', color: 'text-error', bg: 'bg-error-container/40' },
          ].map((s) => (
            <div key={s.label} className="tonal-card p-lg rounded-xl">
              <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center ${s.color} mb-md`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <p className="text-label-sm text-secondary">{s.label}</p>
              <h3 className={`text-headline-lg font-bold ${s.color === 'text-error' ? 'text-error' : ''}`}>{s.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
          {/* My Classes */}
          <div className="lg:col-span-2 tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">My Classes Today</h3>
              <button className="text-primary text-label-md font-medium hover:underline">View Full Timetable</button>
            </div>
            <div className="divide-y divide-outline-variant">
              {myClasses.map((c) => (
                <div key={c.grade + c.subject} className="p-lg flex items-center justify-between hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined icon-filled">class</span>
                    </div>
                    <div>
                      <p className="text-label-md font-bold">{c.grade}</p>
                      <p className="text-label-sm text-secondary">{c.subject} · {c.students} students</p>
                      <p className="text-label-sm text-outline">{c.next}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="text-right">
                      <p className="text-label-sm text-secondary">Attendance</p>
                      <p className={`text-label-md font-bold ${c.attendance >= 90 ? 'text-primary' : 'text-error'}`}>{c.attendance}%</p>
                    </div>
                    <div className="flex gap-xs">
                      <button className="p-2 text-secondary hover:text-primary hover:bg-surface-variant rounded-lg" title="Mark Attendance">
                        <span className="material-symbols-outlined text-[20px]">fact_check</span>
                      </button>
                      <button className="p-2 text-secondary hover:text-primary hover:bg-surface-variant rounded-lg" title="Enter Marks">
                        <span className="material-symbols-outlined text-[20px]">grade</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-lg">
            <div className="tonal-card p-lg rounded-xl">
              <h3 className="text-title-md font-bold mb-md">Quick Actions</h3>
              <div className="space-y-sm">
                {[
                  { icon: 'fact_check', label: 'Mark Attendance', color: 'bg-primary text-on-primary' },
                  { icon: 'grade', label: 'Enter Exam Marks', color: 'bg-tertiary text-on-tertiary' },
                  { icon: 'assignment', label: 'Create Assignment', color: 'bg-secondary-container text-on-secondary-container' },
                  { icon: 'auto_awesome', label: 'CBE Assessment', color: 'bg-primary-container text-on-primary-container' },
                ].map((a) => (
                  <button key={a.label} className={`w-full flex items-center gap-md px-md py-sm ${a.color} rounded-lg font-medium text-label-md hover:opacity-90 transition-opacity`}>
                    <span className="material-symbols-outlined">{a.icon}</span>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tonal-card p-lg rounded-xl">
              <h3 className="text-title-md font-bold mb-md">Announcements</h3>
              <div className="space-y-md">
                <div className="p-md bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-label-md font-medium">Mid-term exams start June 20</p>
                  <p className="text-label-sm text-secondary mt-xs">Please submit all marks by June 22</p>
                </div>
                <div className="p-md bg-surface-container rounded-lg">
                  <p className="text-label-md font-medium">Staff meeting Friday 3 PM</p>
                  <p className="text-label-sm text-secondary mt-xs">School hall – attendance mandatory</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          {/* Assignments */}
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">Recent Assignments</h3>
              <button className="text-primary text-label-md font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y divide-outline-variant">
              {recentAssignments.map((a) => (
                <div key={a.title} className="p-lg">
                  <div className="flex justify-between items-start mb-sm">
                    <div>
                      <p className="text-label-md font-bold">{a.title}</p>
                      <p className="text-label-sm text-secondary">{a.class} · Due {a.due}</p>
                    </div>
                    <span className={`text-label-sm font-bold px-sm py-xs rounded-full ${a.status === 'Open' ? 'bg-primary/10 text-primary' : 'bg-secondary-container text-secondary'}`}>{a.status}</span>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="flex-1 bg-surface-container rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${(a.submitted / a.total) * 100}%` }}></div>
                    </div>
                    <span className="text-label-sm text-secondary">{a.submitted}/{a.total} submitted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CBE Tracker */}
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">CBE Mastery — Grade 4A</h3>
              <button className="text-primary text-label-md font-medium hover:underline">Full Report</button>
            </div>
            <div className="p-lg">
              <div className="flex gap-xs w-full mb-md">
                {[{ w: '45%', c: 'bg-primary', label: 'Exceeding' }, { w: '32%', c: 'bg-primary/70', label: 'Meeting' }, { w: '15%', c: 'bg-primary/40', label: 'Approaching' }, { w: '8%', c: 'bg-surface-container-high', label: 'Below' }].map((s) => (
                  <div key={s.label} className={`progress-step ${s.c}`} style={{ width: s.w, flexShrink: 0 }}></div>
                ))}
              </div>
              <div className="space-y-md mt-lg">
                {cbeStudents.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-md">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-label-md font-medium">{s.name}</p>
                        <p className="text-label-sm text-secondary">{s.grade}</p>
                      </div>
                    </div>
                    <div className="flex gap-xs">
                      {[4, 3, 2, 1].map((lvl) => (
                        <div
                          key={lvl}
                          className={`w-6 h-6 rounded ${lvl <= s.mastery ? (lvl === 4 ? 'bg-primary' : lvl === 3 ? 'bg-primary/70' : lvl === 2 ? 'bg-primary/40' : 'bg-surface-container-high') : 'bg-surface-container'}`}
                        ></div>
                      ))}
                    </div>
                    <span className={`text-label-sm font-bold px-sm py-xs rounded-full ${s.mastery >= 3 ? 'bg-primary/10 text-primary' : s.mastery === 2 ? 'bg-secondary-container text-secondary' : 'bg-error-container/20 text-error'}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
