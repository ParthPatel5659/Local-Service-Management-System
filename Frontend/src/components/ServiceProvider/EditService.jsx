import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  // fetch service
  useEffect(() => {
    const getService = async () => {
      const res = await axios.get(`/services/service/${id}`);
      const data = res.data.data;

      setValue("serviceName", data.serviceName);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("location", data.location);
    };

    getService();
  }, [id, setValue]);

  const submitHandler = async (data) => {
    try {
      await axios.put(`/services/update/${id}`, data);
      alert("Service updated");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register("serviceName")} placeholder="Name" />
      <input {...register("description")} placeholder="Description" />
      <input {...register("price")} placeholder="Price" />
      <input {...register("location")} placeholder="Location" />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditService;