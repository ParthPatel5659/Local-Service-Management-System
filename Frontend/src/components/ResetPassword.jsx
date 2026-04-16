import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle, FiShield } from 'react-icons/fi'

const ResetPassword = () => {
  const token = useParams().token
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const submitHandler = async (data) => {
    data.token = token
    try {
      const res = await axios.put("/user/resetpassword", data)
      if (res.status === 200) {
        toast.success("Security credentials updated. Please sign in.")
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
      toast.error("Operation expired. Please request a new link.")
    }
  }

  const validationSchema = {
    passwordValidation: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 6, message: "Minimum 6 characters" },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: "Must contain at least one letter and one number",
      },
    },
  }

  const tips = [
    "Minimum 6 characters",
    "Alphanumeric combination",
    "Unique from previous passwords",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm">
        
        {/* Brand Header */}
        <div className="text-center mb-10">
            <div className="text-3xl font-black tracking-tighter">
                <span className="text-[#1a1f2e]">Local</span>
                <span className="text-[#F59E0B]">Serv</span>
            </div>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#F59E0B] mx-auto mb-6 shadow-inner border border-orange-100">
                <FiLock size={32} />
            </div>

            <h1 className="text-2xl font-black text-[#1a1f2e] mb-2 tracking-tight">Set New Password</h1>
            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-10">
                Establish a robust security credential to regain access to your platform.
            </p>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 text-left">
              
              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiShield /> New Credentials
                </label>
                <div className="relative group">
                    <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("newPassword", validationSchema.passwordValidation)}
                        className="w-full pl-14 pr-14 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-black text-[#1a1f2e] shadow-inner"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1f2e] transition-colors"
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                </div>
                {errors.newPassword && (
                    <p className="text-[10px] text-red-500 font-black uppercase ml-1 animate-pulse">{errors.newPassword.message}</p>
                )}
              </div>

              {/* Security Tips */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3">
                  <p className="text-[10px] font-black text-[#1a1f2e] uppercase tracking-widest mb-1 flex items-center gap-2">
                    <FiCheckCircle className="text-[#F59E0B]" /> Requirements:
                  </p>
                  {tips.map((tip, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <span className="w-1 h-1 rounded-full bg-orange-200"></span>
                          {tip}
                      </div>
                  ))}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-[#1a1f2e] hover:bg-[#F59E0B] text-white font-black py-5 rounded-2xl shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs"
              >
                Update Assets <FiLock size={18} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#1a1f2e] tracking-widest transition-all pt-2"
              >
                <FiArrowLeft /> Return to Authentication
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword