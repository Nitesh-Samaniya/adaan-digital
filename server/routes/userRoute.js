const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, userController.getProfile);
router.patch('/update', userController.updateProfile);


module.exports = router;