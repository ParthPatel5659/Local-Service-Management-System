const router = require('express').Router();
const userController = require('../Controllers/UserController');

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser)

module.exports = router;