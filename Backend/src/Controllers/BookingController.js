const mongoose=require("mongoose")
const bookingSchema = require("../Models/BookingModel");
const Service = require("../Models/ServiceModel");
const Notification=require("../Models/NotificationModel");
const logActivity = require("../utils/activityLogger");
// const CreateBooking = async (req, res) => {
//   try {
//     const { serviceId, bookingDate, bookingTime,} = req.body;

//     // ✅ 1. Validate input
//     if (!serviceId || !bookingDate || !bookingTime) {
//       return res.status(400).json({
//         message: "All fields are required"
//       });
//     }

//     // ✅ 2. Check service exists
//     const service = await Service.findById(serviceId);
//     if (!service) {
//       return res.status(404).json({
//         message: "Service not found"
//       });
//     }

//     // ✅ 3. Create booking safely
//     const booking = await bookingSchema.create({
//       userId: req.params.id,            // 🔥 from token
//       providerId: service.providerId, // 🔥 auto set
//       serviceId,
//       bookingDate,
//       bookingTime,
//      amount: service.price
//     });

    

//     res.status(201).json({
//       message: "Booking created successfully",
//       data: booking,
//     });

//   } catch (error) {
//      console.log(error);
//     res.status(500).json({
//       message: "Error creating booking",
//       error: error.message,
//     });
//   }
// };

const CreateBooking = async (req, res) => {
  try {
    const { serviceId, bookingDate, bookingTime } = req.body;

    // ✅ 1. Validation
    if (!serviceId || !bookingDate || !bookingTime) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ 2. Check service
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    // =====================================
    // ✅ CREATE BOOKING
    // =====================================

    const totalAmount = service.price;
    const commission = totalAmount * 0.1;
    const providerEarning = totalAmount - commission;

    const booking = await bookingSchema.create({
      userId: req.params.id,
      providerId: service.providerId,
      serviceId: serviceId, // keep consistent with schema
      bookingDate,
      bookingTime,
      totalAmount,
      commission,
      providerEarning
    });
    
    // 🔔 Notification for USER
      await Notification.create({
        userId: booking.userId,
        providerId: booking.providerId,
        title: "Booking Created",
        message: `Your booking request has been sent successfully.`,
        type: "booking"
      });

      // 🔔 Notification for PROVIDER
      await Notification.create({
        userId: booking.providerId, // 👈 IMPORTANT (receiver)
        title: "New Booking Request",
        message: `You have received a new booking request.`,
        type: "booking"
      });

      await logActivity({
          userId: req.params.id,
          providerId: service.providerId,
          role: "user",
          action: "BOOKING_CREATED",
          message: "User created a booking",
          meta: { bookingId: booking._id }
      });
    res.status(201).json({
      message: "Booking successful",
      data: booking
    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: "Error creating booking",
      error: error.message
    });
  }
};

//UserBookings Get
const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ validation
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }

    const bookings = await bookingSchema
      .find({ userId })
      .populate("userId") // ✅ user data
      .populate({
        path: "serviceId",
        populate: {
          path: "providerId"
        }
      });

    // ✅ optional empty check
    if (!bookings.length) {
      return res.status(404).json({
        message: "No bookings found"
      });
    }

    res.status(200).json({
      message: "User bookings fetched",
      data: bookings,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching user bookings",
      error: error.message,
    });
  }
};

