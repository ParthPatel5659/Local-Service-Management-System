import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { FiStar, FiMessageSquare, FiCheckCircle } from "react-icons/fi";

const ProviderReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);

  const getReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/reviews/provider/${userId}`);
      setReviews(res.data.data || []);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getReviews();
    }
  }, [userId]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        size={18}
        className={i < rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200 fill-gray-100"} 
      />
    ));
  };

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Client Reviews</h1>
          <p className="text-gray-500 mt-1 font-medium">Monitor feedback and maintain your professional reputation.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-[#1a1f2e]">
            <span className="text-gray-400">Total Validated:</span> <span className="bg-orange-50 text-[#F59E0B] px-2 py-0.5 rounded-md border border-orange-100">{reviews?.length || 0}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F59E0B] border-t-transparent shadow-lg text-[#F59E0B]"></div>
        </div>
      ) : reviews?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div 
              key={r._id} 
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Header Info */}
              <div className="flex items-center gap-4 mb-6">
                <img 
                    src={`https://ui-avatars.com/api/?name=${r.userId?.Firstname}+${r.userId?.Lastname}&background=1a1f2e&color=fff&bold=true`} 
                    alt="avatar" 
                    className="w-14 h-14 rounded-2xl border-4 border-gray-50 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-[#1a1f2e] group-hover:text-[#F59E0B] transition-colors line-clamp-1">
                    {r.userId?.Firstname} {r.userId?.Lastname}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                      <span className="text-[9px] font-black uppercase text-[#F59E0B] bg-orange-50 px-2 py-0.5 rounded border border-orange-100 tracking-widest truncate max-w-[120px]">
                        {r.serviceId?.serviceName || "Service"}
                      </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-gray-50/50 border border-gray-50 rounded-[1.5rem] p-4 flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                      {renderStars(r.rating)}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{r.rating}.0 Rating</span>
              </div>

              {/* Feedback Content */}
              <div className="flex-1 mb-6 relative">
                  <FiMessageSquare className="absolute -top-1 -left-2 text-4xl text-gray-100 -z-10" />
                  <p className="text-sm font-medium text-gray-600 italic leading-relaxed pl-2 border-l-2 border-[#F59E0B] py-1">
                      "{r.comment || "No detailed feedback provided."}"
                  </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[2px] text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                      <FiCheckCircle /> Verified Booking
                  </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-24 rounded-[3rem] text-center border border-dashed border-gray-200 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-2xl text-gray-300 mx-auto mb-6 shadow-inner">
              <FiStar size={32} />
          </div>
          <h3 className="text-2xl font-black text-[#1a1f2e] mb-2">No Reviews Yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium">As you complete services, your clients' reviews will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ProviderReviews;