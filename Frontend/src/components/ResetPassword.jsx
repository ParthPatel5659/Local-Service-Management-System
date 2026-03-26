import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const token=useParams().token

    const{register,handleSubmit,formState:{errors}}=useForm()

    const submitHandler=async(data)=>{
        console.log(data);
        data.token=token;

      try {
         const res = await axios.put("/user/resetpassword",data)
         if(res.status==200){
            toast.success("Password reset successfuliy")
         }
      } catch (error) {
        console.log(error);
        
      }
        
    }

    const validationSchema={
        passwordValidation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 6,
        message: "Minimum 6 characters",
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: "Password must contain at least one letter and one number",
      },
    },
    }
  return (
    <div>
      <h1>RESET PASSWORD</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input type='text' placeholder='new Password' {...register("newPassword",validationSchema.passwordValidation)}/>
        {errors.password && (
              <p >{errors.password.message}</p>
            )}

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ResetPassword
