// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login1 = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const validationSchema = {
//     emailValidation: {
//       required: {
//         value: true,
//         message: "Email is required",
//       },
//       pattern: {
//         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//         message: "Invalid email address",
//       },
//     },
//     passwordValidation: {
//       required: {
//         value: true,
//         message: "Password is required",
//       },
//       minLength: {
//         value: 6,
//         message: "Minimum 6 characters",
//       },
//       pattern: {
//         value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
//         message: "Password must contain at least one letter and one number",
//       },
//     },
//   };

//   const submitHandler = async (data) => {
//     try {
//       const res = await axios.post("/user/login", data);
    
//       if (res.status === 201) {
//         toast.success("Login successful ");

//         switch (res.data.role) {
//           case "admin": navigate("/admin"); break;
//           case "ServiceProvider":  navigate("/serviceprovider"); break;
//          case "user": navigate("/user"); break;
//           default:
//             toast.error("invalid role")
//             navigate("/")
//             break;
//         }
       
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login Failed")
//     }
//   }
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Login
//         </h1>
//         <form
//           onSubmit={handleSubmit(submitHandler)}
//           className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//         >
//           <input
//             type="email"
//             placeholder="Email"
//             {...register("email", validationSchema.emailValidation)}
//             className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//           <br />
//           <input
//             type="password"
//             placeholder="Password"
//             {...register("password", validationSchema.passwordValidation)}
//             className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.password.message}
//             </p>
//           )}
//           <br />
//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" {...register("rememberMe")} />
//               Remember Me
//             </label>

//             <Link
//               to="/forgot-password"
//               className="text-blue-500 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <div className="mt-6">
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//           >
//             Login
//           </button>
//           </div>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Don't have an account?{" "}
//            <Link to="/signup" className="text-blue-500 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login1;


import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login1 = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationSchema = {
    emailValidation: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    passwordValidation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 6,
        message: "Minimum 6 characters",
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: "Password must contain at least one letter and one number",
      },
    },
  };

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);

      if (res.status === 201) {
        toast.success("Login successful");
        console.log(res.data);
        console.log(res.data.data);

        console.log(res.data.token);
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("role",res.data.role)
        
        
        switch (res.data.role) {
          case "admin":
            navigate("/admin");
            console.log("admin");
            break;
          case "provider":
            navigate("/provider");
            break;
          case "user":
            navigate("/user");
            break;
          default:
            toast.error("Invalid role");
            navigate("/");
            break;
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 text-sm sm:text-base bg-white";

  const errorClass = "text-red-500 text-xs sm:text-sm mt-1";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-1">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", validationSchema.emailValidation)}
              className={inputClass}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", validationSchema.passwordValidation)}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium select-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-700 hover:underline transition duration-200"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-300 font-semibold text-sm sm:text-base mt-2 shadow-md hover:shadow-lg"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 pt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 hover:underline font-medium transition duration-200"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login1;