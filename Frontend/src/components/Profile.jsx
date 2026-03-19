import React, { useState } from 'react'

export const Profile = () => {
  const [avatar, setAvatar] = useState(null)

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (file) setAvatar(URL.createObjectURL(file))
  }

  const fields = [
    { label: 'Full Name',     type: 'text',  placeholder: 'John Doe',                id: 'name'    },
    { label: 'Email Address', type: 'email', placeholder: 'john@example.com',         id: 'email'   },
    { label: 'Phone Number',  type: 'tel',   placeholder: '+1 123-456-7890',          id: 'phone'   },
    { label: 'Address',       type: 'text',  placeholder: '123 Main St, City, Country', id: 'address' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and account settings.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl overflow-hidden">

          {/* ── Top Banner ── */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900" />

          {/* ── Avatar ── */}
          <div className="px-6 sm:px-8 -mt-12 sm:-mt-14 mb-4 flex items-end justify-between">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-indigo-100 overflow-hidden shadow-md">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indigo-400">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Camera badge */}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow transition-colors duration-200"
                title="Change photo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatar}
                />
              </label>
            </div>

            {/* Status badge */}
            <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Active Account
            </span>
          </div>

          {/* ── Form ── */}
          <div className="px-6 sm:px-8 pb-8">

            {/* Name + Email side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {fields.slice(0, 2).map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
              ))}
            </div>

            {/* Phone + Address side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {fields.slice(2).map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-6" />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                Cancel
              </button>
              <button className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow transition-colors duration-200">
                Update Profile
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}