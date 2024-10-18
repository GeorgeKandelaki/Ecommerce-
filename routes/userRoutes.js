const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Authentication
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// Resrict This to Only Admins and Logged In Clients
router.use(authController.protect, authController.restrictTo('admin'));

// Get Users
router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser);

module.exports = router;
