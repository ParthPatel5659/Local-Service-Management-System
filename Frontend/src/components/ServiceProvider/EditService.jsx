import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSave, FiArrowLeft, FiEdit3, FiMapPin, FiAlignLeft, FiActivity, FiTag, FiCheck } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const getService = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/services/service/${id}`);
        const data = res.data.data;

        setValue("serviceName", data.serviceName);
        setValue("description", data.description);
        setValue("price", data.price);
        setValue("location", data.location);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    getService();
  }, [id, setValue]);

  const submitHandler = async (data) => {
    try {
      await axios.put(`/services/update/${id}`, data);
      toast.success("Service specifications updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Operation failed. Please try again.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-12 w-12 border-4 border-[#F59E0B] border-t-transparent rounded-full shadow-lg"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      
      {/* ── Top Navigation ── */}
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white text-gray-400 hover:text-[#1a1f2e] rounded-xl transition-all border border-gray-100 shadow-sm"
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Service Update</h1>
          <p className="text-gray-500 font-medium">Refining the specifications of your professional listing.</p>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden border-t-8 border-t-[#F59E0B]">
        
        <form onSubmit={handleSubmit(submitHandler)} className="p-10 space-y-8">
            
            {/* Identity Group */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiTag /> Professional Label
                    </label>
                    <input 
                        {...register("serviceName", { required: "Name is required" })} 
                        placeholder="e.g. Master Plumbing & Repair" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                    {errors.serviceName && <p className="text-[10px] text-red-500 font-black uppercase ml-1">{errors.serviceName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiAlignLeft /> Service Narrative
                    </label>
                    <textarea 
                        {...register("description")} 
                        placeholder="Detail your professional offerings..." 
                        rows={4}
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-medium text-gray-600 leading-relaxed shadow-inner resize-none"
                    />
                </div>
            </div>

            {/* Economics & Location Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FaRupeeSign /> Pricing Structure
                    </label>
                    <input 
                        type="number"
                        {...register("price")} 
                        placeholder="Amount" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                        <FiMapPin /> Operational Zone
                    </label>
                    <input 
                        {...register("location")} 
                        placeholder="Region" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                    />
                </div>
            </div>

            <div className="bg-[#1a1f2e] p-6 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#F59E0B]">
                    <FiActivity size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-white tracking-tight uppercase">Live Marketplace Sync</p>
                    <p className="text-[10px] text-gray-500 font-bold">Changes will be visible to potential clients immediately after saving.</p>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                    type="submit" 
                    className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs"
                >
                    <FiCheck size={18} /> Update Listing
                </button>
                
                <button 
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-10 py-5 bg-gray-50 text-gray-400 hover:text-gray-600 font-black rounded-2xl transition-all uppercase tracking-widest text-xs"
                >
                    Cancel
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;