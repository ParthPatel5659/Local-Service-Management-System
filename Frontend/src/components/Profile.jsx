import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const defaultImage = "https://dummyimage.com/150x150/cccccc/000000&text=User";
  const [preview, setPreview] = useState(defaultImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const profilePicFile = watch("profilePicture");

  useEffect(() => {
    if (profilePicFile && profilePicFile[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(profilePicFile[0]);
    }
  }, [profilePicFile]);

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/user/profile/${id}`);
        const data = res.data?.data;
        if (!data) {
          toast.error("No profile data found");
          return;
        }
        setValue('Firstname', data.Firstname || "");
        setValue('Lastname', data.Lastname || "");
        setValue('email', data.email || "");
        setValue('phone', data.phone || "");
        setValue('address', data.address || "");
        if (data.profilePicture) setPreview(data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      }
    };
    fetchProfile();
  }, [id, setValue]);

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Firstname", data.Firstname);
      formData.append("Lastname", data.Lastname);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.profilePicture && data.profilePicture[0]) {
        formData.append("profilePicture", data.profilePicture[0]);
      }
      const res = await axios.put(`/user/profile/${id}`, formData);
      if (res.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Reusable input class for cleaner code
  const inputClass = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 border-gray-300";

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-600 py-6">
          <h2 className="text-2xl font-bold text-white text-center">Edit Profile</h2>
          <p className="text-blue-100 text-center text-sm">Keep your information up to date</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-6">
          
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <img
                src={preview}
                alt="Profile"
                onError={(e) => { e.target.src = defaultImage; }}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-gray-100"
              />
              <label className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 shadow-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" {...register("profilePicture")} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-gray-400 italic">Click the icon to upload a new photo</p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                {...register('Firstname', { required: "First name required" })}
                className={`${inputClass} ${errors.Firstname ? 'border-red-500 ring-red-100' : ''}`}
              />
              {errors.Firstname && <p className="text-red-500 text-xs mt-1">{errors.Firstname.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                {...register('Lastname', { required: "Last name required" })}
                className={`${inputClass} ${errors.Lastname ? 'border-red-500 ring-red-100' : ''}`}
              />
              {errors.Lastname && <p className="text-red-500 text-xs mt-1">{errors.Lastname.message}</p>}
            </div>

            {/* Email (Disabled) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-500 mb-1">Email Address (Fixed)</label>
              <input
                type="email"
                disabled
                {...register('email')}
                className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="1234567890"
                {...register('phone', {
                  required: "Phone required",
                  minLength: { value: 10, message: "Invalid phone number" }
                })}
                className={`${inputClass} ${errors.phone ? 'border-red-500 ring-red-100' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address</label>
              <input
                type="text"
                placeholder="123 Main St, City"
                {...register('address', { required: "Address required" })}
                className={`${inputClass} ${errors.address ? 'border-red-500 ring-red-100' : ''}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Changes...
                </>
              ) : "Save Profile Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};