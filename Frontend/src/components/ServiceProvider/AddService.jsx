import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";

export const AddService = () => {
  const { userId } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("/category/all");
        setCategories(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
  }, []);

  // ✅ Category select
  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setValue("categoryId", id);
  };

  // ✅ Submit Handler
  const submitHandler = async (data) => {
    if (!userId) {
      toast.error("Provider not loaded");
      return;
    }

    try {
      // 1️⃣ Create Service
      const res = await axios.post("/services/add", {
        ...data,
        providerId: userId
      });

      if (res.status === 201) {
        
        toast.success("Service + Slots created successfully");
        navigate(-1);
      }

    } catch (error) {
      console.log(error);
      toast.error("Error adding service");
    }
  };

  return (
    <div className="p-6">
      <h2>Add Service</h2>

      <form onSubmit={handleSubmit(submitHandler)}>

        {/* Service Name */}
        <input
          type="text"
          placeholder="Service Name"
          {...register("serviceName", { required: true })}
        />

        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          {...register("description")}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          {...register("price")}
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          {...register("location")}
        />


        {/* Category */}
        <h3>Select Category</h3>
        {categories.map((cat) => (
          <div key={cat._id}>
            <input
              type="checkbox"
              checked={selectedCategory === cat._id}
              onChange={() => handleCategoryChange(cat._id)}
            />
            <label>{cat.categoryName}</label>
          </div>
        ))}


    
        {/* Hidden Category */}
        <input
          type="hidden"
          value={selectedCategory}
          {...register("categoryId")}
        />

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};