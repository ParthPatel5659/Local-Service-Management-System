import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiMail, FiArrowLeft, FiLock } from 'react-icons/fi'

export const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/forgotpassword", data)
      if (res.status === 200) {
        toast.success("Reset password link sent to your email")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  const validationSchema = {
    emailValidater: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #fff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      }}
    >
      <div className="w-full max-w-md">

        {/* Card */}
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
            <h1 className="text-xl font-bold text-white tracking-tight">Forgot Password?</h1>
            <p className="text-indigo-200 text-sm mt-1.5 max-w-xs leading-relaxed">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="px-8 py-7 space-y-5">

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <FiMail className="text-indigo-400" size={13} />
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email", validationSchema.emailValidater)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 ${
                  errors.email
                    ? "ring-2 ring-red-300 bg-red-50"
                    : "bg-slate-50 hover:bg-slate-100 focus:bg-white"
                }`}
                style={{ border: "1px solid #dde3f0" }}
              />
              {errors.email && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                  {errors.email.message}
                </p>
              )}
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
              <FiMail size={15} />
              Send Reset Link
            </button>

            {/* Back to Login */}
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

export default ForgotPassword