const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create a new user
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;