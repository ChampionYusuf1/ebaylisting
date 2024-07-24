const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Login Route
router.post('/login', userController.login);

// Create User Route - No authMiddleware here
router.post('/users', userController.createUser);

// Delete User Route - This requires authMiddleware
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
