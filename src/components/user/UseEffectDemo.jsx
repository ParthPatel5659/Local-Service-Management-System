import React, { useEffect, useState } from 'react'

const UseEffectDemo = () => {

    const[count,setcount]=useState(0);

    useEffect(()=>{
        console.log("useEffect called");
    },[count])   //dependency array
  return (
    <div style={{textAlign:"center"}}>
      <h1>UseEffectDemo</h1>
      <button onClick={()=>{setcount(count+1)}}>Increment</button>
        <h2>Count:{count}</h2>
    </div>
  )
}

export default UseEffectDemo
