const router=require("express").Router()

const activityController=require("../Controllers/ActivityController")

router.get("/all", activityController.getAllLogs);
router.get("/user/:id", activityController.getUserLogs);

module.exports=router