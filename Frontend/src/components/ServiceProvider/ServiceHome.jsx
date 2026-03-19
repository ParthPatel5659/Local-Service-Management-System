import React from 'react'

export const ServiceHome = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome to the Service Provider Dashboard</h1>
        <p className="mt-4 text-gray-600">Here you can manage your services, view bookings, and update your profile.</p>
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Quick Links</h2>
            <ul className="mt-3 space-y-2">
                <li>
                    <Link to="/service-provider/services" className="text-blue-500 hover:underline">
                        Manage Services
                    </Link>
                </li>
                <li>
                    <Link to="/service-provider/bookings" className="text-blue-500 hover:underline">
                        View Bookings
                    </Link>
                </li>
                <li>
                    <Link to="/service-provider/profile" className="text-blue-500 hover:underline">
                        Update Profile
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

   
  
