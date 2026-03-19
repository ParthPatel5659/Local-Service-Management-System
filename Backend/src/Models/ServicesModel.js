const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  serviceName : {
    type: String,
    required: true,
  },
  description : {
    type: String,
  },
  price : {
    type:Number
  },
//   location : {
//     type:String,
//     required:true
//   },
  availability : {
    type:Boolean,
    default:true    
  }
}, { timestamps: true });

const Service = mongoose.model("services", ServiceSchema);
module.exports = Service;
