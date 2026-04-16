import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUser, FiPhone, FiArrowLeft, FiCheck, FiActivity, FiShield } from "react-icons/fi";

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
        toast.error("Failed to synchronize entity data.");
      }
    };

    if (id) fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      setIsUpdating(true);
      await axios.put(`/user/update/${id}`, data);
      toast.success("Identity profile updated successfully.");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Update failed. The system encountered a validation error.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      
      {/* ── Visual Anchor ── */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden border-t-8 border-t-[#F59E0B]">
        
        <div className="p-10 text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#F59E0B] mx-auto mb-6 shadow-inner border border-orange-100">
                <FiUser size={32} />
            </div>
            <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Modify Identity</h1>
            <p className="text-gray-500 font-medium mt-2 leading-relaxed">Updating administrative records for the selected platform user.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-10 pb-10 space-y-8">
            
            {/* Name Group */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiUser /> First Name
                    </label>
                    <input 
                        {...register("Firstname", { required: "First name is required" })} 
                        placeholder="John" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                    {errors.Firstname && <p className="text-[10px] text-red-500 font-black uppercase ml-1 animate-pulse">{errors.Firstname.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiUser /> Last Name
                    </label>
                    <input 
                        {...register("Lastname", { required: "Last name is required" })} 
                        placeholder="Doe" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                    {errors.Lastname && <p className="text-[10px] text-red-500 font-black uppercase ml-1 animate-pulse">{errors.Lastname.message}</p>}
                </div>
            </div>

            {/* Contact Group */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiPhone /> Phone Verification
                </label>
                <div className="relative group">
                    <FiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                    <input 
                        {...register("phone", { 
                            required: "Phone number is required",
                            minLength: { value: 10, message: "Minimum 10 digits required" }
                        })} 
                        placeholder="+91 00000 00000" 
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                </div>
                {errors.phone && <p className="text-[10px] text-red-500 font-black uppercase ml-1 animate-pulse">{errors.phone.message}</p>}
            </div>

            <div className="bg-[#1a1f2e] p-6 rounded-2xl flex items-center gap-4 border border-white/5 shadow-lg">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#F59E0B]">
                    <FiShield size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-white tracking-tight uppercase">Admin Override Active</p>
                    <p className="text-[10px] text-gray-500 font-bold">You are modifying a managed identity record.</p>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
                <button 
                    type="submit"
                    disabled={isUpdating}
                    className={`w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs ${isUpdating ? 'opacity-70 animate-pulse cursor-wait' : ''}`}
                >
                    {isUpdating ? "Processing..." : "Commit Changes"} <FiCheck size={18} />
                </button>
                
                <button 
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1a1f2e] transition-all flex items-center justify-center gap-2"
                >
                    <FiArrowLeft /> Discard Updates
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;