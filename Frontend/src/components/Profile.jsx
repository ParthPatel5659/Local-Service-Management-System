import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiCheck, FiArrowLeft, FiActivity } from 'react-icons/fi';

export const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const defaultImage = "https://ui-avatars.com/api/?background=F59E0B&color=fff&bold=true&size=256";
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

  return (
    <div className="max-w-4xl mx-auto py-10">
      
      {/* ── Top Navigation ── */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-400 hover:text-[#1a1f2e] rounded-xl transition-all border border-gray-100 shadow-sm">
                <FiArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Account Settings</h1>
                <p className="text-gray-500 font-medium">Manage your personal information and preferences.</p>
            </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-10">
        
        {/* ── Profile Identity Card ── */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden relative">
            {/* Visual Cover Header */}
            <div className="h-48 bg-[#1a1f2e] relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/10 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-16 left-12 flex items-end gap-6">
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="Profile"
                            className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl object-cover"
                        />
                        <label className="absolute bottom-2 right-2 bg-[#F59E0B] hover:bg-[#D97706] p-3 rounded-2xl cursor-pointer shadow-lg transition-all scale-0 group-hover:scale-100 duration-300">
                            <FiCamera className="text-white text-lg" />
                            <input type="file" {...register("profilePicture")} className="hidden" />
                        </label>
                    </div>
                    <div className="mb-6 pb-2">
                        <h2 className="text-2xl font-black text-[#1a1f2e]">{watch('Firstname')} {watch('Lastname')}</h2>
                        <span className="text-[10px] font-black uppercase text-[#F59E0B] tracking-widest bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">Verified Identity</span>
                    </div>
                </div>
            </div>

            <div className="px-12 pt-24 pb-12 grid md:grid-cols-2 gap-8 mt-4">
                
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiUser /> First Name
                    </label>
                    <input
                        type="text"
                        {...register('Firstname', { required: "First name required" })}
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-inner"
                    />
                    {errors.Firstname && <p className="text-[10px] text-red-500 font-black uppercase ml-1">{errors.Firstname.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiUser /> Last Name
                    </label>
                    <input
                        type="text"
                        {...register('Lastname', { required: "Last name required" })}
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-inner"
                    />
                    {errors.Lastname && <p className="text-[10px] text-red-500 font-black uppercase ml-1">{errors.Lastname.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiMail /> Primary Email (Identity Anchor)
                    </label>
                    <div className="relative opacity-60">
                        <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            disabled
                            {...register('email')}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-400 font-bold outline-none cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiPhone /> Phone Number
                    </label>
                    <div className="relative group">
                        <FiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F59E0B] transition-colors" />
                        <input
                            type="text"
                            {...register('phone', { required: "Phone required" })}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiMapPin /> Base Address
                    </label>
                    <div className="relative group">
                        <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F59E0B] transition-colors" />
                        <input
                            type="text"
                            {...register('address', { required: "Address required" })}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                        />
                    </div>
                </div>

            </div>
        </div>

        {/* ── Submit Section ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 px-4">
            <div className="flex items-center gap-4 text-gray-400 italic text-sm font-medium">
                <FiActivity className="text-[#F59E0B]" />
                Your profile is protected by enterprise-grade encryption.
            </div>
            <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white font-black px-12 py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${loading ? "opacity-70 cursor-wait" : ""}`}
            >
                {loading ? "Updating Archive..." : "Save Profile Details"} <FiCheck size={18} />
            </button>
        </div>
      </form>
    </div>
  );
};