const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const PaymentSchema= new Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  amount: {
    type: Number
  },

  paymentMethod: {
    type: String,
    enum: ["UPI", "Card", "Wallet", "COD"],
    default: "COD"
  },

  transactionId: {
    type: String
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Success", "Failed"]
  },

  paymentDate: {
    type: Date
  }

});

module.exports=mongoose.model("Payment", PaymentSchema);