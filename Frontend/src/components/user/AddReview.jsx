import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AddReview = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const { serviceId, providerId } = useParams();
    const {userId}=useContext(AuthContext)

  console.log(serviceId, providerId,userId);

    const submitHandler=async(data)=>{
        try {
            const res= await axios.post("/reviews/add",{
                ...data,userId,serviceId,providerId
            })
            console.log(data);
            if(res.status== 201){
                toast.success("Review Add successfully")
            }
            
        } catch (error) {
            console.log(error);
            toast.error("failed to add review")
            
        }
    }

    const valiDationSchema={
        ratingValidator:{
            required:{
                value:true,
                message:"rating is require"
            },
            min:{
                value:1
            },
            max:{
                value:5
            }
        }
    }
  return (
    <div>
        <h1>AddReview</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
             <input type='number' placeholder='Rating' {...register("rating", valiDationSchema.ratingValidator)}/>
             <p>{errors.rating  && errors.rating?.message}</p>

             <textarea placeholder='write your review' {...register("comment")}/>

             <button type='submit'>Submit Review</button>
        </form>
    </div>
  )
}
