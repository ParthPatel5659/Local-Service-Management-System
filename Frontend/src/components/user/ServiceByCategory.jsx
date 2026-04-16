import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiLayers, FiActivity, FiMapPin, FiStar } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const ServiceByCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      if (!categoryId) return;
      const res = await axios.get(`/services/category/${categoryId}`);
      setServices(res.data.data || []);
    } catch (error) {
      console.error("Error fetching services by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      
      {/* ── Top Navigation / Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-6">
            <button 
                onClick={() => navigate(-1)} 
                className="p-4 bg-white text-gray-400 hover:text-[#1a1f2e] rounded-2xl transition-all border border-gray-100 shadow-sm"
            >
                <FiArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-4xl font-black text-[#1a1f2e] tracking-tight">Curated Selection</h1>
                <p className="text-gray-500 font-medium flex items-center gap-2">
                    <FiLayers className="text-[#F59E0B]" /> Showing professional services in this category.
                </p>
            </div>
        </div>
        <div className="relative group min-w-[300px]">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
            <input 
                type="text" 
                placeholder="Filter these services..." 
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-sm"
            />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
            <div className="animate-spin h-12 w-12 border-4 border-[#F59E0B] border-t-transparent rounded-full shadow-lg"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
            <FiLayers size={48} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-xl font-black text-[#1a1f2e] mb-2">No Active Listings</h3>
            <p className="text-gray-400 font-medium max-w-xs mx-auto text-sm">We couldn't find any professional services in this category at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
                <div 
                    key={s._id} 
                    onClick={() => navigate(`/user/servicedetail/${s._id}`)}
                    className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer p-8 flex flex-col h-full"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#F59E0B] text-xl group-hover:bg-[#F59E0B] group-hover:text-white transition-all">
                            <FiActivity />
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                            <FiStar size={10} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-black text-[#1a1f2e]">4.9</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 mb-8">
                        <h3 className="text-2xl font-black text-[#1a1f2e] tracking-tight group-hover:text-[#F59E0B] transition-colors">{s.serviceName}</h3>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                             Professional: <span className="text-[#1a1f2e]">{s.providerId?.Firstname} {s.providerId?.Lastname}</span>
                        </p>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 pt-2 opacity-70 italic">"{s.description}"</p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <FaRupeeSign className="text-xs text-gray-400" />
                            <span className="text-2xl font-black text-[#1a1f2e] tracking-tighter">{s.price?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            <FiMapPin className="text-[#F59E0B]" /> {s.location || "On-Site"}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ServiceByCategory;