import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Services = () => {
  const [allService, setAllService] = useState([]);
  const [search, setSearch] = useState("");

  const getServices = async () => {
    try {
      const res = await axios.get("/services/all");
      setAllService(res.data.data);

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // 🔍 Filter services
  const filteredServices = allService.filter((service) =>
    service.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Services</h1>

      <div className='grid grid-cols-3 gap-4'>

        {/* Search */}
        <div className='col-span-3'>
          <input
            type='search'
            placeholder='Search services...'
            className='mb-4 p-2 border rounded w-full'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Book Button */}
        <div className='col-span-3 flex justify-end mb-4'>
          <Link
            to="/user/bookservices"
            className='bg-green-500 text-white px-4 py-2 rounded'
          >
            Book a Service
          </Link>
        </div>

        {/* Services List */}
        <div className='col-span-3 grid grid-cols-3 gap-4'>
          {filteredServices.map((service) => (
            <div key={service._id} className='border p-4 rounded'>
              <h2 className='text-xl font-bold'>{service.serviceName}</h2>
              <p>{service.description}</p>
              <p className='text-gray-500'>Price: ₹{service.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};