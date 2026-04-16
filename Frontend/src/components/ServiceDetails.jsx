import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiTag, FiUser, FiStar, FiPhone, FiMail, FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi";
import { FaRupeeSign } from 'react-icons/fa';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getService = async () => {
    try {
      const res = await axios.get(`/services/service/${id}`);
      setService(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async () => {
    try {
      const res = await axios.get(`/reviews/service/${id}`);
      setReviews(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getService();
    getReviews();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin h-10 w-10 border-4 border-[#F59E0B] border-t-transparent rounded-full"></div>
    </div>
  );

  if (!service) return (
    <div className="text-center py-20 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
        <FiXCircle size={48} className="mx-auto mb-4 text-gray-300" />
        <p className="text-xl font-bold text-gray-900">Service not found.</p>
        <Link to="/user/services" className="text-[#F59E0B] font-bold mt-4 inline-block hover:underline">Back to Services</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ── Breadcrumbs / Back ── */}
      <div className="mb-8">
        <Link to="/user/services" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#F59E0B] transition-colors">
          <FiArrowLeft /> Back to Explore
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ── Left Content (Details & Reviews) ── */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Hero Card */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-50 text-[#F59E0B] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-100">
                        {service.categoryId?.categoryName}
                    </span>
                    {service.availability ? (
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">Available</span>
                    ) : (
                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100">Full</span>
                    )}
                </div>
                <h1 className="text-4xl font-black text-[#1a1f2e] leading-tight">
                  {service.serviceName}
                </h1>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                <FiStar className="text-yellow-400 fill-yellow-400" />
                <span className="font-black text-[#1a1f2e]">4.9</span>
                <span className="text-gray-400 text-xs font-bold font-sans">({reviews.length} Reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold text-gray-500 mb-10 pb-10 border-b border-gray-50">
              <span className="flex items-center gap-2">
                <FiMapPin className="text-[#F59E0B]" /> {service.location || "Online / Visited"}
              </span>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-black text-[#1a1f2e]">About this service</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {service.description || "Top-tier professional service tailored to your specific needs. Our verified experts ensure the highest quality standards and customer satisfaction."}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {['Professional Tools', 'Verified Expert', 'Insured Service'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                            <FiCheckCircle className="text-[#F59E0B]" /> {feat}
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Provider Card */}
          <div className="bg-[#1a1f2e] p-8 md:p-10 rounded-[2.5rem] text-white overflow-hidden relative shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 blur-[60px] rounded-full"></div>
            <h2 className="text-xl font-black mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center text-white">
                <FiUser size={20} />
              </div> 
              Expert Provider Information
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <img 
                    src={`https://ui-avatars.com/api/?name=${service.providerId?.Firstname}+${service.providerId?.Lastname}&background=F59E0B&color=fff&size=128&bold=true`} 
                    alt="provider" 
                    className="w-24 h-24 rounded-3xl border-4 border-white/10 shadow-lg"
                />
                <div className="flex-1 space-y-4">
                    <h4 className="text-2xl font-black text-white">{service.providerId?.Firstname} {service.providerId?.Lastname}</h4>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium text-gray-400">
                        <div className="flex items-center gap-2"><FiMail className="text-[#F59E0B]" /> {service.providerId?.email}</div>
                        <div className="flex items-center gap-2"><FiPhone className="text-[#F59E0B]" /> +91 {service.providerId?.phone}</div>
                    </div>
                </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-[#1a1f2e]">Community Feedback</h2>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{reviews.length} REVIEWS</div>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((r) => (
                  <div key={r._id} className="p-6 rounded-2xl bg-[#f9fafb] border border-gray-50 group hover:border-orange-100 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm font-bold text-gray-400 border border-gray-100">
                            {r.userId?.Firstname?.charAt(0)}
                        </div>
                        <div>
                            <span className="font-bold text-[#1a1f2e]">{r.userId?.Firstname} {r.userId?.Lastname}</span>
                            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Verified Client</span>
                        </div>
                      </div>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} size={12} className={i < r.rating ? "fill-yellow-400" : "text-gray-200"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed italic">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                 <div className="text-4xl mb-4 grayscale opacity-20">⭐</div>
                 <p className="text-gray-400 font-bold">No reviews yet. Be the first to experience this service!</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Content (Booking Widget) ── */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-orange-50 sticky top-28">
            <p className="text-gray-400 text-xs font-black uppercase tracking-[3px] mb-4">Booking Pricing</p>
            <div className="flex items-end gap-1 mb-10">
              <span className="text-sm font-bold text-gray-400 pb-2"><FaRupeeSign size={16} className="mb-0.5" /></span>
              <span className="text-5xl font-black text-[#1a1f2e] tracking-tighter">{service.price?.toLocaleString()}</span>
              <span className="text-gray-400 text-sm font-bold pb-2 ml-1">/ Service</span>
            </div>

            <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#F59E0B]">
                        <FiCheckCircle />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Estimated Time</p>
                        <p className="text-sm font-bold text-[#1a1f2e]">2-3 Hours</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#F59E0B]">
                        <FiCheckCircle />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Service Mode</p>
                        <p className="text-sm font-bold text-[#1a1f2e]">In-Home Service</p>
                    </div>
                </div>
            </div>

            <Link to={`/user/bookservices/${service._id}`} className="block">
              <button 
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 uppercase tracking-wider ${
                  service.availability 
                    ? "bg-[#F59E0B] text-white hover:bg-[#D97706] active:scale-[0.98]" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                }`}
                disabled={!service.availability}
              >
                {service.availability ? "Book This Service" : "Sold Out"}
              </button>
            </Link>

            <div className="mt-8 pt-8 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase text-center tracking-widest">Trust Indicators</p>
                <div className="flex justify-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#F59E0B]" title="Secure Payment"><FiCheckCircle /></div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#F59E0B]" title="Verified Expert"><FiUser /></div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#F59E0B]" title="Top Rated"><FiStar /></div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;