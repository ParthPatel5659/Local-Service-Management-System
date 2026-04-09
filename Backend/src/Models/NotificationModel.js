const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const NotificationSchema=new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
    enum: ["booking", "payment", "support", "system"], // ✅ FIX
    default: "system"
  },

  isRead: {
    type: Boolean,
    default: false,
  },
},{timestamps:true})

module.exports=mongoose.model("Notification", NotificationSchema)