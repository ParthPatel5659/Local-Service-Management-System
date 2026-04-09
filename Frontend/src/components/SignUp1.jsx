// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const SignUp1 = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();

//   const navigate=useNavigate();

//   const submitHandler =async(data) => {
//     try{
//      const res=await axios.post("/user/register",data);
//      if(res.status== 201){
//       toast.success("User Register Sucssesfully")
//       navigate("/")
//      }
//     }catch(err){
//       toast.error(err.response.data.message)
//     }
//   }

//   const password = watch("password");

//   const validationSchema = {
//      FirstnameValidation:{
//               required:{
//                 value:true,
//                 message:"First name is require"
//               }
//      },
//      LastnameValidation:{
//           required:{
//             value:true,
//             message:"last name is require"
//           }
//      },
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
//     confirmPasswordValidation: {
//       required: {
//         value: true,
//         message: "Confirm your password",
//       },
//       validate: (value) => value === password || "Passwords do not match",
//     },
//     phoneValidation: {
//       required: {
//         value: true,
//         message: "Phone number is required",
//       },
//       pattern: {
//         value: /^\d{10}$/,
//         message: "Invalid phone number",
//       },
//     },
//   };

  
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Sign Up
//         </h1>

//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
//           {/* Firstname */}
//           <div>
//             <input
//               type="text"
//               placeholder="Firstname"
//               {...register("Firstname", validationSchema.FirstnameValidation)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.Firstname.message}</p>
//             )}
//           </div>

//            {/* Lastname */}
//           <div>
//             <input
//               type="text"
//               placeholder="Lastname"
//               {...register("Lastname", validationSchema.LastnameValidation)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.Lastname.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", validationSchema.emailValidation)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Phone
//           <div>
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               {...register("phone", validationSchema.phoneValidation)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.phone.message}
//               </p>
//             )}
//           </div> */}

//           {/* Password */}
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password", validationSchema.passwordValidation)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               {...register(
//                 "confirmPassword",
//                 validationSchema.confirmPasswordValidation,
//               )}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//           >
//             Sign Up
//           </button>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{" "}
//             <Link to="/" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp1;


import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const password = watch("password");

  const submitHandler = async (data) => {
    const { confirmPassword, ...payload } = data;
    try {
      const res = await axios.post("/user/register", payload);
      if (res.status === 201) {
        toast.success("Registration successful! Please check your email.");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

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
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,}$/,
        message: "Must contain at least one letter and one number",
      },
    },
    confirmPasswordValidation: {
      required: { value: true, message: "Please confirm your password" },
      validate: (value) => value === password || "Passwords do not match",
    },
    roleValidation: {
      required: { value: true, message: "Please select a role" },
    },
  };

  // Shared classes
  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200";
  const errorClass = "text-red-500 text-xs mt-1";

  // Eye icon toggle
  const EyeIcon = ({ open }) =>
    open ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to get started</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} noValidate className="space-y-4">

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="John"
                {...register("Firstname", validationSchema.FirstnameValidation)}
                className={inputClass}
              />
              {errors.Firstname && <p className={errorClass}>{errors.Firstname.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Doe"
                {...register("Lastname", validationSchema.LastnameValidation)}
                className={inputClass}
              />
              {errors.Lastname && <p className={errorClass}>{errors.Lastname.message}</p>}
            </div>
          </div>

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
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              {...register("role", validationSchema.roleValidation)}
              defaultValue=""
              className={`${inputClass} text-gray-700 cursor-pointer`}
            >
              <option value="" disabled>-- Select a Role --</option>
              <option value="user">User</option>
              <option value="provider">Service Provider</option>
            </select>
            {errors.role && <p className={errorClass}>{errors.role.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                {...register("password", validationSchema.passwordValidation)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                {...register("confirmPassword", validationSchema.confirmPasswordValidation)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg text-sm mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 pt-1">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition duration-200"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp1;