// const router=require("express").Router()

// const serviceController= require("../Controllers/ServiceController")
// const validateToken = require("../Middleware/AuthMiddelwear")

// router.post("/add",serviceController.addService)
// router.get("/all",serviceController.getAllService)
// router.get("/service/:id",serviceController.getserviceById)
// router.put("/update/:id",serviceController.updateServiceById)
// router.delete("/delete/:id",serviceController.deleteServiceById)

// module.exports=router
const router = require("express").Router();

const serviceController = require("../Controllers/ServiceController");

router.post("/add",  serviceController.addService);
router.get("/all", serviceController.getAllService);

// ✅ FIXED
router.get("/my-services/:id",serviceController.getMyServices);

router.put("/update/:id",  serviceController.updateServiceById);
router.delete("/delete/:id",  serviceController.deleteServiceById);
router.get("/provider/:id",serviceController.getProviderService)

module.exports = router;