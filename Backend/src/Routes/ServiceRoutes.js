const router=require("express").Router()

const serviceController= require("../Controllers/ServiceController")
router.post("/add",serviceController.addService)
router.get("/all",serviceController.getAllService)


// const ServicesController = require("../Controllers/ServicesController");

// router.post("/add", ServicesController.addService);
// router.get("/all", ServicesController.getAllService);

module.exports=router