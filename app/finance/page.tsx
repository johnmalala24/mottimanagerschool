'use client'
import Sidebar from '@/components/Sidebar'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/finance' },
  { label: 'Fee Structure', icon: 'account_balance_wallet', href: '/finance/fee-structure' },
  { label: 'Invoices', icon: 'receipt', href: '/finance/invoices' },
  { label: 'M-Pesa Tracking', icon: 'smartphone', href: '/finance/mpesa' },
  { label: 'Receipts', icon: 'receipt_long', href: '/finance/receipts' },
  { label: 'Balances', icon: 'account_balance', href: '/finance/balances' },
  { label: 'Expenses', icon: 'shopping_cart', href: '/finance/expenses' },
  { label: 'Reports', icon: 'bar_chart', href: '/finance/reports' },
]

const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/finance/settings' },
  { label: 'Support', icon: 'help', href: '/finance/support' },
]

const transactions = [
  { id: 'SDQ9P1L4R5', name: 'Kamau Joseph (Grade 4)', phone: '0712 *** 890', amount: '12,500.00', status: 'STK Success', statusBg: 'bg-primary/20 text-primary', statusIcon: 'check_circle', action: 'receipt' },
  { id: 'SDQ9P1L3V2', name: 'Zainab Abdi (Grade 2)', phone: '0722 *** 112', amount: '8,000.00', status: 'Manual Recon', statusBg: 'bg-tertiary/20 text-tertiary', statusIcon: 'sync', action: 'receipt' },
  { id: 'SDQ9P1L2M9', name: 'Brian Otieno (Grade 6)', phone: '0790 *** 456', amount: '15,750.00', status: 'Insuff. Funds', statusBg: 'bg-error-container/20 text-error', statusIcon: 'error', action: 'retry' },
  { id: 'SDQ9P1L1K7', name: 'Faith Wanjiku (Grade 3)', phone: '0701 *** 234', amount: '9,000.00', status: 'STK Success', statusBg: 'bg-primary/20 text-primary', statusIcon: 'check_circle', action: 'receipt' },
]

export default function FinanceDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Greenwood Academy"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Grace Kamau"
        userRole="Finance Lead"
      />

      <main className="md:ml-64 p-gutter max-w-screen-2xl pb-20 md:pb-gutter flex-1">
        {/* Header */}
        <header className="flex justify-between items-center mb-xl">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Bursar Portal</h2>
            <p className="text-body-md text-secondary">Term 2, 2024 Accounting Overview</p>
          </div>
          <div className="flex gap-md">
            <button className="bg-surface-container-lowest border border-outline text-on-surface px-md py-sm rounded-lg text-label-md flex items-center gap-sm hover:bg-surface-variant transition-all">
              <span className="material-symbols-outlined">print</span>
              Print Report
            </button>
            <button className="bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold flex items-center gap-sm hover:opacity-90 transition-all shadow-sm">
              <span className="material-symbols-outlined">add</span>
              New Invoice
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
          {[
            { label: 'Total Collection', value: 'KES 4.2M', sub: '↑ 12% vs last term', subColor: 'text-primary', className: '' },
            { label: 'Outstanding Balances', value: 'KES 1.8M', sub: '42 students with balances', subColor: 'text-secondary', valueColor: 'text-error', className: '' },
            { label: 'M-Pesa Revenue (Today)', value: 'KES 124,500', sub: '● Live Sync Active', subColor: 'text-primary', className: 'border-l-4 border-l-primary-container' },
            { label: 'Next Disbursement', value: 'KES 450k', sub: 'Scheduled for June 15th', subColor: 'opacity-90', className: 'bg-primary-container text-on-primary-container', labelColor: 'opacity-80', valueColor: '' },
          ].map((s, i) => (
            <div key={i} className={`tonal-card p-xl rounded-xl flex flex-col ${s.className}`}>
              <span className={`text-label-md mb-xs ${i === 3 ? 'opacity-80' : 'text-secondary'}`}>{s.label}</span>
              <span className={`text-headline-lg font-bold ${s.valueColor || (i === 3 ? '' : '')}`}>{s.value}</span>
              <div className="mt-auto pt-md flex items-center gap-xs">
                {i === 2 && <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>}
                {i === 0 && <span className="material-symbols-outlined text-sm text-primary">trending_up</span>}
                <span className={`text-label-sm ${s.subColor}`}>{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-gutter">
            {/* Chart */}
            <section className="tonal-card p-xl rounded-xl">
              <div className="flex justify-between items-end mb-xl">
                <div>
                  <h3 className="text-title-md font-bold">Financial Overview</h3>
                  <p className="text-label-sm text-secondary">Income vs. Expenses (Term 2)</p>
                </div>
                <div className="flex gap-md">
                  <div className="flex items-center gap-xs"><span className="w-3 h-3 rounded-full bg-primary"></span><span className="text-label-sm">Income</span></div>
                  <div className="flex items-center gap-xs"><span className="w-3 h-3 rounded-full bg-error"></span><span className="text-label-sm">Expenses</span></div>
                </div>
              </div>
              <div className="h-64 w-full flex items-end gap-md pb-md border-b border-outline-variant">
                {[
                  { month: 'Jan', income: '60%', expense: '30%' },
                  { month: 'Feb', income: '75%', expense: '35%' },
                  { month: 'Mar', income: '85%', expense: '50%' },
                  { month: 'Apr', income: '40%', expense: '60%' },
                  { month: 'May', income: '95%', expense: '25%', active: true },
                ].map((b) => (
                  <div key={b.month} className="flex-1 flex flex-col items-center gap-xs">
                    <div className="w-full flex gap-1 items-end h-48">
                      <div className={`bg-primary w-full rounded-t-sm ${b.active ? 'shadow-sm' : 'opacity-70'}`} style={{ height: b.income }}></div>
                      <div className={`bg-error w-full rounded-t-sm ${b.active ? 'shadow-sm' : 'opacity-70'}`} style={{ height: b.expense }}></div>
                    </div>
                    <span className={`text-label-sm ${b.active ? 'font-bold text-on-surface' : 'text-secondary'}`}>{b.month}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* M-Pesa Table */}
            <section className="tonal-card rounded-xl overflow-hidden">
              <div className="p-xl border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <div>
                  <h3 className="text-title-md font-bold flex items-center gap-md">
                    M-Pesa Payment Tracking
                    <span className="bg-primary-container text-on-primary-container text-[10px] px-sm py-xs rounded-full uppercase tracking-widest font-bold">Live Feed</span>
                  </h3>
                  <p className="text-label-sm text-secondary">Real-time STK Push & Ledger Reconciliation</p>
                </div>
                <button className="text-primary text-label-md font-medium hover:underline">View All Ledger</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-lowest">
                    <tr>
                      {['Transaction ID', 'Student / Parent', 'Amount (KES)', 'Status', 'Action'].map((h, i) => (
                        <th key={h} className={`px-xl py-md text-label-sm text-secondary border-b border-outline-variant ${i === 4 ? 'text-right' : ''}`}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-surface transition-colors">
                        <td className="px-xl py-md font-mono text-label-md">{t.id}</td>
                        <td className="px-xl py-md">
                          <div className="flex flex-col">
                            <span className="text-label-md font-medium">{t.name}</span>
                            <span className="text-label-sm text-secondary">{t.phone}</span>
                          </div>
                        </td>
                        <td className="px-xl py-md font-bold">{t.amount}</td>
                        <td className="px-xl py-md">
                          <span className={`inline-flex items-center gap-xs px-sm py-xs ${t.statusBg} rounded-full text-label-sm font-medium`}>
                            <span className="material-symbols-outlined icon-filled text-[14px]">{t.statusIcon}</span>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-xl py-md text-right">
                          {t.action === 'retry' ? (
                            <button className="text-primary text-label-md font-medium hover:underline">Retry Push</button>
                          ) : (
                            <button className="text-secondary hover:text-primary transition-colors">
                              <span className="material-symbols-outlined">receipt_long</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-gutter">
            {/* Fee Balances by Grade */}
            <section className="tonal-card p-xl rounded-xl">
              <h3 className="text-title-md font-bold mb-md">Fee Balances by Grade</h3>
              <div className="space-y-md">
                {[
                  { grade: 'Grade 1 – 3', amount: 'KES 450,200', pct: 75, color: 'bg-primary' },
                  { grade: 'Grade 4 – 6', amount: 'KES 680,150', pct: 60, color: 'bg-primary' },
                  { grade: 'Junior Secondary', amount: 'KES 720,400', pct: 35, color: 'bg-error' },
                ].map((g) => (
                  <div key={g.grade} className="space-y-xs">
                    <div className="flex justify-between text-label-md">
                      <span>{g.grade}</span>
                      <span className="font-bold">{g.amount}</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className={`${g.color} h-full rounded-full`} style={{ width: `${g.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-xl py-sm border border-outline text-on-surface rounded-lg text-label-md hover:bg-surface-variant transition-all">
                View Detailed Defaulter List
              </button>
            </section>

            {/* M-Pesa C2B Card */}
            <section className="mpesa-gradient p-xl rounded-xl text-on-primary">
              <div className="flex items-center gap-md mb-md">
                <div className="bg-white p-xs rounded-lg">
                  <span className="material-symbols-outlined text-primary font-bold">smartphone</span>
                </div>
                <h4 className="text-title-md font-bold">C2B M-Pesa Portal</h4>
              </div>
              <p className="text-label-sm opacity-90 mb-xl">Securely initiate fee requests directly to parents' phones via Safaricom Daraja API.</p>
              <div className="bg-black/10 p-md rounded-lg border border-white/20">
                <p className="text-label-sm opacity-80 mb-xs">STK Push Success Rate</p>
                <div className="flex items-end gap-md">
                  <span className="text-headline-lg font-bold">94.2%</span>
                  <span className="text-label-sm mb-xs text-primary-fixed">Excellent</span>
                </div>
              </div>
              <button className="w-full mt-xl bg-white text-primary py-md rounded-xl font-bold flex items-center justify-center gap-md hover:shadow-lg transition-all">
                <span className="material-symbols-outlined">send</span>
                Send Bulk Fee Reminders
              </button>
            </section>

            {/* Recent Expenses */}
            <section className="tonal-card p-xl rounded-xl">
              <h3 className="text-title-md font-bold mb-md">Recent Expenses</h3>
              <div className="space-y-md">
                {[
                  { icon: 'menu_book', title: 'CBE Textbooks (G6)', date: 'May 12, 2024', amount: '- 45k' },
                  { icon: 'bolt', title: 'Kenya Power Bill', date: 'May 10, 2024', amount: '- 12k' },
                  { icon: 'cleaning_services', title: 'Cleaning Supplies', date: 'May 8, 2024', amount: '- 3.2k' },
                ].map((e) => (
                  <div key={e.title} className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary">{e.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-label-md font-bold">{e.title}</p>
                      <p className="text-label-sm text-secondary">{e.date}</p>
                    </div>
                    <span className="text-label-md font-bold text-error">{e.amount}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-xl text-primary text-label-md font-medium flex items-center justify-center gap-xs hover:underline">
                All Expenses <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
