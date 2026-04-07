import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";

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
      if (!window.confirm("Are you sure you want to delete this service?")) return;
      await axios.delete(`/services/delete/${serviceId}`);
      toast.success("Service deleted successfully");
      fetchServices();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete service");
    }
  };

  const toggleAvailability = async (serviceId) => {
    try {
      await axios.put(`/services/avalbility/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredServices = services.filter((service) =>
    service.serviceName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
            <p className="text-gray-500 text-sm">Manage and update your service listings</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            
            <Link to="/provider/addservice">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center justify-center transition-colors shadow-sm">
                <span className="mr-2">+</span> Add New Service
              </button>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                
                {/* Service Details */}
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                      {service.categoryId?.categoryName || "Uncategorized"}
                    </span>
                    <span className={`text-xs font-bold ${service.availability ? "text-green-600" : "text-red-500"}`}>
                      ● {service.availability ? "Available" : "Hidden"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {service.serviceName}
                  </h3>
                  
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700 font-bold text-lg">
                      ₹{service.price}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {service.location}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2">
                  <Link to={`/provider/edit-service/${service._id}`} className="text-center">
                    <button className="w-full py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100 rounded-md transition-colors border border-blue-200">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => toggleAvailability(service._id)}
                    className={`py-2 text-sm font-semibold rounded-md transition-colors border ${
                      service.availability 
                        ? "text-orange-600 border-orange-200 hover:bg-orange-100" 
                        : "text-green-600 border-green-200 hover:bg-green-100"
                    }`}
                  >
                    {service.availability ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => deleteService(service._id)}
                    className="py-2 text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-100 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No services found matching your search.</p>
            <Link to="/provider/addservice" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
              Add your first service
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};