import React from 'react'
import { Link } from 'react-router-dom'
import Login1 from '../Login1'
import Footer from '../Footer'

export const HomePage = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Comprehensive Platform',
      desc: 'All-in-one service management for providers and users.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      title: 'Easy to Use',
      desc: 'Intuitive interface designed for everyone.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3zm6 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3z" />
        </svg>
      ),
      title: 'Secure Bookings',
      desc: 'Reliable and encrypted booking system.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M6.343 6.343a9 9 0 000 12.728M9.172 9.172a5 5 0 000 7.072" />
        </svg>
      ),
      title: '24/7 Support',
      desc: 'Round-the-clock customer assistance.',
    },
  ]

  return (
    <div className="bg-white">

      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">

          {/* Badge */}
          <span className="inline-block mb-4 px-4 py-1 text-xs sm:text-sm font-semibold tracking-widest text-indigo-300 bg-indigo-900/60 border border-indigo-700 rounded-full uppercase">
            Local Service Management
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Welcome to{' '}
            <span className="text-indigo-400">Local Service</span>{' '}
            Management System
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 mb-10">
            Your one-stop solution for managing local services efficiently —
            fast, secure, and built for everyone.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
              Get Started
            </button> */}
            <Link to="/login" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
              Get Started
            </Link>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to manage services in one place.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

      </section>
      <Footer />
    </div>
    
  )
}