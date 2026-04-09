const NotificationSchema=require("../Models/NotificationModel")


const createNotification=async(req,res)=>{
    try {
        const create= await NotificationSchema.create(req.body)
         res.status(201).json({
            message:"Notification add Succesfully",
            data:create
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//get user notification
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id;

    const notifications = await NotificationSchema.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notifications fetched",
      data: notifications,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};


//get provider notification
const getProviderNotification = async (req, res) => {
  try {
    const providerId = req.params.id;

    const notifications = await NotificationSchema.find({
      userId: providerId   // ✅ provider receives notification
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notifications fetched",
      data: notifications
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//make as read
const markAsRead = async (req, res) => {
  try {
    const notification = await NotificationSchema.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.status(200).json({
      message: "Marked as read",
      data: notification,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating notification",
      error: error.message,
    });
  }
};


module.exports={
    createNotification,
    getUserNotifications,
    getProviderNotification,
    markAsRead
}