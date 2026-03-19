const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const BookingSchema= new Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services"
  },

  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  bookingDate: {
    type: Date
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