import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AllServices = () => {
    const[search,setSearch]=useState()
    const getallSrvices=async()=>{
        try {
            const res=await axios.get("/services/all")
            console.log(res.data.dat)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
         getallSrvices()
    },[])
  return (
    <div>
        <h1>AllServices</h1>
        <div>
            <label>Search</label>
              <input type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
    </div>
  )
}
