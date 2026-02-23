import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GetApiDemo = () => {
     const[users,setUser]=useState([]);

    const getUsers =async()=>{
        try{
            const res=await axios.get("https://node5.onrender.com/user/user/");
            console.log(res);
            setUser(res.data.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getUsers();
    },[])   
      
  return (
    <div style={{textAlign:"center"}}>
        <h1>GetApiDemo</h1>
        {/* <button onClick={getUsers} className='bg-blue-500 text-white px-4 py-2 rounded'>Get User</button> */}

        <table className='table-auto w-full mt-4'>
            <thead>
                <tr>
                    <th className='border px-4 py-2'>ID</th>
                    <th className='border px-4 py-2'>Name</th>
                    <th className='border px-4 py-2'>Email</th>
                </tr>
            </thead>
            <tbody>
               {
                users.map((user)=>{
                    return <tr key={user._id}>
                        <td className='border px-4 py-2'>{user._id}</td>
                        <td className='border px-4 py-2'>{user.name}</td>
                        <td className='border px-4 py-2'>{user.email}</td>
                    </tr>
                })
               }



                {/* {users.map((user)=>(
                    <tr key={user._id}>
                        <td className='border px-4 py-2'>{user._id}</td>
                        <td className='border px-4 py-2'>{user.name}</td>
                        <td className='border px-4 py-2'>{user.email}</td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    </div>
  )
}


