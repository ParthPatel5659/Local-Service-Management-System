const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const BookingSchema= new Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  serviceId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "services"
  }],

  // providerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user"
  // },

  bookingDate: {
    type: String
  },

  bookingTime:{
     type:String
  },


  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed"],
    default: "Pending"
  },

  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid"
  }

}, { timestamps: true });

module.exports= mongoose.model("Booking",BookingSchema);