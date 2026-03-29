const router=require("express").Router()
const paymentController= require("../Controllers/PaymentController")

router.post("/create",paymentController.CratePayment)
router.get("/all",paymentController.getallPayment)
router.get("/provider/:id", paymentController.getProviderPayments);
router.put("/update/:id", paymentController.updatePaymentStatus);

module.exports=router