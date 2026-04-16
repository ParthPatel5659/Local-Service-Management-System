import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiStar, FiMessageSquare, FiSend, FiX, FiCheck } from 'react-icons/fi';

export const AddReview = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { serviceId, providerId } = useParams();
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("/reviews/add", {
                ...data, userId, serviceId, providerId
            });
            
            if (res.status === 201) {
                toast.success("Feedback submitted successfully. Thank you!");
                reset();
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while submitting your review.");
        }
    };

    const validationSchema = {
        ratingValidator: {
            required: "Please provide a rating",
            min: { value: 1, message: "Minimum 1 star" },
            max: { value: 5, message: "Maximum 5 stars" }
        }
    };

    return (
        <div className="max-w-md mx-auto py-20 px-4">
            
            {/* ── Visual Anchor ── */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden border-t-8 border-t-[#F59E0B]">
                
                <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#F59E0B] mx-auto mb-6 shadow-inner border border-orange-100">
                        <FiStar size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Your Opinion Matters</h1>
                    <p className="text-gray-500 font-medium mt-2">Help the LocalServ community by rating this professional service.</p>
                </div>

                <form onSubmit={handleSubmit(submitHandler)} className="px-10 pb-10 space-y-8">
                    
                    {/* Rating Input */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                            <FiStar /> Satisfaction Score (1-5)
                        </label>
                        <div className="relative group">
                            <input
                                type="number"
                                placeholder="5"
                                {...register("rating", validationSchema.ratingValidator)}
                                className="w-full px-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-black text-2xl text-center text-[#1a1f2e] shadow-inner"
                            />
                            {errors.rating && (
                                <p className="text-[10px] text-red-500 font-black uppercase mt-2 text-center">
                                    {errors.rating.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Comment Area */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                            <FiMessageSquare /> Feedback Details
                        </label>
                        <textarea
                            placeholder="Share your experience... what stood out?"
                            rows={5}
                            {...register("comment")}
                            className="w-full px-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-medium text-gray-600 leading-relaxed shadow-inner resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#1a1f2e] hover:bg-[#F59E0B] text-white font-black py-5 rounded-2xl shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs"
                        >
                            Submit Review <FiCheck size={18} />
                        </button>

                        <button 
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1a1f2e] transition-all flex items-center justify-center gap-2"
                        >
                            <FiX /> Discard Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;