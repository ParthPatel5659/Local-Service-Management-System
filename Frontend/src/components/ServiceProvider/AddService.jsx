// import axios from 'axios'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'

// export const AddService = () => {
//     const {register,handleSubmit}=useForm()

//     const submitHandler=async(data)=>{
//         try {
//             const res= await axios.post("/services/add",data)
//             if(res.status == 201){
//                 console.log(res.data)
//                 console.log(res.data.data)
//                 toast.success("Service added successfully")
//             }
//         } catch (error) {
//             console.log(error)
//              toast.error("Failed to add service")
//         }
//     }

//   return (
//     <div>
//         <h1>AddService</h1>
//         <form onSubmit={handleSubmit(submitHandler)}>
//             <div>
//                 <label>Service Name</label>
//                 <input  type='serviceName' {...register("serviceName")}/>
//             </div>
//             <div>
//                 <label>Service Description</label>
//                 <input  type='description' {...register("description")}/>
//             </div>
//             <div>
//                 <label>Service Price</label>
//                 <input  type='price' {...register("price")}/>
//             </div>
//             <button type='submit'>Add Service</button>
//         </form>

//     </div>
//   )
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddService = () => {
  
  const { register, handleSubmit, setValue } = useForm();
  const navigate=useNavigate()
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/all");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Handle checkbox change (only one selection)
  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setValue("categoryId", id); // send to form
  };

  const submitHandler = async (data) => {
    console.log(data);
    
    try {
      const res = await axios.post("/services/add",data,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res.status==201){
      toast.success("Service added successfully");
      navigate(-1)
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

        <input
          type="text"
          placeholder="Service Name"
          {...register("serviceName")}
        />

        <input
          type="text"
          placeholder="Description"
          {...register("description")}
        />

        <input
          type="number"
          placeholder="Price"
          {...register("price")}
        />

        <input
          type="text"
          placeholder="Location"
          {...register("location")}
        />

        {/* ✅ CATEGORY CHECKBOX */}
        <h3>Select Category</h3>

        {
          categories.map((cat) => (
            <div key={cat._id}>
              <input
                type="checkbox"
                checked={selectedCategory === cat._id}
                onChange={() => handleCategoryChange(cat._id)}
              />
              <label>{cat.categoryName}</label>
            </div>
          ))
        }

        {/* hidden input to send categoryId */}
        <input type="hidden" {...register("categoryId")} />

        <button type="submit">Add Service</button>

      </form>
    </div>
  );
};
