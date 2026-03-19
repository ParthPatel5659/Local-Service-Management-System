const router=require("express").Router()
const paymentController= require("../Controllers/PaymentController")

router.post("/create",paymentController.CratePayment)

module.exports=router