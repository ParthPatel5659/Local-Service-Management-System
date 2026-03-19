const { response } = require("express");
const bookingSchema= require("../Models/BookingModel");

//create Booking

const CreateBooking= async(req,res)=>{
    try {
        const Booking= await bookingSchema.create(req.body);
        res.status(201).json({
            message:"Booking SuccesFully",
            data:Booking
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}



//UserBookings Get
const getUserBookings=async(req,res)=>{
    try {
        const findBooking= await bookingSchema.find({ userId: req.params.userId })
      .populate("serviceId");

       res.json(bookings);

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getbookingbyid= async(req,res)=>{
    try {
        const findBooking= await bookingSchema.findById(req.params.id).populate("userId");
        res.status(200).json({
            message:"Booking Found",
            data:findBooking
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={
    CreateBooking,
    getUserBookings,
    getbookingbyid
}