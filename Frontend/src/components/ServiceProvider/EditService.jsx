import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you're using react-toastify as in previous screens
import { Save, ArrowLeft, Edit3, IndianRupee, MapPin, AlignLeft } from "lucide-react";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Fetch service details to pre-fill the form
  useEffect(() => {
    const getService = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/services/service/${id}`);
        const data = res.data.data;

        setValue("serviceName", data.serviceName);
        setValue("description", data.description);
        setValue("price", data.price);
        setValue("location", data.location);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    getService();
  }, [id, setValue]);

  const submitHandler = async (data) => {
    try {
      await axios.put(`/services/update/${id}`, data);
      toast.success("Service updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Update failed. Please try again.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        
        {/* Navigation / Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-8 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Edit3 size={24} />
              </div>
              <h1 className="text-2xl font-bold">Edit Service</h1>
            </div>
            <p className="text-blue-100 mt-2 text-sm italic opacity-90">
              Update the information below to keep your service listing current.
            </p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-5">
            
            {/* Service Name */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                Service Name
              </label>
              <input 
                {...register("serviceName", { required: "Name is required" })} 
                placeholder="Name" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              />
              {errors.serviceName && <p className="text-xs text-red-500">{errors.serviceName.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <AlignLeft size={16} /> Description
              </label>
              <textarea 
                {...register("description")} 
                placeholder="Describe your service..." 
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <IndianRupee size={16} /> Price
                </label>
                <input 
                  type="number"
                  {...register("price")} 
                  placeholder="Price" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <MapPin size={16} /> Location
                </label>
                <input 
                  {...register("location")} 
                  placeholder="Location" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-3">
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Save size={18} /> Save Changes
              </button>
              
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditService;