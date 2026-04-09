import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiGrid, FiTag, FiAlignLeft } from 'react-icons/fi'

export const AddCategory = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { id } = useParams()   // 🔥 get id for edit

  const isEdit = !!id   // 🔥 check edit mode

  const validationSchema = {
    categorynameValidator: {
      required: {
        value: true,
        message: "Category name is required",
      },
    },
  }

  // ✅ FETCH CATEGORY (Edit Mode)
  const getSingleCategory = async () => {
    try {
      const res = await axios.get(`/category/${id}`)
      const data = res.data.data

      setValue("categoryName", data.categoryName)
      setValue("description", data.description)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isEdit) {
      getSingleCategory()
    }
  }, [id])

  // ✅ SUBMIT (ADD + EDIT)
  const submitHandler = async (data) => {
    try {

      let res;

      if (isEdit) {
        // 🔥 UPDATE
        res = await axios.put(`/category/update/${id}`, data)
        toast.success("Category updated successfully")
      } else {
        // 🔥 CREATE
        res = await axios.post("/category/create", data)
        toast.success("Category added successfully")
      }

      if (res.status === 200 || res.status === 201) {
        navigate(-1)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="min-h-screen p-6 flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #fff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      }}
    >
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div
            className="px-8 py-6 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <FiGrid className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {isEdit ? "Edit Category" : "Add Category"}
              </h1>
              <p className="text-indigo-200 text-sm">
                {isEdit ? "Update category details" : "Create a new category"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="px-8 py-7 space-y-5">

            {/* Category Name */}
            <div>
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <FiTag size={13} /> Category Name
              </label>

              <input
                type="text"
                {...register("categoryName", validationSchema.categorynameValidator)}
                className="w-full px-4 py-2.5 rounded-xl border mt-1"
              />

              {errors.categoryName && (
                <p className="text-xs text-red-400">{errors.categoryName.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <FiAlignLeft size={13} /> Description
              </label>

              <textarea
                rows={3}
                {...register("description")}
                className="w-full px-4 py-2.5 rounded-xl border mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 text-white py-2 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)"
                }}
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCategory