import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiPlus, FiGrid, FiCheckCircle, FiXCircle, FiEdit3, FiTrash2, FiLayers } from 'react-icons/fi'

export const AllCategory = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [categorys, setCategorys] = useState([])
  const [deletingId, setDeletingId] = useState(null)

  const getAll = async () => {
    try {
      const res = await axios.get("/category/all")
      setCategorys(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getAll() }, [])

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this category? This might affect listed services.")) return;
    setDeletingId(id)
    try {
      await axios.delete(`/category/delete/${id}`)
      getAll()
    } catch (error) {
      console.log(error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (id) => navigate(`/admin/editcategory/${id}`)

  const filtered = (categorys || []).filter((c) =>
    c.categoryName?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Service Categories</h1>
          <p className="text-gray-500 mt-1 font-medium">Classifying the marketplace for better accessibility.</p>
        </div>
        <Link
          to="/admin/addcategory"
          className="flex items-center gap-3 px-8 py-4 bg-[#F59E0B] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-[#D97706] transition-all"
        >
          <FiPlus size={18} /> New Category
        </Link>
      </div>

      {/* ── Search Area ── */}
      <div className="relative max-w-xl">
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search categories by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300"
        />
      </div>

      {/* ── Categories Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full text-gray-200 text-5xl mx-auto mb-8 shadow-inner">🧩</div>
          <h3 className="text-2xl font-black text-[#1a1f2e]">No Categories Found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">Start adding categories to organize your professional network.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {filtered.map((category) => {
            const isActive = category.isActive !== false;
            const isDeleting = deletingId === category._id;

            return (
              <div
                key={category._id}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
              >
                {/* Visual Accent */}
                <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-3xl mb-6 group-hover:bg-orange-50 group-hover:text-[#F59E0B] transition-all border border-gray-50 shadow-inner">
                    {category.icon || "🛠️"}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-[#1a1f2e] group-hover:text-[#F59E0B] transition-colors">{category.categoryName}</h3>
                        <div className={`p-1 rounded-full border ${isActive ? "bg-green-50 border-green-100 text-green-500" : "bg-red-50 border-red-100 text-red-500"}`} title={isActive ? "Active" : "Disabled"}>
                            {isActive ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">
                        {category.description || "Browse top-rated professional services in this category."}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-50">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-black text-gray-400">
                                {i}
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">+12 Services</span>
                </div>

                {/* Actions Overlay / Bottom */}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={() => handleEdit(category._id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-[#1a1f2e] text-gray-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-gray-50 hover:border-[#1a1f2e]"
                    >
                        <FiEdit3 size={14} /> Edit
                    </button>
                    <button
                        onClick={() => handleDelete(category._id)}
                        disabled={isDeleting}
                        className="p-3 bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-gray-100"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default AllCategory