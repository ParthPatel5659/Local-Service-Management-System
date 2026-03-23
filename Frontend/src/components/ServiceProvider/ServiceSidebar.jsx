import React, { useState } from 'react'
import { Link, useLocation,Outlet } from 'react-router-dom'




const navItems = [
  {
    to: '/service-provider/home',
    label: 'Deshboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/service-provider/services',
    label: 'Services',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/service-provider/appointments',
    label: 'Appointments',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/service-provider/booking',
    label: 'Bookings',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    to: '/service-provider/add-service',
    label: 'Add Service',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 9v3m0 0v3m0-6h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: '/service-provider/reviews',
    label: 'Reviews',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    to: '/service-provider/profile',
    label: 'Profile',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const ServiceSidebar = () => {
  const location  = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const NavLink = ({ item }) => {
    const isActive = location.pathname === item.to
    return (
      <Link
        to={item.to}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
          ${isActive
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
      >
        <span className={isActive ? 'text-white' : 'text-gray-500'}>{item.icon}</span>
        {item.label}
      </Link>
    )
  }

  return (
    <>
      {/* ════════════════════════════════
          MOBILE — top bar + slide-down drawer
          ════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between bg-gray-900 px-4 py-3 shadow-md">
          <span className="text-lg font-bold text-indigo-400 tracking-wide">
            Local Service
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Slide-down drawer */}
        {mobileOpen && (
          <div className="bg-gray-900 border-t border-gray-800 px-3 py-3 space-y-1 shadow-lg">
            {navItems.map((item) => (
              <NavLink key={item.to} item={item} />
            ))}
            {/* Logout */}
            <div className="pt-2 border-t border-gray-800 mt-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════
          DESKTOP — fixed left sidebar
          ════════════════════════════════ */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-gray-900 shadow-xl">

        {/* Brand */}
        <div className="px-6 py-6 border-b border-gray-800">
          <span className="text-xl font-bold text-indigo-400 tracking-wide">Local Service</span>
          <p className="text-xs text-gray-500 mt-0.5">Provider Dashboard</p>
        </div>

        {/* Provider Card */}
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
              SP
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Service Provider</p>
              <p className="text-xs text-gray-400 truncate">provider@local.com</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Menu
          </p>
          {navItems.map((item) => (
            <NavLink key={item.to} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-800">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </Link>
        </div>

      </aside>
      <main className="lg:ml-64 p-6">
        <Outlet />
      </main>

    </>
  )
}

export default ServiceSidebar