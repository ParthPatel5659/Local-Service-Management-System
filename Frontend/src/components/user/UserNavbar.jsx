import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { AuthContext } from '../../AuthProvider'


export const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { userId } = useContext(AuthContext)
  console.log(userId)

  

  
//  try {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       console.log("Decoded Token:", decoded);

//      const  id = decoded.id || "Not found"; // ✅ FIXED
//       console.log(id)
//     }
//   } catch (error) {
//     console.log("Token decode error:", error);
//   }
 
  const navLinks = [
    { to: `/user/services/${userId}`, label: 'Services' },
    { to: '/user/bookings', label: 'Bookings' },
    { to: '/user/support', label: 'Support' },
    { to: '/user/settings', label: 'Settings' },
    
  ]

  return (
    <>
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold tracking-wide text-indigo-400">
              Local Service
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/"
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
            >
              Logout
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                /* X icon */
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-4 space-y-1 border-t border-gray-700">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/user/logout"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white text-center transition-colors duration-200"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>

    <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
      
      <Outlet />
  
    </main>

    <Footer />
    </>
  )
}