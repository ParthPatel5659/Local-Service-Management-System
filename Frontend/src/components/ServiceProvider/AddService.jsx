import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";
import { PlusCircle, Info, MapPin, IndianRupee, Tag } from "lucide-react"; // npm install lucide-react

export const AddService = () => {
  const { userId } = useContext(AuthContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("/category/all");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setValue("categoryId", id);
  };

  const submitHandler = async (data) => {
    if (!userId) {
      toast.error("Provider session not found");
      return;
    }
    try {
      const res = await axios.post("/services/add", {
        ...data,
        providerId: userId
      });

      if (res.status === 201) {
        toast.success("Service created successfully!");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Error adding service");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-indigo-600 px-8 py-10 text-white">
          <div className="flex items-center gap-3 mb-2">
            <PlusCircle size={28} />
            <h1 className="text-3xl font-extrabold tracking-tight">Add New Service</h1>
          </div>
          <p className="text-indigo-100 opacity-90">List your professional service to reach new customers.</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-6">
          
          {/* Service Name */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Tag size={16} /> Service Name
            </label>
            <input
              type="text"
              placeholder="e.g. Premium Home Cleaning"
              {...register("serviceName", { required: "Service name is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
            />
            {errors.serviceName && <span className="text-xs text-red-500">{errors.serviceName.message}</span>}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Info size={16} /> Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe what's included in this service..."
              {...register("description")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-gray-50 focus:bg-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <IndianRupee size={16} /> Price (₹)
              </label>
              <input
                type="number"
                placeholder="500"
                {...register("price")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <MapPin size={16} /> Service Area / Location
              </label>
              <input
                type="text"
                placeholder="City or Neighborhood"
                {...register("location")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
              />
            </div>
          </div>

          {/* Category Selection Grid */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">Select Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => handleCategoryChange(cat._id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                    selectedCategory === cat._id
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              Add Service
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="sm:px-8 py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;