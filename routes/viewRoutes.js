const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);
router.get(
  '/products/:id',
  authController.isLoggedIn,
  viewController.getProduct
);

router.get(
  '/me',
  authController.protect,
  authController.isLoggedIn,
  viewController.getMe
);

module.exports = router;
