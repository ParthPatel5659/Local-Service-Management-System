import React, { useState } from 'react'

const initialBookings = [
  {
    id: 1,
    title: 'Plumbing Service',
    date: 'July 15, 2024',
    time: '10:00 AM',
    status: 'Confirmed',
    price: '$49/hr',
    provider: 'John Smith',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 14v-1a4 4 0 014-4h4M8 14H5a2 2 0 01-2-2V7a2 2 0 012-2h3m0 9v3m0-3h8m0 0v3m0-3a4 4 0 100-8H8" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Electrical Service',
    date: 'July 20, 2024',
    time: '2:00 PM',
    status: 'Pending',
    price: '$59/hr',
    provider: 'Mike Johnson',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Cleaning Service',
    date: 'July 25, 2024',
    time: '9:00 AM',
    status: 'Confirmed',
    price: '$39/hr',
    provider: 'Sarah Lee',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Gardening Service',
    date: 'July 30, 2024',
    time: '11:00 AM',
    status: 'Pending',
    price: '$35/hr',
    provider: 'Emily Rose',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 21s3-9 9-9 9 9 9 9M12 3v9" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Painting Service',
    date: 'August 2, 2024',
    time: '8:00 AM',
    status: 'Completed',
    price: '$45/hr',
    provider: 'Carlos Diaz',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Carpentry Service',
    date: 'August 5, 2024',
    time: '1:00 PM',
    status: 'Cancelled',
    price: '$55/hr',
    provider: 'David Brown',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
]

const statusConfig = {
  Confirmed: { dot: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-100'  },
  Pending:   { dot: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-100' },
  Completed: { dot: 'bg-blue-500',   text: 'text-blue-700',   bg: 'bg-blue-100'   },
  Cancelled: { dot: 'bg-red-400',    text: 'text-red-600',    bg: 'bg-red-100'    },
}

const tabs = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled']

const Bookings = () => {
  const [bookings, setBookings]   = useState(initialBookings)
  const [activeTab, setActiveTab] = useState('All')
  const [cancelId, setCancelId]   = useState(null)

  const filtered = activeTab === 'All'
    ? bookings
    : bookings.filter((b) => b.status === activeTab)

  const counts = tabs.reduce((acc, t) => {
    acc[t] = t === 'All' ? bookings.length : bookings.filter(b => b.status === t).length
    return acc
  }, {})

  const confirmCancel = () => {
    setBookings((prev) =>
      prev.map((b) => b.id === cancelId ? { ...b, status: 'Cancelled' } : b)
    )
    setCancelId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Page Header ── */}
      <div className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-1">Your Bookings</h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Track and manage all your service appointments.
          </p>

          {/* Stats Row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Confirmed', 'Pending', 'Completed', 'Cancelled'].map((s) => (
              <div key={s} className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/10">
                <p className="text-xs text-gray-300 uppercase tracking-wide">{s}</p>
                <p className="text-2xl font-bold text-white mt-0.5">{counts[s]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                ${activeTab === tab
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
            >
              {tab}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full
                ${activeTab === tab ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* ── Booking Cards ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((booking) => {
              const s = statusConfig[booking.status]
              const isCancellable = booking.status === 'Confirmed' || booking.status === 'Pending'
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-indigo-200 transition-all duration-200 flex flex-col"
                >
                  {/* Card Body */}
                  <div className="p-6 flex-1">
                    {/* Icon + Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        {booking.icon}
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {booking.status}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-gray-900 mb-3">{booking.title}</h2>

                    {/* Meta Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {booking.provider}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-base font-bold text-indigo-600">{booking.price}</span>
                    {isCancellable ? (
                      <button
                        onClick={() => setCancelId(booking.id)}
                        className="px-4 py-2 text-sm font-semibold bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        {booking.status === 'Completed' ? 'Service done' : 'Cancelled'}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm font-medium">No bookings found in this category.</p>
          </div>
        )}
      </div>

      {/* ── Cancel Confirmation Modal ── */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-center text-lg font-bold text-gray-900 mb-1">Cancel Booking?</h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-200"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Bookings