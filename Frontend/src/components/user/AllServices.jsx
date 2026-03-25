import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AllServices = () => {

  const {register,handleSubmit} = useForm()
  const [services , setservices] = useState([])
  const navigate = useNavigate()



  const allService = async () => {
    try{
      const res = await axios.get('/services/all')
      console.log(res.data.data)
      setservices(res.data.data)
    }catch(err){
      console.log(err)
    }
  }

  const submitHandle = async(data) => {
    try{
      const res = await axios.post('/bookings/create',data)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    allService();
  },[])


  return (
    <div>
      <div>
        <input type="search" />
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit(submitHandle)}>
            <div>
              {
                services.map((service)=>{
                  return <div key={service._id}>
                    <input
                      type="checkbox"
                      value={service._id} {...register('serviceId')}
                      className="mr-2"
                    />
                    <p>Service Name : {service.serviceName}</p>
                    <p>Description : {service.description}</p>
                    <p>Price : {service.price}</p>
                    <h2>Provider Name : {service.providerId?.Firstname} {service.providerId?.Lastname}</h2>
                  </div>
                })
              }
            </div>
            <div>
              <label>Date : </label>
              <input type="date" {...register('bookingDate')} />
            </div>
            <div>
              <label>Time : </label>
              <input type="time" {...register('bookingTime')} />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AllServices
