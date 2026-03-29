// import axios from 'axios'
// import { jwtDecode } from 'jwt-decode'
// import React, { useEffect, useState } from 'react'


// export const AllServicesofprovider = () => {

//     const [services,setServices]=useState([])
//     // const {providerId}= useParams()
//     // console.log(providerId)
//     // const{id}= localStorage.setItem('id',res.data.data._id)
    


//     const token=localStorage.getItem("token")
//     const decode=jwtDecode(token)
//     console.log(decode);
    

//     const fetchServicebyId=async()=>{
//         try {
//             const res= await axios.get(`/services/service/${services._id}`)
//             console.log(res.data)
//             console.log(res.data.data)
//             setServices(res.data.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
//    fetchServicebyId
//     },[])

//   return (
//     <div>
//           <h1>AllServices</h1>
//         <div>
//             {id}
//         </div>

//     </div>
//   )
// }
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const AllServicesofprovider = () => {
    const[search,setSearch]=useState()
    const [services, setServices] = useState([])
   
    const token = localStorage.getItem("token")

    const decode = jwtDecode(token)
    console.log("Decoded user:", decode)

    const fetchServices = async () => {
        try {
            const res = await axios.get(`/services/my-services/${decode.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(res.data.data)
            setServices(res.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchServices()   // ✅ FIXED
    }, [])

    return (
        <div>
            <h1>All Services</h1>
            <div>
                <label>search</label>
                <input type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <Link to={"/provider/addservice"}>Add Service</Link>

            {
                services.length > 0 ? (
                    services.map((service) => (
                        <div key={service._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
                            
                            <h3>Service Name:{service.serviceName}</h3>
                            <p>Description:{service.description}</p>
                            <p>Price: ₹{service.price}</p>
                            <p>Location: {service.location}</p>
                            <p>Category: {service.categoryId?.categoryName}</p>
                            <p>Provider: {service.providerId?.Firstname} {service.providerId?.Lastname}</p>

                        </div>
                    ))
                ) : (
                    <p>No services found</p>
                )
            }
        </div>
    )
}