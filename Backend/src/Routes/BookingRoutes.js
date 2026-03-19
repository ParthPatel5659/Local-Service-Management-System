const router=require("express").Router()
const BookingController=require("../Controllers/BookingController")

router.post("/create",BookingController.CreateBooking)
router.get("/user/:userId",BookingController.getUserBookings)
router.get("/booking/:id",BookingController.getbookingbyid)

module.exports=router