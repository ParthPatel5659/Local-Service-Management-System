import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'

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
        toast.success("Password reset successfully")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error("Reset failed. The link may have expired.")
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
    "At least 6 characters long",
    "Contains a letter and a number",
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #fff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      }}
    >
      <div className="w-full max-w-md">
        <div
          className="bg-white rounded-2xl shadow-xl shadow-indigo-100/60 overflow-hidden"
          style={{ border: "1px solid #e8edf5" }}
        >
          {/* Header */}
          <div
            className="px-8 py-7 flex flex-col items-center text-center"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
              <FiLock className="text-white" size={26} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Reset Password</h1>
            <p className="text-indigo-200 text-sm mt-1.5 max-w-xs leading-relaxed">
              Create a strong new password for your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="px-8 py-7 space-y-5">

            {/* New Password Field */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <FiLock className="text-indigo-400" size={13} />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  {...register("newPassword", validationSchema.passwordValidation)}
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 ${
                    errors.newPassword
                      ? "ring-2 ring-red-300 bg-red-50"
                      : "bg-slate-50 hover:bg-slate-100 focus:bg-white"
                  }`}
                  style={{ border: "1px solid #dde3f0" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors duration-150"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Password Tips */}
            <div
              className="rounded-xl px-4 py-3 space-y-1.5"
              style={{ background: "#eef1f8", border: "1px solid #dde3f0" }}
            >
              {tips.map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FiCheckCircle size={12} style={{ color: "#6366f1" }} />
                  <span className="text-xs text-slate-500">{tip}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
              }}
            >
              <FiLock size={15} />
              Reset Password
            </button>

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-500 transition-colors duration-150 pt-1"
            >
              <FiArrowLeft size={13} />
              Back to Login
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword