import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiUser, FiMail, FiLock, FiUserPlus, FiX, FiCheck, FiShield } from 'react-icons/fi'

export const AddUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
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
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }

  /* ── Reusable Field Wrapper ── */
  const Field = ({ label, icon: Icon, error, children }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
        <Icon size={11} />
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-red-500 font-black uppercase ml-1">
          ⚠ {error}
        </p>
      )}
    </div>
  )

  const inputCls = (hasError) =>
    `w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-inner
     ${hasError
       ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-50'
       : 'border-gray-100 focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-orange-50'
     }`

  return (
    <div className="max-w-xl mx-auto py-12">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-[1.5rem] flex items-center justify-center text-3xl">
          👤
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Add New User</h1>
          <p className="text-gray-500 font-medium">Create a new account for the platform.</p>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">

        {/* Orange top accent */}
        <div className="h-2 bg-[#F59E0B]" />

        <form onSubmit={handleSubmit(submitHandler)} className="p-10 space-y-7">

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-5">
            <Field label="First Name" icon={FiUser} error={errors.Firstname?.message}>
              <input
                type="text"
                placeholder="John"
                {...register("Firstname", validationSchema.FirstnameValidation)}
                className={inputCls(!!errors.Firstname)}
              />
            </Field>

            <Field label="Last Name" icon={FiUser} error={errors.Lastname?.message}>
              <input
                type="text"
                placeholder="Doe"
                {...register("Lastname", validationSchema.LastnameValidation)}
                className={inputCls(!!errors.Lastname)}
              />
            </Field>
          </div>

          {/* Email */}
          <Field label="Email Address" icon={FiMail} error={errors.email?.message}>
            <input
              type="text"
              placeholder="john@example.com"
              {...register("email", validationSchema.emailValidation)}
              className={inputCls(!!errors.email)}
            />
          </Field>

          {/* Password */}
          <Field label="Password" icon={FiLock} error={errors.password?.message}>
            <input
              type="password"
              placeholder="Min. 6 characters — letters &amp; numbers"
              {...register("password", validationSchema.passwordValidation)}
              className={inputCls(!!errors.password)}
            />
          </Field>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
              <FiShield size={11} /> Assign Role
            </label>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "user",     label: "User",     desc: "Standard platform access",  emoji: "👤" },
                { value: "provider", label: "Provider", desc: "Service management access",  emoji: "🧑‍🔧" },
              ].map(({ value, label, desc, emoji }) => (
                <label
                  key={value}
                  className="relative flex items-center gap-4 p-5 bg-[#f9fafb] border border-gray-100 rounded-2xl cursor-pointer transition-all duration-200 has-[:checked]:border-[#F59E0B] has-[:checked]:bg-orange-50 has-[:checked]:shadow-md hover:border-gray-200 group"
                >
                  <input
                    type="radio"
                    value={value}
                    {...register("role", validationSchema.roleValidation)}
                    className="peer sr-only"
                  />
                  {/* Custom radio */}
                  <span className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 flex items-center justify-center peer-checked:border-[#F59E0B] group-has-[:checked]:border-[#F59E0B] transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] scale-0 group-has-[:checked]:scale-100 transition-transform duration-150" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-[#1a1f2e]">{emoji} {label}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {errors.role && (
              <p className="text-[10px] text-red-500 font-black uppercase ml-1">
                ⚠ {errors.role.message}
              </p>
            )}
          </div>

          {/* Info Banner */}
          <div className="bg-[#1a1f2e] p-5 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#F59E0B]">
              <FiUserPlus size={18} />
            </div>
            <div>
              <p className="text-xs font-black text-white tracking-tight uppercase">Instant Access</p>
              <p className="text-[10px] text-gray-500 font-bold">
                A verification email will be sent to the new user upon creation.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-8 py-5 text-gray-400 font-black uppercase tracking-widest text-xs hover:text-[#1a1f2e] transition-all flex items-center justify-center gap-2"
            >
              <FiX /> Discard
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white font-black px-8 py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              Create User <FiCheck size={16} />
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddUser