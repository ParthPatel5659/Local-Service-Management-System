import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export const AddService = () => {
    const {register,handleSubmit}=useForm()

    const submitHandler=async(data)=>{
        try {
            const res= await axios.post("/services/add",data)
            if(res.status == 201){
                console.log(res.data)
                console.log(res.data.data)
                toast.success("Service added successfully")
            }
        } catch (error) {
            console.log(error)
             toast.error("Failed to add service")
        }
    }

  return (
    <div>
        <h1>AddService</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label>Service Name</label>
                <input  type='serviceName' {...register("serviceName")}/>
            </div>
            <div>
                <label>Service Description</label>
                <input  type='description' {...register("description")}/>
            </div>
            <div>
                <label>Service Price</label>
                <input  type='price' {...register("price")}/>
            </div>
            <button type='submit'>Add Service</button>
        </form>

    </div>
  )
}
