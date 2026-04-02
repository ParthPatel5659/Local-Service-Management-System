const bookingSchema = require("../Models/BookingModel");

//create Booking

// const CreateBooking = async (req, res) => {
//   try {
//     const booking = await bookingSchema.create(req.body);

//     res.status(201).json({
//       message: "Booking created successfully",
//       data: booking,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating booking",
//       error: error.message,
//     });
//   }
// };

const Service = require("../Models/ServiceModel");

const CreateBooking = async (req, res) => {
  try {
    const { serviceId, bookingDate, bookingTime,} = req.body;

    // ✅ 1. Validate input
    if (!serviceId || !bookingDate || !bookingTime) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ 2. Check service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    // ✅ 3. Create booking safely
    const booking = await bookingSchema.create({
      userId: req.params.id,            // 🔥 from token
      providerId: service.providerId, // 🔥 auto set
      serviceId,
      bookingDate,
      bookingTime,
     
    });

    res.status(201).json({
      message: "Booking created successfully",
      data: booking,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: error.message,
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
      .populate("userId", "Firstname email")
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

module.exports={
    CreateBooking,
    getUserBookings,
    getbookingbyid,
    getAllBookings,
    getProviderBookings,
    updateBookingStatus,
    deleteBooking
}