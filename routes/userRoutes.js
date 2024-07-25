const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// User routes
router.post('/users', userController.createUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
