import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiGrid, FiTag, FiAlignLeft, FiCheck, FiX, FiActivity } from 'react-icons/fi'

export const AddCategory = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { id } = useParams() 

  const isEdit = !!id 

  const validationSchema = {
    categorynameValidator: {
      required: {
        value: true,
        message: "Category name is required",
      },
    },
  }

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

  const submitHandler = async (data) => {
    try {
      let res;
      if (isEdit) {
        res = await axios.put(`/category/update/${id}`, data)
        toast.success("Category updated successfully")
      } else {
        res = await axios.post("/category/add", data)
        toast.success("Category added successfully")
      }

      if (res.status === 200 || res.status === 201) {
        navigate(-1)
      }

    } catch (error) {
      console.log(error)
      toast.error("An error occurred")
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      
      {/* ── Page Header ── */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-[1.5rem] flex items-center justify-center text-3xl">
            {isEdit ? "✏️" : "🧩"}
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">{isEdit ? "Edit Category" : "New Category"}</h1>
          <p className="text-gray-500 font-medium">Define a new segment for your service marketplace.</p>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Visual Anchor */}
        <div className="h-2 bg-[#F59E0B]"></div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-10 space-y-8">
            
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiTag /> Category Name
                </label>
                <input
                    type="text"
                    placeholder="e.g. Wellness & Spa"
                    {...register("categoryName", validationSchema.categorynameValidator)}
                    className="w-full px-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-orange-50 outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-inner"
                />
                {errors.categoryName && (
                    <p className="text-[10px] text-red-500 font-black uppercase ml-1">{errors.categoryName.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2">
                    <FiAlignLeft /> Summary Description
                </label>
                <textarea
                    rows={5}
                    placeholder="Briefly describe what kind of services belong here..."
                    {...register("description")}
                    className="w-full px-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-orange-50 outline-none transition-all font-medium text-gray-600 leading-relaxed placeholder-gray-300 shadow-inner resize-none"
                />
            </div>

            <div className="bg-[#1a1f2e] p-6 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#F59E0B]">
                    <FiActivity size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-white tracking-tight uppercase">Instant Sync</p>
                    <p className="text-[10px] text-gray-500 font-bold">This category will be immediately live for all providers.</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 px-8 py-5 text-gray-400 font-black uppercase tracking-widest text-xs hover:text-[#1a1f2e] transition-all flex items-center justify-center gap-2"
                >
                    <FiX /> Discard
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white font-black px-8 py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                >
                    {isEdit ? "Update Changes" : "Create Category"} <FiCheck size={18} />
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory