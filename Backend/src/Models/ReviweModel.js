const mongoose= require("mongoose");

const Schema=mongoose.Schema;

const reviewSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  comment: {
    type: String
  }

}, { timestamps: true });


module.exports=mongoose.model("Review", reviewSchema);