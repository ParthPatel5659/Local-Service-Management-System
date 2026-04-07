import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/user/detail/${id}`);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
   
  // ✅ DELETE USER
  const deleteUser = async (id) => {
    try {
      if (!window.confirm("Are you sure to delete this user?")) return;

      const res = await axios.delete(`/user/delete/${id}`);

      if (res.status === 200) {
        toast.success("User deleted successfully");
        navigate(-1)
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to List
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Cover Header */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          {/* User Info Section */}
          <div className="relative px-8 pb-8">
            
            {/* Avatar Placeholder */}
            <div className="absolute -top-12 left-8">
              <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-md">
                <div className="h-full w-full rounded-xl bg-gray-100 flex items-center justify-center text-3xl font-bold text-blue-600 border border-gray-50">
                  {user.Firstname?.charAt(0)}{user.Lastname?.charAt(0)}
                </div>
              </div>
            </div>

            <div className="pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {user.Firstname} {user.Lastname}
                </h1>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2">
                  {user.role || "User"}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                <p className="text-lg text-gray-700 font-medium">{user.email}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                <p className="text-lg text-gray-700 font-medium">{user.phone || "Not Provided"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Status</p>
                <div className="flex items-center text-green-600 font-bold">
                  <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                  Active
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">User ID</p>
                <p className="text-sm text-gray-400 font-mono">{user._id}</p>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="mt-10 flex flex-wrap gap-3">
               
               <button
                  onClick={() => deleteUser(user._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;