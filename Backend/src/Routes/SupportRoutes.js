const router = require("express").Router();

const supportController=require("../Controllers/SupportController")

router.post("/add", supportController.createSupport)

module.exports=router
