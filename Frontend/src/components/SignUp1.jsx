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
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/register", data);
      if (res.status === 201) {
        toast.success("User Registered Successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const password = watch("password");

  const validationSchema = {
    FirstnameValidation: {
      required: {
        value: true,
        message: "First name is required",
      },
    },
    LastnameValidation: {
      required: {
        value: true,
        message: "Last name is required",
      },
    },
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
    confirmPasswordValidation: {
      required: {
        value: true,
        message: "Confirm your password",
      },
      validate: (value) => value === password || "Passwords do not match",
    },
    roleValidation: {
      required: {
        value: true,
        message: "Please select a role",
      },
    },
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 text-sm sm:text-base bg-white";

  const errorClass = "text-red-500 text-xs sm:text-sm mt-1";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to get started</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* First Name & Last Name — side by side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Firstname */}
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
              {errors.Firstname && (
                <p className={errorClass}>{errors.Firstname.message}</p>
              )}
            </div>

            {/* Lastname */}
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
              {errors.Lastname && (
                <p className={errorClass}>{errors.Lastname.message}</p>
              )}
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
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              {...register("role", validationSchema.roleValidation)}
              className={`${inputClass} text-gray-700 cursor-pointer`}
              defaultValue=""
            >
              <option value="" disabled>
                -- Select a Role --
              </option>
              <option value="user">User</option>
              <option value="provider">Service Provider</option>
            </select>
            {errors.role && (
              <p className={errorClass}>{errors.role.message}</p>
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
                placeholder="Min. 6 characters"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                {...register(
                  "confirmPassword",
                  validationSchema.confirmPasswordValidation
                )}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium select-none"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={errorClass}>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-300 font-semibold text-sm sm:text-base mt-2 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 pt-2">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-700 hover:underline font-medium transition duration-200"
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