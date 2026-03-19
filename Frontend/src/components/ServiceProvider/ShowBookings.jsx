import React, { useState } from 'react'

const upcomingData = [
  {
    id: 1, title: 'Plumbing Service',   date: 'July 15, 2024', time: '10:00 AM',
    status: 'Confirmed', price: '$49/hr', provider: 'John Smith',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 14v-1a4 4 0 014-4h4M8 14H5a2 2 0 01-2-2V7a2 2 0 012-2h3m0 9v3m0-3h8m0 0v3m0-3a4 4 0 100-8H8"/></svg>,
  },
  {
    id: 2, title: 'Electrical Repair',  date: 'July 20, 2024', time: '2:00 PM',
    status: 'Pending',   price: '$59/hr', provider: 'Mike Johnson',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  },
  {
    id: 3, title: 'Carpentry Work',     date: 'July 28, 2024', time: '9:00 AM',
    status: 'Confirmed', price: '$55/hr', provider: 'David Brown',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>,
  },
]

const pastData = [
  {
    id: 4, title: 'House Cleaning',     date: 'June 10, 2024', time: '9:00 AM',
    status: 'Completed', price: '$39/hr', provider: 'Sarah Lee',    rating: 5,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>,
  },
  {
    id: 5, title: 'Gardening Service',  date: 'June 5, 2024',  time: '11:00 AM',
    status: 'Completed', price: '$35/hr', provider: 'Emily Rose',   rating: 4,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21s3-9 9-9 9 9 9 9M12 3v9"/></svg>,
  },
  {
    id: 6, title: 'Painting Service',   date: 'May 22, 2024',  time: '8:00 AM',
    status: 'Cancelled', price: '$45/hr', provider: 'Carlos Diaz',  rating: null,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>,
  },
]

const statusConfig = {
  Confirmed: { dot: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-100'  },
  Pending:   { dot: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-100' },
  Completed: { dot: 'bg-blue-500',   text: 'text-blue-700',   bg: 'bg-blue-100'   },
  Cancelled: { dot: 'bg-red-400',    text: 'text-red-600',    bg: 'bg-red-100'    },
}

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(s => (
      <svg key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
)

const ShowBookings = () => {
  const [upcoming, setUpcoming] = useState(upcomingData)
  const [cancelId, setCancelId] = useState(null)
  const [activeTab, setActiveTab] = useState('upcoming')

  const confirmCancel = () => {
    setUpcoming(prev => prev.map(b => b.id === cancelId ? { ...b, status: 'Cancelled' } : b))
    setCancelId(null)
  }

  const stats = [
    { label: 'Upcoming',  value: upcoming.filter(b => b.status !== 'Cancelled').length, color: 'text-indigo-400' },
    { label: 'Completed', value: pastData.filter(b => b.status === 'Completed').length,  color: 'text-blue-400'   },
    { label: 'Cancelled', value: [...upcoming, ...pastData].filter(b => b.status === 'Cancelled').length, color: 'text-red-400' },
    { label: 'Total',     value: upcoming.length + pastData.length,                       color: 'text-green-400'  },
  ]

  /* ── Reusable booking row ── */
  const BookingRow = ({ booking, cancellable }) => {
    const s = statusConfig[booking.status]
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-xl transition-all duration-200">

        {/* Left — icon + info */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            {booking.icon}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{booking.title}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
              {/* date */}
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {booking.date}
              </span>
              {/* time */}
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {booking.time}
              </span>
              {/* provider */}
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                {booking.provider}
              </span>
            </div>
            {/* star rating for past */}
            {booking.rating && (
              <div className="mt-1.5">
                <StarRating rating={booking.rating} />
              </div>
            )}
          </div>
        </div>

        {/* Right — price + status + action */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 pl-14 sm:pl-0">
          <span className="text-sm font-bold text-indigo-600">{booking.price}</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {booking.status}
          </span>
          {cancellable && booking.status !== 'Cancelled' && (
            <button
              onClick={() => setCancelId(booking.id)}
              className="px-3 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-1">Your Bookings</h1>
          <p className="text-gray-300 text-sm sm:text-base mb-7">
            View and manage all your current and past service appointments.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur border border-white/10 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                <p className={`text-2xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit">
          {['upcoming', 'past'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200
                ${activeTab === tab
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-500 hover:text-indigo-600'
                }`}
            >
              {tab === 'upcoming' ? `Upcoming (${upcoming.filter(b => b.status !== 'Cancelled').length})` : `Past (${pastData.length})`}
            </button>
          ))}
        </div>

        {/* ── Upcoming ── */}
        {activeTab === 'upcoming' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Upcoming Bookings</h2>
              <span className="text-xs text-gray-400">{upcoming.length} total</span>
            </div>
            <div className="p-4 space-y-3">
              {upcoming.length > 0 ? (
                upcoming.map(b => <BookingRow key={b.id} booking={b} cancellable={true} />)
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <svg className="w-10 h-10 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-sm">No upcoming bookings.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Past ── */}
        {activeTab === 'past' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Past Bookings</h2>
              <span className="text-xs text-gray-400">{pastData.length} total</span>
            </div>
            <div className="p-4 space-y-3">
              {pastData.map(b => <BookingRow key={b.id} booking={b} cancellable={false} />)}
            </div>
          </div>
        )}
      </div>

      {/* ── Cancel Modal ── */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              </svg>
            </div>
            <h3 className="text-center text-lg font-bold text-gray-900 mb-1">Cancel Booking?</h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Keep It
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-200"
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

export default ShowBookings