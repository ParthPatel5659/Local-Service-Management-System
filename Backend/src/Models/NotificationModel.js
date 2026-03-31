const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const NotificationSchema=new Schema({
     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["Booking", "Payment", "Review"],
    default: "Booking",
  },

  isRead: {
    type: Boolean,
    default: false,
  },
},{timestamps:true})

module.exports=mongoose.model("Notification", NotificationSchema)