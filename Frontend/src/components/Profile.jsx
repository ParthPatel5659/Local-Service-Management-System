import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { id } = useParams()

  useEffect(() => {
    if (!id) return

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/user/profile/${id}`)
        const data = res.data.data

        setValue('Firstname', data.Firstname)
        setValue('Lastname', data.Lastname)
        setValue('email', data.email)
        setValue('phone', data.phone)
        setValue('address', data.address)
        setValue('profilePicture', data.profilePicture)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
  }, [id, setValue])

  const submitHandler = async (data) => {
    try {
      console.log(data)
      const res= await axios.put(`/user/profile/${id}`,data)
      if(res.status==200){
        toast.success("profile update successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* First Name */}
        <input
          type="text"
          placeholder="First Name"
          {...register('Firstname', {
            required: 'First name is required',
          })}
          className="w-full mb-2 p-2 border rounded"
        />
        <p className="text-red-500">{errors.Firstname?.message}</p>

        {/* Last Name */}
        <input
          type="text"
          placeholder="Last Name"
          {...register('Lastname', {
            required: 'Last name is required',
          })}
          className="w-full mb-2 p-2 border rounded"
        />
        <p className="text-red-500">{errors.Lastname?.message}</p>

        {/* Email */}
        <input
          type="email"
          disabled
          {...register('email')}
          className="w-full mb-2 p-2 border rounded bg-gray-100"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone"
          {...register('phone', {
            required: 'Phone is required',
            minLength: {
              value: 10,
              message: 'Enter valid phone',
            },
          })}
          className="w-full mb-2 p-2 border rounded"
        />
        <p className="text-red-500">{errors.phone?.message}</p>

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          {...register('address', {
            required: 'Address is required',
          })}
          className="w-full mb-2 p-2 border rounded"
        />
        <p className="text-red-500">{errors.address?.message}</p>

        {/* Profile Image */}
        <input
          type="file"
          placeholder="Profile Image URL"
          {...register('profilePicture')}
          className="w-full mb-2 p-2 border rounded"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-3"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  )
} 
