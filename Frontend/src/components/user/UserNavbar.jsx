// import React, { useContext, useState } from 'react'
// import { Link, Outlet } from 'react-router-dom'
// import Footer from '../Footer'
// import { AuthContext } from '../../AuthProvider'


// export const UserNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false)
//     const { userId } = useContext(AuthContext)
//     console.log(userId)

  
 
//   const navLinks = [
//     { to: `/user/services`, label: 'Services' },
//     { to: `/user/bookings`, label: 'Bookings' },
//     {to:`/user/profile/${userId}`,label:'Profile'},
//     { to: '/user/support', label: 'Support' },
//     { to: '/user/settings', label: 'Settings' },
    
//   ]

//   return (
//     <>
//     <nav className="bg-gray-900 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">

//           {/* Brand */}
//           <div className="flex-shrink-0">
//             <span className="text-xl font-bold tracking-wide text-indigo-400">
//               Local Service
//             </span>
//           </div>

//           {/* Desktop Links */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navLinks.map(({ to, label }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
//               >
//                 {label}
//               </Link>
//             ))}
//             <Link
//               to="/"
//               className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
//             >
//               Logout
//             </Link>
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? (
//                 /* X icon */
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 /* Hamburger icon */
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 px-2 pt-2 pb-4 space-y-1 border-t border-gray-700">
//           {navLinks.map(({ to, label }) => (
//             <Link
//               key={to}
//               to={to}
//               onClick={() => setIsOpen(false)}
//               className="block px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
//             >
//               {label}
//             </Link>
//           ))}
//           <Link
//             to="/user/logout"
//             onClick={() => setIsOpen(false)}
//             className="block px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white text-center transition-colors duration-200"
//           >
//             Logout
//           </Link>
//         </div>
//       )}
//     </nav>

//     <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
      
//       <Outlet />
  
//     </main>

//     <Footer />
//     </>
//   )
// }



import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { AuthContext } from '../../AuthProvider'
import axios from 'axios'

export const UserNavbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)

  const { userId } = useContext(AuthContext)

  const profileRef = useRef()
  const notificationRef = useRef()

  // ✅ User Data
  const [user, setUser] = useState({})

  // ✅ Notifications
  const [notifications, setNotifications] = useState([])

  // ============================
  // 🔹 GET USER
  // ============================
  const getUser = async () => {
    try {
      const res = await axios.get(`/user/profile/${userId}`)
      setUser(res.data.data || {})
    } catch (error) {
      console.log(error)
    }
  }

  // ============================
  // 🔹 GET NOTIFICATIONS
  // ============================
  const getNotifications = async () => {
    try {
      const res = await axios.get(`/notification/user/${userId}`)
      setNotifications(res.data.data || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userId) {
      getUser()
      getNotifications()
    }
  }, [userId])

  // ============================
  // 🔹 CLOSE DROPDOWN OUTSIDE
  // ============================
  useEffect(() => {
    const handleClickOutside = (e) => {

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }

      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { to: `/user/home`, label: 'Home' },
    { to: `/user/services`, label: 'Services' },
    { to: `/user/bookings`, label: 'Bookings' },
    { to: `/user/profile/${userId}`, label: 'Profile' },
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
            <div className="hidden md:flex items-center space-x-2">

              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
                >
                  {label}
                </Link>
              ))}

              {/* ================= 🔔 NOTIFICATION ================= */}
              <div className="relative" ref={notificationRef}>

                <div
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative cursor-pointer p-2 rounded-full hover:bg-gray-700"
                >
                  🔔

                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </div>

                {notificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white text-black rounded-xl shadow-lg border z-50">

                    <div className="p-3 border-b font-semibold text-sm">
                      Notifications
                    </div>

                    <div className="max-h-64 overflow-y-auto">

                      {notifications.length === 0 ? (
                        <p className="p-3 text-sm text-gray-500">
                          No notifications
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            onClick={async () => {
                              await axios.put(`/notification/read/${n._id}`)
                              getNotifications()
                            }}
                            className={`p-3 border-b text-sm cursor-pointer ${
                              !n.isRead ? "bg-gray-100" : ""
                            }`}
                          >
                            {n.message}
                          </div>
                        ))
                      )}

                    </div>
                  </div>
                )}
              </div>

              {/* ================= 👤 PROFILE ================= */}
              <div className="relative ml-2" ref={profileRef}>

                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded-lg transition"
                >
                  <img
                    src={user?.profilePicture || "https://i.pravatar.cc/40"}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-300">
                    {user?.Firstname} {user?.Lastname}
                  </span>
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded-xl shadow-lg border z-50 overflow-hidden">

                    <div className="p-4 border-b">
                      <p className="font-semibold text-sm">
                        {user?.Firstname} {user?.Lastname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>

                    <div className="py-2 text-sm">
                      <Link
                        to={`/user/profile/${userId}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Profile
                      </Link>

                      <Link
                        to="/user/settings"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </Link>

                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Upgrade Plan
                      </button>
                    </div>

                    <div className="border-t">
                      <Link
                        to="/"
                        className="block px-4 py-3 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </div>

                  </div>
                )}
              </div>

            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                ☰
              </button>
            </div>

          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-800 px-2 pt-2 pb-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                {label}
              </Link>
            ))}

            <Link
              to="/"
              className="block px-4 py-2 text-white bg-indigo-600 text-center"
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