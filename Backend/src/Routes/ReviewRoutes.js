const router=require("express").Router()
const reviewController=require("../Controllers/ReviewController")

router.post("/add",reviewController.addReview)
router.get("/all",reviewController.getAllreview)
router.get("/service/:id", reviewController.getServiceReviews);
router.get("/provider/:id", reviewController.getProviderReviews);
router.delete("/delete/:id", reviewController.deleteReview);

module.exports=router