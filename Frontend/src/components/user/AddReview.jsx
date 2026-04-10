import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Star, MessageSquare, Send } from 'lucide-react'; // Optional: npm install lucide-react

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
                toast.success("Review added successfully!");
                reset();
                // Optional: navigate(-1) to go back after submission
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add review");
        }
    };

    const validationSchema = {
        ratingValidator: {
            required: "Rating is required",
            min: { value: 1, message: "Minimum rating is 1" },
            max: { value: 5, message: "Maximum rating is 5" }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mb-4">
                        <Star size={32} fill="currentColor" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Share Your Experience</h1>
                    <p className="text-gray-500 mt-2 text-sm">Your feedback helps others choose the best services.</p>
                </div>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                    
                    {/* Rating Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Rating (1-5)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="5"
                                {...register("rating", validationSchema.ratingValidator)}
                                className={`w-full pl-4 pr-10 py-3 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 ${
                                    errors.rating 
                                    ? "border-red-400 focus:ring-red-100" 
                                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                                }`}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Star size={18} />
                            </div>
                        </div>
                        {errors.rating && (
                            <p className="mt-1 text-xs text-red-500 font-medium">
                                {errors.rating.message}
                            </p>
                        )}
                    </div>

                    {/* Comment Area */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Your Review
                        </label>
                        <div className="relative">
                            <textarea
                                placeholder="What did you like or dislike?"
                                rows={4}
                                {...register("comment")}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
                            />
                            <div className="absolute right-3 bottom-3 text-gray-300">
                                <MessageSquare size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                    >
                        <span>Submit Review</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>

                    <button 
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors"
                    >
                        Maybe later
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;