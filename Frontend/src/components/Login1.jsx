import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login1 = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("Customer");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationSchema = {
    emailValidation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    passwordValidation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Minimum 6 characters",
      },
    },
  };

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);

      if (res.status === 201) {
        login(res.data.token);
        toast.success("Welcome back!");
        switch (res.data.role) {
          case "admin": navigate("/admin"); break;
          case "provider": navigate("/provider"); break;
          case "user": navigate("/user"); break;
          default:
            toast.error("Invalid role assigned");
            navigate("/");
            break;
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* ── Left Panel (Brand/Welcome) ── */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#F59E0B] p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full -ml-48 -mb-48"></div>

        <div className="relative z-10 text-center">
            <div className="text-4xl font-black mb-8 tracking-tighter">
                <span className="text-gray-900">Local</span>
                <span className="text-white">Serv</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">Welcome Back</h1>
            <p className="text-xl text-white/90 max-w-md mx-auto leading-relaxed">
                Connect with local experts or manage your services with ease. Your community and tools, all in one place.
            </p>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 sm:p-12 md:p-20">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-500 text-sm font-medium">Access your LocalServ account</p>
          </div>

          {/* Role Tab Switcher */}
          {/* <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            {["Customer", "Provider", "Admin"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-[#F59E0B] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div> */}

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email", validationSchema.emailValidation)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B]/20 focus:border-[#F59E0B] outline-none transition-all text-gray-800 text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-[#F59E0B] hover:underline transition-all"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", validationSchema.passwordValidation)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B]/20 focus:border-[#F59E0B] outline-none transition-all text-gray-800 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-orange-100 transition-all active:scale-[0.98] mt-6"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-10">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#F59E0B] font-bold hover:underline transition-all">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login1;