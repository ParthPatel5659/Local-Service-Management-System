// import { jwtDecode } from 'jwt-decode'
// import React, { useState } from 'react'
// import { Link, useLocation, Outlet } from 'react-router-dom'

// const ServiceSidebar = () => {
//   const location = useLocation()
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const token = localStorage.getItem("token")
//   const decode = jwtDecode(token)
//   console.log(decode)
//   const id=decode._id

//   const navItems = [
//     {
//       to: '/provider/home',
//       label: 'Dashboard',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//           <rect x="3" y="3" width="7" height="7" rx="1.5" />
//           <rect x="14" y="3" width="7" height="7" rx="1.5" />
//           <rect x="3" y="14" width="7" height="7" rx="1.5" />
//           <rect x="14" y="14" width="7" height="7" rx="1.5" />
//         </svg>
//       ),
//     },
//     {
//       to: `/provider/services`,
//       label: 'Services',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
//         </svg>
//       ),
//     },
//     {
//       to: '/provider/appointments',
//       label: 'Appointments',
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//           <rect x="3" y="4" width="18" height="18" rx="2" />
//           <line x1="16" y1="2" x2="16" y2="6" />
//           <line x1="8" y1="2" x2="8" y2="6" />
//           <line x1="3" y1="10" x2="21" y2="10" />
//           <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5" strokeLinecap="round" />
//           <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5" strokeLinecap="round" />
//           <line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5" strokeLinecap="round" />
//         </svg>
//       ),
//     },
//   ]

//   const NavLink = ({ item }) => {
//     const isActive = location.pathname === item.to

//     return (
//       <Link
//         to={item.to}
//         onClick={() => setMobileOpen(false)}
//         className={`
//           group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
//           transition-all duration-200 ease-out
//           ${isActive
//             ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
//             : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
//           }
//         `}
//       >
//         <span className={`
//           flex-shrink-0 transition-transform duration-200
//           ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}
//           group-hover:scale-110
//         `}>
//           {item.icon}
//         </span>
//         <span className="truncate">{item.label}</span>
//         {isActive && (
//           <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
//         )}
//       </Link>
//     )
//   }

//   return (
//     <div className="flex min-h-screen bg-slate-100">

//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 h-full z-30 w-64 bg-slate-900
//         flex flex-col border-r border-white/5
//         transition-transform duration-300 ease-in-out
//         ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>

//         {/* Logo / Brand */}
//         <div className="px-5 py-5 border-b border-white/5">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                 <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-white text-sm font-semibold leading-none">Provider</p>
//               <p className="text-slate-500 text-xs mt-0.5 leading-none">Service Portal</p>
//             </div>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
//           <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
//             Main Menu
//           </p>
//           {navItems.map((item) => (
//             <NavLink key={item.to} item={item} />
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="px-3 py-4 border-t border-white/5">
//           <div className="flex items-center gap-3 px-3 py-2.5">
//             <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                 <circle cx="12" cy="7" r="4" />
//               </svg>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-slate-300 text-xs font-medium truncate">Provider Account</p>
//               <p className="text-slate-600 text-[11px] truncate">ID: {id ?? 'Not set'}</p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile header */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
//         <button
//           onClick={() => setMobileOpen(true)}
//           className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//             <line x1="3" y1="6" x2="21" y2="6" />
//             <line x1="3" y1="12" x2="21" y2="12" />
//             <line x1="3" y1="18" x2="21" y2="18" />
//           </svg>
//         </button>
//         <span className="text-slate-800 text-sm font-semibold">Provider Portal</span>
//       </div>

//       {/* Main content */}
//       <main className="flex-1 lg:ml-64 min-h-screen">
//         <div className="pt-14 lg:pt-0 p-6 lg:p-8">
//           <Outlet />
//         </div>
//       </main>

//     </div>
//   )
// }

// export default ServiceSidebar

// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation, Outlet } from "react-router-dom";
// import { AuthContext } from "../../AuthProvider";
// import axios from "axios";

// const ServiceSidebar = () => {
//   const location = useLocation();
//   const { userId,logout } = useContext(AuthContext)
//   console.log(userId)

//   const [user, setUser] = useState({})

//   const getUser = async () => {
//     try {
//       const res = await axios.get(`/user/profile/${userId}`)
//       console.log(res.data.data);
      
//       // setUser(res.data.data || {})
//     } catch (error) {
//       console.log(error)
//     }
//   }

//    useEffect(() => {
//       if (userId) {
//         getUser()
//       }
//     }, [userId])
 

