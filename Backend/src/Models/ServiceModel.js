const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  // providerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  //   required: true
  // },

  // categoryId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category"
  // },

  serviceName: {
    type: String,
    required: true
  },

  description: {
    type: String
  },
  price: {
    type: Number
  },

  location: {
    type: String
  },

  availability: {
    type: Boolean,
    default: true
  },

  // status: {
  //   type: String,
  //   enum: ["Pending", "Approved"],
  //   default: "Pending"
  // }

}, { timestamps: true });
module.exports = mongoose.model('services', ServiceSchema);
