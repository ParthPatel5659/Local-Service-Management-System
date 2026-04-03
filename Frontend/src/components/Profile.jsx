import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("https://via.placeholder.com/150");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Watch for file changes to show a preview
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
        const data = res.data.data;

        // Populate fields
        setValue('Firstname', data.Firstname);
        setValue('Lastname', data.Lastname);
        setValue('email', data.email);
        setValue('phone', data.phone);
        setValue('address', data.address);
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
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500">Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={preview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  {...register('profilePicture')}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                {...register('Firstname', { required: 'First name is required' })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.Firstname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.Firstname && <p className="text-red-500 text-xs mt-1">{errors.Firstname.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                {...register('Lastname', { required: 'Last name is required' })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.Lastname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.Lastname && <p className="text-red-500 text-xs mt-1">{errors.Lastname.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Email Address (Read Only)</label>
            <input
              type="email"
              disabled
              {...register('email')}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed shadow-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register('phone', {
                required: 'Phone is required',
                minLength: { value: 10, message: 'Enter valid phone' },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              rows="3"
              {...register('address', { required: 'Address is required' })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};