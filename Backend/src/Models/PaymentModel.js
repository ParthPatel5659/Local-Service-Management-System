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
    // enum: ["UPI", "Card", "Wallet", "COD"]
  },

  transactionId: {
    type: String
  },

  orderId: {
    type:String
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default:"Pending"
  },

  paymentDate: {
    type: Date,
    default: Date.now
  },

  razorpay_order_id : {
    type : String
  },

  razorpay_signature : {
    type : String
  }



},{timestamps:true});

module.exports=mongoose.model("Payment", PaymentSchema);