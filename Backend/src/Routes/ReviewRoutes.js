const router=require("express").Router()
const reviewController=require("../Controllers/ReviewController")

router.post("/add",reviewController.addReview)

module.exports=router