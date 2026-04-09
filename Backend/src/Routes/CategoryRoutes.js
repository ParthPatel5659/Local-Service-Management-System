const router=require("express").Router()
const categoryController=require("../Controllers/CategoryController")

router.post('/add',categoryController.addCategory)
router.get('/all',categoryController.getAllCategory)
router.get('/:id',categoryController.getCategoryById)
router.put('/update/:id',categoryController.updateCategory)
router.delete('/delete/:id',categoryController.deleteCategory)

module.exports=router