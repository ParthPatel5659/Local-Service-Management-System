import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";
import { FiSearch, FiMapPin, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiPlus, FiBriefcase } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

export const AllServicesofprovider = () => {
  const { userId } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/services/my-services/${userId}`);
      setServices(res.data.data || []);
    } catch (error) {
      console.log("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchServices();
    }
  }, [userId]);

  const deleteService = async (serviceId) => {
    try {
      if (!window.confirm("Are you sure you want to permanently delete this service offering?")) return;
      await axios.delete(`/services/delete/${serviceId}`);
      toast.success("Service removed from your portfolio.");
      fetchServices();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete service.");
    }
  };

  const toggleAvailability = async (serviceId) => {
    try {
      await axios.put(`/services/avalbility/${serviceId}`);
      fetchServices();
      toast.success("Service visibility updated.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update visibility.");
    }
  };

  const filteredServices = services.filter((service) =>
    service.serviceName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Service Portfolio</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage, update, and monitor your active professional listings.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                <input
                    type="text"
                    placeholder="Search portfolio..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e]"
                />
            </div>
            <Link to="/provider/addservice">
                <button className="h-full bg-[#1a1f2e] hover:bg-[#F59E0B] text-white px-6 py-3 border border-[#1a1f2e] hover:border-[#F59E0B] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                    <FiPlus size={16} /> New Service
                </button>
            </Link>
        </div>
      </div>

      {/* ── Portfolio Grid ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F59E0B] border-t-transparent shadow-lg text-[#F59E0B]"></div>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
                key={service._id} 
                className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden relative"
            >
              {/* Card Header (Category & Status) */}
              <div className="px-8 py-5 flex justify-between items-center bg-gray-50/50 border-b border-gray-50">
                <span className="bg-orange-50 text-[#F59E0B] text-[9px] font-black uppercase tracking-[2px] px-3 py-1.5 rounded-lg border border-orange-100">
                  {service.categoryId?.categoryName || "Provider Listing"}
                </span>
                
                <div className={`flex items-center gap-1.5 ${service.availability ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${service.availability ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        {service.availability ? "Active" : "Hidden"}
                    </span>
                </div>
              </div>

              {/* Cover Art Placeholder */}
              <div className="h-40 bg-[#1a1f2e] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-full bg-[#F59E0B]/10 blur-[50px] rounded-full"></div>
                 <div className="w-full h-full flex flex-col items-center justify-center text-[#F59E0B]/20">
                     <FiBriefcase size={48} className="drop-shadow-lg" />
                     <p className="text-[10px] font-black uppercase tracking-widest mt-2">Professional Listing</p>
                 </div>
              </div>

              {/* Main Content */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-black text-[#1a1f2e] mb-2 group-hover:text-[#F59E0B] transition-colors leading-tight line-clamp-2">
                  {service.serviceName}
                </h3>
                
                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-3 mb-6 italic opacity-80">
                  "{service.description}"
                </p>

                <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center font-black text-[#1a1f2e] text-2xl tracking-tighter">
                          <FaRupeeSign className="text-sm text-[#F59E0B] mr-1" />
                          {service.price?.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <FiMapPin className="text-[#F59E0B]" /> {(service.location && service.location !== "Global") ? service.location : "Anywhere"}
                      </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
                
                <Link to={`/provider/edit-service/${service._id}`} className="flex-1">
                  <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-[#1a1f2e] border border-gray-100 hover:border-gray-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <FiEdit2 /> Edit
                  </button>
                </Link>

                <button
                  onClick={() => toggleAvailability(service._id)}
                  className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl border transition-all ${
                    service.availability 
                      ? "text-gray-400 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border-gray-100" 
                      : "text-green-600 hover:bg-green-600 hover:text-white border-green-200 bg-green-50"
                  }`}
                  title={service.availability ? "Hide Service" : "Make Visible"}
                >
                  {service.availability ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>

                <button
                  onClick={() => deleteService(service._id)}
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 border border-gray-100 hover:border-red-500 rounded-xl transition-all"
                  title="Delete Service"
                >
                  <FiTrash2 size={18} />
                </button>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-24 rounded-[3rem] text-center border border-dashed border-gray-200 shadow-sm relative overflow-hidden">
            <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-[2rem] text-[#F59E0B] mx-auto mb-8 shadow-inner shadow-gray-200">
                <FiBriefcase size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#1a1f2e] mb-4 tracking-tight">Empty Portfolio</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium leading-relaxed">
                You haven't listed any services yet. Creating a professional listing is the first step to growing your business.
            </p>
            <Link to="/provider/addservice" className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-orange-100 transition-all active:scale-[0.98]">
                <FiPlus size={18} /> Create First Listing
            </Link>
        </div>
      )}
    </div>
  );
};