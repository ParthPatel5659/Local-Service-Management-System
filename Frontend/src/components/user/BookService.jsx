import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const BookService = () => {

    const{register,handleSubmit,formState: { errors }}=useForm()
    const {id} = useParams()

    const submitHandler=async(data)=>{
          console.log(data)
          try {
            const res=await axios.post("/bookings/create",data)
            if(res.status==  201){
                toast.success("Service Book Successfully")
                res.status(201).json({
                     data:res.data
                })
            }
          } catch (error) {
            console.log(error)

          }
    }

    const validationSchema={
        dateValidation:{
            required:{
                value:true,
                message:"date is reqired"
            }
        },
        timeValidation:{
             required:{
                value:true,
                message:"time is reqired"
            }
        }
    }
  return (
    <div>
      <h1>Book Service</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <lable>Date</lable>
            <input type="date" placeholder='Date' {...register("date",validationSchema.dateValidation)} className='boder-1px bould'/>
            {errors.date && errors.date?.message}
          </div>
          <div>
            <label className='boder-1px bold'>Time</label>
            <input type='time' placeholder='time' {...register("time",validationSchema.timeValidation)}/>
             {errors.time && errors.time?.message}
          </div>

           <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-300 font-semibold text-sm sm:text-base mt-2 shadow-md hover:shadow-lg"
          >
            Book
          </button>
      </form>
    </div>
  )
}

export default BookService
