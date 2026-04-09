import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";

const BookService = () => {
  const { id } = useParams(); // Using the ID from URL
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
        toast.success("Booking confirmed successfully!");
        navigate("/user/bookings"); // Redirect to history
      }
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-md w-full">
        
        {/* Progress Indicator (Optional visual) */}
        <div className="flex items-center justify-center mb-8 gap-4">
          <div className="h-2 w-12 bg-blue-600 rounded-full"></div>
          <div className="h-2 w-12 bg-blue-600 rounded-full"></div>
          <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-blue-600 p-8 text-center text-white">
            <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Confirm Your Slot</h1>
            <p className="text-blue-100 text-sm mt-1">Please select your preferred date and time</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-6">
            
            {/* Date Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("date", { required: "Please select a date" })}
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.date ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'} rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all`}
                />
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.date.message}</p>}
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Select Time
              </label>
              <input
                type="time"
                {...register("time", { required: "Please select a time" })}
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.time ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'} rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all`}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.time.message}</p>}
            </div>

            {/* Information Note */}
            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
              <p className="text-[12px] text-blue-700 leading-relaxed">
                The provider will receive your request immediately. You can cancel or reschedule from your dashboard later.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <button
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl text-white font-black text-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                type="submit"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                    Booking...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
              
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="w-full py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;