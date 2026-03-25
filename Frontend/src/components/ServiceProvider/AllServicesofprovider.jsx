import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'


export const AllServicesofprovider = () => {

    const [services,setServices]=useState([])
    // const {providerId}= useParams()
    // console.log(providerId)
    // const{id}= localStorage.setItem('id',res.data.data._id)
    


    const token=localStorage.getItem("token")
    const decode=jwtDecode(token)
    console.log(decode);
    

    const fetchServicebyId=async()=>{
        try {
            const res= await axios.get(`/services/service/${services._id}`)
            console.log(res.data)
            console.log(res.data.data)
            setServices(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
   fetchServicebyId
    },[])

  return (
    <div>
          <h1>AllServices</h1>
        <div>
            {id}
        </div>

    </div>
  )
}
