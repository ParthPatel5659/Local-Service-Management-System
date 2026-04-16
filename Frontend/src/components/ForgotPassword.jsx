import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiMail, FiArrowLeft } from 'react-icons/fi'

export const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/forgotpassword", data)
      if (res.status === 200) {
        toast.success("Reset password link sent to your email")
        navigate("/login")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  const validationSchema = {
    emailValidater: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Brand Logo */}
        <div className="text-center mb-8">
            <div className="text-3xl font-black tracking-tighter">
                <span className="text-[#1a1f2e]">Local</span>
                <span className="text-[#F59E0B]">Serv</span>
            </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-8 pb-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              No worries! Enter your email address below and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", validationSchema.emailValidater)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B]/20 focus:border-[#F59E0B] outline-none transition-all text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
              >
                Send Reset Link
              </button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-[#F59E0B] transition-colors pt-2"
              >
                <FiArrowLeft size={16} />
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword