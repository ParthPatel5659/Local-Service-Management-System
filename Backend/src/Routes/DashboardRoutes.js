const router=require("express").Router()
const dashbordController=require("../Controllers/DashboardController")

router.get('/dashbord',dashbordController.getDashboard)

module.exports=router