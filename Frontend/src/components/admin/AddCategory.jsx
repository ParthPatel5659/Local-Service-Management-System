import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiGrid, FiTag, FiAlignLeft } from 'react-icons/fi'

export const AddCategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const validationSchema = {
    categorynameValidator: {
      required: {
        value: true,
        message: "Category name is required",
      },
    },
  }

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/category/add", data)
      if (res.status === 201) {
        toast.success("Category added successfully")
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
        <div
          className="bg-white rounded-2xl shadow-xl shadow-indigo-100/60 overflow-hidden"
          style={{ border: "1px solid #e8edf5" }}
        >
          {/* Header */}
          <div
            className="px-8 py-6 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <FiGrid className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Add Category</h1>
              <p className="text-indigo-200 text-sm mt-0.5">Create a new service category</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="px-8 py-7 space-y-5">

            {/* Category Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <FiTag className="text-indigo-400" size={13} />
                Category Name
              </label>
              <input
                type="text"
                placeholder="e.g. Cleaning, Plumbing..."
                {...register("categoryName", validationSchema.categorynameValidator)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 ${
                  errors.categoryName
                    ? "ring-2 ring-red-300 bg-red-50"
                    : "bg-slate-50 hover:bg-slate-100 focus:bg-white"
                }`}
                style={{ border: "1px solid #dde3f0" }}
              />
              {errors.categoryName && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                  {errors.categoryName.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <FiAlignLeft className="text-indigo-400" size={13} />
                Description
                <span className="normal-case tracking-normal font-normal text-slate-400 ml-1">(optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe this category..."
                {...register("description")}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-300 bg-slate-50 hover:bg-slate-100 focus:bg-white resize-none"
                style={{ border: "1px solid #dde3f0" }}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150"
                style={{ border: "1px solid #dde3f0" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                }}
              >
                <FiGrid size={15} />
                Add Category
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default AddCategory