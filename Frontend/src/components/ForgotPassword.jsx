import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ForgotPassword = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate()

    const submitHandler=async(data)=>{
        console.log(data);
        try {
            const res= await axios.post("/user/forgotpassword",data)
            console.log(res.data.data);
            if(res.status== 200){
                 toast.success("reset pasword link send on email")
                navigate("/")
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const validationSchema={
        emailValidater:{
            required:{
                value:true,
                message:"email is reqire"
            }
        }
    }
  return (
    <div>
        <h1>FORGOT PASSWORD</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
           <input type='email' placeholder='email' {...register("email",validationSchema.emailValidater)} />
           {errors.email && <p>{errors.email.message}</p>}

           <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
