import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const AllBookings = () => {
    const [search,setSearch]=useState()
    const [bookings,setBookings]=useState([])
    const getAllBooking=async()=>{
        try {
            const res= await axios.get("/bookings/all")
            console.log(res.data)
             console.log(res.data.data)
            setBookings(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
       getAllBooking()
    },[])
  return (
    <div>
       <h1>AllBookings </h1>
       <div>
        <input type='text' placeholder='search' value={search}  onChange={(e) => setSearch(e.target.value)}  />
       </div>
       {
           bookings.map((booking)=>{
            return <div key={booking._id}>
                <h3>Cagegory:{booking.serviceId.serviceName}</h3>
                <h5>Date:{booking.bookingDate}</h5>
                <h5>Time:{booking.bookingTime}</h5>
                
                <h2>Provider Name : {booking.providerId?.Firstname} {booking.providerId?.Lastname}</h2>
                </div>
           })
       }

    </div>
  )
}

export default AllBookings
