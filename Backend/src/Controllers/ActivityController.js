const ActivityLog = require("../Models/ActivityLogModel");

// GET ALL (Admin)
const getAllLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("userId", "Firstname Lastname email role")
      .populate("providerId","Firstname Lastname email role")
      .populate("bookingId")
      .sort({ createdAt: -1 });

    res.json({
      message: "All logs",
      data: logs
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER/PROVIDER LOGS
const getUserLogs = async (req, res) => {
  try {
    const id = req.params.id;
    const logs = await ActivityLog.find({ 
      $or: [{ userId: id }, { providerId: id }] 
    }).sort({ createdAt: -1 });

    res.json({
      message: "User logs",
      data: logs
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLogs,
  getUserLogs
};