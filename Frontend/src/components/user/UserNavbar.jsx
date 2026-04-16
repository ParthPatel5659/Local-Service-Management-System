import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import Footer from '../Footer'
import { AuthContext } from '../../AuthProvider'
import axios from 'axios'
import { FiBell, FiUser, FiLogOut, FiSettings, FiHelpCircle, FiMenu, FiX } from 'react-icons/fi'

export const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  const { userId, logout } = useContext(AuthContext)
  const profileRef = useRef()
  const notificationRef = useRef()

  const [user, setUser] = useState({})
  const [notifications, setNotifications] = useState([])

  const getUser = async () => {
    try {
      const res = await axios.get(`/user/profile/${userId}`)
      setUser(res.data.data || {})
    } catch (error) {
      console.log(error)
    }
  }

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: `/user/services`, label: 'Services' },
    { to: `/user/bookings`, label: 'My Bookings' },
  ]

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Top Navigation ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/user/home" className="flex items-center gap-2">
              <div className="text-2xl font-black tracking-tighter">
                <span className="text-[#1a1f2e]">Local</span>
                <span className="text-[#F59E0B]">Serv</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-bold transition-all duration-200 ${
                    isActive(to) 
                      ? "text-[#F59E0B]" 
                      : "text-gray-500 hover:text-[#F59E0B]"
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Notification Bell */}
              <div className="relative ml-4" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:text-[#F59E0B] hover:bg-orange-50 transition-all duration-200 relative"
                >
                  <FiBell size={20} />
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#F59E0B] border-2 border-white rounded-full"></span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <Link to='/user/notifications' onClick={() => setNotificationOpen(false)} className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider hover:underline">View All</Link>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-sm text-gray-400">All caught up!</p>
                        </div>
                      ) : (
                        notifications.slice(0, 5).map((n) => (
                          <div key={n._id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <p className="text-sm text-gray-700 leading-snug">{n.message}</p>
                            <span className="text-[10px] text-gray-400 font-medium mt-1 block uppercase tracking-wider">Just Now</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar & Dropdown */}
              <div className="relative ml-2" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 p-1 pl-3 pr-2 rounded-full border border-gray-100 hover:border-[#F59E0B]/30 hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="text-sm font-bold text-gray-700 hidden lg:block">
                    {user?.Firstname || "User"}
                  </span>
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
                    <img
                      src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.Firstname}+${user?.Lastname}&background=F59E0B&color=fff`}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-5 bg-gray-50 border-b border-gray-100">
                      <p className="font-bold text-gray-900">{user?.Firstname} {user?.Lastname}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2 mt-1">
                      <Link to={`/user/profile/${userId}`} onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-[#F59E0B] rounded-xl transition-all">
                        <FiUser size={18} /> Profile
                      </Link>
                      <Link to="/user/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-[#F59E0B] rounded-xl transition-all">
                        <FiSettings size={18} /> Settings
                      </Link>
                      <Link to="/user/support" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-[#F59E0B] rounded-xl transition-all">
                        <FiHelpCircle size={18} /> Support
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <FiLogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
               <div className="relative">
                  <button onClick={() => navigate("/user/notifications")} className="p-2 text-gray-500"><FiBell size={22} /></button>
               </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-900 transition-all font-bold"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 animate-in slide-in-from-top duration-300">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 rounded-xl text-base font-bold transition-all ${
                  isActive(to) ? "bg-orange-50 text-[#F59E0B]" : "text-gray-600"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-50">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-4 text-sm font-bold text-red-500"
                >
                    <FiLogOut size={18} /> Sign Out
                </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Main Content Area ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}