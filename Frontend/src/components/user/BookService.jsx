import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";
import { FiCalendar, FiClock, FiCheck, FiArrowLeft, FiActivity, FiShield } from "react-icons/fi";

const BookService = () => {
  const { id } = useParams();
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post(`/bookings/create/${userId}`, {
        serviceId: id,
        bookingDate: data.date,
        bookingTime: data.time
      });

      if (res.status === 201) {
        toast.success("Booking Request Confirmed!");
        navigate("/user/bookings");
      }
    } catch (error) {
      toast.error("Booking dispatch failed. Service limits reached or network error.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      
      {/* ── Visual Anchor ── */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden border-t-8 border-t-[#F59E0B]">
        
        <div className="p-10 text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#F59E0B] mx-auto mb-6 shadow-inner border border-orange-100">
                <FiCalendar size={32} />
            </div>
            <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Reserve Slot</h1>
            <p className="text-gray-500 font-medium mt-2 leading-relaxed">Select your preferred date and time to engage this professional service.</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="px-10 pb-10 space-y-8">
            
            {/* Date Input */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiCalendar /> Preferred Date
                </label>
                <input
                    type="date"
                    {...register("date", { required: "Date selection is mandatory" })}
                    className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                />
                {errors.date && <p className="text-[10px] text-red-500 font-black uppercase ml-1">{errors.date.message}</p>}
            </div>

            {/* Time Input */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiClock /> Arrival Window
                </label>
                <input
                    type="time"
                    {...register("time", { required: "Time selection is mandatory" })}
                    className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] shadow-inner"
                />
                {errors.time && <p className="text-[10px] text-red-500 font-black uppercase ml-1">{errors.time.message}</p>}
            </div>

            <div className="bg-[#1a1f2e] p-6 rounded-2xl flex items-center gap-4 border border-white/5 shadow-lg">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#F59E0B]">
                    <FiShield size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-white tracking-tight uppercase">Guaranteed Booking</p>
                    <p className="text-[10px] text-gray-500 font-bold">Secure slot management for verified experts.</p>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#1a1f2e] hover:bg-[#F59E0B] text-white font-black py-5 rounded-2xl shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs ${isSubmitting ? 'opacity-70 animate-pulse cursor-wait' : ''}`}
                >
                    {isSubmitting ? "Dispatching..." : "Confirm Booking"} <FiCheck size={18} />
                </button>

                <button 
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1a1f2e] transition-all flex items-center justify-center gap-2"
                >
                    <FiArrowLeft /> Discard Selection
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default BookService;