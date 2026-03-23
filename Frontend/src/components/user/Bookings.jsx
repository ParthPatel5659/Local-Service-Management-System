import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();

  const getbookingbyid = async () => {
    try {
      const res = await axios.get(`/bookings/booking/${id}`);
      setBookings(res.data.data);

      if (res.status == 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getbookingbyid();
  }, [id]);

  return (
    <div>
      <h1>Bookings</h1>

      <div className='grid grid-cols-3 gap-4'>
        {bookings.map((booking) => (
          <div key={booking._id} className='border p-4 rounded'>
            <h2 className='text-xl font-bold'>{booking.serviceName}</h2>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;