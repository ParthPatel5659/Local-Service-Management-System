import axios from 'axios'
import React from 'react'

const Services = () => {

  const services = async () => {
    const res = await axios.get('/services/all')
    try {
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }


  return (
    <div>
      
    </div>
  )
}

export default Services
