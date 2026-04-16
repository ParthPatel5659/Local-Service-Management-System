import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();
  const password = watch("password");

  const submitHandler = async (data) => {
    const { confirmPassword, ...payload } = data;
    // Inject the selected role into the payload
    payload.role = selectedRole;
    
    try {
      const res = await axios.post("/user/register", payload);
      if (res.status === 201) {
        toast.success("Registration successful! Welcome to LocalServ.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const validationSchema = {
    FirstnameValidation: { required: "First name is required" },
    LastnameValidation: { required: "Last name is required" },
    emailValidation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    phoneValidation: {
      required: "Phone number is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number (10 digits required)",
      },
    },
    passwordValidation: {
      required: "Password is required",
      minLength: { value: 6, message: "Minimum 6 characters" },
    },
    confirmPasswordValidation: {
      required: "Please confirm your password",
      validate: (value) => value === password || "Passwords do not match",
    },
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* ── Left Panel (Brand/Join) ── */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#14b8a6] p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full -mr-48 -mb-48"></div>

        <div className="relative z-10 text-center">
            <div className="text-4xl font-black mb-8 tracking-tighter">
                <span className="text-gray-900">Local</span>
                <span className="text-white">Serv</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">Join LocalServ</h1>
            <p className="text-xl text-white/90 max-w-md mx-auto leading-relaxed">
                Start your journey today. Whether you need a service or want to provide one, we've got you covered.
            </p>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 sm:p-12 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500 text-sm font-medium">Join the LocalServ community</p>
          </div>

          {/* Role Toggle Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            <button
                type="button"
                onClick={() => setSelectedRole("user")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  selectedRole === "user"
                    ? "bg-white text-[#14b8a6] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                I need services
            </button>
            <button
                type="button"
                onClick={() => setSelectedRole("provider")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  selectedRole === "provider"
                    ? "bg-white text-[#14b8a6] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                I provide services
            </button>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">First Name</label>
                    <input
                        type="text"
                        placeholder="John"
                        {...register("Firstname", validationSchema.FirstnameValidation)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] outline-none transition-all text-gray-800 text-sm"
                    />
                    {errors.Firstname && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.Firstname.message}</p>}
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Last Name</label>
                    <input
                        type="text"
                        placeholder="Doe"
                        {...register("Lastname", validationSchema.LastnameValidation)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] outline-none transition-all text-gray-800 text-sm"
                    />
                    {errors.Lastname && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.Lastname.message}</p>}
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email", validationSchema.emailValidation)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] outline-none transition-all text-gray-800 text-sm"
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.email.message}</p>}
            </div>

            {/* <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                placeholder="10 digit number"
                {...register("phone", validationSchema.phoneValidation)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] outline-none transition-all text-gray-800 text-sm"
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.phone.message}</p>}
            </div> */}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("password", validationSchema.passwordValidation)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] outline-none transition-all text-gray-800 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Confirm</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("confirmPassword", validationSchema.confirmPasswordValidation)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] outline-none transition-all text-gray-800 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.confirmPassword.message}</p>}
                </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-teal-100 transition-all active:scale-[0.98] mt-4"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-[#14b8a6] font-bold hover:underline transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp1;