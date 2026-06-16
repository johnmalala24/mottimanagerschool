'use client'
import Sidebar from '@/components/Sidebar'

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
  { plate: 'KCA 123B', type: 'Bus', capacity: 45, allocated: 42, driver: 'John Mwangi', route: 'Route A — Westlands', status: 'Active', lastService: 'Jun 1, 2024' },
  { plate: 'KCB 456C', type: 'Bus', capacity: 45, allocated: 38, driver: 'Peter Odhiambo', route: 'Route B — Eastlands', status: 'Active', lastService: 'May 28, 2024' },
  { plate: 'KCC 789D', type: 'Minibus', capacity: 25, allocated: 25, driver: 'James Kamau', route: 'Route C — Ngong Rd', status: 'Full', lastService: 'Jun 5, 2024' },
  { plate: 'KCD 012E', type: 'Bus', capacity: 45, allocated: 0, driver: 'N/A', route: 'Unassigned', status: 'Maintenance', lastService: 'Jun 10, 2024' },
]

const routes = [
  { name: 'Route A', area: 'Westlands → Parklands → School', students: 42, stops: 8, morning: '6:30 AM', afternoon: '4:00 PM' },
  { name: 'Route B', area: 'Eastlands → Umoja → School', students: 38, stops: 6, morning: '6:45 AM', afternoon: '4:15 PM' },
  { name: 'Route C', area: 'Ngong Rd → Lavington → School', students: 25, stops: 5, morning: '6:50 AM', afternoon: '4:20 PM' },
]

export default function TransportPortal() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Transport Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Mr. David Kimani"
        userRole="Transport Manager"
      />
      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Transport Management</h2>
            <p className="text-body-md text-secondary">Greenwood Academy · Fleet & Route Overview</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm bg-surface-container border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant text-label-md">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export
            </button>
            <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg hover:opacity-90 text-label-md font-semibold">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Vehicle
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'Total Vehicles', value: '4', icon: 'directions_bus', bg: 'bg-primary/10', color: 'text-primary', badge: '3 active' },
            { label: 'Students Transported', value: '105', icon: 'groups', bg: 'bg-tertiary/10', color: 'text-tertiary', badge: 'Daily' },
            { label: 'Active Routes', value: '3', icon: 'route', bg: 'bg-primary/10', color: 'text-primary', badge: '6–8 stops each' },
            { label: 'Maintenance Due', value: '1', icon: 'build', bg: 'bg-error-container/40', color: 'text-error', badge: 'KCD 012E' },
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

        {/* Fleet Overview */}
        <div className="tonal-card rounded-xl overflow-hidden mb-xl">
          <div className="p-lg border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-title-md font-bold">Fleet Overview</h3>
            <button className="text-primary text-label-md font-medium hover:underline">Manage Fleet</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low">
                  {['Vehicle', 'Type', 'Route', 'Driver', 'Occupancy', 'Last Service', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-lg py-md text-label-sm font-bold text-secondary uppercase tracking-wider border-b border-outline-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {vehicles.map((v) => (
                  <tr key={v.plate} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${v.status === 'Maintenance' ? 'bg-error-container/40 text-error' : 'bg-primary/10 text-primary'}`}>
                          <span className="material-symbols-outlined text-[20px]">directions_bus</span>
                        </div>
                        <span className="font-mono font-bold text-label-md">{v.plate}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-label-sm">{v.type}</td>
                    <td className="px-lg py-md text-label-sm">{v.route}</td>
                    <td className="px-lg py-md text-label-sm">{v.driver}</td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-16 bg-surface-container rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${v.allocated / v.capacity >= 0.9 ? 'bg-error' : 'bg-primary'}`}
                            style={{ width: `${(v.allocated / v.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-label-sm text-secondary">{v.allocated}/{v.capacity}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-label-sm text-secondary">{v.lastService}</td>
                    <td className="px-lg py-md">
                      <span className={`px-sm py-xs rounded-full text-label-sm font-bold ${v.status === 'Active' ? 'bg-primary/10 text-primary' : v.status === 'Full' ? 'bg-error-container/20 text-error' : 'bg-secondary-container text-secondary'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-lg py-md">
                      <div className="flex gap-xs">
                        <button className="p-1 text-secondary hover:text-primary rounded"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                        <button className="p-1 text-secondary hover:text-tertiary rounded"><span className="material-symbols-outlined text-[20px]">groups</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {routes.map((r) => (
            <div key={r.name} className="tonal-card p-lg rounded-xl">
              <div className="flex justify-between items-start mb-md">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined icon-filled">route</span>
                </div>
                <span className="text-label-sm font-bold text-primary bg-primary/10 px-sm py-xs rounded-full">{r.students} students</span>
              </div>
              <h4 className="text-title-md font-bold mb-xs">{r.name}</h4>
              <p className="text-label-sm text-secondary mb-md">{r.area}</p>
              <div className="grid grid-cols-2 gap-sm mb-md">
                <div className="p-sm bg-surface-container-low rounded-lg">
                  <p className="text-label-sm text-secondary">Morning</p>
                  <p className="text-label-md font-bold">{r.morning}</p>
                </div>
                <div className="p-sm bg-surface-container-low rounded-lg">
                  <p className="text-label-sm text-secondary">Afternoon</p>
                  <p className="text-label-md font-bold">{r.afternoon}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-label-sm text-secondary">
                <span>{r.stops} stops</span>
                <button className="text-primary font-medium hover:underline">View Map</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