//Get Booking by id
const getbookingbyid= async(req,res)=>{
    //   console.log(req.user)
    //   console.log(req.user._id)
    try {
      
        const findBooking= await bookingSchema.findById(req.params.id).populate([
  {
    path: "serviceId",
    populate: {
      path: "providerId"
    }
  }
])
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

//all Bookings Get
const getAllBookings= async(req,res)=>{
    try {
        const findBooking= await bookingSchema.find().populate([
            {path:"userId"},
            {path:"serviceId",populate:{path: "providerId"}}
        ])
        res.status(200).json({
            message:"All Bookings",
            data:findBooking
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//get provider booking
const getProviderBookings = async (req, res) => {
  try {
    const providerId = req.params.id;

    const bookings = await bookingSchema.find({ providerId })
      .populate("userId", "Firstname Lastname email")
      .populate("serviceId", "serviceName");

    if (!bookings.length) {
      return res.status(200).json({
        message: "No bookings found",
        data:[]
      });
    }

    res.status(200).json({
      message: "Provider bookings fetched",
      data: bookings,
    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: "Error fetching provider bookings",
      error: error.message,
    });
  }
};

//update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await bookingSchema.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // 🔔 Notification based on status
    let message = "";

    if (status === "Accepted") {
      message = "Your booking has been accepted by provider";
    } 
    else if (status === "Completed") {
      message = "Your service has been completed successfully";
    }

    if (message) {
      await Notification.create({
        userId: booking.userId,
        providerId: booking.providerId,
        title: "Booking Update",
        message,
        type: "booking"
      });
    }

    res.status(200).json({
      message: "Booking status updated",
      data: booking,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating booking",
      error: error.message,
    });
  }
};

// //update Payment status
// const updatePaymentStatus = async (req, res) => {
//   try {
//     const { paymentStatus } = req.body;

//     const booking = await bookingSchema.findByIdAndUpdate(
//       req.params.id,
//       { paymentStatus },
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Payment status updated",
//       data: booking,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating payment",
//       error: error.message,
//     });
//   }
// };

//delete booking
const deleteBooking = async (req, res) => {
  try {
    await bookingSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Booking deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting booking",
      error: error.message,
    });
  }
};

//cancel booking by id
const cancelBookingbyId=async(req,res)=>{
  try { 
     const bookingId = req.params.id;

    const booking = await bookingSchema.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // ❌ prevent cancel if completed
    if (booking.status === "Completed") {
      return res.status(400).json({
        message: "Cannot cancel completed booking",
      });
    }

    // ✅ update status
    booking.status = "Cancelled";
    await booking.save();

    // 👉 Notification for USER
    await Notification.create({
      userId: booking.userId,
      title: "Booking Cancelled",
      message: `Your booking has been cancelled successfully.`,
      type: "booking",   // ✅ MUST match enum
    });

    // 👉 Notification for PROVIDER
    await Notification.create({
      userId: booking.providerId,
      title: "Booking Cancelled",
      message: `A booking has been cancelled by the user.`,
      type: "booking",   // ✅ MUST match enum
    });

     await logActivity({
        userId: booking.userId,
        providerId: booking.providerId,
        role: "user",
        action: "BOOKING_CANCELLED",
        message: "User cancelled booking",
        meta: { bookingId: booking._id }
      });
  
    res.status(200).json({
      message: "Booking cancelled successfully",
      data: booking,
    });
    
  } catch (error) {
    console.log(error);
     res.status(500).json({
      message: "Error cancelling booking",
      error: error.message,
    });
  }
}

// const cancelBookingbyId = async (req, res) => {
//   try {
//     const booking = await bookingSchema.findById(req.params.id);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.status = "Cancelled";
//     await booking.save();

//     // ✅ FREE SLOT AGAIN
//     await Slot.findOneAndUpdate({
//       serviceId: booking.serviceId[0],
//       date: booking.bookingDate,
//       time: booking.bookingTime
//     }, {
//       isBooked: false
//     });

//     res.status(200).json({
//       message: "Booking cancelled"
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const getRevenu=async(req,res)=>{
   try {

    const revenueData = await bookingSchema.aggregate([
      {
        $match: { status: "Completed" } // ✅ only completed
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$commission" } // ✅ commission only
        }
      }
    ]);

    res.json({
      totalRevenue: revenueData[0]?.totalRevenue || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const getProviderEarnings = async (req, res) => {
  try {
    const providerId = req.params.id;

    const earningsData = await bookingSchema.aggregate([
      {
        $match: {
          providerId: new mongoose.Types.ObjectId(providerId),
          status: "Completed",
          paymentStatus: "Paid" // ✅ only paid bookings
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$providerEarning" } // ✅ provider earning
        }
      }
    ]);

    res.status(200).json({
      totalEarnings: earningsData[0]?.totalEarnings || 0
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
const getProviderPending = async (req, res) => {
  try {
    const providerId = req.params.id;

    const pendingData = await bookingSchema.aggregate([
      {
        $match: {
          providerId: new mongoose.Types.ObjectId(providerId),
          paymentStatus: "Unpaid" // ✅ ONLY THIS REQUIRED
        }
      },
      {
        $group: {
          _id: null,
          totalPending: { $sum: "$providerEarning" }
        }
      }
    ]);

    res.status(200).json({
      totalPending: pendingData[0]?.totalPending || 0
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};const getProviderCommission = async (req, res) => {
  try {
    const providerId = req.params.id;

    const commissionData = await bookingSchema.aggregate([
      {
        $match: {
          providerId: new mongoose.Types.ObjectId(providerId),
          status: "Completed"
        }
      },
      {
        $group: {
          _id: null,
          totalCommission: { $sum: "$commission" }
        }
      }
    ]);

    res.status(200).json({
      totalCommission: commissionData[0]?.totalCommission || 0
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};




module.exports={
    CreateBooking,
    getUserBookings,
    getbookingbyid,
    getAllBookings,
    getProviderBookings,
    updateBookingStatus,
    deleteBooking,
    cancelBookingbyId,
    getRevenu,
    getProviderEarnings,
    getProviderPending,
    getProviderCommission
}