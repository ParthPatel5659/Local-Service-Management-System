const router=require("express").Router()
const BookingController=require("../Controllers/BookingController")
const validateToken = require("../Middleware/AuthMiddelwear")

router.post("/create",BookingController.CreateBooking)
router.get("/user/:userId",BookingController.getUserBookings)
router.get("/booking/:id",BookingController.getbookingbyid)
router.get("/all",BookingController.getAllBookings)

module.exports=router