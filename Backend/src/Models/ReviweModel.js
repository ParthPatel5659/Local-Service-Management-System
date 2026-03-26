const mongoose= require("mongoose");

const Schema=mongoose.Schema;

const reviewSchema = new Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    require:true
  },

  comment: {
    type: String
  }

}, { timestamps: true });


module.exports=mongoose.model("Review", reviewSchema);