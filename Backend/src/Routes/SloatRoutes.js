const router=require("express").Router()
const sloatController=require("../Controllers/SloatController")

router.post("/add",sloatController.createSlots)
router.get("/available-slots", sloatController.getAvailableSlots);

module.exports=router
