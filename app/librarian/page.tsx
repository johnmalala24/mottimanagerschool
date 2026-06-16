'use client'
import Sidebar from '@/components/Sidebar'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/librarian' },
  { label: 'Book Catalog', icon: 'menu_book', href: '/librarian/catalog' },
  { label: 'Issue Book', icon: 'outbox', href: '/librarian/issue' },
  { label: 'Returns', icon: 'move_to_inbox', href: '/librarian/returns' },
  { label: 'Fine Management', icon: 'payments', href: '/librarian/fines' },
  { label: 'Borrowing History', icon: 'history', href: '/librarian/history' },
  { label: 'Library Reports', icon: 'bar_chart', href: '/librarian/reports' },
]

const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/librarian/settings' },
  { label: 'Support', icon: 'help', href: '/librarian/support' },
]

const books = [
  { title: 'Mathematics Grade 4', author: 'KIE Publishers', isbn: '978-9966-57-001-3', category: 'Textbook', copies: 45, available: 32, dueBack: '' },
  { title: 'Adventures in English', author: 'Longhorn', isbn: '978-9966-08-123-5', category: 'Literature', copies: 20, available: 8, dueBack: '' },
  { title: 'Kenya: Our Country', author: 'OUP East Africa', isbn: '978-0-19-845621-0', category: 'Social Studies', copies: 30, available: 0, dueBack: 'Jun 18' },
  { title: 'Science Alive Grade 5', author: 'Mentor Publishers', isbn: '978-9966-57-044-0', category: 'Textbook', copies: 35, available: 21, dueBack: '' },
]

const recentIssues = [
  { student: 'Amina Odhiambo', class: '4A', book: 'Adventures in English', issued: 'Jun 10', due: 'Jun 24', status: 'Active' },
  { student: 'Brian Otieno', class: '4A', book: 'Kenya: Our Country', issued: 'Jun 5', due: 'Jun 16', status: 'Overdue' },
  { student: 'Faith Wanjiku', class: '4A', book: 'Mathematics Grade 4', issued: 'Jun 12', due: 'Jun 26', status: 'Active' },
]

export default function LibrarianPortal() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Library Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Mr. Samuel Ochieng"
        userRole="Head Librarian"
      />
      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Library Management</h2>
            <p className="text-body-md text-secondary">Greenwood Academy Library · Term 2, 2024</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant text-label-md">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg hover:opacity-90 text-label-md font-semibold">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Book
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'Total Books', value: '1,240', icon: 'menu_book', bg: 'bg-primary/10', color: 'text-primary', badge: '48 categories' },
            { label: 'Books Issued', value: '342', icon: 'outbox', bg: 'bg-tertiary/10', color: 'text-tertiary', badge: 'This term' },
            { label: 'Overdue Returns', value: '18', icon: 'schedule', bg: 'bg-error-container/40', color: 'text-error', badge: 'Fine pending' },
            { label: 'Fines Collected', value: 'KES 4,200', icon: 'payments', bg: 'bg-primary/10', color: 'text-primary', badge: 'This term' },
          ].map((s) => (
            <div key={s.label} className="tonal-card p-lg rounded-xl">
              <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-lg flex items-center justify-center mb-md`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <p className="text-label-sm text-secondary">{s.label}</p>
              <h3 className="text-title-md font-bold mt-xs">{s.value}</h3>
              <p className={`text-label-sm mt-xs ${s.color}`}>{s.badge}</p>
            </div>
          ))}
        </div>

        {/* Quick Issue */}
        <div className="tonal-card p-lg rounded-xl mb-xl">
          <h3 className="text-title-md font-bold mb-md">Quick Issue / Return</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">person_search</span>
              <input className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-label-md focus:ring-1 focus:ring-primary outline-none" placeholder="Search student..." />
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">search</span>
              <input className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-label-md focus:ring-1 focus:ring-primary outline-none" placeholder="Search book / ISBN..." />
            </div>
            <div className="flex gap-sm">
              <button className="flex-1 py-sm bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:opacity-90">Issue Book</button>
              <button className="flex-1 py-sm bg-tertiary text-on-tertiary rounded-lg font-semibold text-label-md hover:opacity-90">Return Book</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          {/* Book Catalog */}
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">Book Catalog</h3>
              <button className="text-primary text-label-md font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    {['Title', 'Category', 'Available', 'Status'].map((h) => (
                      <th key={h} className="px-lg py-md text-label-sm font-bold text-secondary uppercase tracking-wider border-b border-outline-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {books.map((b) => (
                    <tr key={b.isbn} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-md">
                        <p className="text-label-md font-medium">{b.title}</p>
                        <p className="text-label-sm text-secondary">{b.author}</p>
                      </td>
                      <td className="px-lg py-md">
                        <span className="px-sm py-xs bg-surface-container rounded text-label-sm">{b.category}</span>
                      </td>
                      <td className="px-lg py-md">
                        <span className={`text-label-md font-bold ${b.available === 0 ? 'text-error' : b.available < 10 ? 'text-secondary' : 'text-primary'}`}>
                          {b.available}/{b.copies}
                        </span>
                      </td>
                      <td className="px-lg py-md">
                        {b.available === 0 ? (
                          <span className="text-label-sm font-bold text-error bg-error-container/20 px-sm py-xs rounded-full">Due {b.dueBack}</span>
                        ) : (
                          <span className="text-label-sm font-bold text-primary bg-primary/10 px-sm py-xs rounded-full">Available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Issues & Overdue */}
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">Recent Issues</h3>
              <span className="text-label-sm font-bold text-error bg-error-container/20 px-sm py-xs rounded-full">2 Overdue</span>
            </div>
            <div className="divide-y divide-outline-variant">
              {recentIssues.map((r) => (
                <div key={r.student + r.book} className={`p-lg ${r.status === 'Overdue' ? 'bg-error-container/10' : ''}`}>
                  <div className="flex justify-between items-start mb-sm">
                    <div>
                      <p className="text-label-md font-bold">{r.student} <span className="text-secondary font-normal">({r.class})</span></p>
                      <p className="text-label-sm text-secondary">{r.book}</p>
                    </div>
                    <span className={`text-label-sm font-bold px-sm py-xs rounded-full ${r.status === 'Overdue' ? 'bg-error-container text-on-error-container' : 'bg-primary/10 text-primary'}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-label-sm text-secondary">
                      <span>Issued: {r.issued}</span>
                      <span className="mx-sm">·</span>
                      <span className={r.status === 'Overdue' ? 'text-error font-bold' : ''}>Due: {r.due}</span>
                    </div>
                    {r.status === 'Overdue' && (
                      <button className="text-label-sm text-error font-bold border border-error/30 px-sm py-xs rounded hover:bg-error-container/20 transition-colors">
                        Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-lg border-t border-outline-variant">
              <div className="p-md bg-error-container/20 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-label-md font-bold text-error">Outstanding Fines</p>
                  <p className="text-label-sm text-secondary">Brian Otieno · 3 days overdue</p>
                </div>
                <div className="text-right">
                  <p className="text-label-md font-bold text-error">KES 150</p>
                  <button className="text-label-sm text-primary font-medium hover:underline">Collect Fine</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
