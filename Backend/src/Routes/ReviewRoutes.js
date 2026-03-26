const router=require("express").Router()
const reviewController=require("../Controllers/ReviewController")

router.post("/add",reviewController.addReview)
router.get("/all",reviewController.getAllreview)

module.exports=router