const CartProduct = require('./../models/cartProductModel');
const Product = require('./../models/productModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const CartProductModel = require('./../models/cartProductModel');
const findById = require('./../utils/findById');
const getCartProduct = require('./../utils/getCartProduct');

exports.getAllProductsFromCart = catchAsync(async (req, res, next) => {
    const cartProducts = await CartProductModel.find({ user: req.user._id });

    if (!cartProducts) return next(new AppError("We couldn't find the user with this ID", 404));

    res.status(200).json({
        status: 'Success',
        data: {
            results: cartProducts.length,
            products: cartProducts,
        },
    });

    return next();
});

exports.getProductFromCart = catchAsync(async (req, res, next) => {
    const product = await CartProductModel.findById(req.params.id);

    if (!product) return next(new AppError("Couldn't Find That Product", 404));

    res.status(200).json({
        status: 'Success',
        data: {
            product,
        },
    });

    return next();
});

exports.addProductToTheCart = catchAsync(async (req, res, next) => {
    // Await the Product Query to get the DATA
    const product = await Product.findById(req.params.id);

    // If it's not found, throw an error
    if (!product) return next(new AppError("Couldn't Find That Product"), 404);

    // Create the CART PROUDCT
    const cartProduct = await CartProduct.create({
        name: product.name,
        user: req.user._id,
        product: product._id,
        price: product.discountPrice,
        quantity: 1,
        image: product.images[0],
    });

    // Send the USER with Cart
    res.status(201).json({
        status: 'Success',
        data: {
            data: cartProduct,
        },
    });

    return next();
});

exports.deleteProductFromCart = catchAsync(async (req, res, next) => {
    const cartProduct = await CartProduct.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'Success',
        data: {
            data: req.user,
        },
    });

    return next();
});

exports.updateQuantity = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.body.id);

    if (!product) return next(new AppError("Couldn't find that product", 404));

    const cartProductId = findById(req.user.cart, product.id);

    const cartProd = await CartProductModel.findByIdAndUpdate(
        cartProductId,

        {
            quantity: req.body.quantity,
        },
        { new: true },
    );

    res.status(200).json({
        status: 'Success',
        data: {
            data: cartProd,
        },
    });

    return next();
});
