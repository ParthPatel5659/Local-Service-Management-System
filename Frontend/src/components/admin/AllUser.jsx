import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiUserPlus, FiMail, FiUsers, FiEdit3, FiEye, FiMoreVertical } from 'react-icons/fi'

export const AllUser = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const getAllUser = async () => {
    try {
      const res = await axios.get(`/user/users`)
      setUsers(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUser()
  }, [])

  const filtered = users.filter((u) =>
    `${u.Firstname} ${u.Lastname} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">System Users</h1>
          <p className="text-gray-500 mt-1 font-medium">Managing all registered accounts across the platform.</p>
        </div>
        <Link
          to="/admin/addUser"
          className="flex items-center gap-3 px-8 py-4 bg-[#F59E0B] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-[#D97706] transition-all"
        >
          <FiUserPlus size={18} /> Add New User
        </Link>
      </div>

      {/* ── Search Area ── */}
      <div className="relative max-w-xl">
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300"
        />
      </div>

      {/* ── User Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full text-gray-200 text-5xl mx-auto mb-8 shadow-inner">👤</div>
          <h3 className="text-2xl font-black text-[#1a1f2e]">No Users Found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">Try searching for a different name or criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {filtered.map((user) => (
            <div
              key={user._id}
              className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50/50 rounded-bl-[4rem] group-hover:bg-[#F59E0B]/10 transition-colors"></div>

              {/* Avatar */}
              <div className="relative mb-6">
                <img 
                    src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.Firstname}+${user.Lastname}&background=f9fafb&color=F59E0B&bold=true&size=128`} 
                    alt="user" 
                    className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
              </div>

              {/* Name & Role */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-[#1a1f2e] group-hover:text-[#F59E0B] transition-colors truncate w-full px-2">
                    {user.Firstname} {user.Lastname}
                </h3>
                <span className="inline-block mt-2 px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-100">
                    {user.role || 'Standard User'}
                </span>
              </div>

              {/* Details List */}
              <div className="w-full space-y-3 mb-8">
                  <div className="flex items-center gap-2 p-3 bg-gray-50/50 rounded-xl border border-gray-50 transition-colors group-hover:bg-white group-hover:border-orange-50 group-hover:shadow-sm">
                      <FiMail size={14} className="text-gray-400 group-hover:text-[#F59E0B]" />
                      <p className="text-[11px] font-bold text-gray-500 truncate">{user.email}</p>
                  </div>
              </div>

              {/* Actions */}
              <div className="w-full grid grid-cols-2 gap-3 pt-6 border-t border-gray-50 mt-auto">
                <button
                  onClick={() => navigate(`/admin/users/update/${user._id}`)}
                  className="flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-[#F59E0B] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-gray-50 hover:border-orange-100"
                >
                  <FiEdit3 /> Edit
                </button>
                <button
                  onClick={() => navigate(`/admin/users/detail/${user._id}`)}
                  className="flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-[#1a1f2e] text-gray-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-gray-50 hover:border-[#1a1f2e]"
                >
                  <FiEye /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllUser