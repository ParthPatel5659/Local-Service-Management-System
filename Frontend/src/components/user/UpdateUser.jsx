import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors } 
  } = useForm();

  // ✅ Fetch existing data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user/detail/${id}`);
        const data = res.data.data;
        
        setValue("Firstname", data.Firstname);
        setValue("Lastname", data.Lastname);
        setValue("phone", data.phone);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user data");
      }
    };

    if (id) fetchUser();
  }, [id, setValue]);

  // ✅ Update Logic
  const onSubmit = async (data) => {
    try {
      setIsUpdating(true);
      await axios.put(`/user/update/${id}`, data);
      toast.success("User information updated successfully");
      navigate(-1); // Go back to previous page
    } catch (error) {
      console.error(error);
      toast.error("Update failed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Reusable Tailwind classes for inputs
  const inputStyle = "w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-200";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 text-center text-white">
          <h1 className="text-2xl font-bold">Update Profile</h1>
          <p className="text-indigo-100 text-sm mt-1">Refine user information details</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          
          {/* First Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
            <input 
              {...register("Firstname", { required: "First name is required" })} 
              placeholder="Enter first name" 
              className={inputStyle} 
            />
            {errors.Firstname && <p className="text-red-500 text-xs ml-1">{errors.Firstname.message}</p>}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
            <input 
              {...register("Lastname", { required: "Last name is required" })} 
              placeholder="Enter last name" 
              className={inputStyle} 
            />
            {errors.Lastname && <p className="text-red-500 text-xs ml-1">{errors.Lastname.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
            <input 
              {...register("phone", { 
                required: "Phone number is required",
                minLength: { value: 10, message: "Minimum 10 digits required" }
              })} 
              placeholder="e.g. +91 9876543210" 
              className={inputStyle} 
            />
            {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit"
              disabled={isUpdating}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : "Save Changes"}
            </button>
            
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;