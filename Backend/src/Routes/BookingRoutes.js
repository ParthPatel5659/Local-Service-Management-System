const router=require("express").Router()
const BookingController=require("../Controllers/BookingController")
const validateToken = require("../Middleware/AuthMiddelwear")

router.post("/create",BookingController.CreateBooking)
router.get("/user/:userId",BookingController.getUserBookings)
router.get("/booking/:id",BookingController.getbookingbyid)
router.get("/all",BookingController.getAllBookings)
router.get("/provider/:id",validateToken ,BookingController.getProviderBookings);
router.put("/update/:id",validateToken, BookingController.updateBookingStatus);
// router.put("/payment/:id", BookingController.updatePaymentStatus);
router.delete("/delete/:id", BookingController.deleteBooking);

module.exports=router