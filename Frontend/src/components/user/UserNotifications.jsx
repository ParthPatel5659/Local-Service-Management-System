import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthProvider'

const UserNotifications = () => {
    const{userId}=useContext(AuthContext)
    const[notifications,setNotifications]=useState([])

    const getNotification=async()=>{
        try {
            const res=await axios.get(`/notification/user/${userId}`)
            console.log(res.data.data);
            setNotifications(res.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const markRead=async(id)=>{
        await axios.put(`/notification/read/${id}`)
        getNotification()
    }
    useEffect(()=>{
      if(userId){
        getNotification()
      }
    },[userId])
  return (
   <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Notifications</h1>

      {notifications.length > 0 ? (
        notifications.map((n) => (
          <div
            key={n._id}
            className={`p-3 mb-2 border rounded ${
              n.isRead ? "bg-gray-100" : "bg-white"
            }`}
          >
            <p>{n.message}</p>
            <p className="text-sm text-gray-500">{n.type}</p>

            {!n.isRead && (
              <button
                onClick={() => markRead(n._id)}
                className="text-blue-500 text-sm"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  )
}

export default UserNotifications
