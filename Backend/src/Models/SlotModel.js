const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const SlotSchema = new Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
    required: true
  },

  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  date: {
    type: String, // "2026-04-10"
    required: true
  },

 timeSlots: [{
    type: String, // "10:00 AM"
    required: true
  }],

  isBooked: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("slots", SlotSchema);