import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../AuthProvider'
import { toast } from 'react-toastify'

export const Support = () => {

  const { userId } = useContext(AuthContext)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/support/add", {
        ...data,
        userId
      })

      if (res.status === 201) {
        toast.success("Support request sent")
        reset()
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-5 text-gray-700">
          Support / Help
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("subject")}
            placeholder="Subject"
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            {...register("message")}
            placeholder="Describe your issue..."
            rows={4}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            Send Request
          </button>

        </form>
      </div>
    </div>
  )
}

export default Support