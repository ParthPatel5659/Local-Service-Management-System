import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { useForm } from 'react-hook-form'

export const Profile = () => {
  const{register,handleSubmit,formState:{errors}}=useForm()

  const token=localStorage.getItem("token")
  const decode=jwtDecode(token)
  console.log(decode);
  const id=decode.id
  

  const getProfile=async()=>{
    try {
      const res=await axios.get(`/profile/${id}`)
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>Profile</div>
  )
}
