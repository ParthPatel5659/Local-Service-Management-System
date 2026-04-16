import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../AuthProvider'
import { toast } from 'react-toastify'
import { FiUser, FiMail, FiLock, FiSettings, FiCheck, FiShield, FiActivity } from 'react-icons/fi'

export const Settings = () => {
  const { userId } = useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm()

  const getUser = async () => {
    try {
      const res = await axios.get(`/user/detail/${userId}`)
      reset(res.data.data)
    } catch (error) {
      console.log(error)
      toast.error("Failed to synchronize account credentials.")
    }
  }

  useEffect(() => {
    getUser()
  }, [userId])

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/user/update/${userId}`, data)
      if (res.status === 200) {
        toast.success("Security profile updated successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("Update operation failed. Please verify inputs.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      
      {/* ── Top Navigation ── */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#F59E0B] shadow-sm border border-gray-100">
            <FiSettings size={28} />
        </div>
        <div>
            <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Account Configuration</h1>
            <p className="text-gray-500 font-medium">Manage your platform identity and security credentials.</p>
        </div>
      </div>

      {/* ── Settings Card ── */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden border-t-8 border-t-[#F59E0B]">
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
            
            {/* Identity Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiUser /> First Name
                    </label>
                    <input
                        {...register("Firstname")}
                        placeholder="John"
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiUser /> Last Name
                    </label>
                    <input
                        {...register("Lastname")}
                        placeholder="Doe"
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                </div>
            </div>

            {/* Communication Group */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiMail /> Primary Communication Email
                </label>
                <div className="relative group">
                    <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                    <input
                        {...register("email")}
                        placeholder="john@example.com"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                </div>
            </div>

            {/* Security Group */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiLock /> Credentials Reset
                </label>
                <div className="relative group">
                    <FiShield className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                    <input
                        type="password"
                        {...register("password")}
                        placeholder="••••••••••••"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                </div>
                <p className="text-[10px] text-gray-400 font-bold italic ml-1 pt-1 opacity-70">Leave empty to retain current security credentials.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl flex items-center gap-4 border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#F59E0B]">
                    <FiActivity size={18} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase text-[#1a1f2e] tracking-widest">Enterprise Data Protection</p>
                    <p className="text-[10px] text-gray-400 font-bold">Your information is encrypted before storage in our secure clusters.</p>
                </div>
            </div>

            {/* Actions */}
            <button
                type="submit"
                className="w-full bg-[#1a1f2e] hover:bg-[#F59E0B] text-white font-black py-5 rounded-2xl shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs"
            >
                Synchronize Configuration <FiCheck size={18} />
            </button>
        </form>
      </div>
    </div>
  )
}

export default Settings