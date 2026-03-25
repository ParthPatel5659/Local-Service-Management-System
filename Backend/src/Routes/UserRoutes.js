const router = require('express').Router();
const userController = require('../Controllers/UserController');

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.put('/update/:id',userController.updateUserById)
router.delete('/delete/:id',userController.deleteUserById)
router.get('/all',userController.getallUser)
router.get('/users',userController.getByUser)
router.get('/providers',userController.getByProvider)

module.exports = router;