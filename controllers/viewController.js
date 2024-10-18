const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const Product = require('./../models/productModel');

exports.getOverview = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    if (!products) return next(new AppError("Couldn't load the Products", 500));

    res.status(200).render('overview', {
        title: 'Products',
        products,
    });

    return next();
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
        title: 'Log In',
    });

    return next();
});

exports.getSignUpForm = catchAsync(async (req, res, next) => {
    res.status(200).render('signup', {
        title: 'Sign Up',
    });

    return next();
});

exports.getMe = catchAsync(async (req, res, next) => {
    return next();
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new AppError("Couldn't Find this Product", 404));

    res.status(200).render('productDetailPage', {
        title: product.name,
        product,
    });

    return next();
});
