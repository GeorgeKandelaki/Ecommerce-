const Product = require('./../models/productModel');
const findById = require('./findById');
const AppError = require('./appError');

module.exports = async function (cart, id) {
    const product = await Product.findById(id);

    if (!product) return next(new AppError("Couldn't find that product", 404));

    const cartProductId = findById(cart, product.id);

    return cartProductId;
};
