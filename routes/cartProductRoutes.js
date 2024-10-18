const express = require('express');
const cartProductController = require('./../controllers/cartProductController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.isLoggedIn);

router
  .route('/')
  .get(cartProductController.getAllProductsFromCart)
  .patch(cartProductController.updateQuantity);

router
  .route('/:id')
  .get(cartProductController.getProductFromCart)
  .post(cartProductController.addProductToTheCart)
  .delete(cartProductController.deleteProductFromCart);

module.exports = router;
