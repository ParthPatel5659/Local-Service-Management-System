const router=require("express").Router()
const categoryController=require("../Controllers/CategoryController")

router.post('/add',categoryController.addCategory)
router.get('/all',categoryController.getAllCategory)

module.exports=router