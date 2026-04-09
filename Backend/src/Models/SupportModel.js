const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SupportSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  subject:{
    type:String
  },
  message: {
    type:String
},
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true })

module.exports = mongoose.model("Support", SupportSchema)

