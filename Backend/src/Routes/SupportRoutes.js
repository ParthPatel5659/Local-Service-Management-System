const router = require("express").Router();

const supportController=require("../Controllers/SupportController")

router.post("/add", supportController.createSupport)
router.get("/all", supportController.getAllSupport); // admin
router.put("/reply/:id",supportController. replySupport); // admin
router.get("/user/:id",supportController. getUserSupport); 

module.exports=router