//   // ✅ NAVIGATION ITEMS (NO ID USED ❗)
//   const navItems = [
//      {
//       to: "/provider/dashboard",
//       label: "Deshbord",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <rect x="3" y="4" width="18" height="18" rx="2" />
//           <line x1="3" y1="10" x2="21" y2="10" />
//         </svg>
//       ),
//     },
//     {
//       to: `/provider/services/${userId}`,
//       label: "Services",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
//         </svg>
//       ),
//     },
//     {
//       to: "/provider/bookings",
//       label: "Bookings",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <rect x="3" y="4" width="18" height="18" rx="2" />
//           <line x1="3" y1="10" x2="21" y2="10" />
//         </svg>
//       ),
//     },
//     {
//       to: "/provider/payment",
//       label: "Payments",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <rect x="3" y="4" width="18" height="18" rx="2" />
//           <line x1="3" y1="10" x2="21" y2="10" />
//         </svg>
//       ),
//     },
//      {
//       to: `/provider/reviwes/${userId}`,
//       label: "Reviwes",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <rect x="3" y="4" width="18" height="18" rx="2" />
//           <line x1="3" y1="10" x2="21" y2="10" />
//         </svg>
//       ),
//     },
//      {
//       to: `/provider/profile/${userId}`,
//       label: "Profile",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <rect x="3" y="4" width="18" height="18" rx="2" />
//           <line x1="3" y1="10" x2="21" y2="10" />
//         </svg>
//       ),
//     },
//      {
//       to: `/provider/activity-log`,
//       label: "Activity",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
//         </svg>
//       ),
//     },
//     {
//       to: `/provider/support`,
//       label: "Support",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//           <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
//         </svg>
//       ),
//     },
//   ];

//   // ✅ NAV LINK COMPONENT
//   const NavLink = ({ item }) => {
//     const isActive = location.pathname === item.to;

//     return (
//       <Link
//         to={item.to}
//         className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm
//         ${
//           isActive
//             ? "bg-indigo-600 text-white"
//             : "text-gray-400 hover:text-white hover:bg-gray-800"
//         }`}
//       >
//         {item.icon}
//         {item.label}
//       </Link>
//     );
//   };

//   return (
//     <div className="flex min-h-screen">

//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-4">
//         <h2 className="text-lg font-bold mb-6">Provider Panel</h2>

//         <nav className="space-y-2">
//           {navItems.map((item) => (
//             <NavLink key={item.to} item={item} />

            
//           ))}
//         </nav>

//         {/* Provider Info */}
//         <div className="mt-10 text-sm text-gray-400">
//           <p>Provider ID:</p>
//           <p className="text-white break-all">{userId}</p>
//         </div>
//                         <Link
//                        to="/"
//                        className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
//                        onChange={logout}
//                      >
//                        Logout
//                      </Link>
                   
//       </aside>
      

    
      

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default ServiceSidebar;



import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";

const ServiceSidebar = () => {
  const location = useLocation();
  const { userId, logout } = useContext(AuthContext);
  console.log(userId);

  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const res = await axios.get(`/user/profile/${userId}`);
      console.log(res.data.data);

      setUser(res.data.data || {}); // ✅ FIXED
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  // ✅ NAVIGATION ITEMS
  const navItems = [
    {
      to: "/provider/dashboard",
      label: "Deshbord",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      to: `/provider/services/${userId}`,
      label: "Services",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      to: "/provider/bookings",
      label: "Bookings",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      to: "/provider/payment",
      label: "Payments",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      to: `/provider/reviwes/${userId}`,
      label: "Reviwes",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      to: `/provider/profile/${userId}`,
      label: "Profile",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      to: `/provider/activity-log`,
      label: "Activity",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      to: `/provider/support`,
      label: "Support",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
  ];

  const NavLink = ({ item }) => {
    const isActive = location.pathname === item.to;

    return (
      <Link
        to={item.to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        {item.icon}
        {item.label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">

        {/* ✅ PROFILE SECTION */}
        <div className="mb-6 p-3 bg-gray-800 rounded-xl flex items-center gap-3">
          <img
            src={user?.profilePicture || "https://i.pravatar.cc/100"}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
          />

          <div>
            <p className="text-white font-semibold text-sm">
              {user?.Firstname} {user?.Lastname}
            </p>
            <p className="text-gray-400 text-xs capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        {/* NAV */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.to} item={item} />
          ))}
        </nav>

        {/* Provider Info
        <div className="mt-10 text-sm text-gray-400">
          <p>Provider ID:</p>
          <p className="text-white break-all">{userId}</p>
        </div> */}

        {/* ✅ LOGOUT */}
        <Link
          to="/login"
          className="ml-4 mt-4 inline-block px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
          onClick={logout}
        >
          Logout
        </Link>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default ServiceSidebar;