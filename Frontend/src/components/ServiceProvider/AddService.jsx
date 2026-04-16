import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";
import { FiPlus, FiInfo, FiMapPin, FiTag, FiCheck, FiX, FiActivity } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

export const AddService = () => {
  const { userId } = useContext(AuthContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("/category/all");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setValue("categoryId", id);
  };

  const submitHandler = async (data) => {
    if (!userId) {
      toast.error("Provider session not found");
      return;
    }
    try {
      const res = await axios.post("/services/add", {
        ...data,
        providerId: userId
      });

      if (res.status === 201) {
        toast.success("Service listed successfully!");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Error adding service");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-50 text-[#F59E0B] rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-orange-100">
                <FiPlus strokeWidth={3} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">List New Service</h1>
                <p className="text-gray-500 font-medium">Create a professional listing to reach more customers.</p>
            </div>
        </div>
        <button onClick={() => navigate(-1)} className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-gray-100">
            <FiX size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-10">
        
        {/* ── Section: Service Identity ── */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-gray-50 mb-4">
                <span className="w-2 h-6 bg-[#F59E0B] rounded-full"></span>
                <h3 className="text-xl font-black text-[#1a1f2e]">General Information</h3>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Service Headline</label>
                <div className="relative group">
                    <FiTag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                    <input
                        type="text"
                        placeholder="e.g. Professional Deep Cleaning & Sanitization"
                        {...register("serviceName", { required: "Service headline is required" })}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-orange-50 outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300"
                    />
                </div>
                {errors.serviceName && <span className="text-[10px] text-red-500 font-black uppercase ml-1">{errors.serviceName.message}</span>}
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Service Description</label>
                <div className="relative group">
                    <FiInfo className="absolute left-5 top-6 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                    <textarea
                        rows={5}
                        placeholder="Provide a detailed overview of what's included in this service, your expertise, and why customers should choose you."
                        {...register("description")}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-orange-50 outline-none transition-all font-medium text-gray-600 leading-relaxed placeholder-gray-300 resize-none"
                    />
                </div>
            </div>
        </div>

        {/* ── Section: Category & Pricing ── */}
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-[#1a1f2e] mb-4">Pricing & Location</h3>
                
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Service Fee</label>
                    <div className="relative group">
                        <FaRupeeSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                        <input
                            type="number"
                            placeholder="500"
                            {...register("price", { required: "Price is required" })}
                            className="w-full pl-14 pr-16 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] font-black text-xl text-[#1a1f2e] outline-none transition-all shadow-inner"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400 uppercase">/ Service</span>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Service Area</label>
                    <div className="relative group">
                        <FiMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                        <input
                            type="text"
                            placeholder="e.g. City Center, Manhattan"
                            {...register("location")}
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] font-bold text-[#1a1f2e] outline-none transition-all shadow-inner"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#1a1f2e] p-8 md:p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 blur-[60px] rounded-full"></div>
                <h3 className="text-lg font-black mb-6">Service Category</h3>
                <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            type="button"
                            onClick={() => handleCategoryChange(cat._id)}
                            className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center justify-between gap-2 shadow-inner ${
                                selectedCategory === cat._id
                                    ? "bg-[#F59E0B] text-white border-[#F59E0B] shadow-lg shadow-orange-900/50 scale-[1.02]"
                                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10"
                            }`}
                        >
                            <span className="truncate">{cat.categoryName}</span>
                            {selectedCategory === cat._id && <FiCheck className="shrink-0" size={14} />}
                        </button>
                    ))}
                </div>
                <input type="hidden" {...register("categoryId", { required: "Category is required" })} />
                {errors.categoryId && <span className="text-[10px] text-[#F59E0B] font-black uppercase mt-4 text-center">Please select a category</span>}
            </div>
        </div>

        {/* ── Submit Area ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-4 text-gray-400 italic text-sm font-medium">
                <FiActivity className="text-[#F59E0B]" />
                Your listing will be instantly visible to all customers.
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 sm:flex-none px-8 py-5 text-gray-400 font-black uppercase tracking-widest text-xs hover:text-[#1a1f2e] transition-all"
                >
                    Discard Changes
                </button>
                <button
                    type="submit"
                    className="flex-1 sm:flex-none bg-[#F59E0B] hover:bg-[#D97706] text-white font-black px-12 py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                >
                    Publish Listing <FiCheck size={18} />
                </button>
            </div>
        </div>
      </form>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.5); }
      `}</style>
    </div>
  );
};

export default AddService;