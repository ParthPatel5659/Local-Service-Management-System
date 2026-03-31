const router=require("express").Router()
const NotificationController=require("../Controllers/NotificationController")

router.post("/add",NotificationController.createNotification)
router.get("/user/:id",NotificationController.getUserNotifications)
router.put("/read/:id",NotificationController.markAsRead)

module.exports=router