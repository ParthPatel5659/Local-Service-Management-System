const ActivityLog = require("../Models/ActivityLogModel");

const logActivity = async ({ userId, role, action, message, meta }) => {
  try {
    await ActivityLog.create({
      userId,
      role,
      action,
      message,
      meta
    });
  } catch (error) {
    console.log("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;