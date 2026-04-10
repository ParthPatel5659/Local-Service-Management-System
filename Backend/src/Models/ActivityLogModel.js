const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const ActivityLogSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  role: {
    type: String,
    enum: ["user", "provider", "admin"]
  },

  action: {
    type: String,
    required: true
  },

  message: {
    type: String
  },

  meta: {
    type: Object // optional extra data
  }

}, { timestamps: true });

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);