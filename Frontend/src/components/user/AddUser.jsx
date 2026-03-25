import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi'

export const AddUser = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const navigate = useNavigate()

  const validationSchema = {
    FirstnameValidation: {
      required: { value: true, message: "First name is required" },
    },
    LastnameValidation: {
      required: { value: true, message: "Last name is required" },
    },
    emailValidation: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    passwordValidation: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 6, message: "Minimum 6 characters" },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: "Password must contain at least one letter and one number",
      },
    },
    roleValidation: {
      required: { value: true, message: "Please select a role" },
    },
  }

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/register", data)
      if (res.status === 201) {
        toast.success("User created successfully")
        navigate(-1)
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  const InputField = ({ label, icon: Icon, error, children }) => (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
        <Icon className="text-indigo-400" size={13} />
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Card */}
        <div
          className="bg-white rounded-2xl shadow-xl shadow-indigo-100/60 overflow-hidden"
          style={{ border: "1px solid #e8edf5" }}
        >
          {/* Header */}
          <div
            className="px-8 py-6 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <FiUserPlus className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Add New User</h1>
              <p className="text-indigo-200 text-sm mt-0.5">Fill in the details to create an account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="px-8 py-7 space-y-5">

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" icon={FiUser} error={errors.Firstname?.message}>
                <input
                  type="text"
                  placeholder="John"
                  {...register("Firstname", validationSchema.FirstnameValidation)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 ${
                    errors.Firstname ? "ring-2 ring-red-300 bg-red-50" : "bg-slate-50 hover:bg-slate-100 focus:bg-white"
                  }`}
                  style={{ border: "1px solid #dde3f0" }}
                />
              </InputField>

              <InputField label="Last Name" icon={FiUser} error={errors.Lastname?.message}>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("Lastname", validationSchema.LastnameValidation)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 ${
                    errors.Lastname ? "ring-2 ring-red-300 bg-red-50" : "bg-slate-50 hover:bg-slate-100 focus:bg-white"
                  }`}
                  style={{ border: "1px solid #dde3f0" }}
                />
              </InputField>
            </div>

            {/* Email */}
            <InputField label="Email" icon={FiMail} error={errors.email?.message}>
              <input
                type="text"
                placeholder="john@example.com"
                {...register("email", validationSchema.emailValidation)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 ${
                  errors.email ? "ring-2 ring-red-300 bg-red-50" : "bg-slate-50 hover:bg-slate-100 focus:bg-white"
                }`}
                style={{ border: "1px solid #dde3f0" }}
              />
            </InputField>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <FiUser className="text-indigo-400" size={13} />
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "user", label: "User", desc: "Standard access" },
                  { value: "provider", label: "Provider", desc: "Service access" },
                ].map(({ value, label, desc }) => (
                  <label
                    key={value}
                    className="relative flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-150 group"
                    style={{ border: "1px solid #dde3f0", background: "#f8fafc" }}
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("role", validationSchema.roleValidation)}
                      className="peer sr-only"
                    />
                    {/* Custom radio circle */}
                    <span className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0 flex items-center justify-center peer-checked:border-indigo-500 transition-colors duration-150 group-has-[input:checked]:border-indigo-500">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 scale-0 peer-checked:scale-100 transition-transform duration-150 group-has-[input:checked]:scale-100" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{label}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                    {/* Checked overlay border */}
                    <span className="absolute inset-0 rounded-xl ring-2 ring-indigo-400 ring-offset-0 opacity-0 group-has-[input:checked]:opacity-100 transition-opacity duration-150 pointer-events-none" />
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Password */}
            <InputField label="Password" icon={FiLock} error={errors.password?.message}>
              <input
                type="password"
                placeholder="Min. 6 characters"
                {...register("password", validationSchema.passwordValidation)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 ${
                  errors.password ? "ring-2 ring-red-300 bg-red-50" : "bg-slate-50 hover:bg-slate-100 focus:bg-white"
                }`}
                style={{ border: "1px solid #dde3f0" }}
              />
            </InputField>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150"
                style={{ border: "1px solid #dde3f0" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 15px rgba(99,102,241,0.35)" }}
              >
                <FiUserPlus size={15} />
                Create User
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUser