import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../AuthProvider'
import { toast } from 'react-toastify'

export const Settings = () => {

  const { userId } = useContext(AuthContext)

  const { register, handleSubmit, reset } = useForm()

  // ✅ Get user data
  const getUser = async () => {
    try {
      const res = await axios.get(`/user/detail/${userId}`)
      reset(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // ✅ Update profile
  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/user/update/${userId}`, data)

      if (res.status === 200) {
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-5 text-gray-700">
          Account Settings
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("Firstname")}
            placeholder="First Name"
            className="w-full p-2 border rounded"
          />

          <input
            {...register("Lastname")}
            placeholder="Last Name"
            className="w-full p-2 border rounded"
          />

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="New Password"
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            Update
          </button>

        </form>
      </div>
    </div>
  )
}

export default Settings