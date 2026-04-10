const ActivityLog = require("../Models/ActivityLogModel");

// GET ALL (Admin)
const getAllLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("userId", "Firstname Lastname email role")
      .sort({ createdAt: -1 });

    res.json({
      message: "All logs",
      data: logs
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER LOGS
const getUserLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.params.id })
      .sort({ createdAt: -1 });

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